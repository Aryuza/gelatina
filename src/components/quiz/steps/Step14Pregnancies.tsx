"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import OptionCard from "@/components/ui/OptionCard";
import { PREGNANCY_OPTIONS } from "@/lib/constants";

export default function Step14Pregnancies() {
  const { answers, updateAnswer, nextStep } = useQuizStore();

  const handleSelect = (value: string) => {
    updateAnswer("pregnancies", value);
    trackStepComplete(14, "pregnancies");
    setTimeout(() => nextStep(), 300);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        ¿Cuántos embarazos tuviste?
      </h2>
      <p className="text-gray-500 text-center text-sm">
        Los embarazos afectan el metabolismo
      </p>
      <div className="space-y-3 mt-6">
        {PREGNANCY_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            selected={answers.pregnancies === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
