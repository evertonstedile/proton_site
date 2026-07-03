import { HeroSotd } from "@/components/home/HeroSotd";
import { ManifestoCamera } from "@/components/home/ManifestoCamera";
import { Diferencial } from "@/components/home/Diferencial";
import { SistemaFisica } from "@/components/home/SistemaFisica";
import { Manifesto } from "@/components/home/Manifesto";
import { FeaturedWorks } from "@/components/home/FeaturedWorks";
import { Stats } from "@/components/home/Stats";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";

/**
 * Home — narrativa cinematográfica (Fase 3).
 * Hero → Manifesto → Obras → Números → Processo → Serviços → Depoimentos → FAQ → CTA.
 * Conteúdo (copy/fotos/números/depoimentos) é PLACEHOLDER — ver PENDENCIAS/lib/content.
 */
export default function Home() {
  return (
    <main>
      <HeroSotd />
      <ManifestoCamera />
      <Diferencial />
      <SistemaFisica />
      <Manifesto />
      <FeaturedWorks />
      <Stats />
      <Process />
      <Services />
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  );
}
