import type { Metadata, Viewport } from "next";
import { archivo, newsreader } from "./fonts";
import { Grain } from "@/components/fx/Grain";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
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
    "Garopaba",
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
  themeColor: "#090909",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* pré-paint: pula a cortina do intro em visita repetida / reduced-
            motion / storage bloqueado — decide ANTES do primeiro paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(sessionStorage.getItem("proton-intro-seen")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-skip","intro-ready")}catch(e){document.documentElement.classList.add("intro-skip","intro-ready")}',
          }}
        />
        {/* Sem JS: o hero e o linework aparecem no estado final (a entrada
            animada depende de `html.intro-ready`, liberado pelo Preloader). */}
        <noscript>
          <style>{`.hero-init [data-hero],.hero-head .line-in{opacity:1 !important;transform:none !important}.bp-wrap{opacity:.5 !important}.bp-draw{stroke-dashoffset:0 !important}[data-preloader]{display:none !important}`}</style>
        </noscript>
      </head>
      <body className="bg-bg-base text-text-body antialiased">
        <Preloader />
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <JsonLd />
        <SmoothScroll>
          <Navbar />
          <div id="conteudo">{children}</div>
          <Footer />
        </SmoothScroll>
        <CookieConsent />
        <Grain />
        {/* Analytics só na Vercel (evita 404 do script fora da plataforma) */}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
