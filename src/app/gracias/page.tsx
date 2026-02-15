"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackPurchase } from "@/lib/analytics";
import { PRODUCT_NAME, PRICE } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { Suspense } from "react";
import { useQuizStore } from "@/store/quizStore";

function GraciasContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const isPending = status === "pending";

  const { name } = useQuizStore((state) => state.answers);

  useEffect(() => {
    if (!isPending) {
      trackPurchase(PRICE);

      // Trigger delivery email
      fetch("/api/notify-purchase", {
        method: "POST",
        body: JSON.stringify({
          name: name || "Cliente",
          email: "gelatinafitdetox@gmail.com"
        }),
      }).catch(err => console.error("Notification trigger failed", err));
    }
  }, [isPending, name]);

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
            {/* Download Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
                  <span className="text-xl">👇</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Tu Plan Personalizado</h2>
                  <p className="text-gray-500">Descargá tus guías y empezá tu cambio ahora</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Plan Personalizado",
                    desc: "Tu guía central de Gelatina Fit",
                    icon: "⚖️",
                    link: "https://drive.google.com/file/d/18iwxPDZfdpl_fTCVsWEJypKljvIEa7Bv/view?usp=sharing",
                  },
                  {
                    title: "Recetas Detox",
                    desc: "Para deshinchar y desinflamar",
                    icon: "🥣",
                    link: "https://drive.google.com/file/d/1vanSRfPEbajxH6LG9lQsiVuK1CTLq_iW/view?usp=sharing",
                  },
                  {
                    title: "Dieta Detox 21 Días",
                    desc: "Plan intensivo de limpieza",
                    icon: "📅",
                    link: "https://drive.google.com/file/d/1HpzCMBvvjHl4B_7N0CZTTELm2KdbwdtD/view?usp=sharing",
                  },
                  {
                    title: "Jugos y Energizantes",
                    desc: "Energía natural cada mañana",
                    icon: "🥤",
                    link: "https://drive.google.com/file/d/18iwxPDZfdpl_fTCVsWEJypKljvIEa7Bv/view?usp=sharing",
                  },
                  {
                    title: "Antiinflamatoria",
                    desc: "Guía para reducir la inflamación",
                    icon: "🦴",
                    link: "https://drive.google.com/file/d/1iC8L8Mxo_cg7qTFbDjD0HR9rUxt0e-63/view?usp=sharing",
                  },
                  {
                    title: "Cambiar tu Vida",
                    desc: "Mindset y hábitos saludables",
                    icon: "✨",
                    link: "https://drive.google.com/file/d/1oQ5-Jt7R04T2Rej8VE4_iRawlhOaiR3Z/view?usp=sharing",
                  },
                  {
                    title: "Detox con MED",
                    desc: "Metodología avanzada",
                    icon: "🏥",
                    link: "https://drive.google.com/file/d/1pCgsOXtE68JiUxcc8sw-dUUhOkFGjQCc/view?usp=sharing",
                  },
                  {
                    title: "21 Jugos Detox",
                    desc: "Variedad para cada día",
                    icon: "🍹",
                    link: "https://drive.google.com/file/d/1Ney9M-NpEPjKpDlBtoeBzDh1XL3kFAYj/view?usp=sharing",
                  },
                  {
                    title: "Jugos para Perder Peso",
                    desc: "Específicos para quemar grasa",
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
