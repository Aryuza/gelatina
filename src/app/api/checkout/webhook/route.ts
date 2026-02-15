import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { getMercadoPagoClient } from "@/lib/mercadopago";
import { sendDeliveryEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const body = await request.json().catch(() => ({}));

        const topic = searchParams.get("topic") || searchParams.get("type") || body.type;
        const paymentId = searchParams.get("id") || searchParams.get("data.id") || body.data?.id || body.id;

        console.log("Webhook received:", { topic, paymentId, action: body.action });

        // Mercado Pago sends different notification types. We care about 'payment'
        if (topic === "payment") {
            if (!paymentId) {
                console.warn("Webhook: Missing paymentId in payload");
                return NextResponse.json({ message: "No payment ID found" }, { status: 200 });
            }

            const client = getMercadoPagoClient();
            const payment = new Payment(client);

            const result = await payment.get({ id: String(paymentId) });

            console.log("Webhook Payment Status:", result.status, result.status_detail);

            const email = result.payer?.email;
            const firstName = result.payer?.first_name || result.payer?.email?.split('@')[0] || "Cliente";

            if ((result.status === "approved" || result.status === "authorized") && email) {
                console.log("Webhook: Payment approved. Sending email to:", email);
                await sendDeliveryEmail(email, firstName);
            }
        }

        // Always respond with 200 to Mercado Pago
        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error: any) {
        console.error("Webhook error:", error);
        // Still respond 200 to avoid MP retrying infinitely if it's a code error
        return NextResponse.json({ error: error.message }, { status: 200 });
    }
}
