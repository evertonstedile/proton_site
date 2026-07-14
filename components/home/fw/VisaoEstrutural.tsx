import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { VideoScrubStage } from "@/components/home/fw/VideoScrubStage";
import { HOME_FW } from "@/lib/content";

/**
 * Movimento 06 — Visão estrutural (versão estática, F2).
 * Vídeo 8 (fundação/ferragem → grua → casa iluminada) pausado com poster;
 * stops capitulados como lista. Snap por scroll entra na Task 7.
 * Complementa o mov. 05 (o que sustenta) sem repetir a timeline.
 */
export function VisaoEstrutural() {
  return (
    <Section surface="surface" id="estrutura">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mb-6 font-mono text-small uppercase tracking-kicker text-accent">
              {HOME_FW.visaoEstrutural.kicker}
            </p>
            <SplitReveal as="h2" className="font-serif text-display-lg text-fg">
              {HOME_FW.visaoEstrutural.headline}
            </SplitReveal>
            <Reveal as="ul" stagger className="mt-10 space-y-6">
              {HOME_FW.visaoEstrutural.stops.map((s, i) => (
                <li key={s.label} className="flex gap-4 border-t border-line pt-4">
                  <span className="font-mono text-small text-stone">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-sans font-medium text-body text-fg">
                      {s.label}
                    </h3>
                    <p className="mt-1 font-sans text-small text-fg-muted">
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <VideoScrubStage
              src="/media/video/estrutura-720.mp4"
              poster="/media/video/estrutura-poster.avif"
              snapStops
              heightClass="h-[220svh]"
              marks={HOME_FW.visaoEstrutural.stops.map((s, i) => ({
                at: [0, 33, 66, 95][i] ?? 0,
                label: s.label,
                desc: s.desc,
              }))}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
