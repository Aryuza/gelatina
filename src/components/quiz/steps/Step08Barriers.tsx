"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import OptionCard from "@/components/ui/OptionCard";
import Button from "@/components/ui/Button";
import { BARRIER_OPTIONS } from "@/lib/constants";

export default function Step08Barriers() {
  const { answers, toggleArrayAnswer, nextStep } = useQuizStore();

  const handleContinue = () => {
    trackStepComplete(8, "barriers");
    nextStep();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        ¿Qué te impide bajar de peso?
      </h2>
      <p className="text-gray-500 text-center text-sm">
        Seleccioná todas las que apliquen
      </p>
      <div className="space-y-3 mt-4">
        {BARRIER_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            multi
            selected={answers.barriers.includes(opt.value)}
            onClick={() => toggleArrayAnswer("barriers", opt.value)}
          />
        ))}
      </div>
      <Button
        onClick={handleContinue}
        disabled={answers.barriers.length === 0}
      >
        Continuar →
      </Button>
    </div>
  );
}
