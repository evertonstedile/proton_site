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

// Montserrat — UI/corpo. Carrega variação de peso.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
