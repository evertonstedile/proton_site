import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { FeaturedWorks } from "@/components/home/FeaturedWorks";
import { Stats } from "@/components/home/Stats";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCta } from "@/components/home/FinalCta";

/**
 * Home — narrativa cinematográfica (Fase 3).
 * Hero → Manifesto → Obras → Números → Processo → Serviços → Depoimentos → CTA.
 * Conteúdo (copy/fotos/números/depoimentos) é PLACEHOLDER — ver PENDENCIAS/lib/content.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <FeaturedWorks />
      <Stats />
      <Process />
      <Services />
      <Testimonials />
      <FinalCta />
    </main>
  );
}
