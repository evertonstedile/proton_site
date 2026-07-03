"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { BlueprintLines } from "@/components/brand/BlueprintLines";
import { GoddessLinework } from "@/components/brand/GoddessLinework";

/**
 * HERO — abertura cinematográfica. Vídeo ambiente (loop real M2 noite) +
 * camadas de profundidade + linework técnico + headline cinética por linha.
 * Entrada coordenada com o Preloader via `html.intro-ready` (ver globals.css);
 * saída parallax no scroll (GSAP). Respeita prefers-reduced-motion.
 */
export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const lines = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [videoPaused, setVideoPaused] = useState(false);

  // WCAG 2.2.2: mídia em movimento automático precisa de pausa acessível
  const toggleVideo = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setVideoPaused(false);
    } else {
      v.pause();
      setVideoPaused(true);
    }
  };

  useEffect(() => {
    const v = video.current;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // vídeo só ≥sm — no mobile fica a imagem (menos rede, zero jank de decode)
    const canVideo = window.matchMedia("(min-width: 640px)").matches;
    const onPlaying = () => v?.classList.remove("opacity-0");
    if (v && !reduce && canVideo) {
      v.addEventListener("playing", onPlaying);
      v.play().catch(() => {});
    }
    // safety net: garante a entrada do hero mesmo se o intro falhar
    const t = setTimeout(
      () => document.documentElement.classList.add("intro-ready"),
      4200,
    );
    return () => {
      clearTimeout(t);
      v?.removeEventListener("playing", onPlaying);
    };
  }, []);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const trig = {
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(content.current, {
        yPercent: -18,
        opacity: 0.12,
        ease: "none",
        scrollTrigger: trig,
      });
      gsap.to(media.current, {
        yPercent: 14,
        scale: 1.09,
        ease: "none",
        scrollTrigger: trig,
      });
      gsap.to(lines.current, {
        yPercent: -10,
        opacity: 0,
        ease: "none",
        scrollTrigger: trig,
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="hero-init relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-bg-base"
    >
      {/* MÍDIA — render noturno real + loop cinematográfico (M2) */}
      <div ref={media} className="absolute inset-0 z-0">
        <Image
          src="/hero/hero-noite.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%]"
        />
        {/* sem poster: o next/image acima já é o frame base — poster baixaria
            o JPG original de novo e duplicaria o download do LCP */}
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 hidden h-full w-full object-cover object-[center_42%] opacity-0 transition-opacity duration-[1.4s] ease-cinematic sm:block"
        >
          <source src="/hero/hero-loop.webm" type="video/webm" />
          <source src="/hero/hero-loop.mp4" type="video/mp4" />
        </video>

        {/* watermark da deusa */}
        <GoddessLinework className="absolute right-[-7%] top-1/2 h-[150%] -translate-y-1/2 opacity-[0.05] mix-blend-soft-light" />
        {/* grão cinematográfico */}
        <div className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-overlay" />
        {/* tratamento dark: legibilidade + vinheta */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_0%,transparent_50%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* linework técnico (blueprint) */}
      <div ref={lines} className="pointer-events-none absolute inset-0 z-[1]">
        <BlueprintLines className="bp-wrap absolute inset-0 h-full w-full opacity-50" />
      </div>

      {/* CONTEÚDO */}
      <div
        ref={content}
        className="relative z-10 mx-auto w-full max-w-container px-6 pb-20 sm:px-8 lg:px-12 lg:pb-28"
      >
        <div data-hero="kicker" className="mb-7 flex items-center gap-3 sm:gap-4">
          <span className="h-px w-6 shrink-0 bg-gold-base sm:w-10" />
          <p className="whitespace-nowrap font-sans text-[0.65rem] uppercase tracking-kicker text-gold-base sm:text-small">
            Proton Engenharia &amp; Consultoria
          </p>
          <span className="hidden font-sans text-[0.7rem] uppercase tracking-[0.2em] text-text-muted sm:inline">
            Garopaba/SC
          </span>
        </div>

        <h1 className="hero-head max-w-[17ch] font-display text-display-xl leading-[1.0] text-text-primary">
          <span className="line">
            <span className="line-in">Engenharia para obras</span>
          </span>
          <span className="line">
            <span className="line-in">que não aceitam improviso</span>
          </span>
        </h1>

        <p
          data-hero="sub"
          className="mt-7 max-w-xl font-sans text-body-lg text-text-muted"
        >
          Projetos, arquitetura, regularização e gerenciamento de obras com
          precisão técnica em cada etapa — da leitura do terreno à entrega.
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

      {/* pausa do vídeo ambiente (WCAG 2.2.2) — só onde o vídeo existe (≥sm) */}
      <button
        type="button"
        onClick={toggleVideo}
        aria-label={
          videoPaused ? "Retomar vídeo de fundo" : "Pausar vídeo de fundo"
        }
        className="absolute bottom-6 right-6 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-line text-text-muted transition-colors duration-short hover:border-line-gold hover:text-text-primary sm:flex"
      >
        {videoPaused ? (
          <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current" aria-hidden>
            <path d="M2 1l9 5-9 5z" />
          </svg>
        ) : (
          <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current" aria-hidden>
            <path d="M2 1h3v10H2zM7 1h3v10H7z" />
          </svg>
        )}
      </button>
    </section>
  );
}
