# Redesign SOTD — Proton Engenharia (protonsc.com.br)

Data: 2026-07-02 · Branch: `redesign-sotd` · Baseline: `ac53de5` (main, gates 29/29 verdes)
Status: **spec aprovada em partes via AskUserQuestion; aguardando review final do Everton**

## 1. Objetivo

Redesign completo nível Awwwards SOTD: experiência imersiva premium para escritório
de engenharia/arquitetura em Garopaba/SC. Home 100% imersiva; páginas internas
reskinnadas no mesmo registro sem WebGL pesado.

## 2. Decisões fechadas (não re-discutir)

| Decisão | Valor |
|---|---|
| Escopo | Home SOTD imersiva + internas reskin (obras, serviços, processo, sobre, contato, legais) |
| Deploy | Vercel agora (autenticada, Analytics no código); Cloudflare `@opennextjs/cloudflare` quando houver backend/Workers |
| Baseline | Commitado em `ac53de5` na main; rollback garantido; SOTD nasce em `redesign-sotd` |
| Fotos anexadas (4 renders) | Entram direto como assets (otimizar WebP/AVIF + grade de coesão). **Pendente: Everton colocar os arquivos em `.asset-work/sotd/`** |
| Hero 3D | **Próton/átomo da marca**: núcleo + órbitas douradas linework 3D reagindo ao scroll; desmonta em partículas → blueprint |
| Depoimentos | Seção CORTADA (eram ilustrativos; prova social = obras + números + CREA) |
| Números [LEI] | 371 projetos aprovados · 119 laudos emitidos · 70.400 m² construídos · 11 anos — consistentes em todo o site |
| CTA | Proposta atrás de gesto; sem preço público (não existe hoje) → gesto revela "Estudo de viabilidade — resposta em até 24h úteis" + form |

## 3. Direção de arte travada (design-canon: Cinematic Dark)

- Fundo `#090909` · texto `#ececef` (nunca #000/#fff puros) · **acento único: ouro `#d2ac62`** (máx 1-2 elementos/seção)
- Easing único `cubic-bezier(.2,.7,.2,1)` · ZERO bounce/elastic · grain feTurbulence ~0.035
- Assimetria intencional · radius ≤20px · hover nunca muda layout · `::selection` no acento
- Tipografia: **Archivo** (sans, 400/500/600) + serif do pool rotativo do design-canon (Fraunces aposentada) — **REGISTRADA: Newsreader** (peso único 400, self-host woff2 latin, sem preload — serif é display-only atrás do gate do intro; protege o LCP). Pool licenciado indisponível p/ self-host → fallback gratuito aprovado do canon; escolhida sobre Source Serif 4/Lora por maior contraste de display vs Archivo, dígitos lining p/ contadores e latin PT-BR completo. Não repete a serif do projeto anterior (Fraunces/Vision Inox).
- Fonts self-host (@font-face/Fontsource, `font-display: swap`)

## 4. Copy aprovada — narrativa 8 passos [LEI: não mudar mensagem]

1. **Hero**: display 2 linhas "ENGENHARIA / SEM IMPROVISO" · sub "Projetos, regularização e gerenciamento de obras em Garopaba/SC — da leitura do terreno à entrega." · CTA `Pedir orçamento` · som ambiente atrás de gesto (mute-first)
2. **Promessa** (manifesto): "Cada obra começa muito antes do canteiro." — capítulos: o terreno → o traço → o papel → o concreto
3. **Tensão**: "Obra parada, embargo, retrabalho. O improviso é o item mais caro do orçamento."
4. **Diferencial**: "Um só responsável técnico — do estudo de viabilidade ao habite-se. Sem handoff, sem ruído."
5. **O sistema**: Viabilidade → Projeto → Aprovação & Regularização → Execução & Entrega (4 etapas reais do processo atual)
6. **Números**: os 4 valores da tabela acima, contadores sérios
7. **CTA**: gesto revela condição ("resposta em até 24h úteis") + form
8. **Fechamento**: "Garopaba, Santa Catarina — 28.0323°S · 48.6198°W · CREA-SC 230125-6"

## 5. Referências por seção (replicar MECÂNICA, nunca visual)

| Seção | Referência | Mecânica |
|---|---|---|
| Hero | Lando Norris/OFF+BRAND + Messenger | átomo 3D central reagindo ao scroll + type display gigante 2 linhas + som mute-first |
| Manifesto | Igloo Inc | scroll = câmera atravessando UMA cena contínua; capítulos = posições de câmera |
| Sistema/Serviços | Bruno Simon 2025 (dose) | física em 1 seção só: cards com peso/drag |
| Cases/Obras | Apple + Lusion | scrub de vídeo frame-a-frame (re-encode `-g 5`) + hover distortion WebGL (≤0.05) nas imagens |
| Números | Jeton | contadores coreografados sérios, zero circo |
| CTA | canon | proposta atrás de gesto |
| Última milha | awwwards-polish | preloader progresso REAL, entrada <1.6s skippable, 404 memorável |

## 6. 3D/WebGL — leis operacionais

- GATE por cena antes de código: comunica o que 2D não comunica? sobrevive reduced-motion? cabe no orçamento mobile? tem intenção? Reprovou → cortar/trocar. Chamada final do Everton.
- Stack: three.js + React Three Fiber + drei (`dynamic import ssr:false` + poster). Distortion em imagem DOM: OGL/curtains.
- Orçamento mobile [LEI]: DPR `Math.min(dpr,2)` · partículas ≤12k mobile/30k desktop (instanciadas) · draw calls <100-150 · texturas ≤2048² · `dispose()` no unmount · `frameloop="demand"` em cena estática · HDRI 1k Poly Haven.
- Ponte scroll: proxy mutável `{progress}` via ScrollTrigger onUpdate lido no useFrame com `THREE.MathUtils.damp`. NUNCA useState pra valor contínuo.
- Assets: só glTF/GLB + Draco/meshopt, fonte nomeada. Fallback é entrega: reduced-motion → página estática; sem WebGL → poster; tratar `webglcontextlost`.

## 7. Stack técnico

Next.js 15 App Router (atual) · Tailwind · GSAP ScrollTrigger + Lenis (desktop; mobile touch nativo) · Framer Motion micro/enter-exit · R3F + drei + three (instalar) · fonts self-host · imagens WebP/AVIF `decoding="async"` · Sentry + PostHog (fase final) · deploy Vercel.

## 8. Preservação (intocável)

- URLs: `/`, `/obras`, `/obras/[slug]` (6 slugs), `/servicos`, `/processo`, `/sobre`, `/contato`, `/privacidade`, `/termos` + sitemap/robots/llms.txt
- SEO/GEO: schema @graph, FAQPage, breadcrumbs, metadata
- Legais: CNPJ 51.164.331/0001-06 · CREA-SC 230125-6 · RTs · endereço fiscal · LGPD/CookieConsent
- Honestidade das obras: "Visualização técnica", zero dado inventado (lib/obras.ts)
- Form Web3Forms + honeypot (**pendente: `NEXT_PUBLIC_WEB3FORMS_KEY` na Vercel**)

## 9. Gates de qualidade (por fase do build-pipeline)

- Review 5 dimensões: impacto 0-3s · hierarquia · coerência premium-desta-marca · diferenciação · emoção funcional
- premium-web-build: anti-slop + técnico pré-deploy (scroll-behavior auto, motor frame-independent, reduced-motion neutraliza TUDO, will-change só onde anima)
- taste-skill pre-flight: eyebrow ≤1/3 seções · zigzag ≤2 · layouts não repetem · CTAs sem intenção duplicada · contraste AA calculado
- Playwright: zero erro de console desktop+mobile (suíte existente em `tests/`) + LCP mobile <2.5s (tests/perf.spec.ts) · fluidez em device real (Everton)
- Segurança por último · seo-geo-optimizer na passada final
- Zero placeholder: faltou dado → perguntar

## 10. Pendências de input (Everton)

1. Arquivos das 4 fotos → `.asset-work/sotd/`
2. `NEXT_PUBLIC_WEB3FORMS_KEY` na Vercel (ou lançar só com WhatsApp)
3. Áudio ambiente do hero (gero/curo e apresento pra aprovação — mute-first sempre)

## 11. Fases de execução (build-pipeline × superpowers)

1. writing-plans → plano detalhado task a task (subagent-driven)
2. Design system (tokens Cinematic Dark, tipografia Archivo+serif registrada, primitivos)
3. Hero 3D (átomo) + preloader real + som
4. Manifesto câmera → Sistema física → Obras scrub/distortion → Números → CTA → Fechamento
5. Internas reskin + 404
6. Gates: taste pre-flight → Playwright/perf → review 5D → segurança → seo-geo
7. Preview Vercel → device real Everton → prod
