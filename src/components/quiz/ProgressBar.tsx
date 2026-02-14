"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full px-4 pt-3 pb-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-pink-600">
          Paso {current} de {total}
        </span>
        <span className="text-xs font-medium text-pink-400">{percentage}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-pink-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-pink-400 to-pink-600"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
