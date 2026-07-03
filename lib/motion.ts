// Motor de experiência: helpers de motion compartilhados (Task 2 SOTD).
// prefersReduced() — guard universal: neutraliza animações/3D quando o usuário
// pediu menos movimento. Roda client-side; em SSR retorna false (sem window).
export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Curva "proton" no formato que o framer-motion consome (array de bezier).
// Espelha o CustomEase "proton" registrado em lib/gsap.ts.
export const EASE_PROTON = [0.2, 0.7, 0.2, 1] as const;
