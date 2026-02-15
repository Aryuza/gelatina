import { NextRequest, NextResponse } from "next/server";
import { sendDeliveryEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
    try {
        const { email, name } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // This would ideally be called after a successful payment verification
        // or triggered by a webhook from Mercado Pago.
        await sendDeliveryEmail(email, name || "Cliente");

        return NextResponse.json({ message: "Delivery email sent successfully" });
    } catch (error: any) {
        console.error("Email notification error:", error);
        return NextResponse.json(
            { error: "Failed to send delivery email", details: error.message },
            { status: 500 }
        );
    }
}
