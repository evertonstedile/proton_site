import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { faq } from "@/lib/content";

/**
 * Perguntas frequentes — acordeão nativo (<details>): conteúdo sempre presente
 * no HTML (lido por buscadores e IA mesmo fechado), sem depender de JS.
 * Emite FAQPage (JSON-LD) a partir do MESMO conteúdo visível.
 */
export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <Section surface="surface" id="faq">
      <Container>
        <p className="mb-4 font-sans text-small uppercase tracking-kicker text-gold-base">
          Dúvidas frequentes
        </p>
        <SplitReveal
          as="h2"
          className="font-display text-display-lg text-text-primary"
        >
          Perguntas frequentes
        </SplitReveal>

        <div className="mt-12 max-w-3xl border-t border-line">
          {faq.map((item) => (
            <details key={item.q} className="group border-b border-line py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-sans text-body-lg text-text-primary transition-colors duration-short hover:text-gold-light [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-h2 font-display leading-none text-gold-base transition-transform duration-short ease-cinematic group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl font-sans text-body text-text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Container>
    </Section>
  );
}
