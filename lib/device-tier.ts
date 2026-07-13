/**
 * Tiers de experiência (framework §10):
 * A — desktop potente: WebGL, pins, scrubs.
 * B — notebook/celular moderno: simplificado (sem canvas pesado, 720p).
 * C — limitado / reduced-motion / save-data: estático, scroll nativo,
 *     conteúdo integral (a home Tier C nasce pronta — F2).
 * SSR retorna "C": o servidor nunca assume capacidade.
 */
export type Tier = "A" | "B" | "C";

export function getTier(): Tier {
  if (typeof window === "undefined") return "C";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mem = (navigator as { deviceMemory?: number }).deviceMemory ?? 8;
  const save = (navigator as { connection?: { saveData?: boolean } }).connection
    ?.saveData;
  if (reduced || save || mem <= 2) return "C";
  const coarse = matchMedia("(pointer: coarse)").matches;
  return coarse || mem <= 4 ? "B" : "A";
}
