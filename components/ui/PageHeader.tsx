import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";

/** Cabeçalho padrão das páginas internas (kicker + título + intro). */
export function PageHeader({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <Section surface="base">
      <Container>
        <p className="mb-4 font-sans text-small uppercase tracking-kicker text-accent">
          {kicker}
        </p>
        <SplitReveal
          as="h1"
          className="font-display text-display-xl text-fg"
        >
          {title}
        </SplitReveal>
        {intro ? (
          <Reveal>
            <p className="mt-6 max-w-2xl font-sans text-body-lg text-fg-muted">
              {intro}
            </p>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
