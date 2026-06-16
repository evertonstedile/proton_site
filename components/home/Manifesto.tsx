import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { GoddessLinework } from "@/components/brand/GoddessLinework";
import { manifesto } from "@/lib/content";

/** Manifesto — uma frase forte com reveal tipográfico por linha. */
export function Manifesto() {
  return (
    <Section surface="base" className="relative overflow-hidden">
      <GoddessLinework className="pointer-events-none absolute -left-16 top-1/2 h-[130%] -translate-y-1/2 opacity-[0.04]" />
      <Container>
        <SplitReveal
          as="p"
          className="max-w-5xl font-display text-display-lg leading-[1.12] text-text-primary"
        >
          {manifesto}
        </SplitReveal>
      </Container>
    </Section>
  );
}
