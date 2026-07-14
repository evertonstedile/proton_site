import type { Work } from "@/components/ui/WorkCard";

/**
 * Portfólio curado (D14: site desacoplado, sem Supabase de obras).
 *
 * ⚠️ TODO(cliente): confirmar NOME público, CIDADE/UF, ANO e ÁREA (m²) reais de
 * cada obra. Os títulos abaixo são DESCRITIVOS e honestos; cidade/ano/área ficam
 * OMITIDOS até confirmação — nada é inventado.
 *
 * HONESTIDADE: assets são RENDERS / visualizações de projeto salvo confirmação.
 * `kind: "Visualização técnica"` até o cliente confirmar; aí trocar p/
 * "Obra entregue" e preencher area/ano/cidade (feito p/ winehouse em 13/07/2026).
 *
 * Imagens otimizadas (ffmpeg: crop de letterbox + grade de coesão) em
 * /public/obras/<slug>/ — cover.jpg + 01..03.jpg. (código interno entre [].)
 */
export type Obra = {
  slug: string;
  title: string;
  category: string; // Residencial | Condomínio | Uso misto
  kind: string; // "Visualização técnica" (render) | "Obra entregue" (confirmado)
  location?: string; // confirmar (TODO) — omitido até lá
  year?: string; // confirmar (TODO)
  areaM2?: number; // confirmar (TODO)
  summary: string;
  cover: string;
  gallery: string[];
};

const OBRAS: Obra[] = [
  {
    // [WineHouse / Neide II] — dados confirmados pelo cliente em 13/07/2026 (DF9).
    // Escopo/disciplinas: TODO: VALIDAR (aguardando retorno da Proton).
    slug: "winehouse",
    title: "Residência Wine House",
    category: "Residencial",
    kind: "Obra entregue",
    location: "Praia da Ferrugem, Garopaba/SC",
    year: "2026",
    areaM2: 91.79,
    summary:
      "Casa unifamiliar de partido horizontal — base em pedra, estrutura aparente e integração entre estar, mata e luz natural.",
    cover: "/obras/winehouse/cover.jpg",
    gallery: [
      "/media/img/image2.png",
      "/media/img/image3.png",
      "/media/img/image.png",
      "/media/img/image4.png",
      "/media/img/image5.png",
      "/media/img/image2_noite.png",
      "/obras/winehouse/01.jpg",
      "/obras/winehouse/02.jpg",
      "/obras/winehouse/03.jpg",
    ],
  },
  {
    // [M2]
    slug: "condominio-encosta",
    title: "Condomínio em Encosta",
    category: "Condomínio",
    kind: "Visualização técnica",
    summary:
      "Condomínio de casas em encosta — volumetria escalonada e implantação lida a partir do terreno, da insolação e do acesso.",
    cover: "/obras/m2/cover.jpg",
    gallery: ["/obras/m2/01.jpg", "/obras/m2/02.jpg", "/obras/m2/03.jpg"],
  },
  {
    // [M1]
    slug: "empreendimento-multiuso",
    title: "Empreendimento Multiuso",
    category: "Uso misto",
    kind: "Visualização técnica",
    summary:
      "Empreendimento de uso misto — frente comercial e unidades residenciais compatibilizadas, da implantação às fachadas.",
    cover: "/obras/m1/cover.jpg",
    gallery: ["/obras/m1/01.jpg", "/obras/m1/02.jpg", "/obras/m1/03.jpg"],
  },
  {
    // [M9]
    slug: "conjunto-residencial",
    title: "Conjunto de Vilas",
    category: "Condomínio",
    kind: "Visualização técnica",
    summary:
      "Conjunto residencial geminado — modulação de fachadas e infraestrutura de acesso resolvidas em projeto.",
    cover: "/obras/m9/cover.jpg",
    gallery: ["/obras/m9/01.jpg", "/obras/m9/02.jpg", "/obras/m9/03.jpg"],
  },
  {
    // [Poente / Neide III]
    slug: "residencia-poente",
    title: "Residência Poente",
    category: "Residencial",
    kind: "Visualização técnica",
    summary:
      "Residência em terreno de declive — pavimento suspenso sobre base de pedra, com transição entre garagem, estar e piscina.",
    cover: "/obras/poente/cover.jpg",
    gallery: [
      "/obras/poente/01.jpg",
      "/obras/poente/02.jpg",
      "/obras/poente/03.jpg",
    ],
  },
  {
    // [Casa N1 / Neide I]
    slug: "residencia-encosta",
    title: "Residência em Encosta",
    category: "Residencial",
    kind: "Visualização técnica",
    summary:
      "Residência compacta em encosta — volumetria limpa e materialidade nobre integradas ao relevo.",
    cover: "/obras/casa-n1/cover.jpg",
    gallery: [
      "/obras/casa-n1/01.jpg",
      "/obras/casa-n1/02.jpg",
      "/obras/casa-n1/03.jpg",
    ],
  },
];

/** Converte uma Obra para o shape do WorkCard. Meta honesta: sem área/cidade
 * inventadas — só o que está confirmado (category · kind · location?). */
export function obraToWork(o: Obra): Work {
  const meta = [o.category, o.kind, o.location].filter(Boolean).join(" · ");
  return {
    title: o.title,
    meta,
    image: o.cover,
    href: `/obras/${o.slug}`,
  };
}

export function getObras(): Obra[] {
  return OBRAS;
}

export function getObraBySlug(slug: string): Obra | undefined {
  return OBRAS.find((o) => o.slug === slug);
}
