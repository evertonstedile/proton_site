import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HOME_FW } from "@/lib/content";

/**
 * Movimento 02 — Hero dia→noite (versão estática, F2).
 * Foto dia = LCP (prioridade, pinta antes de qualquer bundle — lição D13).
 * Crossfade WebGL + pin de 260vh entram na Task 6; aqui a foto noturna fica
 * como segunda dobra do próprio hero (Tier C nasce pronto: informação
 * completa sem JS).
 * ⚠️ Assets: par real dia/noite é image2.png + image2_noite.png (nomes do zip
 * vieram trocados vs framework — fora2.png é a aérea do condomínio).
 */
export function HeroDiaNoite() {
  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-bg">
      <Image
        src="/media/img/image2.png"
        alt="Residência Wine House ao entardecer — fachada em vidro e concreto sobre muro de pedra com espelho d'água, Praia da Ferrugem, Garopaba/SC"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* gradiente de leitura — texto sempre legível sobre a foto */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />

      <Container className="relative pb-20 pt-[60svh] md:pb-28">
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
      </Container>
    </section>
  );
}
