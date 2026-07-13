"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { getTier } from "@/lib/device-tier";
import { cn } from "@/lib/cn";

/**
 * Galeria horizontal dirigida por scroll vertical (pin + x-translate).
 * Tier A/B desktop: seção pina e o track corre no eixo X (scrub).
 * Tier C / mobile / reduced-motion: fallback = scroll-snap horizontal
 * nativo (o mesmo markup, sem pin) — conteúdo integral sempre.
 */
export function HorizontalGallery({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      if (getTier() === "C") return;
      // mobile/touch: swipe nativo é melhor que pin (spec mov.04 cap B)
      if (matchMedia("(pointer: coarse)").matches) return;

      const dist = () => track.scrollWidth - wrap.clientWidth;
      if (dist() <= 0) return;

      // trava o overflow nativo — o movimento passa a ser do scrub
      wrap.style.overflowX = "hidden";
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top+=96",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        wrap.style.overflowX = "";
      };
    },
    { scope: wrapRef },
  );

  return (
    <div
      ref={wrapRef}
      className={cn(
        "snap-x snap-mandatory overflow-x-auto [scrollbar-width:thin]",
        className,
      )}
    >
      <div ref={trackRef} className="flex w-max gap-6 pb-4">
        {children}
      </div>
    </div>
  );
}
