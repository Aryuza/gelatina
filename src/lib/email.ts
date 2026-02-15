import nodemailer from "nodemailer";

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
        subject: `¡Aquí tienes tu Plan Personalizado, ${name}! 🥗`,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #fce7f3; border-radius: 24px; overflow: hidden;">
        <div style="background-color: #db2777; padding: 40px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">¡Tu transformación comienza hoy!</h1>
        </div>
        <div style="padding: 30px; color: #374151; line-height: 1.6;">
          <p>Hola <strong>${name}</strong>,</p>
          <p>¡Muchas gracias por confiar en <strong>Gelatina Fit</strong>! Tu compra fue exitosa y ya puedes acceder a todo tu material personalizado.</p>
          
          <div style="background-color: #fff1f2; padding: 20px; border-radius: 16px; margin: 25px 0;">
            <p style="margin-top: 0; font-weight: bold; color: #9f1239;">📝 Acceso a tus guías:</p>
            <p>Puedes descargar tu plan directamente desde tu panel de usuario o usando los siguientes botones:</p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://gelatina-delta.vercel.app/gracias" style="background-color: #db2777; color: white; padding: 12px 25px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">Ver Mi Dashboard →</a>
            </div>
          </div>

          <p><strong>Lo que sigue ahora:</strong></p>
          <ul style="padding-left: 20px;">
            <li>Descarga tus PDFs (Plan Nutricional, Recetario, Ejercicios).</li>
            <li>Lee la guía de preparación antes de empezar.</li>
            <li>¡Prepárate para ver resultados increíbles!</li>
          </ul>

          <p style="margin-top: 30px;">Si tienes alguna duda, responde a este email o contáctanos por WhatsApp.</p>
          
          <hr style="border: 0; border-top: 1px solid #fce7f3; margin: 30px 0;">
          
          <p style="font-size: 14px; color: #9ca3af; text-align: center;">
            &copy; ${new Date().getFullYear()} Gelatina Fit. Todos los derechos reservados.
          </p>
        </div>
      </div>
    `,
    };

    return transporter.sendMail(mailOptions);
}
