import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Button } from "@/components/ui/Button";
import { serviceGroups, servicesCount } from "@/lib/content";

/** Serviços (home) — visão condensada: as 7 frentes + contagem + CTA. */
export function Services() {
  return (
    <Section surface="base" id="servicos">
      <Container>
        <p className="mb-4 font-sans text-small uppercase tracking-kicker text-gold-base">
          O que fazemos
        </p>
        <SplitReveal
          as="h2"
          className="font-display text-display-lg text-text-primary"
        >
          Serviços
        </SplitReveal>
        <Reveal>
          <p className="mt-4 max-w-2xl font-sans text-body-lg text-text-muted">
            {servicesCount} serviços em {serviceGroups.length} frentes —
            engenharia, arquitetura, regularização, infraestrutura e consultoria.
          </p>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-x-12 gap-y-7 sm:grid-cols-2">
          {serviceGroups.map((g, i) => (
            <div
              key={g.area}
              className="flex items-baseline gap-4 border-t border-line pt-4"
            >
              <span className="font-display text-body text-gold-base">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-sans text-body-lg text-text-primary">
                  {g.area}
                </p>
                <p className="mt-1 font-sans text-small text-text-muted">
                  {g.items.length} serviços
                </p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-12">
          <Button href="/servicos" variant="ghost">
            Ver todos os serviços
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
