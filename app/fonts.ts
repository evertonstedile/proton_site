import localFont from "next/font/local";

// Cinematic Dark (Task 1) — fontes self-host (woff2 latin, gwfh).
// Archivo — sans (UI/corpo/display estrutural). Pesos reais usados: 400/500/600.
export const archivo = localFont({
  src: [
    { path: "../public/fonts/archivo-v25-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/archivo-v25-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/archivo-v25-latin-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

// Newsreader — serif do pool rotativo do design-canon (registrada na spec §3).
// Alto contraste vs Archivo, dígitos lining p/ contadores, latin PT-BR completo.
// Peso único 400: hierarquia por tamanho/cor (e menos bytes no caminho do LCP).
// preload: false — a serif é display-only e o headline do hero fica atrás do
// gate do intro (opacity 0), então o swap é invisível; preservar a banda do
// caminho crítico pro LCP (imagem do hero) no gate mobile.
export const newsreader = localFont({
  src: "../public/fonts/newsreader-v26-latin-regular.woff2",
  weight: "400",
  variable: "--font-serif",
  display: "swap",
  preload: false,
});
