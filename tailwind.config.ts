import type { Config } from "tailwindcss";

/**
 * Tokens do framework literal — paleta material (spec 2026-07-13 §4, framework §11).
 * Nada de hex hardcoded em componente — sempre via token semântico.
 * Tokens canônicos: bg / bg-2 / fg / fg-muted / accent (âmbar técnico, ÚNICO) /
 * concrete / stone / timber / surface-green / line / ease-proton / font-mono.
 * Classes antigas (bg-base, text-primary, gold-*…) são ALIASES de transição —
 * remover na Task 12.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#111311", // bg-bg — carbono
          "2": "#181b18", // bg-bg-2 — superfície secundária
          // aliases de transição ↓
          base: "#111311",
          surface: "#181b18",
          raised: "#1f231f",
          elevated: "#242824",
        },
        fg: {
          DEFAULT: "#ECE9E2", // text-fg — off-white (nunca #fff puro)
          muted: "rgba(236,233,226,0.56)", // text-fg-muted — secundário
        },
        accent: "#C68B4B", // âmbar técnico — acento ÚNICO (1–2 usos/seção)
        concrete: "#B8B2A8", // texto secundário material
        stone: "#776F65", // faint
        timber: "#6D4A31", // madeira — material/detalhe
        "surface-green": "#263228", // verde profundo — superfície alternativa
        line: {
          DEFAULT: "rgba(236,233,226,0.09)", // bordas/divisores
          gold: "rgba(198,139,75,0.30)", // alias de transição → âmbar
        },
        // aliases de transição ↓
        text: {
          primary: "#ECE9E2",
          body: "#ECE9E2",
          muted: "rgba(236,233,226,0.56)",
        },
        gold: {
          light: "#C68B4B",
          base: "#C68B4B",
          deep: "#AB8959",
        },
        "on-gold": "#111311", // texto sobre o acento
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"], // Archivo
        serif: ["var(--font-serif)", "Georgia", "serif"], // Newsreader
        mono: ["var(--font-mono)", "ui-monospace", "monospace"], // Geist Mono — dados técnicos
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
        // alias de transição (metálico → âmbar) — remover na Task 12
        "gold-metallic":
          "linear-gradient(135deg, #D9A05F, #C68B4B 45%, #AB8959)",
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
