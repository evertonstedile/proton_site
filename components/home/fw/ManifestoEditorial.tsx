import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HOME_FW, stats } from "@/lib/content";

/**
 * Movimento 03 — Manifesto editorial.
 * Vídeo 6 (dois engenheiros com prancheta diante da obra) em moldura
 * editorial ~50% da viewport; copy institucional real; números em mono.
 * Estático (F2): vídeo pausado com poster, preload none.
 */
export function ManifestoEditorial() {
  return (
    <Section surface="base" id="manifesto">
      <Container>
        <p className="mb-6 font-mono text-small uppercase tracking-kicker text-accent">
          {HOME_FW.manifesto.kicker}
        </p>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {HOME_FW.manifesto.lines.map((line, i) => (
              <p
                key={line}
                className={
                  i === HOME_FW.manifesto.lines.length - 1
                    ? "mt-8 font-serif text-display-lg text-fg"
                    : "mt-4 font-serif text-h2 text-concrete first:mt-0"
                }
              >
                {line}
              </p>
            ))}
          </div>
          <div className="lg:col-span-5 lg:pt-16">
            <div className="overflow-hidden rounded-lg border border-line">
              <video
                muted
                playsInline
                preload="none"
                poster="/media/video/manifesto-poster.avif"
                className="aspect-video w-full object-cover"
              >
                <source src="/media/video/manifesto-720.mp4" type="video/mp4" />
              </video>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-sans text-small text-stone">{s.label}</dt>
                  <dd className="mt-1 font-mono text-h2 text-fg">
                    {s.value.toLocaleString("pt-BR")}
                    {s.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}
