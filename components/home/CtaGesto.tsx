"use client";

import { useCallback, useRef, useState } from "react";
import { gsap, useGSAP, EASE_PROTON } from "@/lib/gsap";
import { prefersReduced } from "@/lib/motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

/**
 * CTA (passo 7 da narrativa) — a proposta fica ATRÁS de um gesto: segure o botão
 * (~420ms, anel de precisão preenchendo no acento) para revelar a condição
 * "Estudo de viabilidade — resposta em até 24h úteis" + o formulário.
 *
 * Acessibilidade [LEI]: o gesto é ENHANCEMENT, nunca barreira. Teclado
 * (Enter/Espaço) e prefers-reduced-motion revelam DIRETO; o formulário é sempre
 * alcançável por teclado e leitor de tela. Zero bounce (ease único proton).
 */
const HOLD_MS = 420;
const RING_R = 46;
const RING_C = 2 * Math.PI * RING_R;

export function CtaGesto() {
  const root = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const holdTween = useRef<gsap.core.Tween | null>(null);
  const [revealed, setRevealed] = useState(false);

  const reveal = useCallback(() => setRevealed(true), []);

  // entrada do painel + foco vai pro título (teclado / leitor de tela)
  useGSAP(
    () => {
      const p = panel.current;
      if (!revealed || !p) return;
      if (prefersReduced()) {
        gsap.set(p, { autoAlpha: 1, y: 0 });
      } else {
        gsap.fromTo(
          p,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: EASE_PROTON },
        );
      }
      p.querySelector<HTMLElement>("[data-cta-head]")?.focus();
    },
    { dependencies: [revealed], scope: root },
  );

  const startHold = useCallback(() => {
    if (revealed) return;
    if (prefersReduced() || !ring.current) {
      reveal();
      return;
    }
    holdTween.current = gsap.fromTo(
      ring.current,
      { strokeDashoffset: RING_C },
      {
        strokeDashoffset: 0,
        duration: HOLD_MS / 1000,
        ease: "none",
        onComplete: reveal,
      },
    );
  }, [revealed, reveal]);

  const cancelHold = useCallback(() => {
    holdTween.current?.kill();
    holdTween.current = null;
    if (ring.current)
      gsap.to(ring.current, {
        strokeDashoffset: RING_C,
        duration: 0.25,
        ease: EASE_PROTON,
      });
  }, []);

  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        reveal();
      }
    },
    [reveal],
  );

  return (
    <Section surface="base" id="orcamento">
      <Container>
        <div ref={root} className="mx-auto max-w-3xl">
          {!revealed ? (
            <div className="flex flex-col items-start">
              <p className="mb-5 font-sans text-small uppercase tracking-kicker text-accent">
                Próximo passo
              </p>
              <h2 className="max-w-[16ch] font-serif text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] text-fg">
                Pedir orçamento
              </h2>
              <p className="mt-6 max-w-md font-sans text-body text-fg-muted">
                Segure o botão para abrir o formulário — um gesto, e a proposta
                começa.
              </p>

              <button
                type="button"
                onPointerDown={startHold}
                onPointerUp={cancelHold}
                onPointerLeave={cancelHold}
                onPointerCancel={cancelHold}
                onKeyDown={onKey}
                aria-label="Segure para abrir o formulário de orçamento, ou pressione Enter"
                className="group relative mt-12 flex h-32 w-32 items-center justify-center rounded-full border border-line text-fg transition-colors duration-short ease-proton hover:border-accent focus-visible:outline-none"
              >
                <svg
                  viewBox="0 0 100 100"
                  className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
                  aria-hidden="true"
                >
                  <circle
                    ref={ring}
                    cx="50"
                    cy="50"
                    r={RING_R}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray={RING_C}
                    strokeDashoffset={RING_C}
                  />
                </svg>
                <span className="font-sans text-small uppercase tracking-[0.16em] text-fg-muted transition-colors duration-short group-hover:text-fg">
                  Segure
                </span>
              </button>
            </div>
          ) : (
            <div ref={panel}>
              <h2
                data-cta-head
                tabIndex={-1}
                className="max-w-[20ch] font-serif text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight text-fg focus-visible:outline-none"
              >
                Estudo de viabilidade — resposta em até 24h úteis
              </h2>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
