/**
 * ⚠️ CONTEÚDO PLACEHOLDER (ver PENDENCIAS B2/B3).
 * Copy, números e depoimentos são provisórios até virem os dados reais da
 * Proton. As obras vivem em `lib/obras.ts` (stub → Supabase no Checkpoint 3).
 * Números e depoimentos exibem aviso visível de "ilustrativos".
 */

// --- Manifesto ------------------------------------------------------------
export const manifesto =
  "Cada obra é uma afirmação de precisão — onde a engenharia encontra a permanência.";

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

// --- Serviços (dados reais — 33 serviços em 7 frentes) --------------------
export const serviceGroups = [
  {
    area: "Projetos de Engenharia e Arquitetura",
    items: [
      "Projeto Arquitetônico",
      "Projeto de Fundação",
      "Projeto Estrutural",
      "Projeto Elétrico",
      "Projeto Hidrossanitário",
      "Projeto de Prevenção e Combate a Incêndio (PPCI)",
      "Compatibilização de Projetos",
      "Renderização 3D e Maquete Eletrônica",
    ],
  },
  {
    area: "Regularização e Documentação Imobiliária",
    items: [
      "Regularização de Imóveis",
      "Regularização de Obras",
      "Instituição e Especificação de Condomínio",
      "Incorporações Imobiliárias",
      "Loteamentos e Condomínios",
      "REURB – Regularização Fundiária Urbana",
      "Desmembramento, Unificação e Retificação de Matrículas",
      "Apoio Técnico junto ao Registro de Imóveis",
      "Memorial Descritivo e Documentação Técnica",
    ],
  },
  {
    area: "Topografia e Georreferenciamento",
    items: [
      "Levantamento Topográfico Planialtimétrico",
      "Georreferenciamento de Imóveis",
    ],
  },
  {
    area: "Execução e Fiscalização de Obras",
    items: [
      "Administração e Execução de Obras",
      "Gerenciamento e Fiscalização de Obras",
      "Acompanhamento Técnico de Execução",
    ],
  },
  {
    area: "Infraestrutura Urbana",
    items: [
      "Projetos de Infraestrutura Urbana",
      "Projetos de Drenagem Pluvial",
      "Projetos de Rede de Água e Esgoto",
      "Projetos de Pavimentação",
    ],
  },
  {
    area: "Aprovações e Licenciamento",
    items: [
      "Aprovação de Projetos e Emissão de Alvarás",
      "Acompanhamento junto a Órgãos Públicos",
      "Regularização Ambiental e Licenciamento",
    ],
  },
  {
    area: "Consultoria, Laudos e Viabilidade",
    items: [
      "Assessoria Técnica em Engenharia e Urbanismo",
      "Laudos Técnicos e Pareceres de Engenharia",
      "Estudos de Viabilidade Técnica e Urbanística",
      "Consultoria para Empreendimentos Imobiliários",
    ],
  },
];

export const servicesCount = serviceGroups.reduce(
  (n, g) => n + g.items.length,
  0,
); // 33

// --- Sobre (copy PLACEHOLDER) ---------------------------------------------
export const about = {
  intro:
    "Engenharia residencial de alto padrão em Garopaba/SC — onde precisão técnica e sofisticação caminham juntas.",
  story: [
    "A Proton nasce do encontro entre rigor de engenharia e sensibilidade de projeto. Cada obra é conduzida como uma peça única, do diagnóstico do terreno à entrega das chaves.",
    "Atuamos para o cliente de alto padrão que valoriza prazo cumprido, transparência e um acabamento que resiste ao tempo. O site é parte do ecossistema Proton OS — uma única fonte de verdade do projeto à obra.",
  ],
  values: [
    {
      title: "Precisão",
      desc: "Engenharia que antecipa problemas antes que virem custo.",
    },
    {
      title: "Sofisticação",
      desc: "Materialidade, luz e proporção pensadas em cada detalhe.",
    },
    {
      title: "Transparência",
      desc: "Prazo, custo e decisões claras em todas as etapas.",
    },
    {
      title: "Permanência",
      desc: "Acabamento e estrutura que duram — feito para o tempo.",
    },
  ],
};

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
