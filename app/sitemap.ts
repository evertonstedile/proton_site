import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getObras } from "@/lib/obras";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/obras", "/sobre", "/servicos", "/processo", "/contato"];

  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${SITE.url}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.8,
  }));

  const obraRoutes: MetadataRoute.Sitemap = getObras().map((o) => ({
    url: `${SITE.url}/obras/${o.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...obraRoutes];
}
