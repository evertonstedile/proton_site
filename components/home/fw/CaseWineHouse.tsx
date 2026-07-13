import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { HorizontalGallery } from "@/components/motion/HorizontalGallery";
import { HOME_FW } from "@/lib/content";
import { getObraBySlug } from "@/lib/obras";

/**
 * Movimento 04 — Case Wine House, capítulos A–E (versão estática, F2).
 * A: território · B: materialidade (galeria) · C: interior dia→noite ·
 * D: escala humana · E: ficha técnica (só o confirmado — DF9).
 * Galeria horizontal por scroll e crossfade do interior entram na Task 5/8.
 */
const FICHA = [
  ["Projeto", "Residência Wine House"],
  ["Local", "Praia da Ferrugem, Garopaba/SC"],
  ["Área construída", "91,79 m²"],
  ["Conclusão", "2026"],
  ["Status", "Concluída"],
  // Escopo/disciplinas: TODO: VALIDAR (DF7/DF9) — omitidos até confirmação.
] as const;

const GALERIA = [
  {
    src: "/media/img/image3.png",
    alt: "Residência Wine House implantada na encosta — plataforma com piscina sobre muro de pedra e vegetação nativa",
  },
  {
    src: "/media/img/image.png",
    alt: "Volume em balanço da Wine House abrigando a garagem — estrutura aparente sobre pilares",
  },
  {
    src: "/media/img/image4.png",
    alt: "Wine House ao fim de tarde — deck, piscina e fachada envidraçada voltadas para o vale",
  },
  {
    src: "/media/img/image5.png",
    alt: "Detalhe de materialidade da Wine House — concreto aparente, madeira e pedra contra as montanhas",
  },
] as const;

export function CaseWineHouse() {
  const obra = getObraBySlug("winehouse");

  return (
    <Section surface="surface" id="case-winehouse" className="overflow-hidden">
      <Container>
        <p className="mb-6 font-mono text-small uppercase tracking-kicker text-accent">
          {HOME_FW.caseWineHouse.kicker}
        </p>

        {/* Cap. A — território */}
        <div className="grid gap-10 lg:grid-cols-12">
          <SplitReveal
            as="h2"
            className="font-serif text-display-lg text-fg lg:col-span-5"
          >
            {HOME_FW.caseWineHouse.capA}
          </SplitReveal>
          <Reveal className="relative aspect-[16/10] overflow-hidden rounded-lg lg:col-span-7">
            <Image
              src="/media/img/image5.png"
              alt="Volume de concreto da Wine House contra o relevo — leitura do território antes do edifício"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
            <p className="absolute bottom-4 left-4 font-mono text-small text-fg/80">
              Praia da Ferrugem · Garopaba/SC
            </p>
          </Reveal>
        </div>

        {/* Cap. B — materialidade (galeria; vira scroll horizontal na Task 5) */}
        <div className="mt-24">
          <h3 className="font-serif text-h2 italic text-concrete">
            {HOME_FW.caseWineHouse.capB}
          </h3>
          <HorizontalGallery className="mt-8">
            {GALERIA.map((g) => (
              <figure
                key={g.src}
                className="relative aspect-[4/3] w-[80vw] max-w-xl shrink-0 snap-start overflow-hidden rounded-lg"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 640px) 36rem, 80vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </HorizontalGallery>
        </div>

        {/* Cap. C — interior dia→noite (crossfade na Task 8; estático = par) */}
        <div className="mt-24 grid gap-10 lg:grid-cols-12">
          <SplitReveal
            as="h3"
            className="font-serif text-display-lg text-fg lg:col-span-5"
          >
            {HOME_FW.caseWineHouse.capC}
          </SplitReveal>
          <Reveal stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {(
              [
                ["/media/img/interior_dia.png", "Interior da Wine House de dia — estar integrado à cozinha, pedra e luz natural", "Dia"],
                ["/media/img/interior_noite.png", "Interior da Wine House à noite — iluminação quente sobre os mesmos materiais", "Noite"],
              ] as const
            ).map(([src, alt, label]) => (
              <figure key={src} className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 29vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                <figcaption className="absolute bottom-3 left-3 font-mono text-small text-fg/80">
                  {label}
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>

        {/* Cap. D — escala humana */}
        <Reveal className="mt-24">
          <div className="relative aspect-[21/9] overflow-hidden rounded-lg">
            <Image
              src="/media/img/image2.png"
              alt="Moradores na varanda envidraçada da Wine House ao entardecer — a escala humana do projeto"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/70 to-transparent" />
            <p className="absolute bottom-6 left-6 max-w-md font-serif text-h2 text-fg md:bottom-10 md:left-10">
              {HOME_FW.caseWineHouse.capD}
            </p>
          </div>
        </Reveal>

        {/* Cap. E — ficha técnica (só o confirmado) */}
        <Reveal className="mt-24 max-w-2xl">
          <h3 className="font-mono text-small uppercase tracking-kicker text-stone">
            {HOME_FW.caseWineHouse.capE}
          </h3>
          <dl className="mt-6 divide-y divide-line border-y border-line">
            {FICHA.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-3">
                <dt className="font-sans text-small text-stone">{k}</dt>
                <dd className="text-right font-mono text-small text-fg">{v}</dd>
              </div>
            ))}
          </dl>
          {obra ? (
            <a
              href={`/obras/${obra.slug}`}
              className="mt-6 inline-block font-sans text-small uppercase tracking-kicker text-accent transition-colors duration-short ease-proton hover:text-fg"
            >
              Ver o case completo →
            </a>
          ) : null}
        </Reveal>
      </Container>
    </Section>
  );
}
