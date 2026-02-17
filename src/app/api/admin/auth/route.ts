import { NextResponse } from "next/server";
import { validateAdminPassword } from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    if (validateAdminPassword(password)) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
