"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useQuizStore } from "@/store/quizStore";
import { trackStepView } from "@/lib/analytics";
import ProgressBar from "./ProgressBar";
import StepWrapper from "./StepWrapper";
import Step01Hero from "./steps/Step01Hero";
import Step02Age from "./steps/Step02Age";
import Step03BodyType from "./steps/Step03BodyType";
import Step04FatZones from "./steps/Step04FatZones";
import Step05Name from "./steps/Step05Name";
import Step06WeightImpact from "./steps/Step06WeightImpact";
import Step07Appearance from "./steps/Step07Appearance";
import Step08Barriers from "./steps/Step08Barriers";
import Step09Goals from "./steps/Step09Goals";
import Step10Product from "./steps/Step10Product";
import Step11Weight from "./steps/Step11Weight";
import Step12Height from "./steps/Step12Height";
import Step13DesiredWeight from "./steps/Step13DesiredWeight";
import Step14Pregnancies from "./steps/Step14Pregnancies";
import Step15Routine from "./steps/Step15Routine";
import Step16Sleep from "./steps/Step16Sleep";
import Step17Water from "./steps/Step17Water";
import Step18BMIResults from "./steps/Step18BMIResults";
import Step19Loading from "./steps/Step19Loading";
import Step20Sales from "./steps/Step20Sales";

const TOTAL_STEPS = 20;

const stepComponents: Record<number, React.ComponentType> = {
  1: Step01Hero,
  2: Step02Age,
  3: Step03BodyType,
  4: Step04FatZones,
  5: Step05Name,
  6: Step06WeightImpact,
  7: Step07Appearance,
  8: Step08Barriers,
  9: Step09Goals,
  10: Step10Product,
  11: Step11Weight,
  12: Step12Height,
  13: Step13DesiredWeight,
  14: Step14Pregnancies,
  15: Step15Routine,
  16: Step16Sleep,
  17: Step17Water,
  18: Step18BMIResults,
  19: Step19Loading,
  20: Step20Sales,
};

export default function QuizShell() {
  const currentStep = useQuizStore((s) => s.currentStep);
  const resetQuiz = useQuizStore((s) => s.resetQuiz);
  const StepComponent = stepComponents[currentStep];

  useEffect(() => {
    trackStepView(currentStep);
  }, [currentStep]);

  const showProgress = currentStep > 1 && currentStep < 20;

  return (
    <div className="min-h-dvh flex flex-col relative">
      {/* Botón temporal solo para testing local */}
      {process.env.NODE_ENV === "development" && (
        <button
          onClick={resetQuiz}
          className="fixed bottom-4 right-4 z-50 bg-black/50 hover:bg-black/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm transition-all border border-white/20"
        >
          Reiniciar Quiz (Dev Mode)
        </button>
      )}

      {showProgress && <ProgressBar current={currentStep - 1} total={TOTAL_STEPS - 2} />}

      <div className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <StepWrapper stepKey={currentStep}>
              {StepComponent && <StepComponent />}
            </StepWrapper>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
