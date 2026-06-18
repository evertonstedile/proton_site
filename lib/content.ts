/**
 * ⚠️ CONTEÚDO PLACEHOLDER (ver PENDENCIAS B2/B3).
 * Copy, números e depoimentos são provisórios até virem os dados reais da
 * Proton. As obras vivem em `lib/obras.ts` (stub → Supabase no Checkpoint 3).
 * Números e depoimentos exibem aviso visível de "ilustrativos".
 */

// --- Manifesto ------------------------------------------------------------
export const manifesto =
  "Cada obra é uma afirmação de precisão — onde a engenharia encontra a permanência.";

// --- Números / prova (DADOS REAIS) ----------------------------------------
export const stats = [
  { value: 371, suffix: "", label: "Projetos aprovados" },
  { value: 119, suffix: "", label: "Laudos emitidos" },
  { value: 70400, suffix: " m²", label: "Área construída" },
  { value: 11, suffix: "", label: "Anos de experiência" },
];

// --- Processo -------------------------------------------------------------
export const processSteps = [
  {
    n: "01",
    title: "Viabilidade",
    desc: "Análise do terreno, zoneamento e potencial construtivo — viabilidade técnica e legal antes de investir.",
  },
  {
    n: "02",
    title: "Projeto",
    desc: "Arquitetura e engenharia compatibilizadas, do estudo preliminar ao projeto executivo.",
  },
  {
    n: "03",
    title: "Aprovação & Regularização",
    desc: "Alvarás e aprovações na Prefeitura e no Corpo de Bombeiros, e regularização junto ao Registro de Imóveis.",
  },
  {
    n: "04",
    title: "Execução & Entrega",
    desc: "Execução com fiscalização técnica e controle de prazo, custo e qualidade, até a entrega.",
  },
];

// --- Serviços (dados reais — 33 serviços em 7 frentes; escopo do catálogo) -
// Linha oficial de posicionamento (capa do catálogo).
export const servicesTagline =
  "Soluções completas em engenharia, arquitetura e regularização.";

export const serviceGroups = [
  {
    area: "Projetos de Engenharia e Arquitetura",
    items: [
      {
        name: "Projeto Arquitetônico",
        desc: "Do estudo preliminar ao executivo: plantas, cortes, fachadas e projeto legal.",
      },
      {
        name: "Projeto de Fundação",
        desc: "Fundações rasas e profundas dimensionadas conforme o solo e as cargas, com ART/RRT.",
      },
      {
        name: "Projeto Estrutural",
        desc: "Dimensionamento de fundações, vigas, pilares e lajes, com memorial de cálculo e ART/RRT.",
      },
      {
        name: "Projeto Elétrico",
        desc: "Cargas, circuitos, iluminação, quadro e aterramento conforme a concessionária.",
      },
      {
        name: "Projeto Hidrossanitário",
        desc: "Água fria e quente, esgoto e drenagem pluvial, com isométricos e compatibilização.",
      },
      {
        name: "Projeto de Prevenção e Combate a Incêndio (PPCI)",
        desc: "Preventivo com hidrantes, sinalização e rotas de fuga, aprovado no Corpo de Bombeiros.",
      },
      {
        name: "Compatibilização de Projetos",
        desc: "Integração entre disciplinas para eliminar interferências e otimizar a obra.",
      },
      {
        name: "Renderização 3D e Maquete Eletrônica",
        desc: "Modelagem 3D e imagens fotorrealistas para visualizar e apresentar o projeto.",
      },
    ],
  },
  {
    area: "Regularização e Documentação Imobiliária",
    items: [
      {
        name: "Regularização de Imóveis",
        desc: "As built, Habite-se e averbação no Registro de Imóveis, com acompanhamento processual.",
      },
      {
        name: "Regularização de Obras",
        desc: "Adequação de edificações existentes à legislação, com projetos corretivos e documentação.",
      },
      {
        name: "Instituição e Especificação de Condomínio",
        desc: "Quadro de áreas (NBR 12.721), frações ideais e assessoria até o registro.",
      },
      {
        name: "Incorporações Imobiliárias",
        desc: "Memorial de incorporação e documentação técnica para o Registro de Imóveis.",
      },
      {
        name: "Loteamentos e Condomínios",
        desc: "Projeto urbanístico, infraestrutura e viabilidade, com aprovação municipal e ambiental.",
      },
      {
        name: "REURB – Regularização Fundiária Urbana",
        desc: "Da diagnose da área irregular à titulação, com projeto urbanístico e topografia.",
      },
      {
        name: "Desmembramento, Unificação e Retificação de Matrículas",
        desc: "Levantamento, plantas e retificação junto ao Registro de Imóveis.",
      },
      {
        name: "Apoio Técnico junto ao Registro de Imóveis",
        desc: "Plantas, memoriais e atendimento de exigências para averbações e registros.",
      },
      {
        name: "Memorial Descritivo e Documentação Técnica",
        desc: "Memoriais de obra, acabamento e infraestrutura conforme as normas técnicas.",
      },
    ],
  },
  {
    area: "Topografia e Georreferenciamento",
    items: [
      {
        name: "Levantamento Topográfico Planialtimétrico",
        desc: "GPS RTK/estação total, curvas de nível e planta topográfica georreferenciada.",
      },
      {
        name: "Georreferenciamento de Imóveis",
        desc: "Rural e urbano conforme o INCRA, com certificação SIGEF quando aplicável.",
      },
    ],
  },
  {
    area: "Execução e Fiscalização de Obras",
    items: [
      {
        name: "Administração e Execução de Obras",
        desc: "Planejamento físico-financeiro, coordenação de equipes e controle de custo e qualidade.",
      },
      {
        name: "Gerenciamento e Fiscalização de Obras",
        desc: "Fiscalização técnica e controle de conformidade com projetos e cronograma.",
      },
      {
        name: "Acompanhamento Técnico de Execução",
        desc: "Visitas periódicas, orientação técnica e conferência das etapas construtivas.",
      },
    ],
  },
  {
    area: "Infraestrutura Urbana",
    items: [
      {
        name: "Projetos de Infraestrutura Urbana",
        desc: "Viário, drenagem, água e esgoto, com detalhamento executivo e aprovações.",
      },
      {
        name: "Projetos de Drenagem Pluvial",
        desc: "Dimensionamento hidráulico, galerias e dispositivos de captação pluvial.",
      },
      {
        name: "Projetos de Rede de Água e Esgoto",
        desc: "Redes de abastecimento e coleta dimensionadas, com aprovação na concessionária.",
      },
      {
        name: "Projetos de Pavimentação",
        desc: "Projeto geométrico, dimensionamento e perfis, compatibilizados com a drenagem.",
      },
    ],
  },
  {
    area: "Aprovações e Licenciamento",
    items: [
      {
        name: "Aprovação de Projetos e Emissão de Alvarás",
        desc: "Protocolo na Prefeitura e no Corpo de Bombeiros e emissão de alvarás e licenças.",
      },
      {
        name: "Acompanhamento junto a Órgãos Públicos",
        desc: "Protocolos, diligências e representação técnica em processos administrativos.",
      },
      {
        name: "Regularização Ambiental e Licenciamento",
        desc: "Assessoria e apoio em licenciamentos ambientais e exigências dos órgãos.",
      },
    ],
  },
  {
    area: "Consultoria, Laudos e Viabilidade",
    items: [
      {
        name: "Assessoria Técnica em Engenharia e Urbanismo",
        desc: "Consultoria, pareceres e orientação normativa para decisões técnicas seguras.",
      },
      {
        name: "Laudos Técnicos e Pareceres de Engenharia",
        desc: "Inspeção in loco, avaliação de patologias e laudos de vistoria e estabilidade, com ART.",
      },
      {
        name: "Estudos de Viabilidade Técnica e Urbanística",
        desc: "Zoneamento, índices e potencial construtivo do terreno, com diretrizes de aprovação.",
      },
      {
        name: "Consultoria para Empreendimentos Imobiliários",
        desc: "Análise de terrenos, viabilidade e estratégias de aprovação para investidores.",
      },
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
    "Soluções completas em engenharia, arquitetura e regularização em Garopaba/SC — precisão técnica e sofisticação em cada etapa.",
  story: [
    "A Proton nasce do encontro entre rigor de engenharia e sensibilidade de projeto. Do estudo de viabilidade e do projeto à regularização, à execução e à entrega, cada trabalho é conduzido com método e cuidado.",
    "Atuamos de ponta a ponta — projetos, regularização imobiliária, topografia, infraestrutura, licenciamento, execução e consultoria — para que cada empreendimento avance com segurança técnica e tranquilidade.",
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

// --- FAQ (perguntas frequentes — visível + FAQPage JSON-LD p/ SEO/GEO) ----
// Respostas factuais, alinhadas ao conteúdo do site. Evitam afirmar o título
// profissional dos RTs (não confirmado) e preços específicos.
export const faq = [
  {
    q: "Quais serviços a Proton oferece?",
    a: "A Proton atua de ponta a ponta em engenharia, arquitetura, regularização imobiliária, topografia, infraestrutura, licenciamento, execução e consultoria — do estudo de viabilidade e do projeto à obra entregue.",
  },
  {
    q: "A Proton atende em quais regiões?",
    a: "Atendemos Garopaba/SC e região — incluindo Praia do Rosa, Imbituba, Florianópolis e o entorno do litoral catarinense.",
  },
  {
    q: "O que é regularização de imóvel e quando preciso dela?",
    a: "Regularização é adequar a construção à sua documentação legal — aprovação na prefeitura, habite-se e averbação em cartório. Costuma ser necessária para vender ou financiar o imóvel, obter o habite-se e evitar pendências quando a obra não corresponde ao que está registrado.",
  },
  {
    q: "Como funciona o processo de um projeto na Proton?",
    a: "Em quatro etapas: viabilidade (terreno, zoneamento e potencial construtivo), projeto (arquitetura e engenharia compatibilizadas), aprovação e regularização (prefeitura, cartório e órgãos competentes) e execução e entrega, com acompanhamento técnico até a conclusão.",
  },
  {
    q: "A Proton é registrada no CREA?",
    a: "Sim. A Proton é registrada no CREA-SC (registro 230125-6) e conta com responsáveis técnicos registrados no conselho — toda atividade técnica é conduzida com a devida responsabilidade profissional.",
  },
  {
    q: "A Proton só faz o projeto ou também acompanha a obra?",
    a: "Oferecemos serviço completo (full-service): do projeto à execução e entrega, com acompanhamento técnico da obra. É possível contratar etapas específicas ou o ciclo completo.",
  },
  {
    q: "Como peço um orçamento?",
    a: "Pelo WhatsApp ou pela página de contato do site. A partir da sua necessidade e do terreno, fazemos uma avaliação inicial e apresentamos a proposta.",
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
