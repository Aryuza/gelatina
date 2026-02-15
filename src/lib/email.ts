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
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #fce7f3; border-radius: 24px; overflow: hidden; background-color: #fff;">
        <div style="background-color: #db2777; padding: 40px 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">¡Muchas gracias por tu compra!</h1>
          <p style="margin-top: 10px; font-size: 18px; opacity: 0.9;">Tu transformación con Gelatina Fit empieza ahora.</p>
        </div>
        
        <div style="padding: 30px; color: #374151; line-height: 1.6;">
          <p>Hola <strong>${name}</strong>,</p>
          <p>Estamos muy felices de acompañarte en este camino. Aquí tienes acceso inmediato a todo tu material y a nuestra área exclusiva.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://gelatina-delta.vercel.app/gracias" style="background-color: #db2777; color: white; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; font-size: 18px; box-shadow: 0 4px 15px rgba(219, 39, 119, 0.3);">🚀 ACCEDER AL ÁREA DE MIEMBROS</a>
          </div>

          <div style="background-color: #fff1f2; padding: 25px; border-radius: 20px; margin: 30px 0; border: 1px solid #fecdd3;">
            <p style="margin-top: 0; font-weight: bold; color: #9f1239; font-size: 18px;">📚 Tus Guías Digitales (PDF):</p>
            <ul style="padding-left: 0; list-style: none;">
              <li style="margin-bottom: 10px;">✅ <a href="https://drive.google.com/file/d/18iwxPDZfdpl_fTCVsWEJypKljvIEa7Bv/view?usp=sharing" style="color: #db2777; text-decoration: underline;">Plan Personalizado Gelatina Fit</a></li>
              <li style="margin-bottom: 10px;">✅ <a href="https://drive.google.com/file/d/1vanSRfPEbajxH6LG9lQsiVuK1CTLq_iW/view?usp=sharing" style="color: #db2777; text-decoration: underline;">Recetas Detox para Deshinchar</a></li>
              <li style="margin-bottom: 10px;">✅ <a href="https://drive.google.com/file/d/1HpzCMBvvjHl4B_7N0CZTTELm2KdbwdtD/view?usp=sharing" style="color: #db2777; text-decoration: underline;">Dieta Detox 21 Días</a></li>
              <li style="margin-bottom: 10px;">✅ <a href="https://drive.google.com/file/d/1iC8L8Mxo_cg7qTFbDjD0HR9rUxt0e-63/view?usp=sharing" style="color: #db2777; text-decoration: underline;">Dieta Antiinflamatoria</a></li>
              <li style="margin-bottom: 10px;">✅ <a href="https://drive.google.com/file/d/1zOWjEAcjivrJY2b4uossH0dLRjBwSa1n/view?usp=sharing" style="color: #db2777; text-decoration: underline;">Jugos para Perder Peso</a></li>
            </ul>
            <p style="font-size: 14px; color: #e11d48; margin-bottom: 0;">* Tip: Guarda estos links o descarga los archivos en tu celular/PC.</p>
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
