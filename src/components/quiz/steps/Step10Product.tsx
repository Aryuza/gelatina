"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { PRODUCT_NAME } from "@/lib/constants";

export default function Step10Product() {
  const { answers, nextStep } = useQuizStore();

  const handleContinue = () => {
    trackStepComplete(10, "product");
    nextStep();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        {answers.name ? `${answers.name}, tenemos` : "Tenemos"} la solución perfecta para vos
      </h2>

      <div className="flex justify-center">
        <Image
          src="/images/product-showcase.png"
          alt={PRODUCT_NAME}
          width={280}
          height={157}
          className="rounded-2xl shadow-lg border border-pink-100 w-56 h-auto"
        />
      </div>

      <div className="bg-white rounded-2xl p-5 space-y-4 border border-pink-100">
        <h3 className="text-xl font-bold text-pink-600 text-center">
          {PRODUCT_NAME}
        </h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-green-500 mt-0.5">✅</span>
            <p className="text-gray-700 text-sm">
              <strong>Colágeno hidrolizado</strong> que acelera tu metabolismo y mejora tu piel
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500 mt-0.5">✅</span>
            <p className="text-gray-700 text-sm">
              <strong>Fibras naturales</strong> que te dan saciedad y eliminan la ansiedad por comer
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500 mt-0.5">✅</span>
            <p className="text-gray-700 text-sm">
              <strong>Extractos termogénicos</strong> que queman grasa incluso mientras dormís
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500 mt-0.5">✅</span>
            <p className="text-gray-700 text-sm">
              <strong>Sabor delicioso</strong> — no parece un suplemento, parece un postre
            </p>
          </div>
        </div>
      </div>

      <div className="bg-pink-50 rounded-xl p-3 text-center">
        <p className="text-sm text-pink-700">
          🔬 Formulado por nutricionistas argentinas
        </p>
      </div>

      <Button onClick={handleContinue}>
        Quiero mi plan personalizado →
      </Button>
    </div>
  );
}
