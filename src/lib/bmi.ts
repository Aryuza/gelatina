import type { BMIResult } from "@/store/types";

export function calculateBMIResult(
  weightKg: number,
  heightCm: number,
  desiredWeightKg: number
): BMIResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const rounded = Math.round(bmi * 10) / 10;

  let category: BMIResult["category"];
  let label: string;
  let color: string;

  if (rounded < 18.5) {
    category = "bajo";
    label = "Bajo peso";
    color = "#3b82f6";
  } else if (rounded < 25) {
    category = "normal";
    label = "Peso normal";
    color = "#22c55e";
  } else if (rounded < 30) {
    category = "sobrepeso";
    label = "Sobrepeso";
    color = "#f59e0b";
  } else if (rounded < 35) {
    category = "obesidad1";
    label = "Obesidad grado I";
    color = "#f97316";
  } else if (rounded < 40) {
    category = "obesidad2";
    label = "Obesidad grado II";
    color = "#ef4444";
  } else {
    category = "obesidad3";
    label = "Obesidad grado III";
    color = "#dc2626";
  }

  const idealBMI = 22;
  const idealWeight = Math.round(idealBMI * heightM * heightM);
  const weightToLose = Math.max(0, Math.round(weightKg - desiredWeightKg));

  // Estimate: ~0.5-1kg per week with the product
  const weeks = Math.ceil(weightToLose / 0.75);
  const months = Math.ceil(weeks / 4);
  const timeEstimate =
    months <= 1 ? "4 semanas" : months <= 2 ? "6 a 8 semanas" : `${months} meses`;

  return {
    value: rounded,
    category,
    label,
    color,
    weightToLose,
    idealWeight,
    timeEstimate,
  };
}
