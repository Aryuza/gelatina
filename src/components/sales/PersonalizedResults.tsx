"use client";

import { useQuizStore } from "@/store/quizStore";
import { motion } from "framer-motion";
import { NUTRITIONIST, NUTRITIONIST_LICENSE } from "@/lib/constants";
import Image from "next/image";

export default function PersonalizedResults() {
  const personalizedTips = useQuizStore((s) => s.personalizedTips);

  if (!personalizedTips) return null;

  const { greeting, analysis, tips, motivation } = personalizedTips;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Header with nutritionist */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-5 border border-pink-100">
        <div className="flex items-start gap-3 mb-4">
          <Image
            src="/images/nutricionista.png"
            alt={NUTRITIONIST}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-pink-200"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">{NUTRITIONIST}</p>
            <p className="text-xs text-gray-500">{NUTRITIONIST_LICENSE}</p>
          </div>
        </div>

        <p className="text-gray-800 font-medium leading-relaxed">{greeting}</p>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{analysis}</p>
      </div>

      {/* Tips */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-900 text-center">
          Tus recomendaciones personalizadas
        </h3>
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-white rounded-xl p-4 border border-pink-100 flex items-start gap-3"
          >
            <span className="text-2xl shrink-0">{tip.icon}</span>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{tip.title}</p>
              <p className="text-sm text-gray-600 mt-0.5">{tip.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Motivation */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-5 text-white text-center">
        <p className="font-medium leading-relaxed text-sm">{motivation}</p>
      </div>
    </motion.div>
  );
}
