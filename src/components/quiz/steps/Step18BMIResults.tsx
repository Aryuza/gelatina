"use client";

import { useEffect } from "react";
import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { PRODUCT_NAME, TESTIMONIALS } from "@/lib/constants";

export default function Step18BMIResults() {
  const { answers, bmiResult, calculateBMI, nextStep } = useQuizStore();

  useEffect(() => {
    calculateBMI();
  }, [calculateBMI]);

  const handleContinue = () => {
    trackStepComplete(18, "bmiResults");
    nextStep();
  };

  if (!bmiResult) return null;

  const testimonial = TESTIMONIALS[0];

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        {answers.name ? `${answers.name}, estos` : "Estos"} son tus resultados
      </h2>

      {/* BMI Card */}
      <div className="bg-white rounded-2xl p-5 border border-pink-100 space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Tu Índice de Masa Corporal</p>
          <p className="text-5xl font-bold" style={{ color: bmiResult.color }}>
            {bmiResult.value}
          </p>
          <p className="text-lg font-semibold mt-1" style={{ color: bmiResult.color }}>
            {bmiResult.label}
          </p>
        </div>

        {/* BMI Scale */}
        <div className="relative h-3 rounded-full overflow-hidden bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 via-orange-400 to-red-500">
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-gray-800 shadow-md"
            style={{
              left: `${Math.min(95, Math.max(5, ((bmiResult.value - 15) / 30) * 100))}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>Bajo</span>
          <span>Normal</span>
          <span>Sobrepeso</span>
          <span>Obesidad</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-3 text-center border border-pink-100">
          <p className="text-2xl font-bold text-pink-600">{bmiResult.weightToLose} kg</p>
          <p className="text-xs text-gray-500">Para alcanzar tu meta</p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center border border-pink-100">
          <p className="text-2xl font-bold text-pink-600">{bmiResult.timeEstimate}</p>
          <p className="text-xs text-gray-500">Tiempo estimado</p>
        </div>
      </div>

      {/* Alert */}
      {bmiResult.category !== "normal" && bmiResult.category !== "bajo" && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm text-amber-800">
            ⚠️ Tu IMC indica <strong>{bmiResult.label.toLowerCase()}</strong>.
            Esto puede aumentar el riesgo de problemas de salud. La buena noticia:
            con {PRODUCT_NAME} podés revertirlo en {bmiResult.timeEstimate}.
          </p>
        </div>
      )}

      {/* Mini testimonial */}
      <div className="bg-pink-50 rounded-xl overflow-hidden">
        <Image
          src={testimonial.image}
          alt={`Transformación de ${testimonial.name}`}
          width={400}
          height={200}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div>
              <p className="text-sm font-semibold text-gray-800">{testimonial.name}</p>
              <p className="text-xs text-gray-500">{testimonial.city} — {testimonial.weightLost}</p>
            </div>
            <div className="ml-auto text-yellow-400 text-sm">★★★★★</div>
          </div>
          <p className="text-sm text-gray-600 italic">&quot;{testimonial.text}&quot;</p>
        </div>
      </div>

      <Button onClick={handleContinue} pulse>
        Ver mi plan personalizado →
      </Button>
    </div>
  );
}
