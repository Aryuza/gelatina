"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "gelatina-fit-countdown-end";

export function useCountdown(minutes: number = 15) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  const getEndTime = useCallback(() => {
    if (typeof window === "undefined") return null;
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const end = parseInt(stored, 10);
      if (end > Date.now()) return end;
    }
    const end = Date.now() + minutes * 60 * 1000;
    sessionStorage.setItem(STORAGE_KEY, end.toString());
    return end;
  }, [minutes]);

  useEffect(() => {
    const endTime = getEndTime();
    if (!endTime) return;

    const update = () => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [getEndTime]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const formatted = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  const isExpired = timeLeft <= 0;

  return { timeLeft, formatted, isExpired, minutes: mins, seconds: secs };
}
