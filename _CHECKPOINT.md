# CHECKPOINT — Proton Site (scroll-film "Da Noite Nasce a Casa") — 19/07/2026

## ▶ RETOMAR AQUI
19/07 12h–13h: billing "resolvido" pelo Everton mas API Higgsfield SEGUE em `grace_daily_limit_reached` (3 retries) — reset esperado ~21h–22h BRT de 19/07. Enquanto isso foi entregue FILM-2: scrim de topo (navbar legível em céu claro), halos de texto nos beats (kicker sobre a lua ok), beat 0 virou h1 (a11y 8/8), Preloader rastreia /film/poster.jpg, harness commitado em scripts/verify-film.mjs (desktop+mobile+reduced-motion+jank p95 16.3/max 25.5ms). Branch `redesign-framework` PUSHADA + deploy PREVIEW Vercel (produção/main intocada). CUSTO REAL kling3_0 = 10 cr/clipe → caps 4-5 = 2+10+10 = 22 cr (dentro dos +30 aprovados). Scratchpad foi LIMPO (clipes locais sumiram — re-baixar de show_generations na hora do assemble; medias no Higgsfield intactas). Testes: 4 specs de hero antigo + LCP mobile falham por contrato do hero velho — reescrever specs quando filme fechar 5 caps. Próximo passo: **~21h tentar gerar caps 4–5**: (1) keyframe "casa pronta no lote" via `nano_banana_pro` 16:9 usando start `c3-last` (media `7bb075aa-0baa-4876-80f9-bc39d49e56d2`) + ref exterior Wine House (media `b40ac584-6712-4f97-82da-9d1325355c7c`); (2) C4 via `kling3_0` std sound=off — start_image=c3-last, end_image=keyframe casa (timelapse de construção); (3) C5 via `kling3_0` — start=último frame do C4, end_image=interior noite (media `85de3473-7f64-4b53-b649-9987e5274609`), câmera atravessa a janela. ~17 cr total (aprovado até +30). Depois: re-assemble 5 caps (`assemble.sh`), recopiar frames p/ `public/film/frames`, atualizar `FRAME_COUNT`/`CHAPTERS`/`BEATS` no `FilmScroll.tsx`, re-rodar harness. Master 1080p SÓ com OK do Everton (225 cr — precisa recarga).

## Objetivo da sessão
Skill `scroll-film-studio` instalada (zip → `~/.claude/skills/`, auditada, registrada no ecc-router) e ativada no site Proton: home inteira vira UMA tomada contínua scrubada (conceito A "Da Noite Nasce a Casa", Lane B — footage IA Higgsfield/Seedance), 5 capítulos, draft 480p antes de master.

## Estado atual
- Feito: keyframe abertura (mar da Ferrugem à noite) · caps 1–3 gerados, chained frame-a-frame e gated por SSIM (c2 exigiu regen por fail estrutural) · master parcial + 181 frames extraídos · `FilmScroll.tsx` (canvas scrub, ImageBitmap window, beats, seam handoff `#241e19`, contrato `?jump`/`__ready`, reduced-motion) na home no lugar do `HeroDiaNoite` (arquivo preservado) · harness `film-lab/verify-film.mjs` verde: 5 shots + jank p95 16.6ms/max 16.8ms.
- Em andamento: filme com 3/5 capítulos (falta estrutura nascendo + interior).
- Bloqueado: geração Higgsfield (limite diário da conta, TODOS os modelos). Codex CLI logado ✅ (sparring ok).

## Decisões tomadas (não re-litigar)
- **Home inteira como filme** (Everton, 18/07/2026) — movimentos F0–F9 viram conteúdo after-film; nada é deletado.
- **Conceito A "Da Noite Nasce a Casa"**: noite→hora azul→terreno c/ implantação âmbar→estrutura timelapse→interior âmbar. Câmera SEMPRE avança/desce.
- **Lane B draft 480p** aprovada (~40 cr + regens); gasto real 32 de 100.5. Caps 4–5 aprovados até +30 cr.
- **Kling 3.0 p/ caps 4–5 do draft** (7.5/clipe, `end_image` trava junções); master re-roda tudo em Seedance 1080p.
- Fotos REAIS ancoram o mundo: exterior `public/obras/winehouse/01.jpg`, interior `public/media/img/interior_noite.png`.
- Frames draft commitados em `public/film/` (substituídos no master).
- Skill instalada substituiu gatilho "forjar scroll-world-higgsfield" no ecc-router.

## Arquivos tocados
- `components/home/film/FilmScroll.tsx` — NOVO: engine do filme (ver anti-freeze abaixo)
- `app/page.tsx` — FilmScroll no lugar de HeroDiaNoite
- `components/SmoothScroll.tsx` — pula Lenis quando `?jump` presente (harness)
- `public/film/{frames/f_0001..0181.jpg,poster.jpg}` — draft 3 caps
- Fora do repo: `~/.claude/skills/scroll-film-studio/` · lab em `/private/tmp/claude-501/-Users-evertonstedile-Documents-Proton---Site/75d1e276-3d8a-4fc8-a8e2-443b6a11ec54/scratchpad/film-lab/` (clipes mp4, frames-last, storyboard.md com job/media IDs, verify-film.mjs) — **scratchpad é por-sessão; se sumir, clipes re-baixáveis do histórico Higgsfield (show_generations) e assemble re-roda**

## Regras críticas desta sessão
- Push/merge para main SÓ com ok explícito (produção protonsc.com.br = `main` `ca3bb70`, intocada).
- Gasto de crédito: quote ANTES via `get_cost:true`, receipt depois (`balance`). Áudio sempre OFF.
- Chain law: start_image do clipe N = ffmpeg last-frame REAL do N-1; SSIM <0.80 + mudança estrutural = regen com "Continue the exact same shot... Do not change the colour grade" + "first frame must be pixel-identical"; dissolve sobre seam ruim é PROIBIDO.
- Design/copy/build = Claude (golden rule da skill); mecânico = shell puro; sparring codex = só estratégia.
- Herdadas de 13/07 (válidas): nada de dado inventado; JCR sempre "aprovação e licenciamento" com 46 no HTML; tokens canônicos sem aliases; NUNCA `npm run build` com `next dev` ativo (`.next` corrompe).

## Erros a NÃO repetir
- Screenshot de canvas GPU em headless sai vazio → harness usa `chromium.launch({args:["--disable-gpu"]})`.
- Browser-pane com aba hidden congela rAF/compositor (tela preta) → verificar via Playwright headless, nunca confiar no pane p/ scroll-film.
- `draw()` que registra frame-alvo ao pintar fallback congela o canvas (corrigido em `8eea427` — não reintroduzir).
- Preloader global leva ~5-7s na 1ª visita → harness espera `!document.querySelector('[data-preloader]')` ALÉM de `__ready`.
- Preset "IN THE DARK" do Higgsfield sequestra prompt de continuação → sempre `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612`.
- `timeout` não existe no macOS/zsh.
- Custo estimado do playbook ≠ real: SEMPRE preflight `get_cost` (fast tem cota diária que estoura antes do saldo).

## Pendências (ordem de prioridade)
1. **Caps 4–5 + re-assemble** (ver ▶ RETOMAR AQUI) — gate: créditos Higgsfield.
2. Beats/copy caps 4–5 + revisão de copy do Everton (call criativa final é dele).
3. Adaptive header `.on-light` (luminância do strip superior — navbar ilegível sobre céu claro do cap 3).
4. Kicker âmbar ilegível sobre a lua no hero (`shot-00000`) — reposicionar/sombra.
5. Review mobile + `prefers-reduced-motion` do FilmScroll (categoria recorrente de bug esquecido).
6. Master 1080p (225 cr — precisa recarga + OK) → substituir frames draft.
7. Herdadas: DF7 sócios (aguardando Proton) · escopo Wine House · housekeeping worktree antigo.
