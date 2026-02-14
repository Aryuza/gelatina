"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import OptionCard from "@/components/ui/OptionCard";
import { WEIGHT_IMPACT_OPTIONS } from "@/lib/constants";

export default function Step06WeightImpact() {
  const { answers, updateAnswer, nextStep } = useQuizStore();

  const handleSelect = (value: string) => {
    updateAnswer("weightImpact", value);
    trackStepComplete(6, "weightImpact");
    setTimeout(() => nextStep(), 300);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        {answers.name ? `${answers.name}, ¿cómo` : "¿Cómo"} afecta el peso tu vida diaria?
      </h2>
      <div className="space-y-3 mt-6">
        {WEIGHT_IMPACT_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            selected={answers.weightImpact === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
