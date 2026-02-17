"use client";

import { useQuizStore } from "@/store/quizStore";
import { motion, useAnimation } from "framer-motion";
import { NUTRITIONIST, NUTRITIONIST_LICENSE } from "@/lib/constants";
import Image from "next/image";
import { useEffect, useState } from "react";

function AnimatedCheck({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.3, type: "spring", stiffness: 200 }}
      className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0"
    >
      <motion.svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.3 }}
      >
        <motion.path
          d="M2.5 7L5.5 10L11.5 4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.3 }}
        />
      </motion.svg>
    </motion.div>
  );
}

function ScanLine() {
  return (
    <motion.div
      initial={{ top: 0 }}
      animate={{ top: "100%" }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
      className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent z-10 pointer-events-none"
      style={{ boxShadow: "0 0 12px 2px rgba(236, 72, 153, 0.4)" }}
    />
  );
}

export default function PersonalizedResults() {
  const personalizedTips = useQuizStore((s) => s.personalizedTips);
  const [revealed, setRevealed] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (!personalizedTips) return;

    const sequence = async () => {
      // Start the reveal animation
      await controls.start({
        clipPath: "inset(0 0 0% 0)",
        transition: { duration: 2.5, ease: "easeInOut" },
      });
      setRevealed(true);
    };

    sequence();
  }, [personalizedTips, controls]);

  if (!personalizedTips) return null;

  const { greeting, analysis, tips, motivation } = personalizedTips;

  return (
    <div className="relative">
      {/* Scan line effect */}
      {!revealed && <ScanLine />}

      {/* Document container with reveal clip */}
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={controls}
        className="space-y-4"
      >
        {/* Document header - looks like an official report */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Top bar */}
          <div className="bg-gradient-to-r from-pink-600 to-pink-500 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
            </div>
            <p className="text-white/80 text-xs font-medium tracking-wide uppercase">
              Informe Personalizado
            </p>
          </div>

          {/* Nutritionist header */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Image
                src="/images/nutricionista.png"
                alt={NUTRITIONIST}
                width={56}
                height={56}
                className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-pink-100"
              />
              <div>
                <p className="font-bold text-gray-900">{NUTRITIONIST}</p>
                <p className="text-xs text-gray-500">{NUTRITIONIST_LICENSE} &middot; Nutricionista especialista</p>
              </div>
            </div>
          </div>

          {/* Greeting & analysis */}
          <div className="p-5 space-y-3">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="text-gray-800 font-medium leading-relaxed"
            >
              {greeting}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="bg-pink-50 rounded-xl p-4 border border-pink-100"
            >
              <p className="text-xs font-bold text-pink-600 uppercase tracking-wide mb-1">Diagnóstico inicial</p>
              <p className="text-sm text-gray-700 leading-relaxed">{analysis}</p>
            </motion.div>
          </div>
        </div>

        {/* Tips as checklist items */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-bold text-gray-700">Recomendaciones para vos</p>
          </div>
          <div className="p-4 space-y-0">
            {tips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + i * 0.4, duration: 0.4 }}
                className={`flex items-start gap-3 p-3 rounded-xl ${i % 2 === 0 ? "bg-gray-50" : ""}`}
              >
                <AnimatedCheck delay={2.0 + i * 0.4} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{tip.icon}</span>
                    <p className="font-semibold text-gray-800 text-sm">{tip.title}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{tip.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Motivation - final stamp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.5, duration: 0.5 }}
          className="relative bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600 rounded-2xl p-6 text-white text-center overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-4 text-6xl font-bold rotate-12 select-none">&ldquo;</div>
          </div>
          <p className="font-medium leading-relaxed text-sm relative z-10">{motivation}</p>
          <div className="mt-3 flex items-center justify-center gap-2 opacity-80">
            <div className="w-8 h-px bg-white/50" />
            <p className="text-xs">{NUTRITIONIST}</p>
            <div className="w-8 h-px bg-white/50" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
