# Redesign SOTD Proton — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Home imersiva nível Awwwards SOTD + internas reskin para protonsc.com.br, na branch `redesign-sotd`, com todos os gates verdes e deploy Vercel.

**Architecture:** Next.js 15 App Router já existente; nova camada de experiência (R3F/three para o átomo do hero e manifesto-câmera; GSAP ScrollTrigger + Lenis como espinha de scroll; Framer Motion só micro). Design system Cinematic Dark substitui os tokens atuais em `app/globals.css` + `tailwind.config.ts`. Páginas internas reusam os mesmos primitivos reskinnados.

**Tech Stack:** Next 15 · React 19 · Tailwind 3 · GSAP 3.13 + @gsap/react + Lenis (instalados) · framer-motion (instalado) · three + @react-three/fiber + @react-three/drei (instalar) · Playwright (instalado, gates em `tests/`).

## Global Constraints (valem pra TODA task)

- SPEC: `docs/superpowers/specs/2026-07-02-redesign-sotd-design.md` — ler antes de qualquer task.
- Fundo `#090909` · texto `#ececef` (NUNCA #000/#fff puros) · acento único ouro `#d2ac62` (máx 1-2 elementos por seção).
- Easing único `cubic-bezier(.2,.7,.2,1)` em TUDO (CSS var `--ease` + gsap `CustomEase` "proton"). ZERO bounce/elastic.
- Grain feTurbulence baseFrequency ~0.035, overlay fixo `pointer-events-none`.
- Radius ≤20px. Hover NUNCA muda layout. `::selection` no acento.
- Copy [LEI] — usar EXATAMENTE a do §4 da spec. Números [LEI]: 371 · 119 · 70.400 m² · 11.
- `prefers-reduced-motion: reduce` neutraliza TUDO (página estática completa, 3D vira poster).
- 3D [LEI]: DPR `Math.min(devicePixelRatio,2)` · partículas instanciadas ≤12k mobile/30k desktop · draw calls <150 · texturas ≤2048² · `dispose()` no unmount · `frameloop="demand"` se estático · dynamic import `ssr:false` + poster · tratar `webglcontextlost` · scroll via proxy mutável `{progress}` + `THREE.MathUtils.damp` no useFrame (NUNCA useState p/ valor contínuo).
- Preservar URLs/SEO/schema/legais (§8 da spec). Zero placeholder — faltou dado, PERGUNTAR.
- Cada task termina com: `npm run typecheck` verde + `npx playwright test` verde (suíte console+LCP) + commit na `redesign-sotd` com `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Commits: mensagem em pt-BR sem acento no título, corpo explica o quê/por quê.

---

### Task 1: Design system Cinematic Dark (tokens + fontes + primitivos)

**Files:**
- Modify: `app/globals.css` (bloco `:root` + novas regras; manter regras Lenis/skip-link/hero gating até as tasks que as substituem)
- Modify: `tailwind.config.ts` (cores/easing/radius/fontes)
- Modify: `app/fonts.ts` (Archivo + serif do pool; remover Montserrat/Necmato/Playfair)
- Modify: `docs/superpowers/specs/2026-07-02-redesign-sotd-design.md` (§3: REGISTRAR serif escolhida)
- Test: visual via `/styleguide` + suíte existente

**Interfaces:**
- Produces: CSS vars `--bg`, `--bg-2`, `--fg`, `--fg-muted`, `--accent`, `--line`, `--ease`; Tailwind: `bg-bg`, `bg-bg-2`, `text-fg`, `text-fg-muted`, `text-accent`, `border-line`, `ease-proton`, `font-sans` (Archivo), `font-serif` (a registrada). Todas as tasks seguintes consomem SÓ esses tokens.

- [ ] **Step 1:** Ler `~/.claude/skills/design-canon/references/serif-pool.md`, escolher a serif (critério: contraste com Archivo, dígitos bonitos p/ contadores, PT-BR completo), baixar woff2 self-host em `public/fonts/` (subsets latin), registrar a escolha no §3 da spec.
- [ ] **Step 2:** `app/fonts.ts` → `localFont` Archivo (400/500/600, variable se disponível) como `--font-sans` e a serif como `--font-serif`, `display: "swap"`. Remover imports antigos; `app/layout.tsx` aplica as duas vars no `<html>`.
- [ ] **Step 3:** Tokens em `globals.css` (substituir bloco `:root` atual):
```css
:root {
  --bg: #090909; --bg-2: #111112; --fg: #ececef;
  --fg-muted: rgba(236,236,239,.56); --accent: #d2ac62;
  --line: rgba(236,236,239,.09);
  --ease: cubic-bezier(.2,.7,.2,1);
}
::selection { background: var(--accent); color: #090909; }
```
- [ ] **Step 4:** `tailwind.config.ts` → mapear `bg/bg-2/fg/fg-muted/accent/line` + `transitionTimingFunction.proton = "cubic-bezier(.2,.7,.2,1)"` + `borderRadius` máx `20px` + fontFamily sans/serif pelas vars. Manter classes antigas temporariamente (aliases) até Task 9 remover.
- [ ] **Step 5:** Grain global: componente `components/fx/Grain.tsx` (div fixa, SVG feTurbulence baseFrequency .035, opacity ~.04, mix-blend-overlay, pointer-events-none) montado no layout.
- [ ] **Step 6:** Atualizar `/styleguide` pra exibir os novos tokens/tipos. `npm run typecheck && npx playwright test` verdes. Commit `feat: design system cinematic dark (tokens + archivo + serif registrada)`.

### Task 2: Motor de experiência (scroll proxy + R3F Scene wrapper + reduced-motion)

**Files:**
- Create: `lib/scroll-progress.ts`, `components/gl/Scene.tsx`, `lib/motion.ts`
- Modify: `lib/gsap.ts` (CustomEase "proton"), `components/SmoothScroll.tsx` (Lenis só desktop: `matchMedia("(pointer: fine)")`)
- Install: `npm i three @react-three/fiber @react-three/drei && npm i -D @types/three`

**Interfaces:**
- Produces: `createScrollProgress(trigger: string | Element, vars?: Partial<ScrollTrigger.Vars>): { readonly progress: number; kill(): void }` — proxy mutável atualizado por ScrollTrigger; `Scene({ children, poster, className, eager? })` — Canvas R3F com DPR clamp, `ssr:false`, poster fallback (reduced-motion/sem WebGL/contextlost), dispose no unmount; `prefersReduced(): boolean` em `lib/motion.ts`.

- [ ] **Step 1:** `lib/scroll-progress.ts`:
```ts
import { gsap } from "@/lib/gsap";
import type ScrollTrigger from "gsap/ScrollTrigger";

export function createScrollProgress(
  trigger: string | Element,
  vars: Partial<ScrollTrigger.Vars> = {},
) {
  const state = { progress: 0 };
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger, start: "top top", end: "bottom top", scrub: true,
      onUpdate: (self) => { state.progress = self.progress; },
      ...vars,
    },
  });
  return {
    get progress() { return state.progress; },
    kill: () => tl.scrollTrigger?.kill(),
  };
}
```
- [ ] **Step 2:** `components/gl/Scene.tsx` — client component: detecta WebGL (`document.createElement("canvas").getContext("webgl2")`), `prefersReduced()`, monta `<Canvas dpr={[1, Math.min(devicePixelRatio, 2)]} gl={{ antialias: true, powerPreference: "high-performance" }}>`; listener `webglcontextlost` → troca pro poster; export com `dynamic(() => …, { ssr: false })` e `poster` como loading/fallback.
- [ ] **Step 3:** `lib/motion.ts` → `export const prefersReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;`. `lib/gsap.ts` → registrar `CustomEase.create("proton", "0.2,0.7,0.2,1")`. `SmoothScroll.tsx` → instanciar Lenis apenas se `matchMedia("(pointer: fine)").matches && !prefersReduced()`.
- [ ] **Step 4:** typecheck + suíte verdes (nada visual muda ainda). Commit `feat: motor de experiencia (scroll proxy, scene r3f, ease unico)`.

### Task 3: Preloader com progresso REAL + entrada orquestrada

**Files:**
- Modify: `components/Preloader.tsx` (evolução do atual — MANTER: intro-skip pré-paint, guards sessionStorage, failsafe 6.5s, noscript, CSS-first states)
- Modify: `app/globals.css` (estados do novo preloader)

**Interfaces:**
- Consumes: tokens Task 1.
- Produces: mesmo contrato atual (`html.intro-ready` libera o hero; `html.intro-skip` pula) — Tasks 4+ dependem SÓ dessas classes.

- [ ] **Step 1:** Progresso real: `Promise.allSettled` rastreando (a) `document.fonts.ready`, (b) decode da imagem/poster base do hero (`new Image().decode()`), (c) `import("@/components/gl/HeroAtom")` (preload do chunk 3D; se Task 4 ainda não existir, item (c) entra na Task 4). Cada item resolvido → incrementa fração; barra `scaleX` + número % em serif.
- [ ] **Step 2:** Skippable: clique/tecla após 400ms → pula pro fim da timeline. Alvo ≤1.6s com assets cacheados.
- [ ] **Step 3:** Manter TODAS as defesas atuais (SEEN_KEY só no fim, bail 6.5s, intro-lock). Visual nos tokens novos (barra no acento, wordmark na serif).
- [ ] **Step 4:** typecheck + suíte + teste manual com `sessionStorage.clear()`. Commit `feat: preloader com progresso real, skippable`.

### Task 4: Hero SOTD — átomo 3D + type display + som mute-first

**Files:**
- Create: `components/gl/HeroAtom.tsx`, `components/home/HeroSotd.tsx`, `components/SoundToggle.tsx`
- Asset: `public/hero/atom-poster.webp` (frame estático do átomo p/ fallback); `public/audio/ambient.mp3` SÓ após aprovação do Everton (até lá `NEXT_PUBLIC_SOUND=0` esconde o toggle)
- Modify: `app/page.tsx` (Hero → HeroSotd)

**Interfaces:**
- Consumes: `Scene`, `createScrollProgress`, tokens, `html.intro-ready`.
- Produces: `HeroSotd` (seção completa passo 1 da copy §4.1). `SoundToggle` autônomo.

- [ ] **Step 1 (GATE 3D — registrar no commit):** átomo comunica marca+precisão (Proton = núcleo) que 2D não comunica; reduced-motion → poster; orçamento: ~6k partículas mobile / 20k desktop instanciadas + 3 órbitas linework ≈ <20 draw calls. Passa.
- [ ] **Step 2:** `HeroAtom.tsx` — núcleo (icosahedron wireframe ouro, emissive sutil), 3 órbitas (`THREE.EllipseCurve` → `Line` drei, planos rotacionados), partículas `InstancedMesh` nas órbitas. `useFrame((_, dt))`: rotação base lenta + `THREE.MathUtils.damp` para `progress` (0→1: órbitas abrem, partículas migram por lerp entre 2 Float32Array de posições pré-computadas — órbita → grade blueprint).
- [ ] **Step 3:** `HeroSotd.tsx` — átomo central via `Scene` (off-axis de propósito), display 2 linhas "ENGENHARIA" / "SEM IMPROVISO" em HTML (Archivo, `clamp(3.5rem,12vw,11rem)`, tracking apertado, reveal por linha gated `intro-ready`), sub + CTA `Pedir orçamento`. LCP = type HTML (canvas monta depois de `intro-ready` — o gate de LCP não pode regredir).
- [ ] **Step 4:** `SoundToggle` — mute-first [LEI]: áudio só após clique; `localStorage` lembra opt-in; fade via `GainNode`; barras equalizer CSS animadas quando ativo.
- [ ] **Step 5:** Fallbacks: reduced-motion/sem WebGL → `atom-poster.webp` + type estático. Mobile: ≤6k partículas, `antialias:false` se DPR>1.5.
- [ ] **Step 6:** typecheck + suíte completa (console + LCP<2.5s). Commit `feat: hero sotd (atomo 3d, type display, som mute-first)`.

### Task 5: Manifesto — scroll = câmera (uma cena contínua)

**Files:**
- Create: `components/home/ManifestoCamera.tsx`, `components/gl/ManifestoScene.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Scene`, `createScrollProgress`, copy §4.2-4.3.
- Produces: seção pinned ~300vh cobrindo passos 2 (promessa) e 3 (tensão).

- [ ] **Step 1 (GATE 3D):** câmera atravessando cena única (terreno→traço→papel→concreto) comunica o processo como 2D não faz. Se estourar orçamento mobile: fallback = crossfade de imagens estáticas (registrar decisão no commit).
- [ ] **Step 2:** `ManifestoScene`: cena low-poly linework ouro sobre `#090909` — terreno (plane displaced wireframe), traços (linhas com draw), papel (grid plano), concreto (boxes wireframe). Câmera em `CatmullRomCurve3` (4 pontos); `useFrame` lê `progress` e move com `damp`.
- [ ] **Step 3:** Section pinned (`ScrollTrigger pin`), frases em HTML sobreposto (serif): "Cada obra começa muito antes do canteiro." e capítulos por faixa de progress (0-.25/.25-.5/.5-.75/.75-1); fecha com a tensão: "Obra parada, embargo, retrabalho. O improviso é o item mais caro do orçamento."
- [ ] **Step 4:** Reduced-motion: 4 blocos estáticos com as mesmas frases. typecheck + suíte. Commit `feat: manifesto camera continua (promessa + tensao)`.

### Task 6: Diferencial + Sistema (física dosada)

**Files:**
- Create: `components/home/Diferencial.tsx`, `components/home/SistemaFisica.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: tokens, copy §4.4-4.5, `processSteps` de `lib/content.ts` (fonte única — NÃO duplicar textos).
- Produces: passos 4 e 5 da narrativa.

- [ ] **Step 1:** `Diferencial` — seção tipográfica seca (sem 3D): "Um só responsável técnico — do estudo de viabilidade ao habite-se. Sem handoff, sem ruído." em serif grande, assimétrica, 1 detalhe no acento.
- [ ] **Step 2:** `SistemaFisica` — 4 cards das etapas com GSAP `Draggable` + `InertiaPlugin` (peso, bounds da seção, snap de volta). ÚNICA seção com física [LEI da dose]. Teclado: cards focáveis (setas), conteúdo 100% acessível sem drag.
- [ ] **Step 3:** Reduced-motion: grid estático. typecheck + suíte. Commit `feat: diferencial + sistema com fisica dosada`.

### Task 7: Obras (scrub + distortion) + Números

**Files:**
- Create: `components/home/ObrasShowcase.tsx`, `components/fx/DistortImage.tsx`, `scripts/reencode-scrub.sh`
- Modify: `app/page.tsx`, `components/home/Stats.tsx` (reskin Jeton nos tokens)
- Assets: `ffmpeg -i public/hero/hero-loop.mp4 -g 5 -crf 23 -movflags +faststart -an public/obras/scrub.mp4`; 4 fotos novas de `.asset-work/sotd/` SE entregues (senão usar as 24 existentes e deixar slot documentado)

**Interfaces:**
- Consumes: `getObras()` de `lib/obras.ts` (fonte única), copy §4.6.
- Produces: passos "prova" e "números".

- [ ] **Step 1:** Scrub: `video.currentTime` alvo = `progress * duration`, aplicado em rAF com damp (nunca seek direto no onUpdate). Vídeo `-g 5`, `muted playsInline preload="auto"`.
- [ ] **Step 2:** `DistortImage` — plane WebGL por imagem (shader compartilhado), distortion hover ≤0.05; touch/mobile/reduced → `<Image>` puro. Grid assimétrico das 6 obras → `/obras/[slug]`.
- [ ] **Step 3:** `Stats` reskin: contadores `tabular-nums` na serif, stagger sóbrio, números [LEI]. REMOVER `Testimonials` do `page.tsx` (spec §2).
- [ ] **Step 4:** typecheck + suíte. Commit `feat: obras scrub+distortion, numeros jeton, corta depoimentos`.

### Task 8: CTA gesto + Fechamento + 404

**Files:**
- Create: `components/home/CtaGesto.tsx`, `components/home/Fechamento.tsx`, `app/not-found.tsx`
- Modify: `app/page.tsx` (ordem final: HeroSotd → ManifestoCamera → Diferencial → SistemaFisica → ObrasShowcase → Stats → Faq (minimal, preserva FAQPage schema) → CtaGesto → Fechamento)
- Test: rota inexistente na suíte espera 404 + página custom

**Interfaces:**
- Consumes: `ContactForm` existente (reskin), copy §4.7-4.8.

- [ ] **Step 1:** `CtaGesto`: botão-gesto (hold 400ms com anel de progresso no acento) → revela "Estudo de viabilidade — resposta em até 24h úteis" + `ContactForm`. Teclado/reduced: Enter revela direto (gesto = enhancement).
- [ ] **Step 2:** `Fechamento`: assinatura serif + "Garopaba, Santa Catarina — 28.0323°S · 48.6198°W · CREA-SC 230125-6" + legais. Footer global nos tokens.
- [ ] **Step 3:** `app/not-found.tsx`: 404 no registro ("fora do terreno" + coordenada + volta). typecheck + suíte (+ teste 404). Commit `feat: cta gesto, fechamento, 404`.

### Task 9: Internas reskin + navegação + limpeza

**Files:**
- Modify: `components/Navbar.tsx`, `components/Footer.tsx`, todas as páginas em `app/*` (obras, servicos, processo, sobre, contato, privacidade, termos, styleguide), `components/ui/*`
- Delete: componentes home antigos órfãos (Hero, Manifesto, FeaturedWorks, Process, Services, Testimonials, FinalCta) + aliases de tokens antigos

**Interfaces:**
- Consumes: tokens Task 1 EXCLUSIVAMENTE.

- [ ] **Step 1:** Reskin `ui/*` (Button: acento só no primário; radius ≤20px; hover/focus/active sem mudar layout).
- [ ] **Step 2:** Página a página: tipografia nova, espaçamento, entrada sóbria (sem WebGL). Navbar com indicador de página atual; Footer enxuto + legais.
- [ ] **Step 3:** Deletar mortos; `grep -rn "gold-base\|bg-bg-base\|text-text-" app components` deve retornar vazio. typecheck + suíte. Commit `feat: internas reskin + limpeza de tokens antigos`.

### Task 10: Gates de qualidade (bloco final)

**Files:**
- Modify: `tests/console.spec.ts` (todas as rotas + 404), `tests/perf.spec.ts` (mantém <2.5s)

- [ ] **Step 1 (taste pre-flight):** eyebrow ≤1/3 seções · zigzag ≤2 · layouts não repetem · CTAs sem intenção duplicada · contraste AA calculado (fg-muted sobre bg). Corrigir reprovados.
- [ ] **Step 2 (anti-slop):** scroll-behavior auto com Lenis · motion frame-independent (damp/delta) · reduced-motion neutraliza TUDO (auditar seção a seção) · will-change só onde anima.
- [ ] **Step 3 (review 5D):** subagente revisor: impacto 0-3s, hierarquia, coerência premium-desta-marca, diferenciação, emoção funcional — sobre screenshots desktop+mobile por seção; findings → corrigir.
- [ ] **Step 4:** `npx playwright test` (console zero + LCP<2.5s) + `npm run typecheck` + `npm audit` 0.
- [ ] **Step 5 (segurança por último):** headers (next.config ok), honeypot, sem secret no client, deps.
- [ ] **Step 6 (seo-geo-optimizer):** metadata, schema @graph, sitemap, llms.txt atualizado com a nova narrativa. Commit `chore: gates finais verdes`.

### Task 11: Deploy + validação real

- [ ] **Step 1:** `npx vercel link --yes && npx vercel deploy --yes` → smoke na URL preview (`curl -I` 200 + headers de segurança presentes).
- [ ] **Step 2:** Everton valida em device real até "liso" + aprova áudio + copy no ar. Ajustes → iterar.
- [ ] **Step 3:** Aprovado → merge em main + `npx vercel deploy --prod --yes` + smoke final. Rollback: instant rollback Vercel.

## Self-review

- Cobertura spec: §2-§9 → Tasks 1-11 (copy 8 passos = Tasks 4-8; leis 3D = 2/4/5/7; gates §9 = 10; pendências §10 não bloqueiam Tasks 1-3).
- Consistência de interfaces: `createScrollProgress`/`Scene`/tokens com os mesmos nomes em todas as tasks consumidoras.
- Placeholders: código incluído onde é infra load-bearing; decisões visuais finas pertencem às tasks e passam pelos gates de review 5D/taste.
