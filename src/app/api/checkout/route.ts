import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import { getMercadoPagoClient } from "@/lib/mercadopago";
import { PRODUCT_NAME, PRICE } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    const client = getMercadoPagoClient();
    const preference = new Preference(client);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gelatina-delta.vercel.app";

    const preferenceBody: Record<string, unknown> = {
      items: [
        {
          id: "gelatina-fit-plan",
          title: `${PRODUCT_NAME} - Plan Personalizado${name ? ` para ${name}` : ""}`,
          quantity: 1,
          unit_price: Number(PRICE),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: `${siteUrl}/gracias`,
        failure: `${siteUrl}/?payment=failure`,
        pending: `${siteUrl}/gracias?status=pending`,
      },
      statement_descriptor: "GELATINA FIT",
    };

    // auto_return only works with HTTPS URLs (not localhost)
    if (siteUrl.startsWith("https://")) {
      preferenceBody.auto_return = "approved";
    }

    const result = await preference.create({
      body: preferenceBody,
    });

    return NextResponse.json({
      init_point: result.init_point,
      id: result.id,
    });
  } catch (error: unknown) {
    const err = error as { message?: string; stack?: string; response?: { data?: unknown } };
    console.error("Checkout error:", {
      message: err.message,
      response: err.response?.data || err.response,
    });
    return NextResponse.json(
      {
        error: "Error creating payment preference",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
