import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CrossfadeDiaNoite } from "@/components/gl/CrossfadeDiaNoite";
import { HOME_FW } from "@/lib/content";

/**
 * Movimento 02 — Hero dia→noite (F4).
 * Seção 260svh com visual sticky (pin sem GSAP — funciona com scroll nativo
 * e Lenis); progresso 0→1 = dia→noite via CrossfadeDiaNoite (tier A shader,
 * tier B fade CSS, tier C nada). Foto dia = <Image priority> SSR = LCP
 * (lição D13: pinta antes de qualquer bundle). Headline visível desde o
 * primeiro paint (SEO/LCP) — a "entrada em máscara" fica pro load, não pro
 * scroll, para nunca esconder o h1.
 * reduced-motion: CSS desfaz a altura e o sticky — hero de 1 tela, estático,
 * com a foto noturna acessível em <details> (informação completa).
 * ⚠️ Par real dia/noite = image2.png + image2_noite.png (nomes do zip trocados).
 */
export function HeroDiaNoite() {
  return (
    <section id="hero" className="relative h-[260svh] bg-bg motion-reduce:h-auto">
      <div className="sticky top-0 flex h-svh flex-col justify-end overflow-hidden motion-reduce:static">
        <Image
          src="/media/img/image2.png"
          alt="Residência Wine House ao entardecer — fachada em vidro e concreto sobre muro de pedra com espelho d'água, Praia da Ferrugem, Garopaba/SC"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <CrossfadeDiaNoite />
        {/* gradiente de leitura — texto sempre legível sobre a foto */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />

        <Container className="relative pb-20 pt-[55svh] md:pb-28">
          <h1 className="max-w-4xl font-serif text-display-xl text-fg">
            Engenharia que transforma{" "}
            <em className="italic text-fg">complexidade em forma</em>.
          </h1>
          <p className="mt-6 max-w-xl font-sans text-body-lg text-fg-muted">
            {HOME_FW.hero.sub}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/obras" size="lg">
              {HOME_FW.hero.ctaPrimary}
            </Button>
            <Button href="/contato" variant="ghost" size="lg">
              {HOME_FW.hero.ctaSecondary}
            </Button>
          </div>

          {/* Tier C / reduced-motion: noite acessível sem scrub */}
          <details className="mt-8 hidden motion-reduce:block">
            <summary className="cursor-pointer font-mono text-small uppercase tracking-kicker text-fg-muted">
              Ver a residência à noite
            </summary>
            <div className="relative mt-4 aspect-video max-w-2xl overflow-hidden rounded-lg">
              <Image
                src="/media/img/image2_noite.png"
                alt="Residência Wine House à noite — interiores e paisagismo iluminados"
                fill
                sizes="(min-width: 768px) 42rem, 100vw"
                className="object-cover"
              />
            </div>
          </details>
        </Container>
      </div>
    </section>
  );
}
