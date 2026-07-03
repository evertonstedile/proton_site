"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, EASE_PROTON } from "@/lib/gsap";
import { BrandMark } from "@/components/brand/BrandMark";
import { AtomicOrbit } from "@/components/brand/AtomicOrbit";

/**
 * Intro cinematográfico — cortina de abertura (1x por sessão) com progresso REAL.
 * Sequência: símbolo se forma → percentual/barra acompanham o carregamento real
 * dos assets → wordmark sobe → libera `intro-ready` (dispara a entrada do hero)
 * → cortina sobe e revela.
 *
 * Progresso real (Task 3 SOTD): `Promise.allSettled` rastreia o carregamento dos
 * assets pesados do hero. Cada promessa resolvida incrementa a fração; o número
 * (serif, tabular) e a barra `scaleX` seguem essa fração animada (nunca salto
 * seco). Timeout de rede de 4s força 100% e segue. Skippable após 400ms.
 *
 * Robustez (ordem de defesa — PRESERVAR):
 * - Script inline no <head> (layout) seta `html.intro-skip` PRÉ-PAINT em
 *   visita repetida / reduced-motion / storage bloqueado → a cortina nem
 *   chega a pintar (CSS `display:none`, ver globals).
 * - Estados iniciais dos elementos internos vivem no CSS (globals), não em
 *   `gsap.from` → sem flash do frame final antes da hidratação.
 * - `SEEN_KEY` só é gravado quando o intro TOCOU (dentro de `finish`) — senão o
 *   StrictMode (dev) marcaria como visto sem nunca exibir.
 * - Failsafe próprio (bail 6.5s): se algo prender, a cortina sai e o hero é
 *   liberado — última linha de defesa.
 * - `finish` é `once`-guarded: onComplete da timeline, skip e bail podem
 *   dispará-lo, mas ele executa UMA vez só.
 * - JS desligado → <noscript> no layout esconde a cortina.
 */
const SEEN_KEY = "proton-intro-seen";

function markReady() {
  document.documentElement.classList.add("intro-ready");
}

/**
 * Promessas de assets pesados a esperar antes de revelar o hero. Lista
 * extensível: cada item resolvido incrementa a fração do progresso. Rejeições
 * contam como resolvidas (não travam a cortina).
 */
function heroAssetPromises(): Promise<unknown>[] {
  const list: Promise<unknown>[] = [
    // (a) fontes prontas — evita FOUT no headline do hero logo após o reveal.
    document.fonts?.ready ?? Promise.resolve(),
    // (b) frame base do hero decodificado (mesmo src do <Image> do Hero).
    //     404 futuro / decode falho → catch, conta como resolvida.
    (() => {
      const img = new Image();
      img.src = "/hero/hero-noite.jpg";
      return img.decode().catch(() => {});
    })(),
    // Task 4 adiciona: import("@/components/gl/HeroAtom") — preload do chunk 3D.
  ];
  return list;
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

      let finished = false;
      const finish = () => {
        if (finished) return; // once-guard: onComplete + skip + bail
        finished = true;
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

      // ---- progresso real -------------------------------------------------
      const promises = heroAssetPromises();
      const total = promises.length || 1;
      let resolved = 0;
      // proxy animado: `p` = fração exibida (suavizada), nunca salta.
      const prog = { p: 0 };
      const percentEl = root.current?.querySelector<HTMLElement>(
        "[data-pl='percent']",
      );
      const renderProgress = () => {
        const pct = Math.round(prog.p * 100);
        if (percentEl) percentEl.textContent = String(pct).padStart(2, "0");
        gsap.set("[data-pl='bar-fill']", { scaleX: prog.p });
      };
      const animateTo = (target: number) =>
        gsap.to(prog, {
          p: target,
          duration: 0.5,
          ease: EASE_PROTON,
          snap: { p: 0.01 }, // passos de 1%
          onUpdate: renderProgress,
          overwrite: true,
        });

      const bump = () => {
        resolved += 1;
        animateTo(resolved / total);
      };
      promises.forEach((pr) => Promise.resolve(pr).then(bump, bump));

      // entrada do símbolo (imediata; independe dos assets)
      const introTl = gsap.timeline({ defaults: { ease: EASE_PROTON } });
      introTl.fromTo(
        "[data-pl='mark']",
        { autoAlpha: 0, scale: 0.82 },
        { autoAlpha: 1, scale: 1, duration: 0.9 },
      );

      // ---- timeline de saída (só monta quando o progresso chega a 100%) ---
      let exitTl: gsap.core.Timeline | null = null;
      const netTimeout = window.setTimeout(forceComplete, 4000);

      function startExit() {
        if (exitTl) return; // monta uma vez só
        window.clearTimeout(netTimeout);
        exitTl = gsap.timeline({
          defaults: { ease: EASE_PROTON },
          onComplete: () => {
            window.clearTimeout(bail);
            finish();
          },
        });
        exitTl
          .to(
            "[data-pl='word'] > span",
            { yPercent: 0, stagger: 0.05, duration: 0.7 },
            0,
          )
          .to("[data-pl='meta']", { autoAlpha: 1, duration: 0.6 }, 0.15)
          // libera a entrada do hero um instante ANTES da cortina subir
          .add(markReady, "+=0.2")
          .to(
            "[data-pl='inner']",
            { autoAlpha: 0, y: -16, duration: 0.5 },
            "+=0.05",
          )
          .to(
            root.current,
            { yPercent: -100, duration: 0.9, ease: EASE_PROTON },
            "<0.12",
          );
      }

      // completa o progresso (rede lenta / timeout / skip) e dispara a saída.
      function forceComplete() {
        animateTo(1).eventCallback("onComplete", startExit);
      }

      // quando TODAS as promessas assentam → garante 100% e dispara a saída.
      Promise.allSettled(promises).then(forceComplete);

      // ---- skippable (após 400ms) ----------------------------------------
      let skipArmed = false;
      const armSkip = window.setTimeout(() => {
        skipArmed = true;
      }, 400);
      const removeSkip = () => {
        window.removeEventListener("pointerdown", onSkip);
        window.removeEventListener("keydown", onSkip);
      };
      function onSkip() {
        if (!skipArmed) return;
        removeSkip();
        window.clearTimeout(netTimeout);
        gsap.killTweensOf(prog); // trava o progresso em 100% na hora
        prog.p = 1;
        renderProgress();
        startExit();
        exitTl!.progress(1); // corre a saída pro fim → onComplete → finish (once)
      }
      window.addEventListener("pointerdown", onSkip);
      window.addEventListener("keydown", onSkip);

      return () => {
        window.clearTimeout(bail);
        window.clearTimeout(netTimeout);
        window.clearTimeout(armSkip);
        removeSkip();
        introTl.kill();
        exitTl?.kill(); // StrictMode: não deixar a saída órfã chamar finish pós-unmount
        gsap.killTweensOf(prog);
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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
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
          className="mt-9 flex overflow-hidden font-serif text-[1.7rem] uppercase tracking-[0.42em] text-fg sm:text-[2rem]"
        >
          {"PROTON".split("").map((c, i) => (
            <span key={i} className="inline-block">
              {c}
            </span>
          ))}
        </div>

        {/* barra de precisão + percentual real */}
        <div className="mt-7 flex w-44 items-center gap-3 sm:w-56">
          <div className="h-px flex-1 overflow-hidden bg-line">
            <div
              data-pl="bar-fill"
              className="h-full w-full origin-left scale-x-0 bg-accent"
            />
          </div>
          <span
            data-pl="percent"
            className="font-serif text-[0.7rem] tabular-nums text-accent"
          >
            00
          </span>
        </div>

        <p
          data-pl="meta"
          className="mt-5 font-sans text-[0.6rem] uppercase tracking-[0.3em] text-fg-muted"
        >
          Engenharia &amp; Consultoria — Garopaba/SC
        </p>
      </div>
    </div>
  );
}
