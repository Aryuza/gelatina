"use client";

import { PRICE } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

interface StickyCheckoutBarProps {
  onCheckout: () => void;
  loading?: boolean;
}

export default function StickyCheckoutBar({ onCheckout, loading }: StickyCheckoutBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white sticky-shadow">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-xs text-gray-500 line-through">$9.999</p>
          <p className="text-xl font-extrabold text-pink-600">{formatPrice(PRICE)}</p>
        </div>
        <button
          onClick={onCheckout}
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-3 px-5 rounded-xl animate-pulse-pink active:scale-[0.97] transition-transform disabled:opacity-50"
        >
          {loading ? "..." : "Obtener Plan →"}
        </button>
      </div>
    </div>
  );
}
