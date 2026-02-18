"use client";

interface StickyCheckoutBarProps {
  onCheckout: () => void;
  loading?: boolean;
}

export default function StickyCheckoutBar({ onCheckout, loading }: StickyCheckoutBarProps) {
  const scrollToOffer = () => {
    const el = document.getElementById("plan-acelerado");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-500 to-pink-600" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="max-w-md mx-auto px-4 py-3">
        <button
          onClick={scrollToOffer}
          disabled={loading}
          className="w-full bg-white text-pink-600 font-bold py-3 rounded-xl active:scale-[0.97] transition-transform disabled:opacity-50 text-sm shadow-md"
        >
          Quiero mi plan personalizado →
        </button>
      </div>
    </div>
  );
}
