# F0 — Delta de auditoria: produção (protonsc.com.br) vs repo

> Data: 2026-07-13 · Fonte: WebFetch de https://protonsc.com.br + /sitemap.xml
> Conclusão: **produção = repo deployado** (mesmas 14 URLs, mesmo conteúdo, domínio já protonsc.com.br em `lib/site.ts`). Redesign mantém todas as rotas → **zero redirects 301 necessários**.

## URLs vivas em produção (sitemap.xml, 14)

| URL | Conteúdo | Status | Rota nova | Redirect? |
|-----|----------|--------|-----------|-----------|
| / | Home (narrativa atual "Engenharia sem improviso") | REFINE — vira 14 movimentos (spec §5) | / | não |
| /obras | Grid de 6 obras | REFINE — re-skin + case rico | /obras | não |
| /obras/winehouse | Case Wine House | REFINE — capítulos A–E, ficha DF9 | /obras/winehouse | não |
| /obras/condominio-encosta | Obra | KEEP (re-skin tokens) | igual | não |
| /obras/empreendimento-multiuso | Obra | KEEP (re-skin tokens) | igual | não |
| /obras/conjunto-residencial | Obra | KEEP (re-skin tokens) | igual | não |
| /obras/residencia-poente | Obra | KEEP (re-skin tokens) | igual | não |
| /obras/residencia-encosta | Obra | KEEP (re-skin tokens) | igual | não |
| /servicos | 33 serviços | REFINE — capítulos editoriais | /servicos | não |
| /sobre | Institucional | REFINE — manifesto + sócios (DF7) | /sobre | não |
| /processo | 4 etapas do método | KEEP (re-skin tokens) | /processo | não |
| /contato | WhatsApp + form Web3Forms | KEEP (re-skin tokens) | /contato | não |
| /privacidade | LGPD | KEEP | /privacidade | não |
| /termos | Termos de uso | KEEP | /termos | não |

## Conteúdo em produção ausente do repo

Nenhum encontrado. Produção reflete `lib/content.ts`, `lib/obras.ts`, `lib/site.ts`:
- Contato: WhatsApp 5548996031782 · proton.engcivil@gmail.com · Rua Santa Rita, 515, Garopaba · fiscal Florianópolis — ✓ no repo.
- Legal: CNPJ 51.164.331/0001-06 · CREA-SC 230125-6 · João Pedro Medeiros de Souza (CREA-SC 220508-6) · Vitor Mateus Macuglia (CREA-SC 152568-6) — ✓ no repo.
- Números: 371 · 119 · 70.400 m² · 11 anos — ✓ no repo.
- 6 obras com mesmos slugs — ✓ no repo.

## VERIFY (itens a validar durante o redesign)

| Item | Onde | Ação |
|------|------|------|
| Wine House em produção sem ficha DF9 (91,79 m² · 2026 · concluída) | /obras/winehouse | Task 3/8 atualizam |
| Condomínio JCR ainda não existe no site | — | Movimento 08 (Task 9); NÃO criar rota própria sem pedido |
| Sócios sem fotos/bios (DF7) | /sobre | Publicar só confirmado até retorno da Proton |
| `lib/site.ts` usa env `NEXT_PUBLIC_SITE_URL` com default correto | site.ts:11 | Conferir env na Vercel na F9 (DF6 já satisfeito no código) |

## Impacto na Task 12 (F9)

- `next.config.mjs`: **sem redirects a adicionar** (nenhuma URL muda).
- Sitemap/robots/JSON-LD/OG: herdam domínio correto; só re-gerar OG image com paleta nova.
