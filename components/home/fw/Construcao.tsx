import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { HOME_FW } from "@/lib/content";

/**
 * Movimento 05 — Construção (versão estática, F2).
 * Vídeo 4 (escavação → estrutura → casa pronta) pausado com poster; timeline
 * de etapas como lista legível. O scrub por scroll (currentTime) entra na
 * Task 7 com useVideoScrub + derivado GOP-curto.
 */
export function Construcao() {
  return (
    <Section surface="base" id="construcao">
      <Container>
        <p className="mb-6 font-mono text-small uppercase tracking-kicker text-accent">
          {HOME_FW.construcao.kicker}
        </p>
        <SplitReveal as="h2" className="max-w-3xl font-serif text-display-lg text-fg">
          {HOME_FW.construcao.headline}
        </SplitReveal>

        <Reveal className="mt-12 overflow-hidden rounded-lg border border-line">
          <video
            muted
            playsInline
            preload="none"
            poster="/media/video/construcao-poster.avif"
            className="aspect-video w-full object-cover"
          >
            <source src="/media/video/construcao-720.mp4" type="video/mp4" />
          </video>
        </Reveal>

        <Reveal as="ol" stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {HOME_FW.construcao.etapas.map((e) => (
            <li key={e.label} className="border-t border-line pt-4">
              <span className="font-mono text-small text-stone">{e.at}%</span>
              <h3 className="mt-2 font-sans font-medium text-body text-fg">
                {e.label}
              </h3>
              <p className="mt-1 font-sans text-small text-fg-muted">{e.desc}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
