"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { AtomicOrbit } from "@/components/brand/AtomicOrbit";
import { GoddessLinework } from "@/components/brand/GoddessLinework";

/**
 * HERO da Home — momento cinematográfico nº1.
 * Entrada em CSS (ver globals .hero-init) → pinta no FCP, protege o LCP mobile.
 * Aqui só o parallax de saída no scroll (GSAP). Respeita prefers-reduced-motion.
 * Mídia e copy são PLACEHOLDER (B2/B3).
 */
export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.to(content.current, {
        yPercent: -14,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(media.current, {
        yPercent: 16,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="hero-init relative flex h-[100svh] min-h-[600px] w-full items-end overflow-hidden bg-bg-base"
    >
      {/* MÍDIA (PLACEHOLDER) — trocar por <video>/<Image> de obra real (B3) */}
      <div ref={media} data-hero="media" className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_72%_18%,#1c1c20_0%,#0b0b0d_46%,#000_100%)]" />
        <GoddessLinework className="absolute right-[-8%] top-1/2 h-[150%] -translate-y-1/2 opacity-[0.05]" />
        <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
      </div>

      {/* órbita atômica — assinatura de marca */}
      <AtomicOrbit
        animated
        title="Proton"
        className="pointer-events-none absolute right-6 top-24 z-10 h-28 w-28 opacity-20 sm:right-12 sm:h-40 sm:w-40 lg:top-32"
      />

      {/* CONTEÚDO */}
      <div
        ref={content}
        className="relative z-10 mx-auto w-full max-w-container px-6 pb-20 sm:px-8 lg:px-12 lg:pb-28"
      >
        <p
          data-hero="kicker"
          className="mb-6 font-sans text-small uppercase tracking-kicker text-gold-base"
        >
          Proton Engenharia &amp; Consultoria &middot; Garopaba/SC
        </p>

        <h1
          data-hero="headline"
          className="max-w-4xl font-display text-display-xl leading-[1.04] text-text-primary"
        >
          Engenharia, arquitetura e regularização — soluções completas, do
          projeto à obra entregue.
        </h1>

        <p
          data-hero="sub"
          className="mt-7 max-w-xl font-sans text-body-lg text-text-muted"
        >
          Precisão técnica e sofisticação em cada etapa, do estudo de
          viabilidade à entrega.
        </p>

        <div data-hero="cta" className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/contato" variant="primary" size="lg">
            Pedir orçamento
          </Button>
          <Button href="/obras" variant="ghost" size="lg">
            Ver obras
          </Button>
        </div>
      </div>

      {/* indicador de scroll */}
      <div
        data-hero="cue"
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-text-muted">
          Rolar
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-line">
          <span className="absolute left-0 top-0 h-4 w-px animate-[heroScroll_2s_ease-in-out_infinite] bg-gold-base" />
        </span>
      </div>
    </section>
  );
}
