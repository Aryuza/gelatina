"use client";

import Button from "@/components/ui/Button";
import {
  PRICE,
  ORIGINAL_PRICE,
  PRODUCT_NAME,
  TEA_NAME,
  COMBO_PRICE,
  COMBO_ORIGINAL_PRICE,
  COMBO_DELIVERABLES,
} from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

interface PricingCardProps {
  onCheckout: (plan: "basico" | "acelerado") => void;
  loading?: boolean;
}

export default function PricingCard({ onCheckout, loading }: PricingCardProps) {
  const basicDiscount = Math.round(
    ((ORIGINAL_PRICE - PRICE) / ORIGINAL_PRICE) * 100
  );
  const comboSaving = COMBO_ORIGINAL_PRICE - COMBO_PRICE;

  return (
    <div className="space-y-4">
      {/* Plan Básico */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md">
        <div className="bg-gray-100 py-2 text-center">
          <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">
            Plan Básico
          </p>
        </div>
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-bold text-gray-900 text-center">
            {PRODUCT_NAME}
          </h3>

          <div className="text-center space-y-1">
            <p className="text-gray-400 line-through text-base">
              {formatPrice(ORIGINAL_PRICE)}
            </p>
            <p className="text-3xl font-extrabold text-gray-800">
              {formatPrice(PRICE)}{" "}
              <span className="text-lg font-bold">ARS</span>
            </p>
            <p className="text-xs text-gray-500">
              {basicDiscount}% OFF — Pago único
            </p>
          </div>

          <div className="space-y-1.5 pt-1">
            {[
              "Plan personalizado según tus respuestas",
              "Guía de preparación paso a paso",
              "Recetas complementarias",
              "Garantía de satisfacción 30 días",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5 shrink-0 text-sm">
                  ✓
                </span>
                <span className="text-sm text-gray-600">{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => onCheckout("basico")}
            disabled={loading}
            className="w-full bg-gray-800 text-white font-bold py-3 rounded-xl hover:bg-gray-700 active:scale-[0.97] transition-all disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Elegir Plan Básico →"}
          </button>
        </div>
      </div>

      {/* Plan Acelerado (DESTACADO) */}
      <div id="plan-acelerado" className="bg-white rounded-3xl border-[3px] border-pink-500 overflow-hidden shadow-2xl shadow-pink-500/20 relative">
        {/* Badge */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 py-2.5 text-center">
          <p className="text-white text-sm font-bold uppercase tracking-wide">
            MEJOR OFERTA 🔥
          </p>
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-900 text-center">
            {PRODUCT_NAME} + {TEA_NAME}
          </h3>

          {/* Price */}
          <div className="text-center space-y-1">
            <p className="text-gray-400 line-through text-lg">
              {formatPrice(COMBO_ORIGINAL_PRICE)}
            </p>
            <p className="text-4xl font-extrabold text-pink-600">
              {formatPrice(COMBO_PRICE)}{" "}
              <span className="text-2xl font-bold">ARS 🇦🇷</span>
            </p>
            <p className="text-sm text-green-600 font-semibold">
              Ahorrás {formatPrice(comboSaving)}
            </p>
            <p className="text-xs text-gray-500">Pago único — Sin suscripción</p>
          </div>

          {/* Deliverables */}
          <div className="space-y-2 pt-2">
            <p className="text-sm font-semibold text-gray-700">
              Todo del Plan Básico + 7 bonus exclusivos:
            </p>
            {/* Té Mounjaro highlighted first */}
            {COMBO_DELIVERABLES.filter((d) => d.highlighted).map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 bg-pink-50 -mx-2 px-2 py-2 rounded-lg border-2 border-pink-400"
              >
                <span className="text-lg shrink-0">{item.icon}</span>
                <span className="text-sm text-pink-700 font-bold flex-1">
                  {item.name} 🔥
                </span>
                <span className="bg-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                  Premium
                </span>
              </div>
            ))}
            {/* Rest */}
            {COMBO_DELIVERABLES.filter((d) => !d.highlighted).map((item) => (
              <div key={item.name} className="flex items-start gap-2">
                <span className="mt-0.5 shrink-0">{item.icon}</span>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={() => onCheckout("acelerado")}
            pulse
            disabled={loading}
          >
            {loading ? "Procesando..." : "Obtener Plan Acelerado 🔥"}
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
    </div>
  );
}
