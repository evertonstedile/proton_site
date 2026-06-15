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
| B4 | **Supabase (obras)** | Reusar tabela `obras` existente — schema real NÃO confirmado. Risco das "8 divergências". PARAR antes de ler em produção e validar schema. | Obras (Fase 4) |
| B5 | **Supabase (leads)** | Escrita de leads fica STUBBED (mock local) até liberação humana explícita. | Form contato (Fase 6) |
| B6 | **Domínio definitivo** | `metadataBase` usa `https://proton.eng.br` como placeholder. Confirmar domínio real. | `app/layout.tsx`, SEO (Fase 6) |

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

---

## 🟢 Placeholders ativos no código (marcados como PLACEHOLDER)

- `app/page.tsx` — home inteira é placeholder da Fase 1 (será refeita na Fase 3).
- `app/layout.tsx` — `metadataBase` com domínio placeholder.
- Copy de posicionamento/manifesto na home placeholder — texto temporário.

---

## Histórico por fase

- **Fase 1 (setup):** scaffolding Next+Tailwind+tokens+fontes+Lenis/GSAP. Sem conteúdo real.
