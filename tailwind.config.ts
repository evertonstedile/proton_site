import type { Config } from "tailwindcss";

/**
 * Tokens Cinematic Dark — espelham a spec 2026-07-02-redesign-sotd-design.md §3
 * (fonte de verdade) e as CSS vars de globals.css.
 * Nada de hex hardcoded em componente — sempre via token semântico.
 * Tokens canônicos: bg / bg-2 / fg / fg-muted / accent / line / ease-proton.
 * Classes antigas (bg-base, text-primary, gold-*…) são ALIASES de transição —
 * remover na Task 9.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#090909", // bg-bg — fundo padrão
          "2": "#111112", // bg-bg-2 — superfície secundária
          // aliases de transição ↓
          base: "#090909",
          surface: "#111112",
          raised: "#141416",
          elevated: "#1c1c1f",
        },
        fg: {
          DEFAULT: "#ececef", // text-fg — texto padrão (nunca #fff puro)
          muted: "rgba(236,236,239,0.56)", // text-fg-muted — secundário
        },
        accent: "#d2ac62", // acento único ouro
        line: {
          DEFAULT: "rgba(236,236,239,0.09)", // bordas/divisores
          gold: "rgba(210,172,98,0.30)", // alias de transição
        },
        // aliases de transição ↓
        text: {
          primary: "#ececef",
          body: "#ececef",
          muted: "rgba(236,236,239,0.56)",
        },
        gold: {
          light: "#e7bf66",
          base: "#d2ac62",
          deep: "#ab8959",
        },
        "on-gold": "#090909", // texto sobre o acento
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"], // Archivo
        serif: ["var(--font-serif)", "Georgia", "serif"], // Newsreader
        display: ["var(--font-serif)", "Georgia", "serif"], // alias de transição
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
        // alias de transição (dourado metálico) — remover na Task 9
        "gold-metallic":
          "linear-gradient(135deg, #E7BF66, #D2AC62 45%, #AB8959)",
      },
      borderRadius: {
        // registro Cinematic Dark: radius ≤ 20px (cap do 3xl default de 24px)
        "3xl": "20px",
      },
      transitionTimingFunction: {
        proton: "cubic-bezier(.2,.7,.2,1)", // easing único do registro
        cinematic: "cubic-bezier(.2,.7,.2,1)", // alias de transição
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
