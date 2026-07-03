import localFont from "next/font/local";
import { Montserrat } from "next/font/google";

// Necmato — display (serifa de alto contraste). ÚNICO peso disponível: Regular.
// Hierarquia por tamanho + tracking + cor, nunca por peso (proibido faux-bold).
export const necmato = localFont({
  src: "../public/fonts/Necmato-Regular.woff2",
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

// Montserrat — UI/corpo. Só os pesos realmente usados (400/500) — menos bytes
// no caminho crítico do LCP.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});
