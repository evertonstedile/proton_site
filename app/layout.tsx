import type { Metadata, Viewport } from "next";
import { necmato, montserrat } from "./fonts";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s · ${SITE.shortName}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url), // PLACEHOLDER domínio definitivo (B6)
  alternates: { canonical: "/" },
  keywords: [
    "engenharia residencial",
    "construção alto padrão",
    "reforma alto padrão",
    "Blumenau",
    "Santa Catarina",
    "Proton Engenharia",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.shortName,
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${necmato.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* preload do Playfair (fallback de acentos) — melhora o LCP do hero */}
        <link
          rel="preload"
          href="/fonts/PlayfairDisplay-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-bg-base text-text-body antialiased">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <JsonLd />
        <SmoothScroll>
          <Navbar />
          <div id="conteudo">{children}</div>
          <Footer />
        </SmoothScroll>
        {/* Analytics só na Vercel (evita 404 do script fora da plataforma) */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
