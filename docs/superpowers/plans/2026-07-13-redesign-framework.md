# Redesign Framework Literal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline, recomendado — iteração visual pesada) ou superpowers:subagent-driven-development. Steps usam checkbox (`- [ ]`).

**Goal:** Reconstruir a home em 14 movimentos narrativos sobre footage real + retrabalhar internas, com a paleta material do framework, preservando infra/motor/conteúdo do repo.

**Architecture:** Pele e narrativa novas sobre o motor existente (Lenis+GSAP ticker único, `lib/gsap.ts`, `lib/scroll-progress.ts`). Home estática primeiro (Tier C nasce pronto), motion depois, vídeo-scrub por último. Nada de dado inventado: Wine House e JCR usam só o confirmado (spec DF8/DF9).

**Tech Stack:** Next 15 App Router · TS strict · Tailwind v3 tokens · GSAP 3.13 + Lenis · Three.js/R3F (só hero crossfade) · ffmpeg (pipeline de mídia) · Playwright.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-13-redesign-framework-design.md`. Framework: `PROTON_REDESIGN_ULTRAPREMIUM_SITE_FRAMEWORK.md`.
- Paleta framework: carbono `#111311` · off-white `#ECE9E2` · concreto `#B8B2A8` · pedra `#776F65` · madeira `#6D4A31` · verde `#263228` · âmbar `#C68B4B` (acento único, 1–2 usos/seção).
- Tipografia: Newsreader (serif, já em `--font-serif`) · Archivo (`--font-sans`) · Geist Mono nova (`--font-mono`). Necmato sai dos títulos; NÃO deletar woff (marca pode reusar).
- DNA canon: ease `cubic-bezier(.2,.7,.2,1)` (`EASE_PROTON`), zero bounce, radius ≤ 20px, grain, assimetria, hover sem layout shift, nunca #000/#fff puros.
- Dados reais travados: 371 projetos · 119 laudos · 70.400 m² · 11 anos · Wine House (Praia da Ferrugem, Garopaba/SC · 91,79 m² · 2026 · concluída) · Condomínio JCR (46 unidades · Areias de Palhocinha, Garopaba/SC · aprovação e licenciamento ambiental · previsão 2028). Nada além disso sem `TODO: VALIDAR`.
- Todo movimento da home: funciona sem animação, mobile ok, `prefers-reduced-motion` ok, Safari ok, valor final de números no HTML.
- Gate por task: `npm run typecheck && npm run lint && npm run build` verdes + preview visual (skill `entrega-verificada`: screenshot desktop+mobile).
- Vídeos: masters intocados em `public/media/video/master/`; derivados sem áudio (`-an`), `muted playsInline`, preload de poster/metadata apenas.
- Higgsfield: NENHUMA geração neste plano. Gate após Task 6 aprovada; cada take pergunta antes (gasto de crédito).
- Commits frequentes no branch `redesign-framework`; push para main só com ok do Everton.

---

### Task 0: Auditoria delta (F0)

**Files:**
- Create: `content/audit/current-site-delta.md`

**Interfaces:** Produz lista de URLs vivas do site em produção + matriz KEEP/REFINE/VERIFY → consumida na Task 12 (redirects).

- [ ] **Step 1:** WebFetch `https://protonsc.com.br` e `https://protonsc.com.br/sitemap.xml` (se existir). Listar URLs públicas, títulos e metas atuais.
- [ ] **Step 2:** Escrever `content/audit/current-site-delta.md`: tabela `URL | conteúdo | status (KEEP/REFINE/VERIFY/ARCHIVE) | rota nova | redirect?`. O grosso do conteúdo já vive no repo (lib/content.ts, lib/site.ts) — o delta é só o que o site em produção tem e o repo não.
- [ ] **Step 3:** Commit: `git add content/audit && git commit -m "F0: delta de auditoria do site em produção"`

### Task 1: Assets e pipeline de mídia (F1)

**Files:**
- Create: `public/media/video/master/01.mp4 … 09.mp4` (dos zips)
- Create: `public/media/img/` (10 fotos dos zips)
- Create: `scripts/media-pipeline.sh`
- Create: `public/media/video/` derivados + posters

**Interfaces:** Produz paths consumidos por Tasks 4–9: `/media/video/{construcao,estrutura,manifesto,intro,atmosfera,hover}-{1080,720}.mp4` + `{nome}-poster.avif` + fotos `/media/img/*.png|jpg`.

- [ ] **Step 1:** Extrair zips (nunca editar masters):

```bash
cd "/Users/evertonstedile/Documents/Proton - Site"
mkdir -p public/media/video/master public/media/img
unzip -j "Vídeos Site Proton.zip" "Vi*/[0-9].mp4" -d public/media/video/master/
for i in 1 2 3 4 5 6 7 8 9; do mv "public/media/video/master/$i.mp4" "public/media/video/master/0$i.mp4"; done
unzip -j "$HOME/Desktop/Imagens proton site.zip" "Imagens proton site/*.png" -d public/media/img/
rm -f public/media/img/.DS_Store
```

- [ ] **Step 2:** Criar `scripts/media-pipeline.sh` (mapa semântico: 02→intro, 03→atmosfera, 04→construcao, 06→manifesto, 08→estrutura, 01→hover; 05/07/09 ficam só como master):

```bash
#!/usr/bin/env bash
# Deriva versões web dos masters. Scrub (construcao/estrutura) usa GOP curto
# (keyframe a cada 12 frames) p/ seek responsivo controlado por scroll.
set -euo pipefail
cd "$(dirname "$0")/../public/media/video"
declare -A MAP=( [02]=intro [03]=atmosfera [04]=construcao [06]=manifesto [08]=estrutura [01]=hover )
SCRUB="construcao estrutura"
for n in "${!MAP[@]}"; do
  name="${MAP[$n]}"; src="master/${n}.mp4"
  gop=""
  [[ " $SCRUB " == *" $name "* ]] && gop="-g 12 -keyint_min 12 -sc_threshold 0"
  ffmpeg -y -i "$src" -an -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 20 $gop -movflags +faststart "${name}-1080.mp4"
  ffmpeg -y -i "$src" -an -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 22 $gop -movflags +faststart "${name}-720.mp4"
  ffmpeg -y -i "$src" -frames:v 1 -vf "scale=1920:-2" "${name}-poster.png"
  ffmpeg -y -i "${name}-poster.png" -c:v libaom-av1 -still-picture 1 -crf 28 "${name}-poster.avif" && rm "${name}-poster.png"
done
```

- [ ] **Step 3:** `chmod +x scripts/media-pipeline.sh && ./scripts/media-pipeline.sh` (rodar em background; conferir tamanhos: derivado 720 deve ficar < master).
- [ ] **Step 4:** Assistir/inspecionar os 9 masters (frames via ffmpeg ou preview) e confirmar o mapa semântico do framework §5 (vídeo 4 = construção etc.). Corrigir MAP se divergir.
- [ ] **Step 5:** Verificar que masters NÃO entram no bundle de build (estão em public/ — ok, mas conferir peso total; se > ~90MB avaliar `.vercelignore` p/ master/ e servir só derivados).
- [ ] **Step 6:** Commit (sem masters se decidido ignorá-los): `git add -A public/media scripts && git commit -m "F1: assets reais + pipeline ffmpeg (derivados web, GOP curto p/ scrub)"`

### Task 2: Tokens framework + fonte mono (F1)

**Files:**
- Modify: `tailwind.config.ts:15-46` (colors) e `:47-51` (fontFamily)
- Modify: `app/globals.css` (CSS vars correspondentes)
- Modify: `app/fonts.ts` (+ Geist Mono)
- Modify: `app/layout.tsx` (registrar `--font-mono` na tag html)
- Create: `public/fonts/geist-mono-v3-latin-regular.woff2` (download gwfh)

**Interfaces:** Produz classes `bg-bg` (#111311), `text-fg` (#ECE9E2), `text-fg-muted`, `text-concrete`, `text-stone`, `bg-surface-green`, `accent` (#C68B4B), `font-mono`. Todos os componentes novos consomem só tokens (zero hex hardcoded).

- [ ] **Step 1:** Trocar paleta no `tailwind.config.ts` (aliases de transição mantidos até Task 12):

```ts
colors: {
  bg: { DEFAULT: "#111311", "2": "#181b18", base: "#111311", surface: "#181b18", raised: "#1f231f", elevated: "#242824" },
  fg: { DEFAULT: "#ECE9E2", muted: "rgba(236,233,226,0.56)" },
  accent: "#C68B4B",                     // âmbar técnico — acento ÚNICO
  concrete: "#B8B2A8",
  stone: "#776F65",
  timber: "#6D4A31",
  "surface-green": "#263228",
  line: { DEFAULT: "rgba(236,233,226,0.09)", gold: "rgba(198,139,75,0.30)" },
  text: { primary: "#ECE9E2", body: "#ECE9E2", muted: "rgba(236,233,226,0.56)" },
  gold: { light: "#C68B4B", base: "#C68B4B", deep: "#AB8959" },  // alias transição → âmbar
  "on-gold": "#111311",
},
fontFamily: {
  sans: ["var(--font-sans)", "system-ui", "sans-serif"],
  serif: ["var(--font-serif)", "Georgia", "serif"],
  mono: ["var(--font-mono)", "ui-monospace", "monospace"],
  display: ["var(--font-serif)", "Georgia", "serif"],
},
```

- [ ] **Step 2:** Baixar Geist Mono woff2 (google-webfonts-helper ou fontsource) para `public/fonts/`; adicionar em `app/fonts.ts`:

```ts
export const geistMono = localFont({
  src: "../public/fonts/geist-mono-v3-latin-regular.woff2",
  weight: "400",
  variable: "--font-mono",
  display: "swap",
  preload: false, // só labels/dados técnicos — fora do caminho do LCP
});
```

E em `app/layout.tsx` incluir `geistMono.variable` na className do `<html>`.

- [ ] **Step 3:** Atualizar CSS vars espelho em `app/globals.css` (procurar `#090909`/`#d2ac62` e trocar pelos novos valores; grain permanece).
- [ ] **Step 4:** `npm run typecheck && npm run lint && npm run build` → verdes. Preview `/styleguide`: paleta nova, acentos PT-BR ok na Newsreader, mono renderizando. Screenshot desktop+mobile.
- [ ] **Step 5:** Commit: `git commit -am "F1: paleta material do framework + Geist Mono (--font-mono)"`

### Task 3: Conteúdo real (F1)

**Files:**
- Modify: `lib/obras.ts:31-46` (Wine House) 
- Create: `lib/condominio.ts`
- Modify: `lib/content.ts` (copy dos 14 movimentos)

**Interfaces:** Produz `WINE_HOUSE: Obra` (ficha confirmada), `CONDOMINIO_JCR` e objetos de copy `HOME` consumidos pelas Tasks 4–10. Shapes exatos abaixo.

- [ ] **Step 1:** Atualizar a entrada Wine House em `lib/obras.ts` (dados confirmados 13 jul; fotos novas entram na galeria):

```ts
{
  // [WineHouse / Neide II] — dados confirmados pelo cliente em 13/07/2026.
  slug: "winehouse",
  title: "Residência Wine House",
  category: "Residencial",
  kind: "Obra entregue",
  location: "Praia da Ferrugem, Garopaba/SC",
  year: "2026",
  areaM2: 91.79,
  summary:
    "Casa unifamiliar de partido horizontal — base em pedra, estrutura aparente e integração entre estar, mata e luz natural.",
  cover: "/obras/winehouse/cover.jpg",
  gallery: [ /* manter existentes + novas /media/img/ selecionadas na Task 8 */ ],
},
```

- [ ] **Step 2:** Criar `lib/condominio.ts`:

```ts
/** Condomínio JCR — dados confirmados pelo cliente em 13/07/2026.
 * Fase REAL: aprovação e licenciamento ambiental (não está em obra).
 * A copy da seção enfatiza planejamento/aprovação — nunca "em execução". */
export const CONDOMINIO_JCR = {
  nome: "Condomínio JCR",
  unidades: 46,
  local: "Areias de Palhocinha, Garopaba/SC",
  fase: "Aprovação e licenciamento ambiental",
  previsao: "2028",
  imagemAerea: "/media/img/cond2.png",
} as const;
```

- [ ] **Step 3:** Em `lib/content.ts`, adicionar bloco `HOME_FW` com a copy dos movimentos (copy-base do framework, refinável por ele depois — marcada). Headline hero: `"Engenharia que transforma complexidade em forma."` / sub: `"Projetos, gerenciamento e execução com precisão do primeiro cálculo ao último detalhe."` / CTAs: `Explorar projetos` + `Falar com a Proton`. Capítulos: A `"Projetar o edifício. Respeitar o território."` · C `"Quando estrutura, matéria e experiência ocupam o mesmo espaço."` · D `"A engenharia é técnica. O resultado precisa ser humano."` · Escala `"A mesma precisão. Em outra escala."` · CTA `"Seu projeto começa com uma decisão bem fundamentada."` Números: usar os reais já em content.ts. Método: fluxo full-service existente. Sócios: nomes/CREA de `LEGAL` (bios `TODO: VALIDAR`, sem texto inventado — cargo + credencial apenas).
- [ ] **Step 4:** `npm run typecheck` verde. Commit: `git commit -am "F1: conteudo real — Wine House entregue, Condominio JCR, copy dos movimentos"`

### Task 4: Home estática — 14 movimentos (F2)

**Files:**
- Create: `components/home/fw/HeroDiaNoite.tsx` (versão estática: foto dia + poster; WebGL vem na Task 6)
- Create: `components/home/fw/ManifestoEditorial.tsx`
- Create: `components/home/fw/CaseWineHouse.tsx`
- Create: `components/home/fw/Construcao.tsx` (frame estático + poster; scrub na Task 7)
- Create: `components/home/fw/VisaoEstrutural.tsx` (idem)
- Create: `components/home/fw/EscalaCondominio.tsx`
- Create: `components/home/fw/ServicosEditorial.tsx`
- Create: `components/home/fw/Metodo.tsx`
- Create: `components/home/fw/Numeros.tsx`
- Create: `components/home/fw/Socios.tsx`
- Create: `components/home/fw/CtaConversa.tsx`
- Modify: `app/page.tsx` (nova ordem)

**Interfaces:** Consome tokens (Task 2), `HOME_FW`/`CONDOMINIO_JCR`/`getObras` (Task 3), paths de mídia (Task 1). Produz a home Tier C completa — TODA informação legível sem JS/motion.

- [ ] **Step 1:** Construir cada seção como server component estático (client só onde inevitável), imagens via `next/image`, vídeos como `<video muted playsInline preload="none" poster>` pausados. Layout assimétrico, serif itálica só em ênfases, mono em labels/dados. FAQ existente permanece (valor GEO) re-skinada por tokens.
- [ ] **Step 2:** Nova ordem em `app/page.tsx`:

```tsx
<main>
  <HeroDiaNoite />
  <ManifestoEditorial />
  <CaseWineHouse />
  <Construcao />
  <VisaoEstrutural />
  <EscalaCondominio />
  <ServicosEditorial />
  <Metodo />
  <Numeros />
  <Socios />
  <Faq />
  <CtaConversa />
</main>
```

Componentes SOTD saem do fluxo (arquivos ficam até a limpeza da Task 12).
- [ ] **Step 3:** Responsivo mobile-first em cada seção (sem hscroll; galeria horizontal vira swipe nativo no mobile).
- [ ] **Step 4:** Gates: build+lint+typecheck verdes; `npx playwright test` (console limpo); preview desktop+mobile com screenshots de TODAS as seções (entrega-verificada). **CHECKPOINT visual com Everton antes da Task 5.**
- [ ] **Step 5:** Commit por seção concluída; commit final: `git commit -m "F2: home completa estatica — 14 movimentos com conteudo real (Tier C)"`

### Task 5: Passe de movimento (F3)

**Files:**
- Modify: todas as seções `components/home/fw/*.tsx`
- Create: `lib/device-tier.ts` (A/B/C: GPU/`deviceMemory`/`saveData`/reduced-motion)

**Interfaces:** Consome `useGSAP`, `EASE_PROTON`, `createScrollProgress`, primitivos `Reveal`/`SplitReveal`/`Parallax`. Produz `getTier(): "A"|"B"|"C"` consumido pelas Tasks 6–7.

- [ ] **Step 1:** `lib/device-tier.ts`:

```ts
export type Tier = "A" | "B" | "C";
export function getTier(): Tier {
  if (typeof window === "undefined") return "C";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mem = (navigator as { deviceMemory?: number }).deviceMemory ?? 8;
  const save = (navigator as { connection?: { saveData?: boolean } }).connection?.saveData;
  if (reduced || save || mem <= 2) return "C";
  const coarse = matchMedia("(pointer: coarse)").matches;
  return coarse || mem <= 4 ? "B" : "A";
}
```

- [ ] **Step 2:** Aplicar motion por seção: reveals por linha/máscara (SplitReveal), parallax moderado, pins só nos movimentos-chave (hero, case cap. B galeria horizontal, construção, escala). Zoom de imagem ≤ 1.06. Tier C = zero pin/scrub (CSS only).
- [ ] **Step 3:** Reduced-motion: verificar que Lenis já para (D4) e que cada pin tem fallback de corte/fade.
- [ ] **Step 4:** Gates + teste de jank (scroll contínuo no preview, DevTools performance — sem long tasks > 50ms recorrentes). Commit: `git commit -am "F3: passe de movimento — pins, scrubs, tiers, reduced-motion"`

### Task 6: Hero dia→noite (F4) → gate Higgsfield

**Files:**
- Create: `components/gl/CrossfadeDiaNoite.tsx`
- Modify: `components/home/fw/HeroDiaNoite.tsx`
- Test: `tests/hero.spec.ts`

**Interfaces:** Consome `createScrollProgress`, `Scene.tsx` (canvas R3F com pausa fora da viewport), fotos `/media/img/fora2.png` + `/media/img/image2_noite.png`. Produz hero pinado 260vh com progresso 0→1 = dia→noite.

- [ ] **Step 1:** Shader de crossfade com máscara de luz (não é fade linear — janelas/paisagismo "acendem" antes do céu escurecer). Core do material:

```glsl
// fragment: mix dirigido por progress com curva por luminância
// t1 = dia, t2 = noite. As áreas mais luminosas da foto noturna (luzes)
// entram primeiro: threshold deslocado pela luminância do pixel noturno.
vec4 day = texture2D(t1, vUv);
vec4 night = texture2D(t2, vUv);
float lum = dot(night.rgb, vec3(0.299, 0.587, 0.114));
float t = smoothstep(0.0, 1.0, clamp(progress * (1.0 + lum * 0.8), 0.0, 1.0));
gl_FragColor = mix(day, night, t);
```

- [ ] **Step 2:** `HeroDiaNoite`: seção 260vh, visual pinado (`position: sticky` ou ScrollTrigger pin), headline com máscara editorial entrando em ~15% do progresso, CTAs fixos no rodapé do hero. Poster = foto dia (LCP, lição D13: pinta em CSS antes de qualquer bundle). Tier B: crossfade CSS de 2 `<Image>` (opacity via ScrollTrigger, sem canvas). Tier C/reduced-motion: foto dia estática com foto noite em `<details>`/segunda dobra — informação completa.
- [ ] **Step 3:** `tests/hero.spec.ts` — smoke: home carrega, h1 visível sem scroll, sem erro de console, LCP element = imagem do hero:

```ts
import { test, expect } from "@playwright/test";
test("hero pinta headline e foto sem depender de WebGL", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("complexidade em forma");
  await expect(page.locator("main img").first()).toBeVisible();
});
```

- [ ] **Step 4:** Testar Safari (webkit do Playwright + device real iOS). Medir LCP mobile < 2,5s (Lighthouse).
- [ ] **Step 5:** Commit: `git commit -am "F4: hero dia-noite — crossfade WebGL com mascara de luz, poster LCP, tiers"`
- [ ] **Step 6:** **GATE HIGGSFIELD:** demo pro Everton. Se aprovado E ele quiser upgrade: take Seedance Mini 720p (perguntar antes — crédito), log em `content/production/higgsfield-log.md`. Vídeo substitui o crossfade só se preservar geometria 100%.

### Task 7: Vídeo-scrub — construção + estrutura (F5)

**Files:**
- Create: `lib/useVideoScrub.ts`
- Modify: `components/home/fw/Construcao.tsx`, `components/home/fw/VisaoEstrutural.tsx`

**Interfaces:** Consome derivados GOP-curto (Task 1) e `createScrollProgress`. Produz hook `useVideoScrub(ref, triggerRef)` reutilizável.

- [ ] **Step 1:** Hook (currentTime por progresso normalizado, com rVFC quando disponível e quantização p/ evitar seek-spam no Safari):

```ts
"use client";
import { useEffect, type RefObject } from "react";
import { createScrollProgress } from "@/lib/scroll-progress";
import { gsap } from "@/lib/gsap";
export function useVideoScrub(video: RefObject<HTMLVideoElement | null>, trigger: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const v = video.current, t = trigger.current;
    if (!v || !t) return;
    const sp = createScrollProgress(t, { end: "bottom bottom" });
    let raf = 0, last = -1;
    const tick = () => {
      if (v.duration) {
        // quantiza a ~1/30s: seeks demais travam o pipeline do Safari
        const target = Math.round(sp.progress * v.duration * 30) / 30;
        if (target !== last && !v.seeking) { v.currentTime = target; last = target; }
      }
      raf = requestAnimationFrame(tick);
    };
    const onVisible = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) { raf = requestAnimationFrame(tick); }
      else cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(onVisible);
    io.observe(t);
    return () => { io.disconnect(); cancelAnimationFrame(raf); sp.kill(); };
  }, [video, trigger]);
}
```

- [ ] **Step 2:** `Construcao`: seção pinada ~300vh, vídeo `construcao-1080.mp4` (720 no tier B), overlays de etapa nos marcos 0/20/45/70/90% (fundação → estrutura → envoltória → acabamentos → entrega) com label mono + disciplina. Tier C: sequência de 5 frames estáticos (extrair com ffmpeg nos marcos) com as mesmas legendas.
- [ ] **Step 3:** `VisaoEstrutural`: vídeo 8 com 3–4 stops capitulados (ScrollTrigger snap suave), overlays vetoriais leves (SVG linhas, sem BIM fake).
- [ ] **Step 4:** Teste crítico iOS/Safari real: scrub responsivo, sem tela preta. Se seek travar, cair para 720 ou aumentar quantização.
- [ ] **Step 5:** Commit: `git commit -am "F5: video-scrub construcao (timeline) + visao estrutural (stops)"`

### Task 8: Case Wine House completo (F5)

**Files:**
- Modify: `components/home/fw/CaseWineHouse.tsx`
- Modify: `lib/obras.ts` (galeria final com fotos novas selecionadas)

**Interfaces:** Consome fotos `/media/img/*` (curadoria: pares dia/noite, laterais, deck/piscina, interior, pessoas), vídeo 2 (intro), copy capítulos (Task 3).

- [ ] **Step 1:** Cap. A território: foto com montanhas, aproximação lenta (scale 1.0→1.05 no scroll) + linhas de implantação SVG discretas (stroke line, dash reveal) + labels mono. Nada de HUD de videogame.
- [ ] **Step 2:** Cap. B materialidade: galeria horizontal dirigida por scroll vertical (pin + x-translate), 4–6 fotos, parallax leve, dados reais nos cantos (mono). Mobile: scroll-snap horizontal nativo.
- [ ] **Step 3:** Cap. C interior: crossfade interior_dia→interior_noite (CSS opacity via progresso — sem WebGL; câmera estática, avanço ≤ 2%).
- [ ] **Step 4:** Cap. D escala humana (foto com pessoas, full-bleed) + Cap. E ficha técnica: grid mono com SÓ o confirmado (Wine House · Praia da Ferrugem, Garopaba/SC · 91,79 m² · 2026 · Concluída; escopo/disciplinas `TODO: VALIDAR` — omitidos até lá).
- [ ] **Step 5:** Gates + screenshots. Commit: `git commit -am "F5: case Wine House — capitulos A-E com ficha confirmada"`

### Task 9: Escala + Condomínio JCR (F6)

**Files:**
- Modify: `components/home/fw/EscalaCondominio.tsx`
- Create: `components/ui/Counter` reuso (já existe `Counter` — verificar e reusar)

**Interfaces:** Consome `CONDOMINIO_JCR` (Task 3), `cond2.png`.

- [ ] **Step 1:** Transição de escala: Wine House reduz (scale-down + grid de módulos abstratos) → corte para aérea. Headline "A mesma precisão. Em outra escala."
- [ ] **Step 2:** Aérea com aproximação suave (scale 1.0→1.06) + contador até **46** (valor `46` sempre presente no HTML; animação é só o count-up) + labels: `46 unidades · Areias de Palhocinha, Garopaba/SC · Aprovação e licenciamento ambiental · Previsão 2028`. Copy enfatiza planejamento/viabilidade/licenciamento — capacidade que antecede o canteiro. SEM barra de progresso de obra, SEM metragem inventada.
- [ ] **Step 3:** Fallback estático completo (foto + dados). Sem Three.js aqui (YAGNI — SVG/CSS bastam; instancing só se ele pedir destaque unidade-a-unidade depois).
- [ ] **Step 4:** Commit: `git commit -am "F6: transicao de escala + Condominio JCR (46 unidades, fase real)"`

### Task 10: Internas (F7)

**Files:**
- Modify: `app/obras/[slug]/page.tsx` (template case rico p/ winehouse; demais obras mantêm layout simples)
- Modify: `app/servicos/page.tsx` (capítulos editoriais)
- Modify: `app/sobre/page.tsx` (sócios de `LEGAL.partners` + CREA; bios `TODO: VALIDAR` omitidas)
- Modify: `app/processo/page.tsx`, `app/contato/page.tsx` (re-skin por tokens — automático se Task 2 usou aliases; revisar visual)

**Interfaces:** Consome tudo acima. Vídeo 7 disponível como reserva em /obras/[slug] winehouse; vídeo 9 NÃO entra (sem contexto BIM validado).

- [ ] **Step 1:** `/obras/winehouse`: reusar capítulos do case (extrair blocos reutilizáveis de `CaseWineHouse` se necessário) + ficha completa + galeria.
- [ ] **Step 2:** `/servicos`: 4 frentes como capítulos (Projetos · Administração/Gerenciamento · Execução · Engenharia Caixa) + disciplinas complementares dos 33 serviços; cada capítulo: descrição real, entregáveis, para quem, CTA contextual (whatsappUrl com mensagem do serviço).
- [ ] **Step 3:** `/sobre`: manifesto + método + sócios (nome, função, CREA; foto/bio quando chegarem — placeholder NÃO sobe: seção mostra só o confirmado).
- [ ] **Step 4:** Gates + screenshots de todas as internas. Commit: `git commit -am "F7: internas — case /obras, servicos editorial, sobre com socios"`

### Task 11: Performance + A11y (F8)

**Files:** ajustes pontuais onde a medição mandar.

- [ ] **Step 1:** Lighthouse home mobile+desktop: alvos LCP < 2,5s mobile, CLS ≈ 0, Perf ≥ 90 mobile. `npx playwright test` (perf.spec.ts existente).
- [ ] **Step 2:** Auditar rede: nenhum vídeo baixa antes da viewport se aproximar (preload="none" + IO); só 1 vídeo tocando por vez; GPU pausada fora da viewport (padrão Scene.tsx).
- [ ] **Step 3:** A11y: teclado tab-order, foco visível, alt text real em toda foto, headings em ordem, reduced-motion end-to-end (navegar a home inteira com a preferência ligada).
- [ ] **Step 4:** Device real iPhone + Android (preview Vercel). Correções em lote. Commit: `git commit -am "F8: performance + a11y — budgets no alvo"`

### Task 12: Limpeza + SEO + QA final (F9)

**Files:**
- Delete: `components/home/{HeroSotd,ManifestoCamera,Diferencial,SistemaFisica,ObrasShowcase,Stats,CtaGesto,Fechamento,Hero,Manifesto,Process,Services,FinalCta,Testimonials,FeaturedWorks}.tsx` (os que saíram do fluxo)
- Delete: `components/gl/{HeroAtom,AtomPoster,ManifestoScene}.tsx` se nada mais consumir
- Modify: `tailwind.config.ts` (remover aliases de transição gold-*, text-primary etc. e migrar usos)
- Modify: `next.config.mjs` (redirects 301 do delta da Task 0, se houver)
- Modify: `PENDENCIAS.md` (fechar B2/B3/B6; registrar DF7 sócios pendente)

- [ ] **Step 1:** Remover componentes órfãos (grep de imports antes de deletar cada um). Necmato woff fica (marca).
- [ ] **Step 2:** Migrar aliases de transição e removê-los do config; grep por `gold-` e `#d2ac62` deve retornar zero em componentes.
- [ ] **Step 3:** Redirects 301 conforme Task 0; conferir sitemap/robots/JSON-LD/OG com domínio protonsc.com.br; OG image re-gerada com paleta nova.
- [ ] **Step 4:** Checklist framework §19 completo (conteúdo, audiovisual, técnica, qualidade visual) — cada item marcado com evidência.
- [ ] **Step 5:** QA visual final (entrega-verificada: home + internas, desktop + mobile, screenshots). `npm run deploy:preview` → validar em produção de preview.
- [ ] **Step 6:** Commit: `git commit -am "F9: limpeza SOTD, redirects, QA final"`. **Push/merge para main: SÓ com ok explícito do Everton.**

---

## Self-review

- Cobertura da spec: §4 → Task 2; §5 mov.01 (preloader re-skin) coberto pela Task 2 (tokens re-skinam o Preloader existente — sem task própria, mudança é só de cor/marca); mov.02 → T4+T6; 03 → T4; 04 → T4+T8; 05–06 → T4+T7; 07–08 → T9; 09–12 → T4+T10; 13–14 → T4 (footer re-skin via tokens); §6 → T10; §7 → gate na T6; §8 → T1; §9 → T5+T11; §10 → T0+T12; §11 → mapeado F0–F9 = T0–T12.
- Sem placeholders de plano; código real onde determinístico; visual iterativo tem critério mensurável por gate.
- Consistência de nomes: `getTier`, `useVideoScrub`, `CONDOMINIO_JCR`, paths `/media/...` usados uniformemente.
