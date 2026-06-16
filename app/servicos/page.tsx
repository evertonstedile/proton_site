import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { FinalCta } from "@/components/home/FinalCta";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Construção residencial, reformas de alto padrão, gerenciamento de obra e consultoria.",
};

export default function ServicosPage() {
  return (
    <main className="pt-16">
      <PageHeader
        kicker="O que fazemos"
        title="Serviços"
        intro="Do projeto à entrega, com gestão integral e padrão de acabamento de alto nível."
      />

      <Section surface="surface" className="pt-0">
        <Container>
          <Reveal stagger className="divide-y divide-line border-t border-line">
            {services.map((s) => (
              <div
                key={s.n}
                className="grid gap-4 py-10 md:grid-cols-[auto_1fr] md:gap-12"
              >
                <span className="font-display text-display-lg text-gold-base">
                  {s.n}
                </span>
                <div>
                  <h2 className="font-display text-h2 text-text-primary">
                    {s.title}
                  </h2>
                  <p className="mt-3 max-w-2xl font-sans text-body-lg text-text-muted">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <FinalCta />
    </main>
  );
}
