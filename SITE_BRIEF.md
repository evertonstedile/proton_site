# PROTON — Brief do Site

> Spec estratégica e plano de execução. Fonte de verdade para a construção do site institucional da **Proton Engenharia & Consultoria**. Pareado com `design-system.md` (tokens e regras visuais).
> Decisões travadas na Fase 0. Atualizar este arquivo sempre que uma decisão mudar.

---

## 1. Objetivo
Site institucional premium que:
1. Gera autoridade e credibilidade.
2. Prova competência via portfólio de obras (ativo nº1 em construção).
3. Converte visitante em **lead qualificado** (orçamento/reunião).

O "wow" cinematográfico serve a esses 3 objetivos — nunca o contrário. O site conecta-se ao ecossistema **Proton OS** (Supabase como fonte das obras e destino dos leads).

## 2. Posicionamento
Engenharia residencial de **alto padrão**: precisão técnica + sofisticação. O site é, ele próprio, peça de portfólio — **o meio é a mensagem**. Tom editorial-arquitetônico: materialidade, luz, sobriedade. Nunca flashy/gamer.

Os 3 trabalhos do site:
1. **Impressionar em 3s** (autoridade) → hero cinematográfico.
2. **Provar competência** → portfólio de obras.
3. **Converter** → CTA claro, plugado no pipeline do Proton OS.

## 3. Público
Clientes de construção/reforma residencial de alto padrão (região de Blumenau/SC e além). Decisão de alto ticket, movida a confiança. Maioria chega por **mobile** (Instagram/WhatsApp) → mobile-first é inegociável.

## 4. Direção de arte
Dark cinematic ancorado na marca (preto/branco/dourado · Necmato + Montserrat). Detalhes completos em `design-system.md`. Pilares:
- Fundo escuro: preto cinematográfico + escala de quase-pretos para profundidade.
- Dourado como acento (luz/materialidade), **nunca** corpo de texto.
- Tipografia: Necmato (display, 1 peso) carrega o luxo nos títulos; Montserrat na UI/corpo.
- Motion caro: eases lentos, revelações suaves, zero bounce.
- Fotografia real das obras como herói visual, com overlays graduais.
- Assinatura de marca: a **órbita atômica** e o **linework da deusa** como motivos de motion.

## 5. Referências & benchmark
> **Calibração de padrão, NÃO templates para clonar.** Estudar o *movimento* e o *sistema* — ritmo de revelação, foto sobre fundo escuro, hierarquia tipográfica no hero, posição do CTA. Não copiar o visual.

**Galerias (garimpo contínuo, ver o motion ao vivo):**
- Awwwards · Architecture — https://www.awwwards.com/websites/architecture/
- Siiimple · Architecture — https://siiimple.com/category/architecture/
- Godly — https://godly.website

**Nicho (arquitetura/construção premium):**
- **Mason Group** — arquitetura/construção alto padrão, esquema escuro, slider de obras com GSAP. Caso de uso quase idêntico ao nosso. → extrair: apresentação de projeto, navegação.
- **Mareines Arquitetura (BR)** — reveals suaves com GSAP. → extrair: ritmo de revelação de seção.

**Benchmark de craft de motion (o teto de fluidez):**
- Active Theory — https://activetheory.net
- Locomotive — https://locomotive.ca

**Hero film (ritmo/câmera do vídeo de hero):**
- The-boundary — filmes CGI arquitetônicos que seguram o olhar além dos 3s. → extrair: movimento de câmera, ritmo (mesmo com footage real da obra).

## 6. Arquitetura técnica
Stack (alinhado ao ecossistema Proton):
- **Next.js** (App Router, TypeScript) — SSG/ISR para SEO.
- **Tailwind CSS** com design tokens (ver `design-system.md`).
- **Motion:** Lenis (smooth scroll) + GSAP ScrollTrigger + SplitText (GSAP 100% gratuito desde abr/2025); Framer Motion para micro-interações e transição de página. Integração App Router: `useGSAP` + `lenis/react`, em client components com cleanup.
- **3D** (R3F/Three.js): cirúrgico, fase posterior, no máx. um momento de hero. Footage real > 3D genérico.
- **Vídeo:** otimizado (muted, poster, comprimido, adaptive via Mux/Cloudflare Stream).
- **Imagem:** next/image, AVIF/WebP, blur placeholder.
- **Conteúdo de obras:** reusar o **Supabase existente** (tabela `obras`) como fonte das obras destacadas → uma fonte de verdade com o Proton OS.
- **Leads:** form de orçamento grava no Supabase → alimenta o pipeline de leads do Proton OS (conecta com o fluxo WhatsApp/AI do backlog).
- **SEO:** metadata, schema `LocalBusiness`, sitemap, ISR.
- **Deploy:** Vercel (projeto **standalone**, domínio próprio).
- **Analytics:** Vercel Analytics + eventos de conversão.

**Performance budget (inegociável):** LCP < 2,5s · 60fps · mobile-first · acessibilidade AA.

## 7. Sitemap
- Home (narrativa cinematográfica)
- Obras (grid → detalhe da obra)
- Sobre
- Serviços
- Processo
- Contato / Orçamento
- *(Blog/Insights — fase posterior, SEO)*

## 8. Narrativa da Home (scroll cinematográfico)
1. **Hero** — vídeo/imagem de obra + posicionamento + CTA.
2. **Manifesto** — 1 frase forte (reveal tipográfico).
3. **Obras em destaque** — revelação cinematográfica (3–4 projetos, do Supabase).
4. **Números/prova** — m² construídos, obras entregues, anos (counters animados).
5. **Processo** — diferencial (como garantem prazo/qualidade).
6. **Serviços** — o que oferecem.
7. **Depoimentos** — prova social.
8. **CTA final** — orçamento/reunião.
9. **Footer.**

## 9. Plano de execução (incremental — validar cada fase antes de avançar)
- **Fase 1 — Setup:** Next.js + Tailwind tokens + Lenis/GSAP + estrutura de pastas + fontes (Necmato/Montserrat) + deploy Vercel. *Valida:* build limpo, smooth scroll, baseline de performance.
- **Fase 2 — Design system:** rota `/styleguide` renderizando todos os tokens e componentes base (navbar c/ transição, footer, botões, card de obra, input, tag) + primitivos de motion reutilizáveis (reveal, split-text, parallax). **Gate de validação.**
- **Fase 3 — Home, seção por seção:** hero primeiro, depois descendo. Cada seção um increment (visual + motion + mobile + performance).
- **Fase 4 — Obras:** grid + página de detalhe + integração Supabase.
- **Fase 5 — Internas:** Sobre, Serviços, Processo, Contato.
- **Fase 6 — Conversão & SEO:** form → Supabase → pipeline; schema, sitemap, metadata, analytics.
- **Fase 7 — Polish:** Lighthouse, acessibilidade, refino mobile, micro-interações, QA cross-device.

## 10. Riscos & gargalos (ordem de gravidade)
1. **Conteúdo** (foto/vídeo profissional das obras) — gargalo nº1. Sem isso, premium não existe. *[Status: confirmado disponível.]*
2. **Mobile** — leads chegam por celular; cinematic precisa ser leve e funcionar.
3. **Performance vs espetáculo** — excesso de 3D/animação mata LCP. Disciplina de budget.
4. **SEO local** — imersão client-side mal feita prejudica ranqueamento; SSG/SSR resolve.
5. **Scope creep** — disciplina incremental é a trava.

## 11. Modelo & ambiente (economia de sessão)
- **Opus (chat):** decisões de arquitetura/design, direção, revisão crítica de cada fase, motion system, integração Supabase.
- **Sonnet (Claude Code):** execução repetitiva — páginas internas, componentes, ajustes de Markdown, variações.
- Regra: **Opus pensa e decide; Sonnet executa e organiza.**

## 12. Pendências
- Travessões (– —) ausentes na Necmato → hífen em títulos ou fallback `unicode-range` para Montserrat.
- Definir **copy real** (posicionamento, manifesto, serviços, processo, depoimentos).
- Amostrar o **dourado exato** do arquivo do logo (ver `design-system.md`).
