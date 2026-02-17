export const LABEL_MAP: Record<string, Record<string, string>> = {
  age: { "18-24": "18–24 años", "25-34": "25–34 años", "35-44": "35–44 años", "45-54": "45–54 años", "55+": "55+ años" },
  bodyType: { "medio": "En forma", "acima-peso": "Unos kilos de más", "sobrepeso": "Sobrepeso", "plus-size": "Plus size" },
  fatZones: { abdomen: "Abdomen", legs: "Piernas y muslos", arms: "Brazos", back: "Espalda", face: "Cara y papada", waist: "Cintura" },
  weightImpact: { "limits-activities": "Me impide hacer cosas que disfruto", "self-esteem": "Afecta mi autoestima", "health-concern": "Me preocupa mi salud", clothing: "Me cuesta encontrar ropa que me quede bien" },
  happyWithAppearance: { "no-want-change": "No, quiero cambiar", somewhat: "Más o menos, podría mejorar", "yes-but-better": "Sí, pero quiero sentirme mejor" },
  barriers: { "food-anxiety": "Ansiedad por la comida", "no-time": "Falta de tiempo", "slow-metabolism": "Metabolismo lento", "no-motivation": "Falta de motivación", "boring-diets": "Dietas aburridas", "water-retention": "Retención de líquidos" },
  goals: { "lose-weight": "Bajar de peso", "reduce-bloating": "Reducir hinchazón", digestion: "Mejorar digestión", "more-energy": "Más energía", confidence: "Sentirse más segura", skin: "Mejorar piel" },
  pregnancies: { never: "Nunca", "1": "1 embarazo", "2": "2 embarazos", "3+": "3 o más" },
  dailyRoutine: { sedentary: "Sedentaria", light: "Poco activa", moderate: "Moderadamente activa", active: "Muy activa" },
  sleepHours: { "less-5": "Menos de 5h", "5-6": "5 a 6h", "7-8": "7 a 8h", "more-8": "Más de 8h" },
  waterIntake: { "less-1l": "Menos de 1L", "1-2l": "1 a 2L", "2-3l": "2 a 3L", "more-3l": "Más de 3L" },
};

export function ageToRange(age: string): string {
  const n = parseInt(age);
  if (isNaN(n)) return age;
  if (n < 25) return "18-24";
  if (n < 35) return "25-34";
  if (n < 45) return "35-44";
  if (n < 55) return "45-54";
  return "55+";
}

export function getLabel(field: string, value: string): string {
  // If age is an exact number, show "X años"
  if (field === "age" && /^\d+$/.test(value)) return `${value} años`;
  return LABEL_MAP[field]?.[value] || value;
}

export function getLabels(field: string, values: string[]): string {
  return values.map((v) => getLabel(field, v)).join(", ");
}
