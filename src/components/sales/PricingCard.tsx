"use client";

import Button from "@/components/ui/Button";
import { PRICE, ORIGINAL_PRICE, PRODUCT_NAME } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

interface PricingCardProps {
  onCheckout: () => void;
  loading?: boolean;
}

export default function PricingCard({ onCheckout, loading }: PricingCardProps) {
  const discount = Math.round(((ORIGINAL_PRICE - PRICE) / ORIGINAL_PRICE) * 100);

  return (
    <div className="bg-white rounded-3xl border-2 border-pink-400 overflow-hidden shadow-xl shadow-pink-500/10">
      {/* Header badge */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 py-2 text-center">
        <p className="text-white text-sm font-bold uppercase tracking-wide">
          🔥 {discount}% de descuento — Solo hoy
        </p>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-900 text-center">
          {PRODUCT_NAME} — Plan Completo
        </h3>

        {/* Price */}
        <div className="text-center space-y-1">
          <p className="text-gray-400 line-through text-lg">
            {formatPrice(ORIGINAL_PRICE)}
          </p>
          <p className="text-4xl font-extrabold text-pink-600">
            {formatPrice(PRICE)} <span className="text-2xl font-bold">ARS 🇦🇷</span>
          </p>
          <p className="text-sm text-gray-500">Pago único — Sin suscripción</p>
        </div>

        {/* What's included */}
        <div className="space-y-2 pt-2">
          <p className="text-sm font-semibold text-gray-700">Incluye:</p>
          {[
            "Plan personalizado según tus respuestas",
            "Guía de preparación paso a paso",
            "Recetas complementarias",
            "Acceso al grupo de soporte",
            "Garantía de satisfacción 30 días",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5 shrink-0">✓</span>
              <span className="text-sm text-gray-600">{item}</span>
            </div>
          ))}
        </div>

        <Button onClick={onCheckout} pulse disabled={loading}>
          {loading ? "Procesando..." : "Obtener Mi Plan Ahora →"}
        </Button>

        {/* Trust signals */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span>🔒</span>
            <span>Pago seguro</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span>💳</span>
            <span>MercadoPago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
