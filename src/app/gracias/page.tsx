"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { trackPurchase } from "@/lib/analytics";
import { PRODUCT_NAME, PRICE } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { useQuizStore } from "@/store/quizStore";

function GraciasContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const isPending = status === "pending";

  const { name: storedName } = useQuizStore((state) => state.answers);
  const [payerName, setPayerName] = useState<string | null>(null);

  useEffect(() => {
    // Mercado Pago passes either payment_id or collection_id depending on the flow
    const paymentId = searchParams.get("payment_id") || searchParams.get("collection_id");

    // 1. Track Purchase in Analytics (Client-side)
    if (!isPending) {
      trackPurchase(PRICE);
    }

    // 2. Verify Payment and Trigger Automated Email using Mercado Pago data
    if (!isPending && paymentId) {
      fetch(`/api/checkout/verify?payment_id=${paymentId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log("Payment verified and email sent to:", data.email);
            if (data.name) setPayerName(data.name);
          }
        })
        .catch(err => console.error("Verification failed:", err));
    }
  }, [isPending, searchParams]);

  const displayName = payerName || storedName || "Cliente";

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
    <div className="min-h-dvh bg-gradient-to-b from-pink-50 to-white pb-12">
      {/* Hero Section */}
      <div className="bg-white border-b border-pink-100 py-12 px-4 shadow-sm shadow-pink-500/5">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-pink-100 flex items-center justify-center animate-bounce">
            <span className="text-4xl text-pink-600">{isPending ? "⏳" : "🎉"}</span>
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {isPending ? "Procesando tu pago..." : "¡Tu transformación empieza hoy!"}
          </h1>

          <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
            {isPending
              ? "Estamos confirmando tu pago. En unos minutos tendrás acceso a todo tu material."
              : `¡Felicitaciones por dar el primer paso! Ya tenés acceso a todo tu material de ${PRODUCT_NAME}.`}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-12 space-y-12">
        {!isPending && (
          <>
            {/* Main Featured Plan */}
            <div className="bg-white rounded-[2.5rem] p-8 border-2 border-pink-500 shadow-2xl shadow-pink-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <span className="bg-pink-100 text-pink-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Recurso Principal
                </span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="text-6xl md:text-7xl">⚖️</div>
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                      GELATINA FIT - PLAN PERSONALIZADO
                    </h2>
                    <p className="text-gray-500 text-lg">Tu guía central y el corazón de tu transformación.</p>
                  </div>
                  <Button
                    onClick={() => window.open("https://drive.google.com/file/d/1MBymg4lpZxusqHOnnAci22qOPcuKJBMW/view?usp=sharing", "_blank")}
                    className="w-full md:w-auto px-12 py-4 text-lg"
                    pulse
                  >
                    ABRIR PLAN PRINCIPAL →
                  </Button>
                </div>
              </div>
            </div>

            {/* Other Resources Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 shadow-sm">
                  <span className="text-xl">📚</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Guías Complementarias</h2>
                  <p className="text-gray-500">Material extra para potenciar tus resultados</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Recetas Detox para Deshinchar",
                    desc: "Para deshinchar y desinflamar eficazmente",
                    icon: "🥣",
                    link: "https://drive.google.com/file/d/1vanSRfPEbajxH6LG9lQsiVuK1CTLq_iW/view?usp=sharing",
                  },
                  {
                    title: "DIETA DETOX 21 DIAS",
                    desc: "Plan intensivo de limpieza profunda",
                    icon: "📅",
                    link: "https://drive.google.com/file/d/1HpzCMBvvjHl4B_7N0CZTTELm2KdbwdtD/view?usp=sharing",
                  },
                  {
                    title: "JUGOS Y ENERGIZANTES NATURALES",
                    desc: "Energía natural de frutas y verduras",
                    icon: "🥤",
                    link: "https://drive.google.com/file/d/18iwxPDZfdpl_fTCVsWEJypKljvIEa7Bv/view?usp=sharing",
                  },
                  {
                    title: "DIETA ANTIINFLAMATORIA",
                    desc: "Guía para reducir dolor e inflamación",
                    icon: "🦴",
                    link: "https://drive.google.com/file/d/1iC8L8Mxo_cg7qTFbDjD0HR9rUxt0e-63/view?usp=sharing",
                  },
                  {
                    title: "DETOX PARA CAMBIAR TU VIDA",
                    desc: "Transformación mental y hábitos",
                    icon: "✨",
                    link: "https://drive.google.com/file/d/1oQ5-Jt7R04T2Rej8VE4_iRawlhOaiR3Z/view?usp=sharing",
                  },
                  {
                    title: "DETOX CON MED",
                    desc: "Metodología avanzada de salud",
                    icon: "🏥",
                    link: "https://drive.google.com/file/d/1pCgsOXtE68JiUxcc8sw-dUUhOkFGjQCc/view?usp=sharing",
                  },
                  {
                    title: "21 JUGOS DETOX",
                    desc: "Una opción refrescante para cada día",
                    icon: "🍹",
                    link: "https://drive.google.com/file/d/1Ney9M-NpEPjKpDlBtoeBzDh1XL3kFAYj/view?usp=sharing",
                  },
                  {
                    title: "21 JUGOS DETOX PARA PERDER PESO",
                    desc: "Fórmulas específicas para quemar grasa",
                    icon: "🔥",
                    link: "https://drive.google.com/file/d/1zOWjEAcjivrJY2b4uossH0dLRjBwSa1n/view?usp=sharing",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group bg-white rounded-3xl p-6 border border-pink-100 hover:border-pink-300 transition-all hover:shadow-xl hover:shadow-pink-500/10 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="text-3xl">{item.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                    <Button onClick={() => window.open(item.link, "_blank")} variant="outline" className="w-full border-pink-200 text-pink-600 hover:bg-pink-50">
                      Abrir PDF →
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps / Dashboard Info */}
            <div className="bg-pink-600 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden relative shadow-2xl shadow-pink-500/40">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-extrabold leading-tight">
                    ¿Qué tenés que hacer ahora?
                  </h2>
                  <div className="space-y-4">
                    {[
                      "Revisá tu email (spam incluido) para el comprobante",
                      "Descargá todos tus PDFs arriba",
                      "Unite a nuestra comunidad en Instagram",
                      "Mañana recibís tu primer tip por email",
                    ].map((step, i) => (
                      <div key={step} className="flex items-start gap-4">
                        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-pink-50/90 font-medium">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 text-center space-y-4">
                  <div className="text-4xl">💬</div>
                  <h3 className="text-xl font-bold">¿Necesitás ayuda?</h3>
                  <p className="text-pink-50 text-sm">
                    Nuestro equipo de soporte está listo para acompañarte. Escribinos a:
                    <br />
                    <span className="font-bold underline">gelatinafitdetox@gmail.com</span>
                  </p>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-pink-600 w-full"
                    onClick={() => window.location.href = "mailto:gelatinafitdetox@gmail.com"}
                  >
                    Enviar Email de Soporte
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="text-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="text-gray-400 hover:text-pink-600 transition-colors text-sm font-medium"
          >
            ← Volver al inicio de {PRODUCT_NAME}
          </button>
        </div>
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
