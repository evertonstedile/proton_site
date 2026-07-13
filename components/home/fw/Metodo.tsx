import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { HOME_FW, processSteps } from "@/lib/content";

/**
 * Movimento 10 — Método (fluxo real do repo: Viabilidade → Projeto →
 * Aprovação & Regularização → Execução & Entrega). Sem nomes proprietários.
 */
export function Metodo() {
  return (
    <Section surface="base" id="metodo">
      <Container>
        <p className="mb-6 font-mono text-small uppercase tracking-kicker text-accent">
          {HOME_FW.metodo.kicker}
        </p>
        <SplitReveal as="h2" className="max-w-2xl font-serif text-display-lg text-fg">
          {HOME_FW.metodo.headline}
        </SplitReveal>
        <Reveal as="ol" stagger className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s) => (
            <li key={s.n} className="border-t border-line pt-5">
              <span className="font-mono text-small text-accent">{s.n}</span>
              <h3 className="mt-3 font-serif text-h2 text-fg">{s.title}</h3>
              <p className="mt-2 font-sans text-small text-fg-muted">{s.desc}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
