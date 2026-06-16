import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { testimonials } from "@/lib/content";

/** Depoimentos — prova social. ILUSTRATIVOS (aviso visível, nada inventado como real). */
export function Testimonials() {
  return (
    <Section surface="surface" id="depoimentos">
      <Container>
        <p className="mb-4 font-sans text-small uppercase tracking-kicker text-gold-base">
          Prova social
        </p>
        <SplitReveal
          as="h2"
          className="font-display text-display-lg text-text-primary"
        >
          O que dizem
        </SplitReveal>

        <Reveal stagger className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="rounded-xl border border-line bg-bg-raised p-8"
            >
              <span
                aria-hidden
                className="block font-display text-display-lg leading-none text-gold-base/40"
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 font-sans text-body-lg text-text-body">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 font-sans text-small text-text-muted">
                <span className="text-text-primary">{t.author}</span> · {t.role}
              </figcaption>
            </figure>
          ))}
        </Reveal>

        <p className="mt-10 font-sans text-small text-text-muted/70">
          * Depoimentos ilustrativos — substituir por depoimentos reais de
          clientes.
        </p>
      </Container>
    </Section>
  );
}
