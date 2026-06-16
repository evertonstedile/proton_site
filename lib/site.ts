/**
 * Config central do site. ⚠️ Vários campos são PLACEHOLDER (ver PENDENCIAS):
 * domínio (B6), e-mail/WhatsApp (B2/B5). Configuráveis por env (NEXT_PUBLIC_*)
 * ou edite aqui quando os dados reais chegarem.
 */
export const SITE = {
  name: "Proton Engenharia & Consultoria",
  shortName: "Proton Engenharia",
  // domínio definitivo (B6): protonsc.com.br. Env NEXT_PUBLIC_SITE_URL sobrepõe.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://protonsc.com.br",
  description:
    "Engenharia residencial de alto padrão — precisão técnica e sofisticação. Blumenau/SC.",
  locality: "Blumenau",
  region: "SC",
  country: "BR",
  // PLACEHOLDER (B2) — trocar pelo e-mail real
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contato@protonsc.com.br",
  // PLACEHOLDER (B5) — só dígitos com DDI/DDD, ex.: 5547999999999
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "5547000000000",
} as const;

/** Link wa.me com mensagem opcional pré-preenchida. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
