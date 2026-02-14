"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import OptionCard from "@/components/ui/OptionCard";
import { AGE_OPTIONS } from "@/lib/constants";

export default function Step02Age() {
  const { answers, updateAnswer, nextStep } = useQuizStore();

  const handleSelect = (value: string) => {
    updateAnswer("age", value);
    trackStepComplete(2, "age");
    setTimeout(() => nextStep(), 300);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        ¿Qué edad tenés?
      </h2>
      <p className="text-gray-500 text-center text-sm">
        Tu edad nos ayuda a personalizar tu plan
      </p>
      <div className="space-y-3 mt-6">
        {AGE_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            selected={answers.age === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
