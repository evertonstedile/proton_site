"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** intensidade do deslocamento; positivo = sobe ao rolar */
  speed?: number;
};

/**
 * Parallax de scroll (scrub). Respeita prefers-reduced-motion (estático).
 */
export function Parallax({ children, className, speed = 12 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.to(el, {
        yPercent: -speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
