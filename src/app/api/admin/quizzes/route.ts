import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getQuizEntries } from "@/lib/quiz-storage";

export async function GET(request: Request) {
  const { authorized } = requireAdmin(request);
  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "20");
  const from = url.searchParams.get("from") || "";
  const to = url.searchParams.get("to") || "";

  let entries = getQuizEntries().reverse(); // newest first

  // Filter by date range
  if (from) {
    const fromDate = new Date(from);
    entries = entries.filter((e) => new Date(e.timestamp) >= fromDate);
  }
  if (to) {
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999);
    entries = entries.filter((e) => new Date(e.timestamp) <= toDate);
  }

  const total = entries.length;
  const start = (page - 1) * limit;
  const paginated = entries.slice(start, start + limit);

  return NextResponse.json({
    quizzes: paginated,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
