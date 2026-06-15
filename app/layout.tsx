import type { Metadata, Viewport } from "next";
import { necmato, montserrat } from "./fonts";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Proton Engenharia & Consultoria",
    template: "%s · Proton Engenharia",
  },
  description:
    "Engenharia residencial de alto padrão — precisão técnica e sofisticação. Blumenau/SC.",
  metadataBase: new URL("https://proton.eng.br"),
  // PLACEHOLDER: domínio definitivo a confirmar (ver PENDENCIAS.md).
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
      <body className="bg-bg-base text-text-body antialiased">
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
