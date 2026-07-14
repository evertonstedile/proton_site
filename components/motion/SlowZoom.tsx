"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * Aproximação lenta por scroll (câmera com peso — framework §11).
 * Escala o conteúdo interno de 1.0 até maxScale (DNA: zoom ≤ 1.06) enquanto
 * o container cruza a viewport. Reduced-motion: estático.
 * Usar DENTRO de um wrapper overflow-hidden (o crop é de quem chama).
 */
export function SlowZoom({
  children,
  className,
  maxScale = 1.05,
}: {
  children: ReactNode;
  className?: string;
  maxScale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        el,
        { scale: 1 },
        {
          scale: maxScale,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("h-full w-full will-change-transform", className)}>
      {children}
    </div>
  );
}
