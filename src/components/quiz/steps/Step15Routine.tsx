"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import OptionCard from "@/components/ui/OptionCard";
import { ROUTINE_OPTIONS } from "@/lib/constants";

export default function Step15Routine() {
  const { answers, updateAnswer, nextStep } = useQuizStore();

  const handleSelect = (value: string) => {
    updateAnswer("dailyRoutine", value);
    trackStepComplete(15, "routine");
    setTimeout(() => nextStep(), 300);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        ¿Cómo es tu rutina diaria?
      </h2>
      <p className="text-gray-500 text-center text-sm">
        Tu nivel de actividad influye en tu plan
      </p>
      <div className="space-y-3 mt-6">
        {ROUTINE_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            selected={answers.dailyRoutine === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
