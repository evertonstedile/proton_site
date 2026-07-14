import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Button } from "@/components/ui/Button";
import { AtomicOrbit } from "@/components/brand/AtomicOrbit";

/** CTA final — fechamento: orçamento/reunião. Momento dourado de conversão. */
export function FinalCta() {
  return (
    <Section
      surface="base"
      className="relative overflow-hidden border-t border-line"
    >
      <AtomicOrbit
        animated
        className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 opacity-[0.08]"
      />
      <Container className="relative text-center">
        <SplitReveal
          as="h2"
          className="mx-auto max-w-4xl font-display text-display-xl leading-[1.06] text-fg"
        >
          Vamos construir o seu alto padrão
        </SplitReveal>
        <Reveal>
          <p className="mx-auto mt-6 max-w-xl font-sans text-body-lg text-fg-muted">
            Conte sobre o seu projeto. Em poucos passos retornamos com os
            próximos passos do orçamento.
          </p>
        </Reveal>
        <Reveal className="mt-10">
          <Button href="/contato" variant="primary" size="lg">
            Pedir orçamento
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
