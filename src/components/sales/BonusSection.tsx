"use client";

const BONUSES = [
  {
    icon: "📋",
    title: "Guía de Recetas Fit",
    description: "20 recetas saludables y fáciles para complementar tu plan",
    value: "$2.999",
  },
  {
    icon: "📊",
    title: "Planilla de Seguimiento",
    description: "Registrá tu progreso diario y mantenete motivada",
    value: "$1.999",
  },
  {
    icon: "🧘‍♀️",
    title: "Rutina Express de 10 min",
    description: "Ejercicios simples que podés hacer en tu casa sin equipamiento",
    value: "$2.499",
  },
];

export default function BonusSection() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-xs font-bold text-pink-500 uppercase tracking-wide">
          Bonus exclusivos
        </p>
        <h3 className="text-xl font-bold text-gray-900 mt-1">
          Llevate todo esto GRATIS
        </h3>
      </div>

      <div className="space-y-3">
        {BONUSES.map((bonus) => (
          <div
            key={bonus.title}
            className="bg-white rounded-2xl p-4 border border-pink-100 flex items-start gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
              <span className="text-2xl">{bonus.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800 text-sm">{bonus.title}</p>
                <span className="text-xs text-gray-400 line-through">{bonus.value}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{bonus.description}</p>
            </div>
            <span className="text-green-500 font-bold text-sm shrink-0">GRATIS</span>
          </div>
        ))}
      </div>
    </div>
  );
}
