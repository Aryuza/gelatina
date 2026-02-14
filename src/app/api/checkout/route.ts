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

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    console.log("DEBUG: MP SiteUrl:", siteUrl);

    const result = await preference.create({
      body: {
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
          pending: `${siteUrl}/gracias`,
        },
        statement_descriptor: "GELATINA FIT",
      },
    });

    return NextResponse.json({
      init_point: result.init_point,
      id: result.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Error creating payment preference" },
      { status: 500 }
    );
  }
}
