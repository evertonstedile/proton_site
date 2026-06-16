import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { services } from "@/lib/content";

/** Serviços — o que a Proton oferece. */
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

        <Reveal stagger className="mt-14 grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.n}
              className="group rounded-xl border border-line bg-bg-raised p-8 transition-colors duration-reveal ease-cinematic hover:border-line-gold"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-display text-h2 text-gold-base">
                  {s.n}
                </span>
                <h3 className="font-display text-h2 text-text-primary">
                  {s.title}
                </h3>
              </div>
              <p className="mt-4 max-w-md font-sans text-body text-text-muted">
                {s.desc}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
