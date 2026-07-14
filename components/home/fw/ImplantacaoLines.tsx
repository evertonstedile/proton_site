"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Linhas de implantação discretas sobre a foto do território (cap. A):
 * baseline do terreno + contorno do volume, dash-reveal no scroll.
 * Decorativas (aria-hidden), abstratas — nada de HUD nem dado fictício.
 */
export function ImplantacaoLines({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const paths = ref.current?.querySelectorAll("path");
      if (!paths?.length) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 100 62"
      preserveAspectRatio="none"
      className={className}
      fill="none"
    >
      {/* baseline do terreno */}
      <path
        d="M2 52 L 42 49 L 72 51 L 98 47"
        stroke="rgba(198,139,75,0.55)"
        strokeWidth="0.25"
      />
      {/* contorno abstrato do volume implantado */}
      <path
        d="M38 22 L 78 20 L 79 42 L 39 45 Z"
        stroke="rgba(236,233,226,0.4)"
        strokeWidth="0.2"
      />
    </svg>
  );
}
