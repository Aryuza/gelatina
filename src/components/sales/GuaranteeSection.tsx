"use client";

export default function GuaranteeSection() {
  return (
    <div className="bg-white rounded-2xl p-5 border-2 border-green-200 text-center space-y-3">
      <div className="w-16 h-16 mx-auto rounded-full bg-green-50 flex items-center justify-center">
        <span className="text-3xl">🛡️</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900">
        Garantía de Satisfacción 30 Días
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        Si no ves resultados en los primeros 30 días, te devolvemos el{" "}
        <strong>100% de tu dinero</strong>. Sin preguntas, sin letra chica.
        Tu satisfacción es nuestra prioridad.
      </p>
    </div>
  );
}
