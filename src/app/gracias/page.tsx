"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackPurchase } from "@/lib/analytics";
import { PRODUCT_NAME, PRICE } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { Suspense } from "react";

function GraciasContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const isPending = status === "pending";

  useEffect(() => {
    if (!isPending) {
      trackPurchase(PRICE);
    }
  }, [isPending]);

  // Simple confetti effect
  useEffect(() => {
    if (isPending) return;
    const colors = ["#ec4899", "#f472b6", "#f9a8d4", "#fce7f3", "#fbbf24"];
    const confetti: HTMLDivElement[] = [];

    for (let i = 0; i < 50; i++) {
      const el = document.createElement("div");
      el.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        top: -10px;
        left: ${Math.random() * 100}%;
        border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
        z-index: 9999;
        pointer-events: none;
        animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
      `;
      document.body.appendChild(el);
      confetti.push(el);
    }

    const style = document.createElement("style");
    style.textContent = `
      @keyframes confetti-fall {
        to {
          transform: translateY(100vh) rotate(${360 + Math.random() * 360}deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      confetti.forEach((el) => el.remove());
      style.remove();
    };
  }, [isPending]);

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-4xl">{isPending ? "⏳" : "🎉"}</span>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900">
          {isPending ? "¡Pago en proceso!" : "¡Felicitaciones!"}
        </h1>

        {isPending ? (
          <p className="text-gray-600 leading-relaxed">
            Tu pago está siendo procesado. Apenas se confirme, vas a recibir un
            email con toda la información de tu plan personalizado.
          </p>
        ) : (
          <>
            <p className="text-gray-600 leading-relaxed">
              Tu compra de <strong>{PRODUCT_NAME}</strong> fue exitosa.
              En los próximos minutos vas a recibir un email con todo lo que
              necesitás para empezar tu transformación.
            </p>

            <div className="bg-white rounded-2xl p-5 border border-pink-100 space-y-3 text-left">
              <h3 className="font-bold text-gray-800">Próximos pasos:</h3>
              <div className="space-y-2">
                {[
                  "Revisá tu email (incluido spam) para las instrucciones",
                  "Descargá tu plan personalizado",
                  "Preparate para tu primera gelatina",
                  "¡Empezá a ver resultados en la primera semana!",
                ].map((step, i) => (
                  <div key={step} className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold shrink-0">
                      {i + 1}.
                    </span>
                    <span className="text-sm text-gray-600">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Button onClick={() => (window.location.href = "/")}>
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}

export default function GraciasPage() {
  return (
    <Suspense>
      <GraciasContent />
    </Suspense>
  );
}
