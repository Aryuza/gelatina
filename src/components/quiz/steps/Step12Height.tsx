"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import SliderInput from "@/components/ui/SliderInput";
import Button from "@/components/ui/Button";

export default function Step12Height() {
  const { answers, updateAnswer, nextStep } = useQuizStore();

  const handleContinue = () => {
    trackStepComplete(12, "height");
    nextStep();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        ¿Cuánto medís?
      </h2>
      <p className="text-gray-500 text-center text-sm">
        Tu altura nos ayuda a calcular tu IMC
      </p>
      <div className="mt-8">
        <SliderInput
          label="Altura"
          value={answers.height}
          min={140}
          max={190}
          unit="cm"
          onChange={(v) => updateAnswer("height", v)}
        />
      </div>
      <Button onClick={handleContinue}>Continuar →</Button>
    </div>
  );
}
