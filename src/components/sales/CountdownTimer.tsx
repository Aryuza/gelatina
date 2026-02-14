"use client";

import { useCountdown } from "@/hooks/useCountdown";

export default function CountdownTimer() {
  const { formatted, isExpired } = useCountdown(15);

  if (isExpired) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
        <p className="text-sm text-red-600 font-semibold">
          ⏰ ¡Tu oferta especial expiró! Pero aún podés obtener el precio promocional.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-pink-600 to-pink-500 rounded-xl p-4 text-center text-white">
      <p className="text-xs font-medium uppercase tracking-wide opacity-90">
        Oferta especial expira en
      </p>
      <p className="text-3xl font-bold tracking-wider mt-1 animate-flash">
        {formatted}
      </p>
      <p className="text-xs opacity-80 mt-1">
        Después de este tiempo, el precio vuelve a $9.999
      </p>
    </div>
  );
}
