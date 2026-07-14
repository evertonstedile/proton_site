import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { FinalCta } from "@/components/home/FinalCta";
import { processSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Processo",
  description:
    "Um processo que protege prazo, custo e padrão — do diagnóstico à entrega.",
};

export default function ProcessoPage() {
  return (
    <main className="pt-16">
      <PageHeader
        kicker="Como trabalhamos"
        title="Processo"
        intro="Método claro em quatro etapas, para proteger prazo, custo e padrão."
      />

      <Section surface="surface" className="pt-0">
        <Container>
          <Reveal stagger className="max-w-3xl">
            {processSteps.map((step) => (
              <div
                key={step.n}
                className="grid grid-cols-[auto_1fr] gap-6 border-l border-line pb-12 pl-8 last:pb-0 md:gap-10"
              >
                <span className="-ml-[2.6rem] flex h-12 w-12 items-center justify-center rounded-full border border-line-accent bg-bg font-display text-h2 text-accent">
                  {step.n}
                </span>
                <div className="pt-2">
                  <h2 className="font-display text-h2 text-fg">
                    {step.title}
                  </h2>
                  <p className="mt-3 font-sans text-body-lg text-fg-muted">
                    {step.desc}
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
