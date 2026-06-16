import type { Work } from "@/components/ui/WorkCard";

/**
 * ⚠️ CONTEÚDO PLACEHOLDER (ver PENDENCIAS B2/B3).
 * Copy, obras, números e depoimentos são provisórios até virem os dados reais
 * da Proton. Obras virão do Supabase na Fase 4. Números e depoimentos exibem
 * aviso visível de "ilustrativos" — nada apresentado como real.
 */

// --- Manifesto ------------------------------------------------------------
export const manifesto =
  "Cada obra é uma afirmação de precisão — onde a engenharia encontra a permanência.";

// --- Obras em destaque (placeholder; Fase 4 puxa do Supabase) -------------
export const featuredWorks: Work[] = [
  {
    title: "Residência Vale",
    meta: "Residencial · 000 m² · Blumenau/SC",
    href: "/obras",
  },
  {
    title: "Casa Ladeira",
    meta: "Residencial · 000 m² · Gaspar/SC",
    href: "/obras",
  },
  {
    title: "Reforma Mirante",
    meta: "Reforma · 000 m² · Blumenau/SC",
    href: "/obras",
  },
];

// --- Números / prova (VALORES ILUSTRATIVOS — a confirmar) -----------------
export const stats = [
  { value: 120, suffix: "+", label: "Obras entregues" },
  { value: 85000, suffix: " m²", label: "Área construída" },
  { value: 15, suffix: "+", label: "Anos de experiência" },
];

// --- Processo -------------------------------------------------------------
export const processSteps = [
  {
    n: "01",
    title: "Diagnóstico",
    desc: "Entendemos o terreno, o programa e o sonho do cliente antes de qualquer traço.",
  },
  {
    n: "02",
    title: "Projeto",
    desc: "Engenharia e arquitetura alinhadas — precisão técnica desde a primeira prancha.",
  },
  {
    n: "03",
    title: "Execução",
    desc: "Obra conduzida com controle de prazo, custo e qualidade em cada etapa.",
  },
  {
    n: "04",
    title: "Entrega",
    desc: "Acabamento de alto padrão e acompanhamento até o pós-obra.",
  },
];

// --- Serviços -------------------------------------------------------------
export const services = [
  {
    n: "01",
    title: "Construção residencial",
    desc: "Casas de alto padrão do projeto à entrega, com gestão integral da obra.",
  },
  {
    n: "02",
    title: "Reformas de alto padrão",
    desc: "Requalificação de ambientes com precisão técnica e acabamento refinado.",
  },
  {
    n: "03",
    title: "Gerenciamento de obra",
    desc: "Controle de prazo, custo e qualidade com transparência total ao cliente.",
  },
  {
    n: "04",
    title: "Consultoria & projetos",
    desc: "Compatibilização, viabilidade e soluções de engenharia sob medida.",
  },
];

// --- Depoimentos (ILUSTRATIVOS — substituir por reais) --------------------
export const testimonials = [
  {
    quote:
      "Do projeto à entrega, a precisão e o cuidado da equipe transformaram nossa casa em algo além do esperado.",
    author: "Cliente Proton",
    role: "Residência · placeholder",
  },
  {
    quote:
      "Prazo cumprido, comunicação clara e um acabamento impecável. Engenharia de verdade.",
    author: "Cliente Proton",
    role: "Reforma · placeholder",
  },
];
