"use client";

import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import TextInput from "@/components/ui/TextInput";
import Button from "@/components/ui/Button";

export default function Step05Name() {
  const { answers, updateAnswer, nextStep } = useQuizStore();

  const handleContinue = () => {
    if (answers.name.trim().length >= 2) {
      trackStepComplete(5, "name");
      nextStep();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        ¿Cómo te llamás?
      </h2>
      <p className="text-gray-500 text-center text-sm">
        Para personalizar tu plan
      </p>
      <div className="mt-6">
        <TextInput
          value={answers.name}
          onChange={(v) => updateAnswer("name", v)}
          placeholder="Tu nombre"
        />
      </div>
      <Button
        onClick={handleContinue}
        disabled={answers.name.trim().length < 2}
      >
        Continuar →
      </Button>
    </div>
  );
}
