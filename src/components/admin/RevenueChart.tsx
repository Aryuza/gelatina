"use client";

interface Props {
  revenueByDay: Record<string, number>;
}

export default function RevenueChart({ revenueByDay }: Props) {
  const entries = Object.entries(revenueByDay);
  const maxRevenue = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
      <h3 className="text-white font-semibold mb-4">Ingresos diarios (últimos 14 días)</h3>
      <div className="flex items-end gap-1.5 h-40">
        {entries.map(([date, amount]) => {
          const height = (amount / maxRevenue) * 100;
          const day = new Date(date + "T12:00:00").toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" });

          return (
            <div key={date} className="flex-1 flex flex-col items-center gap-1 group relative">
              {/* Tooltip */}
              <div className="absolute -top-8 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                ${amount.toLocaleString("es-AR")}
              </div>
              <div
                className="w-full rounded-t bg-pink-500 transition-all hover:bg-pink-400"
                style={{ height: `${Math.max(height, 2)}%` }}
              />
              <span className="text-[10px] text-gray-500 leading-none">{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
