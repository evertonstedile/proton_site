import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { FinalCta } from "@/components/home/FinalCta";
import { Metodo } from "@/components/home/fw/Metodo";
import { Socios } from "@/components/home/fw/Socios";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre",
  description: about.intro,
};

export default function SobrePage() {
  return (
    <main className="pt-16">
      <PageHeader kicker="Sobre" title="A Proton" intro={about.intro} />

      <Section surface="surface" className="pt-0">
        <Container>
          <Reveal stagger className="grid max-w-3xl gap-6">
            {about.story.map((p, i) => (
              <p key={i} className="font-sans text-body-lg text-fg">
                {p}
              </p>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section surface="base">
        <Container>
          <p className="mb-4 font-sans text-small uppercase tracking-kicker text-accent">
            O que nos guia
          </p>
          <SplitReveal
            as="h2"
            className="font-display text-display-lg text-fg"
          >
            Valores
          </SplitReveal>

          <Reveal stagger className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v) => (
              <div key={v.title} className="border-t border-line pt-6">
                <h3 className="font-display text-h2 text-fg">
                  {v.title}
                </h3>
                <p className="mt-3 font-sans text-body text-fg-muted">
                  {v.desc}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Metodo />
      <Socios />
      <FinalCta />
    </main>
  );
}
