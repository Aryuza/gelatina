import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getMercadoPagoClient } from "@/lib/mercadopago";
import { Payment } from "mercadopago";
import { PRICE, COMBO_PRICE } from "@/lib/constants";

interface MPPayment {
  id?: number;
  status?: string;
  status_detail?: string;
  date_created?: string;
  date_approved?: string;
  transaction_amount?: number;
  payer?: { email?: string; first_name?: string; last_name?: string };
  description?: string;
  payment_method_id?: string;
}

// Module-level cache
let cachedPayments: { data: MPPayment[]; fetchedAt: number } | null = null;
const CACHE_TTL = 60_000; // 60 seconds

async function fetchAllPayments(from?: string, to?: string): Promise<MPPayment[]> {
  // Check cache
  if (cachedPayments && Date.now() - cachedPayments.fetchedAt < CACHE_TTL) {
    let payments = cachedPayments.data;
    if (from || to) {
      payments = filterByDate(payments, from, to);
    }
    return payments;
  }

  const client = getMercadoPagoClient();
  const paymentClient = new Payment(client);
  const allPayments: MPPayment[] = [];
  let offset = 0;
  const limit = 100;

  // Fetch up to 1000 payments (10 pages)
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
  const VALID_PRICES = [PRICE, 3000, COMBO_PRICE];
  const gelatinPayments = allPayments.filter((p) => VALID_PRICES.includes(p.transaction_amount || 0));
  cachedPayments = { data: gelatinPayments, fetchedAt: Date.now() };

  if (from || to) {
    return filterByDate(gelatinPayments, from, to);
  }
  return gelatinPayments;
}

function filterByDate(payments: MPPayment[], from?: string, to?: string): MPPayment[] {
  return payments.filter((p) => {
    const date = p.date_created ? new Date(p.date_created) : null;
    if (!date) return false;
    if (from && date < new Date(from)) return false;
    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      if (date > toDate) return false;
    }
    return true;
  });
}

export async function GET(request: Request) {
  const { authorized } = requireAdmin(request);
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const from = url.searchParams.get("from") || undefined;
    const to = url.searchParams.get("to") || undefined;

    const allPayments = await fetchAllPayments(from, to);
    const total = allPayments.length;
    const start = (page - 1) * limit;
    const paginated = allPayments.slice(start, start + limit);

    return NextResponse.json({
      payments: paginated,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}
