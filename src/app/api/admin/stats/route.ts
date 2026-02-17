import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getQuizEntries } from "@/lib/quiz-storage";
import { getMercadoPagoClient } from "@/lib/mercadopago";
import { Payment } from "mercadopago";
import { PRICE } from "@/lib/constants";
import { ageToRange } from "@/lib/label-map";

interface MPPayment {
  id?: number;
  status?: string;
  date_created?: string;
  date_approved?: string;
  transaction_amount?: number;
}

let cachedStats: { data: unknown; fetchedAt: number } | null = null;
const CACHE_TTL = 60_000;

export async function GET(request: Request) {
  const { authorized } = requireAdmin(request);
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const from = url.searchParams.get("from") || undefined;
    const to = url.searchParams.get("to") || undefined;

    // Get quizzes
    let quizzes = await getQuizEntries();
    if (from) {
      const fromDate = new Date(from);
      quizzes = quizzes.filter((q) => new Date(q.timestamp) >= fromDate);
    }
    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      quizzes = quizzes.filter((q) => new Date(q.timestamp) <= toDate);
    }

    // Get payments from MP (with cache)
    let allPayments: MPPayment[] = [];
    const cacheKey = `${from || ""}-${to || ""}`;
    if (cachedStats && Date.now() - cachedStats.fetchedAt < CACHE_TTL) {
      const cached = cachedStats.data as { payments: MPPayment[]; key: string };
      if (cached.key === cacheKey) {
        allPayments = cached.payments;
      }
    }

    if (allPayments.length === 0) {
      try {
        const client = getMercadoPagoClient();
        const paymentClient = new Payment(client);
        let offset = 0;
        const limit = 100;

        for (let i = 0; i < 10; i++) {
          const result = await paymentClient.search({
            options: { offset, limit, sort: "date_created", criteria: "desc" },
          });
          const results = (result.results || []) as MPPayment[];
          allPayments.push(...results);
          if (results.length < limit) break;
          offset += limit;
        }

        // Only keep payments matching our product prices (current + initial)
        const VALID_PRICES = [PRICE, 3000];
        allPayments = allPayments.filter((p) => VALID_PRICES.includes(p.transaction_amount || 0));
        cachedStats = { data: { payments: allPayments, key: cacheKey }, fetchedAt: Date.now() };
      } catch (e) {
        console.error("Error fetching MP payments for stats:", e);
      }
    }

    // Filter payments by date
    let filteredPayments = allPayments;
    if (from) {
      const fromDate = new Date(from);
      filteredPayments = filteredPayments.filter((p) => p.date_created && new Date(p.date_created) >= fromDate);
    }
    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      filteredPayments = filteredPayments.filter((p) => p.date_created && new Date(p.date_created) <= toDate);
    }

    const approvedPayments = filteredPayments.filter((p) => p.status === "approved");
    const totalRevenue = approvedPayments.reduce((sum, p) => sum + (p.transaction_amount || 0), 0);
    const totalQuizzes = quizzes.length;
    const totalSales = approvedPayments.length;
    const conversionRate = totalQuizzes > 0 ? ((totalSales / totalQuizzes) * 100) : 0;

    // Revenue by day (last 14 days)
    const revenueByDay: Record<string, number> = {};
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      revenueByDay[key] = 0;
    }
    for (const p of approvedPayments) {
      if (p.date_approved) {
        const day = new Date(p.date_approved).toISOString().split("T")[0];
        if (day in revenueByDay) {
          revenueByDay[day] += p.transaction_amount || 0;
        }
      }
    }

    // Pattern analysis from quizzes
    const patterns: Record<string, Record<string, number>> = {
      age: {},
      bodyType: {},
      barriers: {},
      goals: {},
      dailyRoutine: {},
      waterIntake: {},
    };

    for (const q of quizzes) {
      const a = q.answers;
      if (a.age) {
        const ageKey = ageToRange(a.age);
        patterns.age[ageKey] = (patterns.age[ageKey] || 0) + 1;
      }
      if (a.bodyType) patterns.bodyType[a.bodyType] = (patterns.bodyType[a.bodyType] || 0) + 1;
      if (a.dailyRoutine) patterns.dailyRoutine[a.dailyRoutine] = (patterns.dailyRoutine[a.dailyRoutine] || 0) + 1;
      if (a.waterIntake) patterns.waterIntake[a.waterIntake] = (patterns.waterIntake[a.waterIntake] || 0) + 1;
      if (a.barriers) {
        for (const b of a.barriers) {
          patterns.barriers[b] = (patterns.barriers[b] || 0) + 1;
        }
      }
      if (a.goals) {
        for (const g of a.goals) {
          patterns.goals[g] = (patterns.goals[g] || 0) + 1;
        }
      }
    }

    // Recent items
    const recentQuizzes = quizzes.slice(-5).reverse();
    const recentPayments = approvedPayments.slice(0, 5);

    return NextResponse.json({
      totalQuizzes,
      totalSales,
      conversionRate: Math.round(conversionRate * 10) / 10,
      totalRevenue,
      revenueByDay,
      patterns,
      recentQuizzes,
      recentPayments,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
