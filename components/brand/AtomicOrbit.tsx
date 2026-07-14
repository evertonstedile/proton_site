import { cn } from "@/lib/cn";

type AtomicOrbitProps = {
  className?: string;
  /** liga a rotação contínua (loader / hover / microdetalhe do hero) */
  animated?: boolean;
  title?: string;
};

/**
 * Assinatura de marca — órbita atômica (do símbolo Proton).
 * Stroke dourado; 3 órbitas elípticas + núcleo + elétrons.
 * Rotação via classe utilitária `animate-orbit-spin` (respeita reduced-motion via CSS global).
 */
export function AtomicOrbit({
  className,
  animated = false,
  title = "Proton",
}: AtomicOrbitProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      className={cn("text-accent", className)}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className={animated ? "motion-safe:animate-orbit-spin" : undefined}
        style={{ transformOrigin: "50% 50%" }}
      >
        <ellipse cx="50" cy="50" rx="46" ry="18" />
        <ellipse
          cx="50"
          cy="50"
          rx="46"
          ry="18"
          transform="rotate(60 50 50)"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="46"
          ry="18"
          transform="rotate(120 50 50)"
        />
      </g>
      <circle cx="50" cy="50" r="5" fill="currentColor" className="text-accent" />
    </svg>
  );
}
