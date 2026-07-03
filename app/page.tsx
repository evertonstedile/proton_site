import { HeroSotd } from "@/components/home/HeroSotd";
import { ManifestoCamera } from "@/components/home/ManifestoCamera";
import { Diferencial } from "@/components/home/Diferencial";
import { SistemaFisica } from "@/components/home/SistemaFisica";
import { Manifesto } from "@/components/home/Manifesto";
import { ObrasShowcase } from "@/components/home/ObrasShowcase";
import { Stats } from "@/components/home/Stats";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";

/**
 * Home — narrativa cinematográfica SOTD.
 * Hero → Manifesto → Sistema → Obras (prova) → Números → Processo → Serviços → FAQ → CTA.
 * Depoimentos cortados (spec §2: eram ilustrativos). Ordem FINAL canônica na Task 8.
 * Conteúdo (copy/fotos/números) segue placeholder onde marcado — ver lib/content.
 */
export default function Home() {
  return (
    <main>
      <HeroSotd />
      <ManifestoCamera />
      <Diferencial />
      <SistemaFisica />
      <ObrasShowcase />
      <Manifesto />
      <Stats />
      <Process />
      <Services />
      <Faq />
      <FinalCta />
    </main>
  );
}
