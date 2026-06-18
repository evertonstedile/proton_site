/**
 * Consentimento de cookies (LGPD + Guia de Cookies da ANPD).
 * Cookies essenciais são sempre ativos; análise/marketing só com opt-in.
 *
 * Hoje o site usa apenas o Vercel Analytics (cookieless) — nada não-essencial
 * dispara. Ao adicionar Meta Pixel, Google Analytics ou tags de remarketing,
 * gate o carregamento em `getCookieConsent() === "accepted"` e ouça o evento
 * "proton-consent-change" para reagir à escolha do usuário em tempo real.
 */
export const CONSENT_KEY = "proton-cookie-consent-v1";
export const CONSENT_EVENT = "proton-consent-change";

export type ConsentValue = "accepted" | "rejected";

/** Lê a escolha persistida. `null` = usuário ainda não decidiu. */
export function getCookieConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}
