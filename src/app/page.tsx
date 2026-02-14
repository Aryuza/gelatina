"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import QuizShell from "@/components/quiz/QuizShell";
import { Suspense } from "react";

function PaymentStatusHandler() {
  const searchParams = useSearchParams();
  const payment = searchParams.get("payment");

  useEffect(() => {
    if (payment === "failure") {
      alert(
        "El pago no pudo procesarse. Por favor intentá de nuevo o usá otro método de pago."
      );
    }
  }, [payment]);

  return null;
}

export default function Home() {
  return (
    <>
      <Suspense>
        <PaymentStatusHandler />
      </Suspense>
      <QuizShell />
    </>
  );
}
