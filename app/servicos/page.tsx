import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { FinalCta } from "@/components/home/FinalCta";
import { serviceGroups, servicesCount, servicesTagline } from "@/lib/content";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Engenharia, arquitetura e consultoria completas: projetos, regularização imobiliária, topografia, execução e fiscalização, infraestrutura urbana, licenciamento e laudos.",
};

export default function ServicosPage() {
  return (
    <main className="pt-16">
      <PageHeader
        kicker="O que fazemos"
        title="Serviços"
        intro={`${servicesTagline} ${servicesCount} serviços em ${serviceGroups.length} frentes.`}
      />

      <Section surface="surface" className="pt-0">
        <Container>
          <div className="space-y-14">
            {serviceGroups.map((g, i) => (
              <Reveal key={g.area}>
                <div className="grid gap-6 border-t border-line pt-8 md:grid-cols-[18rem_1fr] md:gap-12">
                  <div>
                    <span className="font-display text-body text-gold-base">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-2 font-display text-h2 text-text-primary">
                      {g.area}
                    </h2>
                  </div>
                  <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                    {g.items.map((item) => (
                      <li key={item.name} className="flex gap-3">
                        <span aria-hidden className="mt-1 text-gold-base">
                          —
                        </span>
                        <div>
                          <p className="font-sans text-body text-text-primary">
                            {item.name}
                          </p>
                          <p className="mt-1 font-sans text-small text-text-muted">
                            {item.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </main>
  );
}
