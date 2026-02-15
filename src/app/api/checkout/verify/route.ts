import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { getMercadoPagoClient } from "@/lib/mercadopago";
import { sendDeliveryEmail } from "@/lib/email";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const paymentId = searchParams.get("payment_id");

        if (!paymentId) {
            return NextResponse.json({ error: "Missing payment_id" }, { status: 400 });
        }

        const client = getMercadoPagoClient();
        const payment = new Payment(client);

        // Fetch payment details from Mercado Pago
        console.log("Verifying payment with ID:", paymentId);
        const result = await payment.get({ id: paymentId });

        // Log the whole status for debugging
        console.log("MP Payment Status:", result.status, result.status_detail);

        const email = result.payer?.email;
        const firstName = result.payer?.first_name || result.payer?.email?.split('@')[0] || "Cliente";

        if ((result.status === "approved" || result.status === "authorized") && email) {
            console.log("Payment approved. Sending email to:", email);
            // Trigger delivery email
            await sendDeliveryEmail(email, firstName);

            return NextResponse.json({
                success: true,
                email,
                name: firstName,
                status: result.status
            });
        }

        console.warn("Payment not approved or email missing:", { status: result.status, email });
        return NextResponse.json({
            success: false,
            status: result.status,
            message: "Payment not approved yet or missing email"
        });

    } catch (error: any) {
        console.error("Payment verification error:", error);
        return NextResponse.json(
            { error: "Error verifying payment", details: error.message },
            { status: 500 }
        );
    }
}
