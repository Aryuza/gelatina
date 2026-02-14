"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import OptionCard from "@/components/ui/OptionCard";
import { WATER_OPTIONS } from "@/lib/constants";

export default function Step17Water() {
  const { answers, updateAnswer, nextStep } = useQuizStore();

  const handleSelect = (value: string) => {
    updateAnswer("waterIntake", value);
    trackStepComplete(17, "water");
    setTimeout(() => nextStep(), 300);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        ¿Cuánta agua tomás por día?
      </h2>
      <p className="text-gray-500 text-center text-sm">
        La hidratación acelera la pérdida de peso
      </p>
      <div className="space-y-3 mt-6">
        {WATER_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            selected={answers.waterIntake === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
