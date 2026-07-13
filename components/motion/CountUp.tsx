"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE_CINEMATIC } from "@/lib/gsap";

/**
 * Count-up SSR-safe: o valor FINAL é renderizado no servidor (SEO/A11y —
 * regra do framework: valor final sempre no HTML). No cliente, se motion
 * for permitido, zera e anima até o alvo via textContent (sem React state,
 * sem re-render). Sem JS / reduced-motion: número já está na página.
 */
export function CountUp({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => Math.round(n).toLocaleString("pt-BR") + suffix;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const obj = { n: 0 };
      el.textContent = fmt(0);
      gsap.to(obj, {
        n: value,
        duration: 1.8,
        ease: EASE_CINEMATIC,
        onUpdate: () => {
          el.textContent = fmt(obj.n);
        },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {fmt(value)}
    </span>
  );
}
