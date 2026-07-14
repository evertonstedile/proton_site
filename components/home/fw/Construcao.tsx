import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { VideoScrubStage } from "@/components/home/fw/VideoScrubStage";
import { HOME_FW } from "@/lib/content";

/**
 * Movimento 05 — Construção (F5).
 * Vídeo 4 (escavação → estrutura → casa pronta) com currentTime dirigido
 * pelo scroll (palco pinado 300svh, GOP-12). Timeline de etapas embaixo com
 * frame real de cada marco (Tier C: mesma informação, sem scrub).
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

        <VideoScrubStage
          className="mt-12"
          src="/media/video/construcao-720.mp4"
          poster="/media/video/construcao-poster.avif"
          marks={[...HOME_FW.construcao.etapas]}
        />

        <Reveal as="ol" stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {HOME_FW.construcao.etapas.map((e) => (
            <li key={e.label} className="border-t border-line pt-4">
              <div className="relative mb-3 aspect-video overflow-hidden rounded-lg">
                <Image
                  src={`/media/video/construcao-f${e.at}.avif`}
                  alt={`Marco de ${e.label.toLowerCase()} — frame real da obra em ${e.at}% da timeline`}
                  fill
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
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
