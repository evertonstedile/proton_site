"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReduced } from "@/lib/motion";

/**
 * Smooth scroll (Lenis) — só em desktop com ponteiro fino e sem reduced-motion.
 * - Toque / coarse pointer / reduced-motion → scroll NATIVO (children direto):
 *   Lenis prejudica inércia em touch e contraria o pedido de menos movimento.
 * - Desktop: Lenis dirigido pelo ticker do GSAP (autoRaf: false) → 1 só loop.
 * - Decisão no mount (client): SSR/primeiro render passa children direto p/
 *   evitar hydration mismatch; matchMedia só existe no cliente.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [useLenis, setUseLenis] = useState(false);

  // 1) Decide no mount (client) se usa Lenis — dispara o render do ReactLenis.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine && !prefersReduced()) setUseLenis(true);
  }, []);

  // 2) Depois que o ReactLenis montou (useLenis true → lenisRef populado),
  //    liga o ticker do GSAP e a sincronia do ScrollTrigger.
  useEffect(() => {
    if (!useLenis) return;

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, [useLenis]);

  if (!useLenis) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
