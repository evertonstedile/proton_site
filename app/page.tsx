import { HeroDiaNoite } from "@/components/home/fw/HeroDiaNoite";
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
 * Home — framework literal (spec 2026-07-13 §5): 14 movimentos sobre footage
 * real. 01 Prelude = Preloader global (layout) · 02 Hero dia→noite ·
 * 03 Manifesto · 04 Case Wine House · 05 Construção · 06 Visão estrutural ·
 * 07+08 Escala + Condomínio JCR · 09 Serviços · 10 Método · 11 Números ·
 * 12 Sócios · FAQ (GEO) · 13 CTA · 14 Footer (layout).
 * Componentes SOTD saíram do fluxo — arquivos removidos na Task 12.
 */
export default function Home() {
  return (
    <main>
      <HeroDiaNoite />
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
