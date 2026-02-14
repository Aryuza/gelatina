"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface OptionCardProps {
  label: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
}

export default function OptionCard({
  label,
  icon,
  selected,
  onClick,
  multi = false,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "w-full flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200",
        selected
          ? "border-pink-500 bg-pink-50 shadow-md shadow-pink-500/10"
          : "border-gray-200 bg-white hover:border-pink-300 hover:bg-pink-50/50"
      )}
    >
      {icon && <span className="text-2xl shrink-0">{icon}</span>}
      <span className="flex-1 font-medium text-gray-800">{label}</span>
      <span
        className={cn(
          "w-6 h-6 shrink-0 flex items-center justify-center border-2 transition-all",
          multi ? "rounded-md" : "rounded-full",
          selected
            ? "border-pink-500 bg-pink-500 text-white"
            : "border-gray-300"
        )}
      >
        {selected && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
    </motion.button>
  );
}
