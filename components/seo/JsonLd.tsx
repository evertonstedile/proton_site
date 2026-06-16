import { SITE } from "@/lib/site";

/**
 * Dados estruturados (schema.org) — LocalBusiness de construção.
 * ⚠️ telefone/e-mail/endereço são PLACEHOLDER (B2) — confirmar antes do go-live.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness", // subtipo de LocalBusiness
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    telephone: `+${SITE.whatsapp}`,
    areaServed: "Blumenau/SC e região",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
