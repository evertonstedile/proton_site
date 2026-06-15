# PROTON — Design System

> Tokens e regras visuais do site. Fonte de verdade para o Claude Code. Pareado com `SITE_BRIEF.md`.
> Nada de hex hardcoded em componente — tudo via token.

---

## Princípios
- Dark cinematic ancorado na marca (preto/branco/dourado).
- A marca dá **3 cores**; o site usa uma **escala**. `#000` é o anchor cinematográfico; os quase-pretos dão profundidade.
- **Dourado é acento, nunca corpo de texto.**
- Espaço generoso = percepção de luxo.
- Motion caro: eases lentos, zero bounce, respeita `prefers-reduced-motion`.
- Performance e acessibilidade (AA) fazem parte do "premium".

## Cor
Paleta de marca (oficial): preto `#000000` · branco `#FFFFFF` · dourado (gradiente metálico).
> ⚠️ O hex do dourado **não** veio no manual da marca — **amostrar do arquivo do logo**. Os valores abaixo são aproximação até a calibração no arquivo-fonte (mesmo princípio do Proton OS: a verdade vem da fonte, não da inferência).

### Tokens (escala estendida)

| Token | Valor | Uso |
|---|---|---|
| `bg/base` | `#000000` | seções cinematográficas full-bleed |
| `bg/surface` | `#0C0C0D` | seções padrão |
| `bg/raised` | `#141416` | cards |
| `bg/elevated` | `#1C1C1F` | hover, painéis sobrepostos |
| `line` | `rgba(255,255,255,.10)` | bordas/divisores |
| `line/gold` | `rgba(200,162,76,.30)` | bordas de destaque |
| `text/primary` | `#FFFFFF` | títulos |
| `text/body` | `#F4F3F1` | corpo (off-white, menos glare) |
| `text/muted` | `rgba(255,255,255,.60)` | secundário |
| `gold/light` | `#E7CE8C` | realce metálico |
| `gold/base` | `#C8A24C` | acento principal, CTA, linework |
| `gold/deep` | `#9C7A2E` | sombra do metálico, hover |
| `on-gold` | `#2A1D05` | texto sobre dourado |

### Regras de cor
- Dourado só em acento: títulos, linework, CTA, divisores, detalhes. Corpo = branco/off-white.
- **Dourado metálico** nos momentos grandes (hero, display, divisores): `linear-gradient(135deg, #E7CE8C, #C8A24C 45%, #9C7A2E)`. Chapado nos detalhes pequenos. O metálico separa "premium" de "amarelo".
- `#000` puro só em full-bleed; superfícies funcionais usam `#141416`/`#1C1C1F` para ganhar profundidade.
- Texto sobre dourado = `on-gold`, nunca preto puro.
- Contraste mínimo **AA (4,5:1)** no corpo. Dourado reprova para texto pequeno → uso decorativo/grande apenas.

## Tipografia
- **Display — Necmato** (`--font-display`): serifa de alto contraste. **Único peso: Regular.** Hierarquia por **tamanho + tracking + cor**, nunca por peso (proibido faux-bold). Cobre PT-BR (acentos OK, minúsculas e maiúsculas). **Faltam travessões (– —)** → usar hífen ou fallback.
- **UI/corpo — Montserrat** (`--font-sans`): carrega variação de peso (400/500/600/700).

### Uso
- `font-display`: títulos, kickers, números de destaque. Tracking levemente negativo em tamanhos grandes; aberto/caixa-alta em kickers curtos (consistente com o wordmark).
- `font-sans`: corpo, labels, navegação, botões.
- Escala modular (ratio ~1.25), tamanhos fluidos com `clamp()`.

### Escala (fluida)
- `display-xl`: `clamp(2.5rem, 6vw, 5rem)` — hero
- `display-lg`: `clamp(2rem, 4vw, 3.5rem)` — títulos de seção
- `h2`: `clamp(1.5rem, 3vw, 2.25rem)`
- `body`: `1rem`–`1.125rem`, line-height `1.6`
- `small`: `0.875rem`

## Espaço & grid
- Escala base 4/8px: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`.
- Container máx ~1280–1440px, gutters generosos.
- Respiro vertical de seção: 96–160px (desktop).
- Grid 12 colunas.

## Motion
Princípios: eases lentos e longos, durações generosas, zero bounce. Respeita `prefers-reduced-motion`.

### Tokens
- `ease/cinematic`: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out longo)
- `dur/reveal`: `0.9s` · `dur/short`: `0.4s`
- `stagger`: `0.08s`

### Padrões
- Reveal on scroll: fade + `translateY` sutil (~24px).
- Split-text por linha (GSAP SplitText) em títulos.
- Parallax de imagem (foreground/background).
- Transição de página (Framer Motion).
- Scrub no scroll em seções-chave.

### Assinatura de marca (motion)
- **Órbita atômica** (do símbolo) → loader, microdetalhe que orbita no hero, hover de elementos-chave.
- **Linework dourado da deusa** → watermark gigante em baixa opacidade (~4–6%) como textura de seção.

## Tratamento de imagem
- Overlay escuro gradual (preto→transparente) sobre fotos com texto sobreposto.
- Grade de cor consistente entre fotos das obras; ratio fixo por contexto.
- Grão sutil opcional para coesão cinematográfica.

## Componentes mínimos
Navbar (transparente → sólida com transição) · botão primário (dourado) + ghost (borda branca) · card de obra (imagem + título + meta) · input · tag/badge · footer · cursor custom (opcional). Todos construídos sobre tokens.

## Implementação

### Fontes (`next/font/local` + Google)
```ts
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";

export const necmato = localFont({
  src: "../public/fonts/Necmato-Regular.woff2", // ajustar ao path real do app
  variable: "--font-display",
  weight: "400",      // único peso disponível
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"], // cobre PT-BR
  variable: "--font-sans",
  display: "swap",
});
```
Arquivos: `Necmato-Regular.woff2` (7,9 KB) + `.woff` (fallback). Original versionado em `documentos/proton-site`; cópia no app em `public/fonts/`.

### Tailwind
```js
theme.extend = {
  colors: { /* tokens semânticos da tabela acima */ },
  fontFamily: {
    display: ["var(--font-display)", "serif"],     // Necmato → títulos
    sans:    ["var(--font-sans)", "system-ui"],    // Montserrat → UI/corpo
  },
  transitionTimingFunction: { cinematic: "cubic-bezier(0.22,1,0.36,1)" },
};
```

## Acessibilidade
- Contraste AA mínimo no corpo.
- Foco visível (anel dourado).
- `prefers-reduced-motion` desliga/reduz animações.
- Alt text em todas as imagens de obra.
