# PROTON — Pendências, Suposições & Decisões

> Documento vivo. Tudo que for placeholder, suposição ou decisão tomada por falta de
> informação fica registrado aqui. Nada inventado em silêncio.
> Atualizado a cada fase.

---

## 🔴 Bloqueios / precisam de input humano

| # | Item | Detalhe | Onde impacta |
|---|------|---------|--------------|
| B1 | **Dourado exato** | O hex do dourado NÃO veio no manual da marca. Tokens atuais (`#E7CE8C` / `#C8A24C` / `#9C7A2E`) são aproximação. Precisa amostrar do arquivo-fonte do logo. | `tailwind.config.ts`, `app/globals.css` (tokens `gold/*`) |
| B2 | **Copy real** | Posicionamento, manifesto, serviços, processo, depoimentos — tudo placeholder marcado. Não inventar números/depoimentos reais. | Home (Fase 3), internas (Fase 5) |
| B3 | **Fotos/vídeo das obras** | Hero e portfólio dependem de footage profissional. Brief diz "confirmado disponível" mas ainda não estão na pasta. | Hero (Fase 3), Obras (Fase 4) |
| B4 | **Supabase (obras)** | Reusar tabela `obras` existente — schema real NÃO confirmado. Risco das "8 divergências". UI de Obras já construída sobre STUB (`lib/obras.ts`, shape genérico). PARAR no Checkpoint 3 antes de ler em produção: validar schema, então trocar `getObras()/getObraBySlug()` + enriquecer a página de detalhe. | Obras (Fase 4 stub → Checkpoint 3) |
| B5 | **Supabase (leads)** | Form de contato construído (UI + validação completas). **Escrita STUBBED** (`ContactForm.tsx` simula sucesso, zero rede). Ligar ao pipeline de leads do Proton OS só após liberação humana (Fase 6). | Form contato |
| B6 | **Domínio definitivo** | `https://proton.eng.br` é placeholder, centralizado em `lib/site.ts` (usado por metadata, sitemap, robots, JSON-LD, OG). Trocar num só lugar quando confirmado. | `lib/site.ts` |
| B7 | **Linework da deusa** | Vetor oficial da assinatura de marca não está na pasta. Em uso um linework abstrato placeholder. | `components/brand/GoddessLinework.tsx` |
| ~~B8~~ ✅ | **Necmato sem acentos PT-BR** | **DIVERGÊNCIA da fonte de verdade:** `design-system.md` diz "acentos OK", mas o woff2 fornecido (8KB = subset ASCII) **descarta TODOS os diacríticos** (ã, ç, é, à, õ…) e travessões. Provado por teste de pixel. **RESOLVIDO por decisão do cliente:** fallback Didone (Playfair Display auto-hospedado) via `unicode-range`, só nos acentos. Ver D10. *Opcional futuro:* arquivo Necmato completo elimina até o fallback. | títulos display PT-BR |

---

## 🟡 Decisões tomadas (por falta de info ou por padrão técnico)

| # | Decisão | Motivo |
|---|---------|--------|
| D1 | **Tailwind v3** (não v4) | Casar exatamente com o `theme.extend` documentado em `design-system.md`. |
| D2 | Stack fixada: Next 15 (App Router, TS) + React 19 + GSAP 3.13 (ScrollTrigger/SplitText grátis) + Lenis + Framer Motion. | Alinhado ao brief §6. |
| D3 | Fontes via `next/font/local` (Necmato woff2) + `next/font/google` (Montserrat). Necmato travada em peso 400 + `.font-display { font-weight:400 !important; font-synthesis-weight:none }` para impedir faux-bold. | Brief: peso único, jamais bold. |
| D4 | Lenis dirigido pelo ticker do GSAP (`autoRaf:false`) e parado sob `prefers-reduced-motion`. | 1 loop só, 60fps, A11y. |
| D5 | Travessões (– —) ausentes na Necmato → usar hífen em títulos display; corpo (Montserrat) tem travessão normal. | Brief §12 / design-system. |
| D6 | `@/*` aponta para a raiz do projeto (app root = raiz da pasta). | Sem `src/`, simplicidade. |
| D7 | Travessão (—) confirmado OK no corpo (Montserrat). Em títulos display (Necmato) usar hífen. | Verificado no preview da Fase 2. |
| D8 | Órbita atômica construída como SVG genérico (3 órbitas elípticas + núcleo). Linework da deusa = placeholder até asset real (B7). | Motivo de marca verificável; deusa depende de vetor oficial. |
| D9 | Menu mobile renderizado FORA do `<header>` — o `backdrop-blur` da navbar criava containing block que prendia o overlay `fixed` à altura da barra (bug corrigido). | Lição: `backdrop-filter` ancora `position:fixed` descendente. |
| D10 | **Fallback Didone para acentos** (B8, escolha do cliente): `@font-face DisplayAccentFallback` = **Playfair Display** Regular auto-hospedado (`public/fonts/PlayfairDisplay-latin.woff2`, 22KB), à frente da Necmato no `font-display`, restrito por `unicode-range` aos codepoints acentuados + travessões/aspas. `size-adjust:42%` iguala a cap-height à da Necmato (medido). + `.font-display { text-transform: uppercase }` porque a Necmato é face caixa-alta → o fallback renderiza o acento MAIÚSCULO (Ã/Ç/À) casando a altura. | Acentos PT-BR corretos e coesos nos títulos. |
| D11 | Hero usa copy e mídia PLACEHOLDER (B2/B3). Mídia = gradiente radial + grão + watermark; trocar por vídeo/foto real. | Sem assets reais ainda. |
| D12 | Sem token de cor de erro no design-system → usei vermelho funcional discreto (`#E5736B`) no estado de erro do `Input`. Considerar tokenizar se surgir mais UI de formulário/feedback. | Validação acessível do form. |

---

## 🟢 Placeholders ativos no código (marcados como PLACEHOLDER)

- `app/page.tsx` — home inteira é placeholder da Fase 1 (será refeita na Fase 3).
- `app/layout.tsx` — `metadataBase` com domínio placeholder.
- Copy de posicionamento/manifesto na home placeholder — texto temporário.
- `components/brand/GoddessLinework.tsx` — linework abstrato placeholder (ver B7).
- `components/Footer.tsx` — copy institucional + cidade (Blumenau/SC) placeholder.
- **Rotas internas linkadas mas ainda NÃO criadas** (`/obras`, `/sobre`, `/servicos`, `/processo`, `/contato`) → 404 até as Fases 4–5. Navbar/Footer já apontam para elas.
- `app/styleguide/page.tsx` — cards de obra e dados são placeholders de demonstração (noindex).
- `lib/content.ts` — **todo o conteúdo da Home é placeholder**: manifesto, obras em destaque (Fase 4 puxa do Supabase), números (ILUSTRATIVOS, com aviso visível na página), processo, serviços, depoimentos (ILUSTRATIVOS, com aviso visível). Copy provisória aprovável em B2.
- Todas as rotas do menu existem (sem 404). Form de contato: dados de contato (e-mail/telefone/endereço) são placeholder (B2).
- `lib/obras.ts` — obras MOCK (shape provisório, B4); página de detalhe simples; galeria e ficha técnica são placeholders até os dados reais.

---

## Histórico por fase

- **Fase 1 (setup):** scaffolding Next+Tailwind+tokens+fontes+Lenis/GSAP. Sem conteúdo real.
- **Fase 2 (design system):** rota `/styleguide` com todos os tokens + componentes base (Navbar c/ transição e menu mobile, Footer, Button primário/ghost, Tag, Input, WorkCard) + primitivos de motion (Reveal, SplitReveal, Parallax) + motivos de marca (AtomicOrbit, GoddessLinework). Validado em preview desktop+mobile, zero erros de console, build+lint limpos. Bug do overlay mobile (backdrop-blur) corrigido. CHECKPOINT 1 aprovado ("continuar").
- **Fase 3 — Hero (parcial):** HERO cinematográfico da Home — timeline de entrada (GSAP + SplitText por linha, anti-flash), parallax de saída no scroll, grão, watermark, assinatura da órbita atômica animada, indicador de scroll, CTAs. Mídia/copy placeholder. **Descoberto B8 (Necmato sem acentos)** durante validação → fix interino. CHECKPOINT 2 aprovado; B8 resolvido com Playfair Didone (escolha do cliente).
- **Fase 3 — Home completa:** demais seções (Manifesto, Obras em destaque, Números/contadores, Processo, Serviços, Depoimentos, CTA final) construídas reusando primitivos/componentes. Conteúdo placeholder em `lib/content.ts`; números e depoimentos com aviso visível de "ilustrativos". Contador animado (`Counter`) com formato pt-BR e reduced-motion. Validado desktop+mobile (1 coluna, sem scroll horizontal), acentos coesos via Playfair, console limpo, build+lint limpos.
- **Fase 4 — Obras (stub):** `lib/obras.ts` (fonte única mock, shape esperado da tabela `obras`) + `/obras` (grid de 6 cards, SSG) + `/obras/[slug]` (detalhe SIMPLES, SSG via generateStaticParams, metadata por obra). Home passou a puxar destaques de `getObras()`. Decisão do cliente: stub agora, schema/Supabase no Checkpoint 3. Validado desktop+mobile, sem hscroll, build+lint limpos.
- **Fase 6 — SEO & Analytics (parte sem Supabase):** `lib/site.ts` (config central, domínio/e-mail/telefone placeholder) + `sitemap.xml` (todas as rotas + obras) + `robots.txt` (bloqueia /styleguide) + JSON-LD `HomeAndConstructionBusiness` (contato placeholder, B2) + OpenGraph/Twitter no metadata + `opengraph-image` dinâmica (marca; usa sans padrão pois Necmato é woff2) + Vercel Analytics. Build+lint limpos. **PARADO no CHECKPOINT 3 — a integração Supabase de produção (leads write + obras read) aguarda liberação humana.**
- **Fase 5 — Internas:** `/sobre` (story + valores), `/servicos` (lista rica), `/processo` (timeline vertical), `/contato` (form com validação + **escrita STUBBED**, B5). `PageHeader` reutilizável; `Input` ganhou estado de erro acessível. Todas as rotas do menu existem (sem 404). Validado desktop+mobile (sem hscroll), form testado (validação + sucesso stub), console limpo, build+lint limpos. **Próxima parada: CHECKPOINT 3 (antes do Supabase de produção, Fase 6).**
