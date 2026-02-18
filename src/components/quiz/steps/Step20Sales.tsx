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
import StickyCheckoutBar from "@/components/sales/StickyCheckoutBar";
import PersonalizedResults from "@/components/sales/PersonalizedResults";
import LivePurchaseToast from "@/components/sales/LivePurchaseToast";

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
        body: JSON.stringify({
          name: answers.name,
          email: "",
          plan,
        }),
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
      {/* Personalized AI results */}
      <PersonalizedResults />

      {/* Hero section */}
      <div className="text-center space-y-3">
        <p className="text-sm font-semibold text-pink-500 uppercase tracking-wide">
          Tu plan personalizado está listo
        </p>
        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
          {answers.name ? `${answers.name}, ` : ""}tu camino para bajar{" "}
          <span className="text-pink-600">
            {bmiResult?.weightToLose || 10} kg
          </span>{" "}
          empieza hoy
        </h2>
        <p className="text-gray-600">
          Con {PRODUCT_NAME} podés alcanzar tu meta en{" "}
          <strong>{bmiResult?.timeEstimate || "semanas"}</strong>
        </p>
      </div>

      {/* Countdown */}
      <CountdownTimer />

      {/* Product showcase */}
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
            { icon: "🔥", text: "Acelera tu metabolismo de forma natural" },
            { icon: "🍽️", text: "Elimina la ansiedad por comer entre horas" },
            { icon: "💧", text: "Reduce la retención de líquidos e hinchazón" },
            { icon: "✨", text: "Mejora la firmeza de tu piel con colágeno" },
            { icon: "⚡", text: "Te da más energía durante todo el día" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <span className="text-xl shrink-0">{item.icon}</span>
              <span className="text-sm text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900 text-center">
          ¿Cómo funciona?
        </h3>
        <div className="space-y-3">
          {[
            { step: "1", title: "Preparala", desc: "Disolvé un sobre en agua caliente y ponelo en la heladera" },
            { step: "2", title: "Disfrutala", desc: "Comé tu gelatina como snack saludable cada día" },
            { step: "3", title: "Transformate", desc: "Mirá cómo tu cuerpo empieza a cambiar en semanas" },
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

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Comparison */}
      <ComparisonTable />

      {/* Bonuses */}
      <BonusSection />

      {/* Pricing */}
      <PricingCard onCheckout={handleCheckout} loading={loading} />

      {/* What you receive */}
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
                <span className="bg-pink-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase shrink-0">
                  Premium
                </span>
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

      {/* Guarantee */}
      <GuaranteeSection />

      {/* FAQ */}
      <FAQAccordion />

      {/* Final CTA */}
      <div className="text-center space-y-3">
        <p className="text-sm text-gray-500">
          ¿Tenés dudas? Escribinos y te ayudamos
        </p>
        <p className="text-xs text-gray-400">
          Al comprar aceptás nuestros{" "}
          <a href="/terminos" className="underline">términos</a> y{" "}
          <a href="/privacidad" className="underline">política de privacidad</a>
        </p>
      </div>

      {/* Sticky bottom bar */}
      <StickyCheckoutBar onCheckout={() => handleCheckout("acelerado")} loading={loading} />

      {/* Live purchase notifications */}
      <LivePurchaseToast />
    </div>
  );
}
