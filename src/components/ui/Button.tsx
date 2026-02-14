"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  pulse?: boolean;
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  pulse = false,
  className,
  type = "button",
}: ButtonProps) {
  const base =
    "w-full rounded-2xl py-4 px-6 text-lg font-bold transition-all duration-200 active:scale-[0.97]";

  const variants = {
    primary:
      "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/30 hover:from-pink-600 hover:to-pink-700",
    secondary: "bg-white text-pink-600 border-2 border-pink-300 hover:bg-pink-50",
    outline: "bg-transparent text-pink-600 border-2 border-pink-400 hover:bg-pink-50",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      className={cn(
        base,
        variants[variant],
        pulse && "animate-pulse-pink",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
