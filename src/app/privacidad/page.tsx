import { PRODUCT_NAME } from "@/lib/constants";

export default function PrivacidadPage() {
  return (
    <div className="min-h-dvh bg-white px-4 py-8">
      <div className="max-w-2xl mx-auto prose prose-sm prose-gray">
        <h1 className="text-2xl font-bold text-gray-900">
          Política de Privacidad
        </h1>
        <p className="text-sm text-gray-500">Última actualización: Febrero 2026</p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">1. Información que Recopilamos</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {PRODUCT_NAME} recopila la siguiente información personal cuando completás nuestro quiz
          y realizás una compra:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
          <li>Nombre</li>
          <li>Datos físicos proporcionados (peso, altura, edad)</li>
          <li>Preferencias y objetivos de salud</li>
          <li>Información de pago (procesada por MercadoPago)</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">2. Uso de la Información</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Utilizamos tu información exclusivamente para:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
          <li>Personalizar tu plan nutricional</li>
          <li>Procesar tu compra</li>
          <li>Enviarte información sobre tu pedido</li>
          <li>Mejorar nuestros servicios</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">3. Protección de Datos</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          No vendemos, alquilamos ni compartimos tu información personal con terceros con fines
          comerciales. Los pagos son procesados de forma segura a través de MercadoPago, y no
          almacenamos datos de tarjetas de crédito en nuestros servidores.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">4. Cookies y Tecnologías de Seguimiento</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Utilizamos cookies y tecnologías similares para mejorar la experiencia del usuario,
          analizar el tráfico del sitio y personalizar el contenido. Podés configurar tu
          navegador para rechazar cookies.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">5. Tus Derechos</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Conforme a la Ley de Protección de Datos Personales (Ley 25.326), tenés derecho a
          acceder, rectificar y suprimir tus datos personales. Para ejercer estos derechos,
          contactanos por email.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">6. Contacto</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Para consultas sobre esta política de privacidad, podés escribirnos a nuestro
          email de soporte.
        </p>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <a href="/" className="text-pink-600 font-medium text-sm hover:underline">
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
