import { cn } from "@/lib/cn";

/**
 * Poster estático do átomo (Task 4 SOTD) — fallback do HeroAtom para
 * reduced-motion, sem WebGL2, contextlost, SSR e pré-`intro-ready`.
 * Mesma composição da cena 3D (núcleo icosaédrico + 3 órbitas + elétrons),
 * linework no token `--accent` (estilo do brand/AtomicOrbit).
 *
 * DESVIO registrado (commit): o plano pedia `public/hero/atom-poster.webp`;
 * SVG inline = nítido em qualquer DPR, ~1KB, zero requisição de rede.
 */
export function AtomPoster({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className={cn("text-accent", className)}
    >
      {/* órbitas */}
      <g fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.5">
        <ellipse cx="100" cy="100" rx="88" ry="34" />
        <ellipse cx="100" cy="100" rx="88" ry="34" transform="rotate(60 100 100)" />
        <ellipse cx="100" cy="100" rx="88" ry="34" transform="rotate(120 100 100)" />
      </g>
      {/* núcleo — icosaedro em linework 2D */}
      <g fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.9">
        <circle cx="100" cy="100" r="9" />
        <path d="M100 91l7.8 4.5v9L100 109l-7.8-4.5v-9z" />
        <path d="M100 91v18M92.2 95.5l15.6 9M107.8 95.5l-15.6 9" />
      </g>
      <circle cx="100" cy="100" r="2.4" fill="currentColor" />
      {/* elétrons (sobre as órbitas) */}
      <g fill="currentColor" opacity="0.85">
        <circle cx="188" cy="100" r="2" />
        <circle cx="56" cy="24" r="2" />
        <circle cx="144" cy="24" r="1.6" />
        <circle cx="12" cy="100" r="1.3" opacity="0.6" />
      </g>
    </svg>
  );
}
