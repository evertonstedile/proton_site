"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, EASE_CINEMATIC } from "@/lib/gsap";

/**
 * Contador animado (conta de 0 ao alvo ao entrar na viewport).
 * Formata com separador pt-BR. Respeita prefers-reduced-motion (mostra alvo).
 */
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const fmt = (n: number) => Math.round(n).toLocaleString("pt-BR");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplay(fmt(value));
        return;
      }

      const obj = { n: 0 };
      gsap.to(obj, {
        n: value,
        duration: 2,
        ease: EASE_CINEMATIC,
        onUpdate: () => setDisplay(fmt(obj.n)),
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
