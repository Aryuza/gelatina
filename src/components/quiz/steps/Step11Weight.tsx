"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import SliderInput from "@/components/ui/SliderInput";
import Button from "@/components/ui/Button";

export default function Step11Weight() {
  const { answers, updateAnswer, nextStep } = useQuizStore();

  const handleContinue = () => {
    trackStepComplete(11, "weight");
    nextStep();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        ¿Cuánto pesás actualmente?
      </h2>
      <p className="text-gray-500 text-center text-sm">
        Usá el deslizador para ajustar
      </p>
      <div className="mt-8">
        <SliderInput
          label="Peso actual"
          value={answers.currentWeight}
          min={40}
          max={150}
          unit="kg"
          onChange={(v) => updateAnswer("currentWeight", v)}
        />
      </div>
      <Button onClick={handleContinue}>Continuar →</Button>
    </div>
  );
}
