import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { processSteps } from "@/lib/content";

/** Processo — o diferencial (como garantem prazo/qualidade). */
export function Process() {
  return (
    <Section surface="surface" id="processo">
      <Container>
        <p className="mb-4 font-sans text-small uppercase tracking-kicker text-gold-base">
          Como trabalhamos
        </p>
        <SplitReveal
          as="h2"
          className="max-w-3xl font-display text-display-lg text-text-primary"
        >
          Um processo que protege prazo, custo e padrão
        </SplitReveal>

        <Reveal stagger className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.n} className="border-t border-line pt-6">
              <span className="font-display text-h2 text-gold-base">
                {step.n}
              </span>
              <h3 className="mt-4 font-display text-h2 text-text-primary">
                {step.title}
              </h3>
              <p className="mt-3 font-sans text-body text-text-muted">
                {step.desc}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
