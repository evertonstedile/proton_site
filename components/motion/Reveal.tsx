"use client";

import { useRef, type ReactNode } from "react";
import {
  gsap,
  useGSAP,
  EASE_CINEMATIC,
  DUR_REVEAL,
  STAGGER,
} from "@/lib/gsap";
import type { PolymorphicTag, RenderableTag } from "@/lib/polymorphic";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: PolymorphicTag;
  /** deslocamento vertical inicial (px) */
  y?: number;
  delay?: number;
  /** anima os filhos diretos em sequência (stagger) em vez do container */
  stagger?: boolean;
};

/**
 * Reveal on scroll — fade + translateY sutil (~24px), ease cinematográfico.
 * Respeita prefers-reduced-motion (mostra sem animar).
 */
export function Reveal({
  children,
  className,
  as,
  y = 24,
  delay = 0,
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as unknown as RenderableTag;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets: gsap.TweenTarget = stagger ? el.children : el;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: DUR_REVEAL,
          ease: EASE_CINEMATIC,
          delay,
          stagger: stagger ? STAGGER : 0,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
