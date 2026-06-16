/**
 * Config central do site. ⚠️ Vários campos são PLACEHOLDER (ver PENDENCIAS):
 * domínio (B6), e-mail/telefone (B2). Centralizado para troca em um só lugar.
 */
export const SITE = {
  name: "Proton Engenharia & Consultoria",
  shortName: "Proton Engenharia",
  url: "https://proton.eng.br", // PLACEHOLDER domínio definitivo (B6)
  description:
    "Engenharia residencial de alto padrão — precisão técnica e sofisticação. Blumenau/SC.",
  locality: "Blumenau",
  region: "SC",
  country: "BR",
  email: "contato@proton.eng.br", // PLACEHOLDER (B2)
  phone: "+55-00-00000-0000", // PLACEHOLDER (B2)
} as const;
