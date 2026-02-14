"use client";

import { COMPARISON_TABLE, PRODUCT_NAME } from "@/lib/constants";

export default function ComparisonTable() {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold text-gray-900 text-center">
        ¿Por qué elegir {PRODUCT_NAME}?
      </h3>

      <div className="bg-white rounded-2xl overflow-hidden border border-pink-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-pink-50">
              {COMPARISON_TABLE.headers.map((header, i) => (
                <th
                  key={header || "feature"}
                  className={`py-3 px-2 text-center font-semibold ${
                    i === 1 ? "text-pink-600" : "text-gray-600"
                  } ${i === 0 ? "text-left pl-4" : ""}`}
                >
                  {i === 1 ? `💖 ${header}` : header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_TABLE.rows.map((row, rowIndex) => (
              <tr
                key={String(row[0])}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`py-3 px-2 text-center ${
                      cellIndex === 0 ? "text-left pl-4 text-gray-700 font-medium" : ""
                    }`}
                  >
                    {typeof cell === "boolean" ? (
                      cell ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-red-400">✗</span>
                      )
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
