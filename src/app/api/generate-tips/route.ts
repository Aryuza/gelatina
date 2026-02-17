import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `Sos una nutricionista profesional llamada Lic. Carolina Méndez (MN 8847), especialista en planes detox y manejo de peso saludable. Trabajás para "Gelatina Fit", un plan nutricional basado en gelatina con colágeno hidrolizado que ayuda a bajar de peso, reducir hinchazón y mejorar la piel.

Tu objetivo es generar un mensaje personalizado para una persona que acaba de completar un cuestionario de salud. El mensaje debe:

1. Ser CÁLIDO, PROFESIONAL y EMPÁTICO. Usá el nombre de la persona.
2. Incluir exactamente 4 tips personalizados basados en sus respuestas reales (sus obstáculos, objetivos, rutina, sueño, agua, etc). Cada tip debe ser práctico, útil y real.
3. Incluir un mensaje motivacional final que conecte emocionalmente y muestre que su objetivo es alcanzable.
4. Mencionar sutilmente que la Gelatina Fit puede ayudarla en su proceso (NO ser agresivo con la venta, ser natural).
5. Hablar en español rioplatense (vos, podés, tenés) pero profesional.

IMPORTANTE: Respondé ÚNICAMENTE con JSON válido, sin markdown, sin backticks, sin texto adicional. El formato exacto es:

{
  "greeting": "Mensaje de saludo personalizado con el nombre (1-2 oraciones)",
  "analysis": "Breve análisis de su situación actual basado en sus respuestas (2-3 oraciones)",
  "tips": [
    {"icon": "emoji", "title": "Título corto del tip", "description": "Descripción del tip en 1-2 oraciones"},
    {"icon": "emoji", "title": "Título corto del tip", "description": "Descripción del tip en 1-2 oraciones"},
    {"icon": "emoji", "title": "Título corto del tip", "description": "Descripción del tip en 1-2 oraciones"},
    {"icon": "emoji", "title": "Título corto del tip", "description": "Descripción del tip en 1-2 oraciones"}
  ],
  "motivation": "Mensaje motivacional final (2-3 oraciones, empoderador y esperanzador)"
}`;

export async function POST(req: Request) {
  try {
    const { answers, bmiResult } = await req.json();

    if (!answers) {
      return NextResponse.json(
        { error: "Missing quiz answers" },
        { status: 400 }
      );
    }

    const userContext = `
Datos de la persona:
- Nombre: ${answers.name || "Sin nombre"}
- Edad: ${answers.age}
- Tipo de cuerpo: ${answers.bodyType}
- Zonas problemáticas: ${answers.fatZones?.join(", ")}
- Cómo le afecta el peso: ${answers.weightImpact}
- Feliz con su apariencia: ${answers.happyWithAppearance}
- Obstáculos principales: ${answers.barriers?.join(", ")}
- Objetivos: ${answers.goals?.join(", ")}
- Peso actual: ${answers.currentWeight} kg
- Altura: ${answers.height} cm
- Peso deseado: ${answers.desiredWeight} kg
- Embarazos: ${answers.pregnancies}
- Rutina diaria: ${answers.dailyRoutine}
- Horas de sueño: ${answers.sleepHours}
- Consumo de agua: ${answers.waterIntake}
${bmiResult ? `- IMC: ${bmiResult.value} (${bmiResult.label})
- Peso a perder: ${bmiResult.weightToLose} kg
- Tiempo estimado: ${bmiResult.timeEstimate}` : ""}

Generá el mensaje personalizado para esta persona.`;

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: SYSTEM_PROMPT + "\n\n" + userContext }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      console.error("Gemini API error:", response.status, await response.text());
      return NextResponse.json(
        { error: "Gemini API error" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json(
        { error: "Empty Gemini response" },
        { status: 502 }
      );
    }

    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const tips = JSON.parse(cleaned);

    return NextResponse.json(tips);
  } catch (error) {
    console.error("Error generating tips:", error);
    return NextResponse.json(
      { error: "Failed to generate tips" },
      { status: 500 }
    );
  }
}
