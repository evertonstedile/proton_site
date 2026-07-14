import { cn } from "@/lib/cn";
import Image from "next/image";
import Link from "next/link";
import { AtomicOrbit } from "@/components/brand/AtomicOrbit";

export type Work = {
  title: string;
  meta: string; // ex.: "Residencial · 420 m² · Garopaba/SC"
  image?: string; // URL da foto da obra (ausente = placeholder)
  href?: string;
};

/**
 * Card de obra — imagem (ratio 4:5) + título + meta, hover cinematográfico.
 * Sem foto real, renderiza placeholder CLARAMENTE marcado (ver PENDENCIAS.md).
 */
export function WorkCard({
  work,
  className,
  titleAs: TitleTag = "h3",
}: {
  work: Work;
  className?: string;
  titleAs?: "h2" | "h3";
}) {
  const inner = (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border border-line bg-bg-raised transition-colors duration-reveal ease-cinematic hover:border-line-accent",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {work.image ? (
          <Image
            src={work.image}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[1.2s] ease-cinematic group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_30%_20%,#1c1c1f,#000)]">
            <AtomicOrbit className="h-12 w-12 opacity-30" />
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-fg-muted">
              Foto da obra — placeholder
            </span>
          </div>
        )}
        {/* overlay gradual preto→transparente (texto sobre foto) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <TitleTag className="font-display text-h2 text-fg">
          {work.title}
        </TitleTag>
        <p className="mt-1 font-sans text-small text-fg-muted">{work.meta}</p>
      </div>
    </article>
  );

  return work.href ? (
    <Link href={work.href} className="block">
      {inner}
    </Link>
  ) : (
    inner
  );
}
