"use client";

import { useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP, EASE_CINEMATIC, STAGGER } from "@/lib/gsap";

type SplitRevealProps = {
  children: string;
  className?: string;
  as?: ElementType;
  delay?: number;
};

/**
 * Revelação tipográfica por linha (GSAP SplitText) com máscara.
 * Usado em títulos. Respeita prefers-reduced-motion (mostra texto pleno).
 */
export function SplitReveal({
  children,
  className,
  as,
  delay = 0,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "h2") as ElementType;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      let split: SplitText | null = null;
      const run = () => {
        // aria:"none" — não injeta aria-label (proibido em <p>); split por linha
        // preserva palavras, então o leitor de tela lê o texto normalmente.
        split = new SplitText(el, { type: "lines", mask: "lines", aria: "none" });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1,
          ease: EASE_CINEMATIC,
          stagger: STAGGER,
          delay,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      };

      // Evita split com métricas de fonte fallback antes do swap da Necmato.
      if (document.fonts?.status === "loaded") run();
      else document.fonts?.ready.then(run);

      return () => split?.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
