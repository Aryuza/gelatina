"use client";

import Image from "next/image";
import { useQuizStore } from "@/store/quizStore";
import { trackStepComplete } from "@/lib/analytics";
import { BODY_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Step03BodyType() {
  const { answers, updateAnswer, nextStep } = useQuizStore();

  const handleSelect = (value: string) => {
    updateAnswer("bodyType", value);
    trackStepComplete(3, "bodyType");
    setTimeout(() => nextStep(), 300);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        ¿Cuál es tu tipo de cuerpo?
      </h2>
      <p className="text-gray-500 text-center text-sm">
        Seleccioná el que más se parezca al tuyo
      </p>
      <div className="grid grid-cols-2 gap-3 mt-6">
        {BODY_TYPES.map((type) => (
          <motion.button
            key={type.value}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(type.value)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all",
              answers.bodyType === type.value
                ? "border-pink-500 bg-pink-50 shadow-md"
                : "border-gray-200 bg-white hover:border-pink-300"
            )}
          >
            <Image
              src={type.image}
              alt={type.label}
              width={120}
              height={150}
              className="w-24 h-32 object-cover rounded-xl"
            />
            <span className="text-sm font-medium text-gray-700">{type.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
