"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import SliderInput from "@/components/ui/SliderInput";
import Button from "@/components/ui/Button";

export default function Step13DesiredWeight() {
  const { answers, updateAnswer, nextStep } = useQuizStore();

  const diff = answers.currentWeight - answers.desiredWeight;

  const handleContinue = () => {
    trackStepComplete(13, "desiredWeight");
    nextStep();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        ¿Cuál es tu peso deseado?
      </h2>
      <p className="text-gray-500 text-center text-sm">
        Tu meta de peso ideal
      </p>
      <div className="mt-8">
        <SliderInput
          label="Peso deseado"
          value={answers.desiredWeight}
          min={40}
          max={answers.currentWeight}
          unit="kg"
          onChange={(v) => updateAnswer("desiredWeight", v)}
        />
      </div>

      {diff > 0 && (
        <div className="bg-white rounded-2xl p-4 border border-pink-100 text-center">
          <p className="text-sm text-gray-600">
            Querés bajar{" "}
            <span className="font-bold text-pink-600">{diff} kg</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            ¡Es totalmente alcanzable con tu plan personalizado!
          </p>
        </div>
      )}

      <Button onClick={handleContinue}>Continuar →</Button>
    </div>
  );
}
