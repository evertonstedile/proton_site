/**
 * Config central do site. ⚠️ Vários campos são PLACEHOLDER (ver PENDENCIAS):
 * domínio (B6), e-mail/WhatsApp (B2/B5). Configuráveis por env (NEXT_PUBLIC_*)
 * ou edite aqui quando os dados reais chegarem.
 */
export const SITE = {
  name: "Proton Engenharia & Consultoria",
  shortName: "Proton Engenharia",
  // domínio definitivo (B6): protonsc.com.br. Env NEXT_PUBLIC_SITE_URL sobrepõe.
  // .trim() + sem barra final: blinda contra espaço/quebra de linha colada na env.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://protonsc.com.br")
    .trim()
    .replace(/\/+$/, ""),
  description:
    "Soluções completas em engenharia, arquitetura e regularização — precisão técnica e sofisticação. Garopaba/SC.",
  locality: "Garopaba",
  region: "SC",
  country: "BR",
  // PLACEHOLDER (extraído do pin do Maps) — confirmar nº/complemento
  street: "Rua Santa Rita, 571",
  district: "Centro",
  postalCode: "88495-000",
  geo: { lat: -28.0323346, lng: -48.6198405 },
  mapsUrl: "https://maps.app.goo.gl/mYVenbPswDejSXq58",
  // PLACEHOLDER (B2) — trocar pelo e-mail real
  email: (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contato@protonsc.com.br").trim(),
  // PLACEHOLDER (B5) — só dígitos com DDI/DDD; remove qualquer não-dígito.
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP ?? "5547000000000").replace(/\D/g, ""),
} as const;

/**
 * Dados legais da entidade (Cartão CNPJ oficial). Usados no rodapé e na
 * Política de Privacidade — e exigidos na verificação de negócio da Meta
 * (WhatsApp Cloud API): razão social + nome fantasia precisam estar visíveis.
 * ⚠️ O endereço abaixo é o FISCAL registrado no CNPJ (Florianópolis, provável
 * endereço da contabilidade). O escritório físico/operacional fica em Garopaba
 * (ver SITE.street acima, usado no rodapé e no JsonLd) — distintos de propósito.
 * E-mail de contato vive em SITE.email (env NEXT_PUBLIC_CONTACT_EMAIL) p/ troca fácil.
 */
export const LEGAL = {
  legalName: "PROTON CONSULTORIA ADMINISTRATIVA LTDA", // razão social
  tradeName: "Proton Engenharia & Consultoria", // nome fantasia / comercial
  cnpj: "51.164.331/0001-06",
  legalNature: "Sociedade Empresária Limitada", // natureza jurídica
  address: {
    street: "Rua Prefeito Osmar Cunha, 416 — Sala 1108",
    district: "Centro",
    city: "Florianópolis",
    region: "SC",
    postalCode: "88015-100",
    full: "Rua Prefeito Osmar Cunha, 416 — Sala 1108, Centro, Florianópolis/SC — CEP 88015-100",
  },
  partners: [
    "João Pedro Medeiros de Souza",
    "Vitor Mateus Macuglia",
    "Rômulo Lima Rodrigues (Sócio-Administrador)",
  ],
} as const;

/** Link wa.me com mensagem opcional pré-preenchida. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
