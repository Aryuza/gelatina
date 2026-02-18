import nodemailer from "nodemailer";
import type { QuizAnswers, BMIResult, PersonalizedTips } from "@/store/types";
import { getLabel, getLabels } from "@/lib/label-map";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendDeliveryEmail(to: string, name: string) {
  const mailOptions = {
    from: `"Gelatina Fit" <${process.env.GMAIL_USER}>`,
    to,
    bcc: process.env.GMAIL_USER,
    subject: `¡Aquí tienes tu Plan Personalizado, ${name}! 🥗`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #fce7f3; border-radius: 24px; overflow: hidden; background-color: #fff;">
        <div style="background-color: #db2777; padding: 40px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">¡Muchas gracias por tu compra!</h1>
          <p style="margin-top: 10px; font-size: 18px; opacity: 0.9;">Tu transformación con Gelatina Fit empieza ahora.</p>
        </div>

        <div style="padding: 30px; color: #374151; line-height: 1.6;">
          <p>Hola <strong>${name}</strong>,</p>
          <p>Estamos muy felices de acompañarte en este camino. Ya tenés acceso inmediato a todo tu material en nuestra área exclusiva de miembros.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://gelatina-delta.vercel.app/gracias" style="background-color: #db2777; color: white; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; font-size: 18px; box-shadow: 0 4px 15px rgba(219, 39, 119, 0.3);">🚀 ACCEDER AL ÁREA DE MIEMBROS</a>
          </div>

          <div style="background-color: #f8fafc; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 14px;"><strong>¿Necesitas ayuda?</strong> Si tienes problemas con las descargas o alguna duda técnica, contáctanos respondiendo este mail.</p>
          </div>

          <hr style="border: 0; border-top: 1px solid #fce7f3; margin: 30px 0;">

          <p style="font-size: 12px; color: #9ca3af; text-align: center;">
            &copy; ${new Date().getFullYear()} Gelatina Fit. Has recibido este correo porque realizaste una compra en nuestro sitio.
          </p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendQuizCompletionNotification(
  answers: QuizAnswers,
  bmiResult: BMIResult | null,
  personalizedTips?: PersonalizedTips | null
) {
  const now = new Date();
  const fecha = now.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const mailOptions = {
    from: `"Gelatina Fit" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `📋 Quiz completado por ${answers.name || "Sin nombre"} - ${fecha}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; background-color: #fff;">
        <div style="background-color: #7c3aed; padding: 24px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 22px;">Nuevo Quiz Completado</h1>
          <p style="margin-top: 6px; font-size: 14px; opacity: 0.9;">${fecha}</p>
        </div>

        <div style="padding: 24px; color: #374151; line-height: 1.6; font-size: 14px;">
          <h2 style="margin-top: 0; font-size: 18px; color: #7c3aed;">Datos de la persona</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold; width: 40%;">Nombre</td>
              <td style="padding: 8px 4px;">${answers.name || "—"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold;">Edad</td>
              <td style="padding: 8px 4px;">${getLabel("age", answers.age)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold;">Tipo de cuerpo</td>
              <td style="padding: 8px 4px;">${getLabel("bodyType", answers.bodyType)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold;">Zonas problemáticas</td>
              <td style="padding: 8px 4px;">${getLabels("fatZones", answers.fatZones)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold;">Impacto del peso</td>
              <td style="padding: 8px 4px;">${getLabel("weightImpact", answers.weightImpact)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold;">Feliz con su apariencia</td>
              <td style="padding: 8px 4px;">${getLabel("happyWithAppearance", answers.happyWithAppearance)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold;">Obstáculos</td>
              <td style="padding: 8px 4px;">${getLabels("barriers", answers.barriers)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold;">Objetivos</td>
              <td style="padding: 8px 4px;">${getLabels("goals", answers.goals)}</td>
            </tr>
          </table>

          <h2 style="margin-top: 24px; font-size: 18px; color: #7c3aed;">Datos físicos</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold; width: 40%;">Peso actual</td>
              <td style="padding: 8px 4px;">${answers.currentWeight} kg</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold;">Altura</td>
              <td style="padding: 8px 4px;">${answers.height} cm</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold;">Peso deseado</td>
              <td style="padding: 8px 4px;">${answers.desiredWeight} kg</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold;">Embarazos</td>
              <td style="padding: 8px 4px;">${getLabel("pregnancies", answers.pregnancies)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold;">Rutina diaria</td>
              <td style="padding: 8px 4px;">${getLabel("dailyRoutine", answers.dailyRoutine)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold;">Horas de sueño</td>
              <td style="padding: 8px 4px;">${getLabel("sleepHours", answers.sleepHours)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold;">Consumo de agua</td>
              <td style="padding: 8px 4px;">${getLabel("waterIntake", answers.waterIntake)}</td>
            </tr>
          </table>

          ${bmiResult ? `
          <h2 style="margin-top: 24px; font-size: 18px; color: #7c3aed;">Resultado BMI</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold; width: 40%;">IMC</td>
              <td style="padding: 8px 4px;"><strong style="color: ${bmiResult.color};">${bmiResult.value}</strong> (${bmiResult.label})</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold;">Peso a perder</td>
              <td style="padding: 8px 4px;">${bmiResult.weightToLose} kg</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 8px 4px; font-weight: bold;">Tiempo estimado</td>
              <td style="padding: 8px 4px;">${bmiResult.timeEstimate}</td>
            </tr>
          </table>
          ` : ""}

          ${personalizedTips ? `
          <h2 style="margin-top: 24px; font-size: 18px; color: #7c3aed;">Respuesta de IA (lo que vio la persona)</h2>
          <div style="background-color: #faf5ff; padding: 16px; border-radius: 12px; border: 1px solid #e9d5ff; margin-top: 8px;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #6d28d9;">Saludo:</p>
            <p style="margin: 0 0 12px 0; font-size: 14px;">${personalizedTips.greeting}</p>

            <p style="margin: 0 0 8px 0; font-weight: bold; color: #6d28d9;">Diagnóstico:</p>
            <p style="margin: 0 0 12px 0; font-size: 14px;">${personalizedTips.analysis}</p>

            <p style="margin: 0 0 8px 0; font-weight: bold; color: #6d28d9;">Recomendaciones:</p>
            <ul style="padding-left: 16px; margin: 0 0 12px 0;">
              ${personalizedTips.tips.map((t) => `<li style="margin-bottom: 6px; font-size: 14px;">${t.icon} <strong>${t.title}</strong>: ${t.description}</li>`).join("")}
            </ul>

            <p style="margin: 0 0 8px 0; font-weight: bold; color: #6d28d9;">Motivación:</p>
            <p style="margin: 0; font-size: 14px; font-style: italic;">${personalizedTips.motivation}</p>
          </div>
          ` : ""}

          <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 24px;">
            Esta persona aún NO compró. Solo completó el cuestionario.
          </p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}
