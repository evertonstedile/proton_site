import { SplitReveal } from "@/components/motion/SplitReveal";

/**
 * DIFERENCIAL — passo 4 da narrativa SOTD. Seção editorial SECA (sem física,
 * sem card, sem caixa): uma afirmação grande em serif, assimétrica.
 *
 * Copy [LEI — verbatim]: "Um só responsável técnico — do estudo de viabilidade
 * ao habite-se. Sem handoff, sem ruído."
 *
 * Registro: assimetria intencional (frase deslocada à esquerda, largura
 * contida). Acento ouro ≤2 elementos: (1) o filete curto acima da frase e
 * (2) o kicker. Reveal de entrada por linha (SplitReveal, ease proton-equiv,
 * respeita reduced-motion) — ZERO bounce.
 */
export function Diferencial() {
  return (
    <section className="w-full bg-bg px-6 py-30 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-container">
        <div className="max-w-4xl">
          {/* acento 1 — filete + kicker */}
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-12 bg-accent" aria-hidden="true" />
            <span className="font-sans text-sm uppercase tracking-kicker text-accent">
              O diferencial
            </span>
          </div>

          <SplitReveal
            as="p"
            className="font-serif text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.14] text-fg"
          >
            Um só responsável técnico — do estudo de viabilidade ao habite-se.
            Sem handoff, sem ruído.
          </SplitReveal>
        </div>
      </div>
    </section>
  );
}

export default Diferencial;
