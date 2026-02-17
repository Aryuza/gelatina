"use client";

interface Props {
  totalQuizzes: number;
  totalSales: number;
  conversionRate: number;
  totalRevenue: number;
}

function formatMoney(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
  return `$${amount.toLocaleString("es-AR")}`;
}

const cards = [
  { key: "quizzes" as const, label: "Quizzes", icon: "📋" },
  { key: "sales" as const, label: "Ventas", icon: "💰" },
  { key: "conversion" as const, label: "Conversión", icon: "📈" },
  { key: "revenue" as const, label: "Ingresos", icon: "💵" },
];

export default function OverviewCards({ totalQuizzes, totalSales, conversionRate, totalRevenue }: Props) {
  const values: Record<string, string> = {
    quizzes: totalQuizzes.toLocaleString("es-AR"),
    sales: totalSales.toLocaleString("es-AR"),
    conversion: `${conversionRate}%`,
    revenue: formatMoney(totalRevenue),
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.key} className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{card.icon}</span>
            <span className="text-gray-400 text-sm">{card.label}</span>
          </div>
          <p className="text-2xl font-bold text-white">{values[card.key]}</p>
        </div>
      ))}
    </div>
  );
}
