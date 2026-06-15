"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Smooth scroll (Lenis) sincronizado com o GSAP ticker + ScrollTrigger.
 * - Lenis dirigido pelo ticker do GSAP (autoRaf: false) → 1 só loop, 60fps.
 * - prefers-reduced-motion: desliga o lerp (scroll efetivamente nativo) —
 *   NÃO paramos o Lenis (isso travaria a rolagem); apenas removemos a suavização.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Mantém o ScrollTrigger em sincronia com o scroll virtual do Lenis.
    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    return () => {
      mq.removeEventListener("change", onChange);
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={
        reduce
          ? { autoRaf: false, lerp: 1, smoothWheel: false, syncTouch: false }
          : {
              autoRaf: false,
              lerp: 0.1,
              duration: 1.2,
              smoothWheel: true,
              wheelMultiplier: 1,
              touchMultiplier: 1.5,
            }
      }
    >
      {children}
    </ReactLenis>
  );
}
