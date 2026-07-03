"use client";

import { useRef } from "react";
import {
  gsap,
  Draggable,
  useGSAP,
  EASE_PROTON,
  DUR_REVEAL,
} from "@/lib/gsap";
import { prefersReduced } from "@/lib/motion";
import { processSteps } from "@/lib/content";

/**
 * SISTEMA — passo 5 da narrativa SOTD. As 4 etapas do processo (fonte única:
 * processSteps de lib/content) como cards com PESO. Esta é a ÚNICA seção do
 * site com física [LEI da dose].
 *
 * Física (Bruno Simon "weight"): Draggable type:"x,y" + inertia (momentum
 * natural do arrasto — permitido; é o deleite pedido). Ao soltar, o card VOLTA
 * suave à origem com ease proton (settle elegante, não brinquedo caótico).
 *
 * Acessibilidade [LEI — não negociável]: os cards são um grid ESTÁTICO no DOM,
 * focáveis por teclado (tabIndex, foco visível), leitura por leitor de tela
 * intacta, ordem lógica. O drag é enhancement PURO sobre o mouse.
 * - prefersReduced(): NÃO inicializa Draggable — grid estático limpo.
 * - Touch/coarse pointer: NÃO inicializa Draggable — evita sequestrar o scroll
 *   vertical da página (type:"x,y" não libera scroll nativo). Touch fica com o
 *   grid estático + toque/teclado. O peso é um deleite de desktop.
 *
 * Hover: só cor de borda no acento — NUNCA muda layout/tamanho (regra do
 * registro).
 */
export function SistemaFisica() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      // Grid estático se: reduced-motion OU sem mouse fino (touch). Drag é
      // enhancement de desktop; sem ele o conteúdo continua 100% acessível.
      const finePointer =
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: fine)").matches;
      if (prefersReduced() || !finePointer) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-drag-card]", root);
      const draggables = cards.flatMap((card) =>
        Draggable.create(card, {
          type: "x,y",
          bounds: root,
          inertia: true,
          edgeResistance: 0.75,
          cursor: "grab",
          activeCursor: "grabbing",
          // ao soltar: volta suave à origem (settle elegante, ease proton)
          onDragEnd() {
            gsap.to(this.target, {
              x: 0,
              y: 0,
              duration: DUR_REVEAL,
              ease: EASE_PROTON,
              overwrite: true,
            });
          },
          // inertia termina → também retorna à origem (sem repouso torto)
          onThrowComplete() {
            gsap.to(this.target, {
              x: 0,
              y: 0,
              duration: DUR_REVEAL,
              ease: EASE_PROTON,
              overwrite: true,
            });
          },
        }),
      );

      return () => draggables.forEach((d) => d.kill());
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="sistema"
      className="relative w-full overflow-hidden bg-bg px-6 py-30 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-container">
        <div className="mb-4 flex items-center gap-4">
          <span className="font-sans text-sm uppercase tracking-kicker text-accent">
            O sistema
          </span>
        </div>
        <h2 className="max-w-3xl font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.15] text-fg">
          Quatro etapas, um só fio condutor.
        </h2>

        <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <li key={step.n} className="list-none">
              <div
                data-drag-card
                tabIndex={0}
                className="group h-full rounded-3xl border border-line bg-bg-2 p-6 outline-none transition-colors duration-short ease-proton hover:border-accent focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent"
              >
                <span className="block font-sans text-[2.75rem] font-light tabular-nums leading-none text-accent">
                  {step.n}
                </span>
                <h3 className="mt-6 font-serif text-h2 text-fg">
                  {step.title}
                </h3>
                <p className="mt-3 font-sans text-body text-fg-muted">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default SistemaFisica;
