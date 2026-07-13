import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { HOME_FW } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";

/**
 * Movimento 13 — CTA final. WhatsApp + contato reais.
 * Vídeo 1 (casa acendendo ao anoitecer) entra como hover/transição na Task 5.
 */
export function CtaConversa() {
  return (
    <Section surface="surface" id="cta">
      <Container className="text-center">
        <SplitReveal as="h2" className="mx-auto max-w-3xl font-serif text-display-xl text-fg">
          {HOME_FW.ctaFinal.headline}
        </SplitReveal>
        <p className="mx-auto mt-6 max-w-xl font-sans text-body-lg text-fg-muted">
          {HOME_FW.ctaFinal.sub}
        </p>
        <Reveal className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            href={whatsappUrl("Olá! Quero falar sobre um projeto.")}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            {HOME_FW.ctaFinal.ctaPrimary}
          </Button>
          <Button href="/contato" variant="ghost" size="lg">
            {HOME_FW.ctaFinal.ctaSecondary}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
