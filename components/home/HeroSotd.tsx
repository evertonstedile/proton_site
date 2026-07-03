"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Scene } from "@/components/gl/Scene";
import { AtomPoster } from "@/components/gl/AtomPoster";
import { SoundToggle } from "@/components/SoundToggle";
import { Button } from "@/components/ui/Button";

/**
 * HERO SOTD (Task 4) — átomo 3D (marca como objeto espacial) + type display HTML.
 * - LCP = type HTML: pinta no FCP (sob a cortina na 1ª visita — mesma mecânica
 *   que protegia o LCP no hero antigo via imagem); canvas e chunk 3D FORA do
 *   caminho crítico (dynamic ssr:false + mount só pós-`intro-ready`).
 * - Scroll: o hero é o trigger (#hero-sotd) — progress 0→1 desmonta o átomo em
 *   blueprint (ver HeroAtom). Reduced-motion/sem WebGL → AtomPoster estático.
 * - Copy [LEI — verbatim]: display 2 linhas + sub + CTA "Pedir orçamento".
 * - Acento ouro em 2 elementos só: átomo + CTA primário.
 */

// chunk 3D separado: pré-aquecido pelo Preloader (import no progresso real)
const HeroAtom = dynamic(
  () => import("@/components/gl/HeroAtom").then((m) => m.HeroAtom),
  { ssr: false },
);

export function HeroSotd() {
  const [ready, setReady] = useState(false);

  // canvas monta só pós-intro-ready (gate de LCP) + safety net herdado do
  // hero antigo: nada pode prender a entrada se o intro falhar.
  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("intro-ready")) {
      setReady(true);
      return;
    }
    const mo = new MutationObserver(() => {
      if (html.classList.contains("intro-ready")) {
        setReady(true);
        mo.disconnect();
      }
    });
    mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    const t = window.setTimeout(() => html.classList.add("intro-ready"), 4200);
    return () => {
      mo.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  // mobile + DPR alto → sem antialias (orçamento immersive-3d). `ready` só é
  // true no cliente, então window é seguro aqui.
  const glProps =
    ready &&
    window.devicePixelRatio > 1.5 &&
    window.matchMedia("(max-width: 768px)").matches
      ? { antialias: false }
      : undefined;

  const poster = <AtomPoster className="h-full w-full" />;

  return (
    <section
      id="hero-sotd"
      className="hero-init hero-sotd relative flex h-[100svh] min-h-[640px] w-full items-center overflow-hidden bg-bg"
    >
      {/* átomo off-axis (direita, levemente acima do centro) atrás do type */}
      <div
        aria-hidden
        className="absolute -right-[24vw] top-1/2 z-0 aspect-square w-[min(120vw,860px)] -translate-y-[54%] sm:-right-[10vw] lg:right-[1vw]"
      >
        {ready ? (
          <Scene eager poster={poster} className="h-full w-full" glProps={glProps}>
            <HeroAtom />
          </Scene>
        ) : (
          poster
        )}
      </div>

      {/* CONTEÚDO — type na frente (z-10), LCP element */}
      <div className="relative z-10 mx-auto w-full max-w-container px-6 sm:px-8 lg:px-12">
        <h1 className="font-sans font-bold uppercase leading-[0.92] tracking-[-0.03em] text-fg text-[clamp(3rem,10vw,9.5rem)]">
          {/* assimetria intencional: 1ª linha recuada, 2ª flush (a mais larga) */}
          <span className="line sm:pl-[0.9em]">
            <span className="line-in">ENGENHARIA</span>
          </span>
          <span className="line">
            <span className="line-in">SEM IMPROVISO</span>
          </span>
        </h1>

        <p
          data-hero="sub"
          className="mt-8 max-w-xl font-sans text-body-lg text-fg-muted sm:ml-[0.5em]"
        >
          Projetos, regularização e gerenciamento de obras em Garopaba/SC — da
          leitura do terreno à entrega.
        </p>

        <div data-hero="cta" className="mt-10 sm:ml-[0.5em]">
          <Button href="/contato" variant="primary" size="lg">
            Pedir orçamento
          </Button>
        </div>
      </div>

      {/* som ambiente — mute-first [LEI]; escondido atrás de NEXT_PUBLIC_SOUND */}
      <SoundToggle className="absolute bottom-6 right-6 z-10" />
    </section>
  );
}
