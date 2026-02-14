import { PRODUCT_NAME, PRICE } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export default function TerminosPage() {
  return (
    <div className="min-h-dvh bg-white px-4 py-8">
      <div className="max-w-2xl mx-auto prose prose-sm prose-gray">
        <h1 className="text-2xl font-bold text-gray-900">
          Términos y Condiciones
        </h1>
        <p className="text-sm text-gray-500">Última actualización: Febrero 2026</p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">1. Aceptación de los Términos</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Al acceder y utilizar este sitio web y adquirir {PRODUCT_NAME}, aceptás
          estos términos y condiciones en su totalidad.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">2. Producto y Servicio</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {PRODUCT_NAME} es un suplemento nutricional acompañado de un plan personalizado.
          El precio del producto es de {formatPrice(PRICE)} (pago único). Los resultados
          pueden variar según cada persona.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">3. Pagos</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Todos los pagos se procesan a través de MercadoPago. Aceptamos tarjeta de crédito,
          débito, transferencia bancaria y efectivo en puntos de pago. El precio es en pesos
          argentinos (ARS).
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">4. Garantía de Devolución</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Ofrecemos una garantía de satisfacción de 30 días. Si no estás conforme con el
          producto, podés solicitar el reembolso completo dentro de los 30 días posteriores
          a la compra contactándonos por email.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">5. Aviso de Salud</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {PRODUCT_NAME} es un suplemento alimentario y no reemplaza una alimentación
          equilibrada ni el consejo médico profesional. Consultá a tu médico antes de
          comenzar cualquier programa nutricional, especialmente si estás embarazada,
          amamantando o tenés alguna condición médica.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">6. Propiedad Intelectual</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Todo el contenido de este sitio web, incluyendo textos, imágenes, diseños y logos,
          es propiedad de {PRODUCT_NAME} y está protegido por las leyes de propiedad
          intelectual vigentes.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">7. Limitación de Responsabilidad</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Los resultados individuales pueden variar. No garantizamos resultados específicos
          de pérdida de peso. Las testimoniales representan experiencias individuales y no
          deben interpretarse como resultados típicos.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">8. Jurisdicción</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Estos términos se rigen por las leyes de la República Argentina. Cualquier
          controversia será sometida a los tribunales competentes de la Ciudad Autónoma
          de Buenos Aires.
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
