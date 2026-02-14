import { MercadoPagoConfig } from "mercadopago";

export function getMercadoPagoClient() {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("MERCADOPAGO_ACCESS_TOKEN is not set");
  }

  return new MercadoPagoConfig({ accessToken });
}
