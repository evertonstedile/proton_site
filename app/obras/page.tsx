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
    "Portfólio da Proton Engenharia — residências, condomínios e empreendimentos de uso misto. Projetos, regularização e gerenciamento em Garopaba/SC e região.",
};

export default function ObrasPage() {
  const obras = getObras();

  return (
    <main className="pt-16">
      <Section surface="base">
        <Container>
          <p className="mb-4 font-sans text-small uppercase tracking-kicker text-accent">
            Portfólio
          </p>
          <SplitReveal
            as="h1"
            className="font-display text-display-xl text-fg"
          >
            Obras
          </SplitReveal>
          <Reveal>
            <p className="mt-6 max-w-2xl font-sans text-body-lg text-fg-muted">
              Uma seleção de projetos da Proton — residências, condomínios e
              empreendimentos de uso misto. Imagens de visualização técnica, da
              leitura do terreno ao detalhamento.
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
