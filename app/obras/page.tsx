import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { WorkCard } from "@/components/ui/WorkCard";
import { getObras, obraToWork } from "@/lib/obras";

export const metadata: Metadata = {
  title: "Obras",
  description:
    "Portfólio de obras residenciais de alto padrão da Proton Engenharia.",
};

export default function ObrasPage() {
  const obras = getObras();

  return (
    <main className="pt-16">
      <Section surface="base">
        <Container>
          <p className="mb-4 font-sans text-small uppercase tracking-kicker text-gold-base">
            Portfólio
          </p>
          <SplitReveal
            as="h1"
            className="font-display text-display-xl text-text-primary"
          >
            Obras
          </SplitReveal>
          <Reveal>
            <p className="mt-6 max-w-2xl font-sans text-body-lg text-text-muted">
              Uma seleção de projetos residenciais de alto padrão — do diagnóstico
              à entrega. {/* PLACEHOLDER copy */}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section surface="surface" className="pt-0">
        <Container>
          <Reveal stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {obras.map((o) => (
              <WorkCard key={o.slug} work={obraToWork(o)} titleAs="h2" />
            ))}
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
