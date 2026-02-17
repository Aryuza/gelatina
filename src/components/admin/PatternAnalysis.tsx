"use client";

import { LABEL_MAP } from "@/lib/label-map";

interface Props {
  patterns: Record<string, Record<string, number>>;
  totalQuizzes: number;
}

const sectionLabels: Record<string, string> = {
  age: "Edad",
  bodyType: "Tipo de cuerpo",
  barriers: "Obstáculos",
  goals: "Objetivos",
  dailyRoutine: "Rutina diaria",
  waterIntake: "Consumo de agua",
};

export default function PatternAnalysis({ patterns, totalQuizzes }: Props) {
  if (totalQuizzes === 0) {
    return (
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 text-center text-gray-500">
        No hay datos de quizzes para analizar
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(sectionLabels).map(([key, title]) => {
        const data = patterns[key] || {};
        const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
        const max = entries[0]?.[1] || 1;

        return (
          <div key={key} className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            <h4 className="text-white font-semibold mb-3">{title}</h4>
            <div className="space-y-2">
              {entries.map(([value, count]) => {
                const label = LABEL_MAP[key]?.[value] || value;
                const pct = ((count / totalQuizzes) * 100).toFixed(0);
                const width = (count / max) * 100;

                return (
                  <div key={value}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{label}</span>
                      <span className="text-gray-500">{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-pink-500 rounded-full transition-all"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              {entries.length === 0 && (
                <p className="text-gray-500 text-sm">Sin datos</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
