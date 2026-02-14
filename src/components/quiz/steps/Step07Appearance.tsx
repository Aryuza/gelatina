"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import OptionCard from "@/components/ui/OptionCard";
import { APPEARANCE_OPTIONS } from "@/lib/constants";

export default function Step07Appearance() {
  const { answers, updateAnswer, nextStep } = useQuizStore();

  const handleSelect = (value: string) => {
    updateAnswer("happyWithAppearance", value);
    trackStepComplete(7, "appearance");
    setTimeout(() => nextStep(), 300);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        ¿Estás feliz con tu apariencia actual?
      </h2>
      <p className="text-gray-500 text-center text-sm">
        Sé honesta, no hay respuestas incorrectas
      </p>
      <div className="space-y-3 mt-6">
        {APPEARANCE_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            selected={answers.happyWithAppearance === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
