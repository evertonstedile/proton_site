"use client";

/**
 * MANIFESTO — scroll = câmera (Task 5 SOTD). UMA cena contínua atravessada pela
 * câmera: terreno → traço → papel → concreto. O processo como sequência
 * ESPACIAL (mecânica Igloo Inc aprovada) — o que 2D não faz.
 *
 * - Seção pinada ~300vh: o wrapper alto é o driver; o viewport interno (100vh)
 *   é pinado pelo ScrollTrigger (via createScrollProgress dentro da cena, com
 *   pin:true). progress 0→1 = viagem da câmera pela curva.
 * - Frases em HTML sobreposto (font-serif), NÃO texto no canvas. Crossfade por
 *   faixa de progress via ScrollTrigger discreto (toggle de classe, não
 *   opacidade por-frame → zero re-render contínuo).
 * - Copy [LEI — verbatim]: âncora "Cada obra começa muito antes do canteiro." +
 *   4 capítulos (o terreno / o traço / o papel / o concreto) + fecho de tensão.
 * - Acento ouro ≤2 elementos/seção: a linework da cena + o número do capítulo.
 * - Reduced-motion / sem WebGL: Scene entrega o poster = 4 blocos estáticos
 *   empilhados (mesmas frases), SEM pin (o poster não usa ScrollTrigger).
 */

import dynamic from "next/dynamic";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Scene } from "@/components/gl/Scene";

const ManifestoScene = dynamic(
  () => import("@/components/gl/ManifestoScene").then((m) => m.ManifestoScene),
  { ssr: false },
);

const TRIGGER_ID = "manifesto-pin";

// capítulos por faixa de progress (0-.25 / .25-.5 / .5-.75 / .75-1)
const CHAPTERS = [
  { n: "01", label: "o terreno", line: "A leitura do lugar antes de qualquer linha." },
  { n: "02", label: "o traço", line: "O gesto que vira geometria — cada eixo pensado." },
  { n: "03", label: "o papel", line: "O projeto aprovado, sem improviso a corrigir." },
  { n: "04", label: "o concreto", line: "A execução como consequência, não como aposta." },
] as const;

function Poster() {
  // Fallback (reduced-motion / sem WebGL): 4 blocos estáticos empilhados —
  // MESMAS frases, mensagem intacta, SEM pin (não prende o scroll). [LEI]
  return (
    <div className="relative w-full bg-bg px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-container">
        <p className="max-w-2xl font-serif text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] text-fg">
          Cada obra começa muito antes do canteiro.
        </p>
        <ol className="mt-16 space-y-14">
          {CHAPTERS.map((c) => (
            <li key={c.n} className="max-w-2xl">
              <span className="font-sans text-sm tracking-[0.2em] text-accent">
                {c.n} · {c.label}
              </span>
              <p className="mt-3 font-serif text-[clamp(1.25rem,2.4vw,1.8rem)] leading-[1.3] text-fg-muted">
                {c.line}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-20 max-w-2xl font-serif text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.2] text-fg">
          Obra parada, embargo, retrabalho. O improviso é o item mais caro do
          orçamento.
        </p>
      </div>
    </div>
  );
}

export function ManifestoCamera() {
  const chaptersRef = useRef<HTMLDivElement>(null);

  // Crossfade discreto dos capítulos por faixa de progress. ScrollTrigger
  // atualiza um data-attr (4 estados) — NÃO opacidade por-frame. A cena 3D lê
  // o MESMO scroll via createScrollProgress(pin:true), que pina o viewport.
  useGSAP(
    () => {
      const el = chaptersRef.current;
      if (!el) return;
      const items = Array.from(
        el.querySelectorAll<HTMLElement>("[data-chapter]"),
      );
      const st = ScrollTrigger.create({
        trigger: `#${TRIGGER_ID}`,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(
            CHAPTERS.length - 1,
            Math.floor(self.progress * CHAPTERS.length),
          );
          for (let i = 0; i < items.length; i++) {
            items[i].dataset.active = String(i === idx);
          }
          // tensão entra no fim da última faixa
          el.dataset.tension = String(self.progress > 0.86);
        },
      });
      return () => st.kill();
    },
    { scope: chaptersRef },
  );

  return (
    // wrapper alto = driver do scroll (~300vh). O viewport interno é pinado.
    <section className="relative h-[300svh] w-full bg-bg">
      <div
        id={TRIGGER_ID}
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
      >
        {/* cena 3D atrás; poster = 4 blocos estáticos (reduced-motion/no-WebGL) */}
        <div className="absolute inset-0 z-0">
          <Scene poster={<Poster />} className="h-full w-full">
            <ManifestoScene trigger={`#${TRIGGER_ID}`} />
          </Scene>
        </div>

        {/* frases sobrepostas (serif) — crossfade por capítulo */}
        <div
          ref={chaptersRef}
          data-tension="false"
          className="pointer-events-none relative z-10 mx-auto flex h-full max-w-container flex-col justify-center px-6 sm:px-8 lg:px-12"
        >
          <p className="max-w-xl font-serif text-[clamp(1.6rem,3.4vw,2.8rem)] leading-[1.15] text-fg">
            Cada obra começa muito antes do canteiro.
          </p>

          <div className="relative mt-10 h-[7rem] max-w-xl">
            {CHAPTERS.map((c, i) => (
              <div
                key={c.n}
                data-chapter
                data-active={i === 0 ? "true" : "false"}
                className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-proton data-[active=true]:opacity-100"
              >
                <span className="font-sans text-sm tracking-[0.2em] text-accent">
                  {c.n} · {c.label}
                </span>
                <p className="mt-3 font-serif text-[clamp(1.15rem,2.2vw,1.7rem)] leading-[1.3] text-fg-muted">
                  {c.line}
                </p>
              </div>
            ))}
          </div>

          {/* tensão — fecha a seção; revela no fim da viagem */}
          <p className="mt-12 max-w-xl font-serif text-[clamp(1.3rem,2.8vw,2.1rem)] leading-[1.2] text-fg opacity-0 transition-opacity duration-700 ease-proton [[data-tension=true]_&]:opacity-100">
            Obra parada, embargo, retrabalho. O improviso é o item mais caro do
            orçamento.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ManifestoCamera;
