// Analytics helpers - ready for Meta Pixel / GTM integration
// Replace with actual implementation when pixel IDs are available

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  // Meta Pixel
  const win = window as unknown as Record<string, (...args: unknown[]) => void>;
  if (typeof win.fbq === "function") {
    win.fbq("track", eventName, params);
  }

  // Data layer for GTM
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: eventName, ...params });
  }

  // Debug in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${eventName}`, params);
  }
}

export function trackQuizStart() {
  trackEvent("quiz_start");
}

export function trackStepComplete(step: number, stepName: string) {
  trackEvent("step_complete", { step, stepName });
}

export function trackStepView(step: number) {
  trackEvent(`Step${step}`);
}

export function trackQuizComplete() {
  trackEvent("quiz_complete");
}

export function trackBeginCheckout(price: number) {
  trackEvent("begin_checkout", { value: price, currency: "ARS" });
}

export function trackPurchase(price: number) {
  trackEvent("purchase", { value: price, currency: "ARS" });
}
