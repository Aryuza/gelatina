"use client";

import { useState } from "react";
import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import SliderInput from "@/components/ui/SliderInput";
import Button from "@/components/ui/Button";

function ageToRange(age: number): string {
  if (age < 25) return "18-24";
  if (age < 35) return "25-34";
  if (age < 45) return "35-44";
  if (age < 55) return "45-54";
  return "55+";
}

export default function Step02Age() {
  const { answers, updateAnswer, nextStep } = useQuizStore();
  const [age, setAge] = useState(30);

  const handleContinue = () => {
    updateAnswer("age", ageToRange(age));
    trackStepComplete(2, "age");
    nextStep();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        ¿Qué edad tenés?
      </h2>
      <p className="text-gray-500 text-center text-sm">
        Usá el deslizador para ajustar tu edad
      </p>
      <div className="mt-8">
        <SliderInput
          label="Edad"
          value={age}
          min={18}
          max={99}
          unit="años"
          onChange={setAge}
        />
      </div>
      <Button onClick={handleContinue}>Continuar →</Button>
    </div>
  );
}
