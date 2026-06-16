import type { Config } from "tailwindcss";

/**
 * Tokens espelham design-system.md (fonte de verdade).
 * Nada de hex hardcoded em componente — sempre via token semântico.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#000000", // seções cinematográficas full-bleed
          surface: "#0C0C0D", // seções padrão
          raised: "#141416", // cards
          elevated: "#1C1C1F", // hover, painéis sobrepostos
        },
        line: {
          DEFAULT: "rgba(255,255,255,0.10)", // bordas/divisores
          gold: "rgba(210,172,98,0.30)", // bordas de destaque
        },
        text: {
          primary: "#FFFFFF", // títulos
          body: "#F4F3F1", // corpo (off-white)
          muted: "rgba(255,255,255,0.60)", // secundário
        },
        gold: {
          light: "#E7BF66", // realce metálico
          base: "#D2AC62", // acento principal, CTA, linework
          deep: "#AB8959", // sombra do metálico, hover
        },
        "on-gold": "#2A1D05", // texto sobre dourado
      },
      fontFamily: {
        // INTERINO: DisplayAccentFallback (unicode-range) cobre acentos/travessões
        // que faltam na Necmato subsetada. Remover quando vier a Necmato completa.
        display: ['"DisplayAccentFallback"', "var(--font-display)", "serif"], // Necmato → títulos
        sans: ["var(--font-sans)", "system-ui", "sans-serif"], // Montserrat → UI/corpo
      },
      fontSize: {
        "display-xl": [
          "clamp(2.5rem, 6vw, 5rem)",
          { lineHeight: "1.04", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(2rem, 4vw, 3.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.015em" },
        ],
        h2: ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
      },
      spacing: {
        // escala base 4/8 — complementa os defaults do Tailwind
        "18": "4.5rem", // 72
        "30": "7.5rem", // 120
        "38": "9.5rem", // 152
      },
      maxWidth: {
        container: "1440px",
        content: "1280px",
      },
      backgroundImage: {
        // dourado metálico para momentos grandes (hero, display, divisores)
        "gold-metallic":
          "linear-gradient(135deg, #E7BF66, #D2AC62 45%, #AB8959)",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.22, 1, 0.36, 1)", // ease-out longo
      },
      transitionDuration: {
        reveal: "900ms",
        short: "400ms",
      },
      letterSpacing: {
        kicker: "0.22em", // kickers em caixa-alta (wordmark-like)
      },
      keyframes: {
        "orbit-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "orbit-spin": "orbit-spin 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
