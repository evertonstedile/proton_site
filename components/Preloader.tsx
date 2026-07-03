"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { BrandMark } from "@/components/brand/BrandMark";
import { AtomicOrbit } from "@/components/brand/AtomicOrbit";

/**
 * Intro cinematográfico — cortina de abertura (1x por sessão).
 * Sequência: símbolo se forma → barra de precisão preenche → wordmark sobe →
 * libera `intro-ready` (dispara a entrada do hero) → cortina sobe e revela.
 *
 * Robustez (ordem de defesa):
 * - Script inline no <head> (layout) seta `html.intro-skip` PRÉ-PAINT em
 *   visita repetida / reduced-motion / storage bloqueado → a cortina nem
 *   chega a pintar (CSS `display:none`, ver globals).
 * - Estados iniciais dos elementos internos vivem no CSS (globals), não em
 *   `gsap.from` → sem flash do frame final antes da hidratação.
 * - `SEEN_KEY` só é gravado quando o intro TOCOU (fim da timeline) — senão o
 *   StrictMode (dev) marcaria como visto sem nunca exibir.
 * - Failsafe próprio: se o GSAP falhar, a cortina sai e o hero é liberado.
 * - JS desligado → <noscript> no layout esconde a cortina.
 */
const SEEN_KEY = "proton-intro-seen";

function markReady() {
  document.documentElement.classList.add("intro-ready");
}

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const html = document.documentElement;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      let seen = false;
      try {
        seen = Boolean(sessionStorage.getItem(SEEN_KEY));
      } catch {
        seen = true; // storage bloqueado → nunca arriscar cortina presa
      }

      if (html.classList.contains("intro-skip") || seen || reduce) {
        markReady();
        setDone(true);
        return;
      }

      // cortina na frente = scroll travado (conteúdo abaixo não navega)
      html.classList.add("intro-lock");
      const finish = () => {
        try {
          sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
        html.classList.remove("intro-lock");
        setDone(true);
      };

      // failsafe: nada pode prender o site atrás da cortina
      const bail = window.setTimeout(() => {
        markReady();
        finish();
      }, 6500);

      const tl = gsap.timeline({
        defaults: { ease: "cinematic" },
        onComplete: () => {
          window.clearTimeout(bail);
          finish();
        },
      });

      tl.fromTo(
        "[data-pl='mark']",
        { autoAlpha: 0, scale: 0.82 },
        { autoAlpha: 1, scale: 1, duration: 1 },
      )
        .to(
          "[data-pl='bar-fill']",
          { scaleX: 1, duration: 1.15, ease: "power2.inOut" },
          0.15,
        )
        .fromTo(
          "[data-pl='word'] > span",
          { yPercent: 115 },
          { yPercent: 0, stagger: 0.05, duration: 0.7 },
          0.35,
        )
        .fromTo(
          "[data-pl='meta']",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6 },
          0.7,
        )
        // libera a entrada do hero um instante ANTES da cortina subir
        .add(markReady, "+=0.25")
        .to(
          "[data-pl='inner']",
          { autoAlpha: 0, y: -16, duration: 0.5 },
          "+=0.05",
        )
        .to(
          root.current,
          { yPercent: -100, duration: 1.05, ease: "power4.inOut" },
          "<0.12",
        );

      return () => {
        window.clearTimeout(bail);
        html.classList.remove("intro-lock");
      };
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      data-preloader
      aria-hidden
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg-surface"
    >
      {/* grão para coesão com o resto */}
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.05] mix-blend-overlay" />

      <div
        data-pl="inner"
        className="relative flex flex-col items-center px-8"
      >
        <div data-pl="mark" className="relative h-28 w-28 sm:h-32 sm:w-32">
          <AtomicOrbit
            animated
            className="absolute left-1/2 top-1/2 h-[185%] w-[185%] -translate-x-1/2 -translate-y-1/2 opacity-[0.18]"
          />
          <BrandMark decorative className="relative h-full w-full" />
        </div>

        <div
          data-pl="word"
          className="mt-9 flex overflow-hidden font-display text-[1.7rem] uppercase tracking-[0.42em] text-text-primary sm:text-[2rem]"
        >
          {"PROTON".split("").map((c, i) => (
            <span key={i} className="inline-block">
              {c}
            </span>
          ))}
        </div>

        {/* barra de precisão */}
        <div className="mt-7 h-px w-44 overflow-hidden bg-line sm:w-56">
          <div
            data-pl="bar-fill"
            className="h-full w-full origin-left scale-x-0 bg-gold-metallic"
          />
        </div>

        <p
          data-pl="meta"
          className="mt-5 font-sans text-[0.6rem] uppercase tracking-[0.3em] text-text-muted"
        >
          Engenharia &amp; Consultoria — Garopaba/SC
        </p>
      </div>
    </div>
  );
}
