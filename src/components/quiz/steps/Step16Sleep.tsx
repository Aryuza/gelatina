"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import OptionCard from "@/components/ui/OptionCard";
import { SLEEP_OPTIONS } from "@/lib/constants";

export default function Step16Sleep() {
  const { answers, updateAnswer, nextStep } = useQuizStore();

  const handleSelect = (value: string) => {
    updateAnswer("sleepHours", value);
    trackStepComplete(16, "sleep");
    setTimeout(() => nextStep(), 300);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        ¿Cuántas horas dormís por noche?
      </h2>
      <p className="text-gray-500 text-center text-sm">
        El sueño es clave para el metabolismo
      </p>
      <div className="space-y-3 mt-6">
        {SLEEP_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            selected={answers.sleepHours === opt.value}
            onClick={() => handleSelect(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
