"use client";

import { useState, useEffect, useCallback } from "react";

const NAMES = [
  "Romina", "Camila", "Valentina", "Florencia", "Luciana", "Sofía",
  "Martina", "Julieta", "Carolina", "Paula", "Agustina", "Milagros",
  "Rocío", "Daniela", "Celeste", "Natalia", "María José", "Belén",
  "Fernanda", "Guadalupe", "Pilar", "Antonella", "Tamara", "Andrea",
  "Brenda", "Soledad", "Eugenia", "Marcela", "Lorena", "Yanina",
];

const CITIES = [
  "CABA", "San Isidro", "La Plata", "Córdoba", "Rosario", "Mendoza",
  "Tucumán", "Santa Fe", "Mar del Plata", "Salta", "San Miguel",
  "Quilmes", "Lomas de Zamora", "Morón", "Lanús", "Avellaneda",
  "Tigre", "Pilar", "Vicente López", "Bahía Blanca", "Neuquén",
  "Resistencia", "Posadas", "San Juan", "Paraná",
];

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomMinutes(): string {
  const min = Math.floor(Math.random() * 12) + 1;
  return `hace ${min} min`;
}

export default function LivePurchaseToast() {
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState({ name: "", city: "", time: "" });

  const showToast = useCallback(() => {
    setToast({
      name: random(NAMES),
      city: random(CITIES),
      time: randomMinutes(),
    });
    setVisible(true);

    setTimeout(() => setVisible(false), 4000);
  }, []);

  useEffect(() => {
    // First toast after 8-15 seconds
    const initial = setTimeout(showToast, 8000 + Math.random() * 7000);

    // Recurring toasts every 15-30 seconds
    const interval = setInterval(() => {
      showToast();
    }, 15000 + Math.random() * 15000);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, [showToast]);

  return (
    <div
      className={`fixed bottom-16 left-3 z-40 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-3.5 py-2.5 flex items-center gap-2.5 max-w-[260px]">
        <span className="text-lg shrink-0">🛒</span>
        <div>
          <p className="text-xs text-gray-800 font-semibold leading-tight">
            {toast.name} de {toast.city}
          </p>
          <p className="text-[10px] text-gray-400">{toast.time}</p>
        </div>
      </div>
    </div>
  );
}
