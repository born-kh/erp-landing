declare global {
  interface Window {
    ym?: (id: number, method: string, goal: string) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const ymId = Number(import.meta.env.PUBLIC_YANDEX_METRIKA_ID) || 0;

/** Sends a goal to Yandex.Metrika and Google Analytics when they are configured; otherwise does nothing. */
export function track(goal: string) {
  if (typeof window === "undefined") return;
  try {
    if (ymId && window.ym) window.ym(ymId, "reachGoal", goal);
    if (window.gtag) window.gtag("event", goal);
  } catch {
    /* analytics must never break the page */
  }
}
