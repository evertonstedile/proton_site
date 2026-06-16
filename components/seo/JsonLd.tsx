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
    areaServed: "Garopaba/SC e região",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: SITE.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    hasMap: SITE.mapsUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
