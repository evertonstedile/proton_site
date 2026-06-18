import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { AtomicOrbit } from "@/components/brand/AtomicOrbit";
import { getObras, getObraBySlug } from "@/lib/obras";
import { SITE } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return getObras().map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const obra = getObraBySlug(slug);
  if (!obra) return { title: "Obra não encontrada" };
  return {
    title: obra.title,
    description: obra.summary,
  };
}

/**
 * Detalhe da obra — versão SIMPLES (stub).
 * O detalhe rico + dados reais entram no Checkpoint 3, com o schema confirmado.
 * Fotos são placeholders (B3).
 */
export default async function ObraDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const obra = getObraBySlug(slug);
  if (!obra) notFound();

  const area = obra.areaM2 ? `${obra.areaM2} m²` : "000 m²";

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Obras", item: `${SITE.url}/obras` },
      {
        "@type": "ListItem",
        position: 3,
        name: obra.title,
        item: `${SITE.url}/obras/${obra.slug}`,
      },
    ],
  };

  return (
    <main className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {/* capa */}
      <section className="relative h-[56vh] min-h-[360px] w-full overflow-hidden bg-bg-base">
        {obra.cover ? (
          <Image
            src={obra.cover}
            alt={obra.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(120%_120%_at_60%_20%,#1c1c20,#000)]">
            <AtomicOrbit className="h-16 w-16 opacity-25" />
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-text-muted">
              Foto da obra — placeholder
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </section>

      <Section surface="surface" className="pt-12">
        <Container>
          <Link
            href="/obras"
            className="font-sans text-small text-text-muted transition-colors duration-short hover:text-gold-light"
          >
            ← Obras
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Tag variant="gold">{obra.category}</Tag>
            {obra.year ? <Tag variant="muted">{obra.year}</Tag> : null}
          </div>

          <h1 className="mt-6 font-display text-display-lg text-text-primary">
            {obra.title}
          </h1>
          <p className="mt-3 font-sans text-body text-text-muted">
            {area} · {obra.location}
          </p>

          <p className="mt-8 max-w-2xl font-sans text-body-lg text-text-body">
            {obra.summary}
          </p>
          <p className="mt-4 max-w-2xl font-sans text-small text-text-muted/70">
            * Ficha técnica completa e galeria entram com os dados reais (B4).
          </p>

          {/* galeria placeholder */}
          <Reveal
            stagger
            className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex aspect-[4/3] items-center justify-center rounded-lg border border-line bg-bg-raised"
              >
                <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-text-muted">
                  Imagem — placeholder
                </span>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section surface="base" className="border-t border-line text-center">
        <Container>
          <h2 className="font-display text-display-lg text-text-primary">
            Quer algo nesse padrão?
          </h2>
          <Reveal className="mt-8">
            <Button href="/contato" variant="primary" size="lg">
              Pedir orçamento
            </Button>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
