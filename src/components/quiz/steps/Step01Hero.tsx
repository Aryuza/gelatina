"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackQuizStart } from "@/lib/analytics";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { PRODUCT_NAME, NUTRITIONIST, NUTRITIONIST_LICENSE } from "@/lib/constants";

export default function Step01Hero() {
  const nextStep = useQuizStore((s) => s.nextStep);

  const handleStart = () => {
    useQuizStore.setState({ quizStartedAt: Date.now() });
    trackQuizStart();
    nextStep();
  };

  return (
    <div className="flex flex-col items-center text-center space-y-6 pt-8">
      {/* Before/After mini photo */}
      <Image
        src="/images/hero-before-after.png"
        alt="Transformación con Gelatina Fit"
        width={300}
        height={180}
        className="w-64 h-auto rounded-2xl shadow-lg shadow-pink-500/20"
      />

      <div className="space-y-3">
        <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
          ¿Luchás contra la <span className="text-pink-600">panza hinchada</span> y la <span className="text-pink-600">grasa localizada</span>?
        </h1>
        <p className="text-lg text-pink-600 font-bold leading-snug">
          Descubrí cómo activar tu metabolismo y perder hasta 12 kg en 30 días con la {PRODUCT_NAME}
        </p>
      </div>

      <p className="text-gray-600 leading-relaxed">
        Respondé unas preguntas rápidas y recibí tu{" "}
        <span className="font-semibold text-pink-600">plan personalizado gratis</span>{" "}
        para empezar tu transformación hoy.
      </p>

      <div className="bg-white rounded-2xl p-4 border border-pink-100 w-full">
        <div className="flex items-center gap-3">
          <Image
            src="/images/nutricionista.png"
            alt={NUTRITIONIST}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
          <div className="text-left">
            <p className="font-semibold text-gray-800">{NUTRITIONIST}</p>
            <p className="text-sm text-gray-500">{NUTRITIONIST_LICENSE}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2 text-left italic">
          &quot;Diseñé este plan para que cualquier mujer pueda bajar de peso sin
          pasar hambre ni hacer dietas extremas.&quot;
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>⏱️</span>
        <span>Solo toma 2 minutos</span>
        <span className="mx-1">•</span>
        <span>🔒</span>
        <span>100% confidencial</span>
      </div>

      <Button onClick={handleStart} pulse>
        Empezar mi quiz gratis →
      </Button>

      <p className="text-xs text-gray-400">
        Ya lo completaron +12.000 mujeres argentinas
      </p>
    </div>
  );
}
