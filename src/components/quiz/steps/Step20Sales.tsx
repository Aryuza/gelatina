"use client";

import { useState } from "react";
import Image from "next/image";
import { ALL_DELIVERABLES } from "@/lib/constants";
import { useQuizStore } from "@/store/quizStore";
import { trackBeginCheckout } from "@/lib/analytics";
import { PRODUCT_NAME, PRICE, COMBO_PRICE, NUTRITIONIST, NUTRITIONIST_LICENSE } from "@/lib/constants";
import CountdownTimer from "@/components/sales/CountdownTimer";
import PricingCard from "@/components/sales/PricingCard";
import BonusSection from "@/components/sales/BonusSection";
import GuaranteeSection from "@/components/sales/GuaranteeSection";
import ComparisonTable from "@/components/sales/ComparisonTable";
import FAQAccordion from "@/components/sales/FAQAccordion";
import TestimonialCarousel from "@/components/sales/TestimonialCarousel";
import PersonalizedResults from "@/components/sales/PersonalizedResults";
import LivePurchaseToast from "@/components/sales/LivePurchaseToast";

function scrollToPricing() {
  const el = document.getElementById("plan-acelerado");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
}

interface CtaButtonProps {
  label: string;
  sublabel?: string;
  onClick: () => void;
  loading?: boolean;
  variant?: "primary" | "secondary";
}

function CtaButton({ label, sublabel, onClick, loading, variant = "primary" }: CtaButtonProps) {
  const hasArrow = label.endsWith("→");
  const labelText = hasArrow ? label.slice(0, -1).trimEnd() : label;

  if (variant === "secondary") {
    return (
      <div className="animate-breathe">
        <button
          onClick={onClick}
          disabled={loading}
          className="w-full relative overflow-hidden border-2 border-pink-500 text-pink-600 font-bold py-3.5 rounded-2xl hover:bg-pink-50 active:scale-[0.97] transition-all text-base disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center justify-center gap-1.5">
            <span>{labelText}</span>
            {hasArrow && <span className="animate-nudge inline-block">→</span>}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="animate-breathe">
      <button
        onClick={onClick}
        disabled={loading}
        className="w-full relative overflow-hidden bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-pink-500/40 hover:from-pink-600 hover:to-pink-700 active:scale-[0.97] transition-all text-base disabled:opacity-50 animate-pulse-pink"
      >
        <span aria-hidden="true" className="animate-shimmer absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
        <span className="relative z-10 flex flex-col items-center">
          <span className="flex items-center gap-1.5">
            <span>{labelText}</span>
            {hasArrow && <span className="animate-nudge inline-block">→</span>}
          </span>
          {sublabel && (
            <span className="text-xs font-normal opacity-80 mt-0.5">{sublabel}</span>
          )}
        </span>
      </button>
    </div>
  );
}

function DeliveryBadge() {
  return (
    <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-xl py-2.5 px-4">
      <span className="text-lg">📧</span>
      <p className="text-sm text-green-700 font-medium">
        Lo recibís <strong>al instante</strong> en tu email
      </p>
    </div>
  );
}

export default function Step20Sales() {
  const { answers, bmiResult } = useQuizStore();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (plan: "basico" | "acelerado" = "acelerado") => {
    setLoading(true);
    const price = plan === "acelerado" ? COMBO_PRICE : PRICE;
    trackBeginCheckout(price);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: answers.name, email: "", plan }),
      });

      const data = await res.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Error al procesar el pago. Intentá de nuevo.");
        setLoading(false);
      }
    } catch {
      alert("Error de conexión. Intentá de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-24">

      {/* 1. PERSONALIZED AI RESULTS */}
      <PersonalizedResults />

      {/* 2. HERO */}
      <div className="text-center space-y-3">
        <p className="text-sm font-semibold text-pink-500 uppercase tracking-wide">
          ✅ Análisis completado — Tu plan está listo
        </p>
        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
          {answers.name ? `${answers.name}, ` : ""}tu camino para bajar{" "}
          <span className="text-pink-600">{bmiResult?.weightToLose || 10} kg</span>{" "}
          empieza hoy
        </h2>
        <p className="text-gray-600">
          Con {PRODUCT_NAME} podés alcanzar tu meta en{" "}
          <strong>{bmiResult?.timeEstimate || "semanas"}</strong>
        </p>
      </div>

      {/* 3. SOCIAL PROOF NUMBER — temprano, baja la guardia */}
      <div className="bg-white rounded-2xl border border-pink-100 p-4">
        <div className="flex items-center justify-around">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-pink-600">+2.000</p>
            <p className="text-xs text-gray-500 mt-0.5">mujeres que ya<br/>lo probaron</p>
          </div>
          <div className="w-px h-10 bg-gray-100" />
          <div className="text-center">
            <p className="text-2xl font-extrabold text-pink-600">⭐ 4.9</p>
            <p className="text-xs text-gray-500 mt-0.5">calificación<br/>promedio</p>
          </div>
          <div className="w-px h-10 bg-gray-100" />
          <div className="text-center">
            <p className="text-2xl font-extrabold text-pink-600">30 días</p>
            <p className="text-xs text-gray-500 mt-0.5">garantía de<br/>devolución</p>
          </div>
        </div>
      </div>

      {/* 4. COUNTDOWN */}
      <CountdownTimer />

      {/* 5. CTA #1 + entrega inmediata */}
      <div className="space-y-3">
        <CtaButton
          label="Quiero mi plan personalizado →"
          sublabel="Acceso inmediato · Garantía 30 días"
          onClick={scrollToPricing}
        />
        <DeliveryBadge />
      </div>

      {/* 6. "ESTO ES PARA VOS SI..." — identificación */}
      <div className="space-y-3">
        <div className="text-center">
          <p className="text-xs font-bold text-pink-500 uppercase tracking-wide">Esto es para vos si...</p>
          <h3 className="text-xl font-bold text-gray-900 mt-1">Te sentís identificada con algo de esto</h3>
        </div>
        <div className="space-y-2">
          {[
            { icon: "😔", text: "Probaste dietas y siempre terminás abandonándolas" },
            { icon: "😩", text: "Tenés ansiedad por la comida y no podés controlarlo" },
            { icon: "💧", text: "Te sentís hinchada y con retención de líquidos todo el tiempo" },
            { icon: "⚡", text: "Te falta energía y te cansás más de lo normal" },
            { icon: "👗", text: "Querés sentirte cómoda con tu cuerpo y volverte a poner esa ropa" },
            { icon: "⏰", text: "No tenés tiempo para rutinas complicadas ni horarios estrictos" },
          ].map((item) => (
            <div key={item.text} className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 border border-pink-100">
              <span className="text-xl shrink-0">{item.icon}</span>
              <span className="text-sm text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm font-semibold text-pink-600">
          Si marcaste aunque sea una → {PRODUCT_NAME} es para vos.
        </p>
      </div>

      {/* 7. PRODUCT SHOWCASE */}
      <div className="bg-white rounded-2xl p-5 border border-pink-100 space-y-4">
        <div className="flex items-center gap-4">
          <Image
            src="/images/nutricionista.png"
            alt={NUTRITIONIST}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover shrink-0"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{PRODUCT_NAME}</h3>
            <p className="text-sm text-gray-500">
              Formulado por {NUTRITIONIST} ({NUTRITIONIST_LICENSE})
            </p>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { icon: "🔥", text: "Despertás más liviana desde la primera semana" },
            { icon: "🍽️", text: "La ansiedad por la comida desaparece en días" },
            { icon: "💧", text: "Reduce la hinchazón y la retención de líquidos" },
            { icon: "✨", text: "Mejora la firmeza de tu piel con colágeno hidrolizado" },
            { icon: "⚡", text: "Más energía sin estimulantes ni químicos agresivos" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <span className="text-xl shrink-0">{item.icon}</span>
              <span className="text-sm text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 8. HOW IT WORKS */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900 text-center">¿Cómo funciona?</h3>
        <div className="space-y-3">
          {[
            { step: "1", title: "Preparala", desc: "Disolvé un sobre en agua caliente y ponelo en la heladera" },
            { step: "2", title: "Disfrutala", desc: "Comé tu gelatina como snack saludable cada día" },
            { step: "3", title: "Transformate", desc: "Tu cuerpo empieza a cambiar en los primeros 7 a 14 días" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-pink-100">
              <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {item.step}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. CTA #2 */}
      <div className="space-y-3">
        <CtaButton
          label="Empezar mi transformación →"
          sublabel="Solo por hoy · $3.900 ARS"
          onClick={scrollToPricing}
        />
        <DeliveryBadge />
      </div>

      {/* 10. COMPARISON */}
      <ComparisonTable />

      {/* 11. CTA #3 */}
      <CtaButton
        label="Obtener mi plan ahora →"
        sublabel="Pago único · Sin suscripción"
        onClick={scrollToPricing}
        variant="secondary"
      />

      {/* 12. "Y NO ES TODO..." — transición a bonuses */}
      <div className="text-center space-y-1 pt-2">
        <p className="text-2xl font-extrabold text-gray-900">Y no es todo...</p>
        <p className="text-pink-600 font-semibold">También vas a recibir esto:</p>
      </div>

      {/* 13. BONUSES */}
      <BonusSection />

      {/* 14. DELIVERABLES — todo el valor acumulado */}
      <div className="space-y-5">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-extrabold text-gray-900">
            Esto es todo lo que vas a recibir
          </h3>
          <p className="text-sm text-gray-500">Acceso inmediato después de tu compra</p>
        </div>
        <div className="space-y-2">
          {ALL_DELIVERABLES.map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-3 rounded-xl p-2.5 ${
                item.highlighted
                  ? "bg-gradient-to-r from-pink-100 to-pink-50 border-2 border-pink-500 shadow-md shadow-pink-500/10"
                  : item.main
                  ? "bg-gradient-to-r from-pink-50 to-white border-2 border-pink-400"
                  : "bg-white border border-gray-100"
              }`}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={44}
                height={56}
                className="w-11 h-14 object-cover rounded-md shrink-0 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm leading-tight ${
                  item.highlighted ? "text-pink-700" : item.main ? "text-gray-900 font-bold" : "text-gray-800"
                }`}>
                  {item.name}
                </p>
              </div>
              {item.highlighted ? (
                <span className="bg-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase shrink-0">Premium</span>
              ) : (
                <span className="text-green-500 shrink-0 text-sm">✓</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400">
          Son {ALL_DELIVERABLES.length} recursos que recibís de forma inmediata
        </p>
      </div>

      {/* 15. CTA #4 */}
      <div className="space-y-3">
        <CtaButton
          label="Quiero todo esto por $3.900 →"
          sublabel="+ Garantía de devolución 30 días"
          onClick={scrollToPricing}
        />
        <DeliveryBadge />
      </div>

      {/* 16. SCARCITY — cupos limitados */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <span className="text-xl shrink-0">⚠️</span>
        <div>
          <p className="text-sm font-bold text-amber-800">Oferta disponible para pocas personas</p>
          <p className="text-xs text-amber-700 mt-0.5">
            Estamos recibiendo muchas compras hoy. El precio de $3.900 puede actualizarse en cualquier momento.
          </p>
        </div>
      </div>

      {/* 17. PRICING CARD — precio aparece con el máximo valor acumulado */}
      <PricingCard onCheckout={handleCheckout} loading={loading} />

      {/* 18. GUARANTEE */}
      <GuaranteeSection />

      {/* 19. CTA #5 */}
      <div className="space-y-3">
        <CtaButton
          label="Comprar sin riesgo →"
          sublabel="30 días de garantía · Devolución total"
          onClick={() => handleCheckout("acelerado")}
          loading={loading}
        />
        <DeliveryBadge />
      </div>

      {/* 20. TESTIMONIALS — al final, empujón final para quienes dudan */}
      <TestimonialCarousel />

      {/* 21. FAQ */}
      <FAQAccordion />

      {/* 22. CTA FINAL */}
      <div className="space-y-3">
        <CtaButton
          label="Sí, quiero mi plan personalizado →"
          sublabel="$3.900 ARS · Pago único · Sin suscripción"
          onClick={() => handleCheckout("acelerado")}
          loading={loading}
        />
        <DeliveryBadge />
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-400">
          Al comprar aceptás nuestros{" "}
          <a href="/terminos" className="underline">términos</a> y{" "}
          <a href="/privacidad" className="underline">política de privacidad</a>
        </p>
      </div>

      <LivePurchaseToast />
    </div>
  );
}
