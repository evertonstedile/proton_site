import type { Work } from "@/components/ui/WorkCard";

/**
 * ⚠️ STUB de Obras (ver PENDENCIAS B4).
 * Dados mock no shape ESPERADO da tabela `obras` do Supabase. NÃO assumir como
 * verdade — o schema real será confirmado no Checkpoint 3 antes de ligar o
 * Supabase de produção (somente leitura). Trocar getObras()/getObraBySlug()
 * pela leitura real então; o resto da UI não deve precisar mudar.
 */
export type Obra = {
  slug: string;
  title: string;
  category: string; // ex.: "Residencial" | "Reforma"
  location: string; // ex.: "Garopaba/SC"
  year?: string;
  areaM2?: number;
  summary: string;
  cover?: string; // URL da foto de capa (ausente = placeholder, B3)
  gallery?: string[]; // URLs (ausente = placeholders, B3)
};

// PLACEHOLDER — substituir pelas obras reais (Supabase).
const OBRAS: Obra[] = [
  {
    slug: "residencia-vale",
    title: "Residência Vale",
    category: "Residencial",
    location: "Garopaba/SC",
    year: "2024",
    summary:
      "Casa de alto padrão integrada ao relevo, com volumetria limpa e materialidade nobre.",
  },
  {
    slug: "casa-ladeira",
    title: "Casa Ladeira",
    category: "Residencial",
    location: "Praia do Rosa/SC",
    year: "2023",
    summary:
      "Implantação em terreno de declive acentuado, resolvida com precisão estrutural.",
  },
  {
    slug: "reforma-mirante",
    title: "Reforma Mirante",
    category: "Reforma",
    location: "Garopaba/SC",
    year: "2023",
    summary:
      "Requalificação completa de ambientes, com novo partido de luz e acabamento refinado.",
  },
  {
    slug: "residencia-horizonte",
    title: "Residência Horizonte",
    category: "Residencial",
    location: "Florianópolis/SC",
    year: "2022",
    summary:
      "Programa amplo distribuído em pavimentos com transição suave entre interior e jardim.",
  },
  {
    slug: "casa-atrio",
    title: "Casa Átrio",
    category: "Residencial",
    location: "Garopaba/SC",
    year: "2022",
    summary:
      "Pátio central como coração da casa, organizando luz e ventilação natural.",
  },
  {
    slug: "reforma-cobertura",
    title: "Reforma Cobertura",
    category: "Reforma",
    location: "Florianópolis/SC",
    year: "2021",
    summary:
      "Cobertura reposicionada para vista e estar amplo, com engenharia de prazo apertado.",
  },
];

/** Converte uma Obra para o shape do WorkCard. */
export function obraToWork(o: Obra): Work {
  const area = o.areaM2 ? `${o.areaM2} m²` : "000 m²";
  return {
    title: o.title,
    meta: `${o.category} · ${area} · ${o.location}`,
    image: o.cover,
    href: `/obras/${o.slug}`,
  };
}

// STUB: trocar por leitura do Supabase (somente leitura) no Checkpoint 3.
export function getObras(): Obra[] {
  return OBRAS;
}

export function getObraBySlug(slug: string): Obra | undefined {
  return OBRAS.find((o) => o.slug === slug);
}
