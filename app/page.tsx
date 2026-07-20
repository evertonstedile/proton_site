import { FilmScroll } from "@/components/home/film/FilmScroll";
import { ManifestoEditorial } from "@/components/home/fw/ManifestoEditorial";
import { CaseWineHouse } from "@/components/home/fw/CaseWineHouse";
import { Construcao } from "@/components/home/fw/Construcao";
import { VisaoEstrutural } from "@/components/home/fw/VisaoEstrutural";
import { EscalaCondominio } from "@/components/home/fw/EscalaCondominio";
import { ServicosEditorial } from "@/components/home/fw/ServicosEditorial";
import { Metodo } from "@/components/home/fw/Metodo";
import { Numeros } from "@/components/home/fw/Numeros";
import { Socios } from "@/components/home/fw/Socios";
import { Faq } from "@/components/home/Faq";
import { CtaConversa } from "@/components/home/fw/CtaConversa";

/**
 * Home — scroll-film "Da Noite Nasce a Casa" (skill scroll-film-studio):
 * abertura vira UMA tomada contínua scrubada (FilmScroll, draft 5/5 capítulos;
 * caps 4-5 entram quando o limite diário do Higgsfield resetar) e os demais
 * movimentos do framework literal (spec 2026-07-13 §5) seguem como conteúdo
 * after-film. HeroDiaNoite preservado em components/home/fw/ fora do fluxo.
 */
export default function Home() {
  return (
    <main>
      <FilmScroll />
      <ManifestoEditorial />
      <CaseWineHouse />
      <Construcao />
      <VisaoEstrutural />
      <EscalaCondominio />
      <ServicosEditorial />
      <Metodo />
      <Numeros />
      <Socios />
      <Faq />
      <CtaConversa />
    </main>
  );
}
