"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import OptionCard from "@/components/ui/OptionCard";
import Button from "@/components/ui/Button";
import { GOAL_OPTIONS } from "@/lib/constants";

export default function Step09Goals() {
  const { answers, toggleArrayAnswer, nextStep } = useQuizStore();

  const handleContinue = () => {
    trackStepComplete(9, "goals");
    nextStep();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        ¿Qué te gustaría lograr?
      </h2>
      <p className="text-gray-500 text-center text-sm">
        Seleccioná tus objetivos principales
      </p>
      <div className="space-y-3 mt-4">
        {GOAL_OPTIONS.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            multi
            selected={answers.goals.includes(opt.value)}
            onClick={() => toggleArrayAnswer("goals", opt.value)}
          />
        ))}
      </div>
      <Button
        onClick={handleContinue}
        disabled={answers.goals.length === 0}
      >
        Continuar →
      </Button>
    </div>
  );
}
