"use client";

import { motion } from "framer-motion";

interface StepWrapperProps {
  children: React.ReactNode;
  stepKey: string | number;
}

const variants = {
  enter: {
    x: 80,
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -80,
    opacity: 0,
  },
};

export default function StepWrapper({ children, stepKey }: StepWrapperProps) {
  return (
    <motion.div
      key={stepKey}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
