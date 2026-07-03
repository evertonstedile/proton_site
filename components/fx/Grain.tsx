// Grain global Cinematic Dark — camada única fixa sobre todo o site.
// Spec §3: feTurbulence baseFrequency ~0.035, opacity ~.04, mix-blend-overlay.
// Server component, zero JS no cliente; abaixo do Preloader (z-200) e do
// CookieConsent (z-60), acima do conteúdo.
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55] opacity-[0.04] mix-blend-overlay"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="proton-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#proton-grain)" />
      </svg>
    </div>
  );
}
