import { SITE, LEGAL } from "@/lib/site";

/**
 * Dados estruturados (schema.org) via @graph: Organization + WebSite +
 * LocalBusiness (HomeAndConstructionBusiness), interligados por @id.
 * Reflete o conteúdo real do site (NAP, CNPJ, CREA) — base de SEO + GEO.
 */
export function JsonLd() {
  const orgId = `${SITE.url}/#organization`;
  const siteId = `${SITE.url}/#website`;

  const address = {
    "@type": "PostalAddress",
    streetAddress: `${SITE.street} — ${SITE.district}`,
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    postalCode: SITE.postalCode,
    addressCountry: SITE.country,
  };

  const logo = `${SITE.url}/brand/marca.svg`;
  const image = `${SITE.url}/opengraph-image`;
  const sameAs = SITE.socials.length ? { sameAs: SITE.socials } : {};

  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: SITE.name,
      legalName: LEGAL.legalName,
      url: SITE.url,
      logo,
      image,
      email: SITE.email,
      telephone: `+${SITE.whatsapp}`,
      taxID: LEGAL.cnpj, // CNPJ
      address,
      ...sameAs,
    },
    {
      "@type": "WebSite",
      "@id": siteId,
      name: SITE.shortName,
      url: SITE.url,
      inLanguage: "pt-BR",
      publisher: { "@id": orgId },
    },
    {
      "@type": "HomeAndConstructionBusiness", // subtipo de LocalBusiness
      "@id": `${SITE.url}/#localbusiness`,
      name: SITE.name,
      description: SITE.description,
      url: SITE.url,
      image,
      logo,
      email: SITE.email,
      telephone: `+${SITE.whatsapp}`,
      priceRange: "$$$",
      areaServed: "Garopaba/SC e região",
      parentOrganization: { "@id": orgId },
      address,
      geo: {
        "@type": "GeoCoordinates",
        latitude: SITE.geo.lat,
        longitude: SITE.geo.lng,
      },
      hasMap: SITE.mapsUrl,
      ...sameAs,
    },
  ];

  const data = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
