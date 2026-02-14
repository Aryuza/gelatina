"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import OptionCard from "@/components/ui/OptionCard";
import Button from "@/components/ui/Button";
import { FAT_ZONES } from "@/lib/constants";

export default function Step04FatZones() {
  const { answers, toggleArrayAnswer, nextStep } = useQuizStore();

  const handleContinue = () => {
    trackStepComplete(4, "fatZones");
    nextStep();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        ¿Dónde acumulás más grasa?
      </h2>
      <p className="text-gray-500 text-center text-sm">
        Podés elegir más de una zona
      </p>
      <div className="space-y-3 mt-4">
        {FAT_ZONES.map((zone) => (
          <OptionCard
            key={zone.value}
            label={zone.label}
            icon={zone.icon}
            multi
            selected={answers.fatZones.includes(zone.value)}
            onClick={() => toggleArrayAnswer("fatZones", zone.value)}
          />
        ))}
      </div>
      <Button
        onClick={handleContinue}
        disabled={answers.fatZones.length === 0}
      >
        Continuar →
      </Button>
    </div>
  );
}
