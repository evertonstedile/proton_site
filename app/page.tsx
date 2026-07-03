import { HeroSotd } from "@/components/home/HeroSotd";
import { ManifestoCamera } from "@/components/home/ManifestoCamera";
import { Diferencial } from "@/components/home/Diferencial";
import { SistemaFisica } from "@/components/home/SistemaFisica";
import { ObrasShowcase } from "@/components/home/ObrasShowcase";
import { Stats } from "@/components/home/Stats";
import { Faq } from "@/components/home/Faq";
import { CtaGesto } from "@/components/home/CtaGesto";
import { Fechamento } from "@/components/home/Fechamento";

/**
 * Home — narrativa cinematográfica SOTD (ordem canônica, 8 passos do canon):
 * Hero (imersivo) → Manifesto (promessa/tensão, câmera) → Diferencial →
 * Sistema (física) → Obras (prova) → Números → FAQ → CTA (gesto) → Fechamento.
 *
 * Seções antigas (Manifesto, Process, Services, FinalCta, Testimonials, FeaturedWorks)
 * saíram do fluxo — cobertas pelas novas ou fora da narrativa (Serviços vive em
 * /servicos). Arquivos removidos na limpeza (Task 9).
 */
export default function Home() {
  return (
    <main>
      <HeroSotd />
      <ManifestoCamera />
      <Diferencial />
      <SistemaFisica />
      <ObrasShowcase />
      <Stats />
      <Faq />
      <CtaGesto />
      <Fechamento />
    </main>
  );
}
