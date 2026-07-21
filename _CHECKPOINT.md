# CHECKPOINT — Proton Site (scroll-film "Da Noite Nasce a Casa") — 20/07/2026

## ▶ RETOMAR AQUI
Filme 5/5 EM PRODUÇÃO em www.protonsc.com.br (`main` = `redesign-framework` = `8a11f10`; deploy verificado no domínio real: 5 shots desktop + 3 mobile + reduced-motion + jank p95 9.2ms/max 17.5ms; suite Playwright 44/44). Frames upscalados via Real-ESRGAN x4plus local (1280w→1728w, zero créditos) + fix de memória de bitmap (B_AHEAD/B_KEEP ÷4) já aplicado e deployado — ver "Decisões". Não há tarefa em andamento. Próximos passos são DECISÕES do Everton, nesta ordem: (1) revisar copy dos beats 4–5 (o que está no ar + alternativas estão em "Decisões" abaixo); (2) master 1080p Seedance real — ~225 cr, precisa recarga + OK explícito (ganho adicional sobre o upscale ESRGAN: motion real gerado em alta res vs. upscale de 480p); ao rodar: re-gerar os 5 clipes com os MESMOS prompts (histórico Higgsfield), re-assemble, trocar `FRAME_COUNT`/`SEAM_HEX` no FilmScroll e re-rodar `node scripts/verify-film.mjs`; (3) Deployment Protection dos previews (produção é pública; previews pedem login — desligar é setting da conta dele).

## Objetivo da sessão
Skill `scroll-film-studio` aplicada ao site Proton: home inteira = UMA tomada contínua scrubada no scroll (conceito A "Da Noite Nasce a Casa", Lane B footage IA), 5 capítulos: Noite → Hora Azul → Terreno → Estrutura (timelapse) → Interior. Draft 480p completo e em produção; master 1080p pendente de aprovação.

## Estado atual
- Feito: 5 clipes gerados e chained (junções SSIM: c1 0.709 aceito visual · c2 0.896 pós-regen · c3 0.884 · c3→c4 0.976 · c4→c5 0.966) · 301 frames em `public/film/frames` (seam `#3f2d1e`) · engine FilmScroll com 5 caps + 5 beats · LCP mobile VERDE (causa raiz corrigida) · specs reescritas pro contrato do filme · produção deployada e verificada.
- Em andamento: nada.
- Bloqueado: master 1080p (dinheiro: ~225 cr, saldo 49 — recarga + OK).

## Decisões tomadas (não re-litigar)
- Home inteira como filme; conceito A; Lane B draft 480p→master 1080p (Everton, 18/07).
- Kling 3.0 com `end_image` trava junções dos caps 4–5; master re-roda tudo em Seedance 1080p.
- Copy no ar (escolha do Claude, veto do Everton pendente): cap 4 "A estrutura / O que sustenta não aparece / Fundação, estrutura e acabamento executados por quem assina o projeto." · cap 5 "A casa / A noite, agora, tem endereço / A obra termina quando a primeira noite dentro dela começa." Alternativas: cap 4 "Concreto, aço e cronograma / Cada laje no prazo que a engenharia definiu — não o contrário." · cap 5 kicker "O interior" / "Do lado de dentro do projeto".
- LCP gate mede visita RECORRENTE (intro pulado) + FCP na 1ª visita — cortina de ~3.5s é design intencional; Chrome ignora imagem full-viewport no LCP e só conta o h1 no reveal (documentado em tests/perf.spec.ts).
- Loader do filme = barra discreta sobre o pôster (nunca painel opaco); pump de frames só após pôster+fontes+window.load.
- Worktree antigo removido com checkpoint 13/07 dentro (aprovado 20/07).
- Frames upscalados localmente com Real-ESRGAN x4plus (4x + downscale lanczos p/ 1728w) a partir do `master.mp4` já aprovado — MESMA footage Seedance, mesmas junções, zero créditos. Vencedor de A/B contra lanczos puro e realesr-animevideov3 (Everton aprovou 20/07 tarde). Peso: 15MB→41MB (aceito). SSIM temporal caiu 0.96→0.94 vs frame nativo (esperado — mais textura real revelada; sem flicker visível no scrub aprovado).
- Segunda opinião via Codex CLI (leitura própria do código) achou risco real: janela de `ImageBitmap` retidos (`B_KEEP`) escala com o tamanho do frame — upscale 4x em pixels = 4x em memória por bitmap (~93MB→~373MB de pico). Fix aplicado no mesmo dia: `B_AHEAD` 18→5, `B_KEEP` 28→7 (escala ÷4, proporcional ao ganho de resolução), restaura o teto de memória original. Jank inalterado (p95 9.2-9.3ms/max 17.4-17.5ms antes e depois). Commit `8a11f10`, deployado e verificado em produção.
- Achado do Codex também confirmado por bug visual real no mobile: texto do beat (posição de scroll) dessincroniza do frame do canvas (depende de fetch) durante carregamento em rede lenta — pré-existente, NÃO causado pelo upscale, mas o payload maior (41MB) alonga a janela em que é visível. Não corrigido nesta sessão — ver Pendências.
- `verify-film.mjs` NÃO é gate automático — só `console.log`, nunca falha o processo mesmo com números ruins. "Harness verde" reportado nesta sessão é leitura manual dos números, não CI. Não corrigido — ver Pendências.
- Rollback de produção: promover deployment anterior no painel Vercel ou git `47c2a54` (pré-fix B_KEEP, upscale sem o ajuste de memória) / `e03db4a` (pré-upscale) / `ca3bb70` (pré-filme).

## Arquivos tocados (principais, todos commitados)
- `components/home/film/FilmScroll.tsx` — engine 5 caps: FRAME_COUNT 301, SEAM #3f2d1e, 5 beats, scrim topo 16vh, halos de texto, h1 no beat 0, pôster `<img data-film-poster>`, transform composto `calc(-50% + Npx)` no beat central, elementtiming="beat-h1".
- `app/template.tsx` — fade Framer só em navegação client-side (1ª carga pinta direto; era a causa do LCP 3.5s).
- `app/fonts.ts` — Newsreader preload ON (h1 serif é o LCP).
- `components/Preloader.tsx` — progresso rastreia `/film/poster.jpg`.
- `tests/hero.spec.ts` + `tests/perf.spec.ts` — contrato do filme (LCP recorrente + FCP 1ª visita).
- `scripts/verify-film.mjs` — harness no repo: CHAPTERS=5, desktop+mobile+RM+jank; uso `node scripts/verify-film.mjs <baseUrl> <outDir>`.
- `playwright.config.ts` — E2E_PORT + build hermético `.next-e2e`.

## Regras críticas desta sessão
- Push/merge/deploy produção SÓ com OK explícito (o de 20/07 já foi executado; próximo precisa de novo OK).
- Gasto de crédito: `get_cost:true` ANTES, recibo (`balance`) depois. Áudio sempre OFF — em kling3_0 é STRING `sound:"off"` (boolean `false` é inválido e vira default "on").
- Chain law: start_image = último frame REAL do clipe anterior (`ffmpeg -sseof -0.05`); SSIM <0.80 com mudança estrutural = regen "pixel-identical first frame"; dissolve sobre seam ruim PROIBIDO.
- Design/copy/build = Claude (golden rule da skill); call criativa final = Everton.
- NUNCA `npm run build` com `next dev` ativo no mesmo distDir (`.next` corrompe) — suíte usa `.next-e2e` justamente por isso.

## Erros a NÃO repetir
- `reuseExistingServer` do Playwright reusa server VELHO na 3101 → edits não testados (aconteceu 2x). Antes de re-testar mudança: `lsof -ti :3101 | xargs kill -9` e deixar a suite rebuildar (run <30s = suspeita de build velho).
- Kling `sound:false` (boolean) → server ignora e grava COM áudio. String `"off"`.
- Clipes de resoluções mistas quebram o concat do assemble (`Invalid argument`): normalizar antes p/ 864x496 (seedance padded, NÃO 854x480) com `setsar=1`.
- Chrome LCP: imagem full-viewport é EXCLUÍDA (heurística de background); texto sob overlay só conta no reveal — otimizar LCP aqui = otimizar o que revela o h1, não a imagem.
- Porta 3000 pode estar ocupada por outro projeto ("Achados OS") — dev do Proton via preview_start pega porta automática; conferir SEMPRE contra qual porta o teste rodou.
- Screenshot de canvas GPU em headless: `chromium.launch({args:["--disable-gpu"]})`.
- Preset Higgsfield sequestra prompt: `declined_preset_id: 24bae836-2c4a-48e0-89b6-49fcc0b21612`.
- Scratchpad é por-sessão e SOME: artefatos duráveis vão pro repo (harness já foi); clipes re-baixáveis via show_generations.
- Upscale local (Real-ESRGAN): binário `realesrgan-ncnn-vulkan` baixado direto do release oficial GitHub (xinntao/Real-ESRGAN v0.2.5.0 macOS) pro scratchpad — não persiste entre sessões, precisa rebaixar se repetir. Modelo `realesrgan-x4plus` (não o `-anime`) é o que preserva textura arquitetônica; `realesr-animevideov3` amacia demais (prior de anime/cartoon).
- Upscalar frames sem revisar constantes de memória do engine (`B_AHEAD`/`B_KEEP`) é bug silencioso: memória de `ImageBitmap` escala com pixels do frame, não com o peso do arquivo em disco — ao trocar resolução de frame, SEMPRE recalcular a janela retida proporcionalmente.
- `window.scrollTo()` direto no console NÃO funciona neste site (Lenis intercepta smooth-scroll) — usar sempre o contrato `?jump=<scrollY>` do próprio engine pra testar posições de scroll.
- Segunda opinião (Codex CLI via MCP `second-opinion`) é útil pra achar viés de confirmação em código que eu mesmo escrevi — vale rodar em mudanças de performance/memória antes de assumir "tá bom" só pelo harness passar.

## Assets/IDs (master 1080p vai precisar)
- Jobs: k0-noite `920e9137` · c1 `a1fd01cd` · c2 `c34a1583-6cd8-4de1-8cd0-1e5608f0805a` · c3 `ccad8855` · keyframe-casa `e03b326d-9e44-4380-8bc1-38d8bc6787af` · c4 `f3ff4717` (som on por engano, áudio descartado) · c5 `492ffda9`.
- Medias: c3-last `7bb075aa-0baa-4876-80f9-bc39d49e56d2` · c4-last `c024959a-ee3e-4fe4-92ef-cf416887c1b8` · exterior WineHouse `b40ac584-6712-4f97-82da-9d1325355c7c` · interior `85de3473-7f64-4b53-b649-9987e5274609`.
- Gasto total do filme: 51.5 cr (32 em 18-19/07 + 19.5 em 20/07). Saldo: 49. Upscale ESRGAN 20/07 tarde: 0 cr.

## Pendências (ordem de prioridade)
1. Copy beats 4–5 — veto/troca do Everton (1 edit no BEATS + harness).
2. Master 1080p REAL (Seedance, não upscale) — recarga + OK → re-gerar 5 clipes (mesmos prompts/starts), assemble, FRAME_COUNT/SEAM novos, harness + suite. Upscale ESRGAN já entregue ganho de nitidez a custo zero; master real ainda vale pela motion gerada nativamente em alta res.
3. Deployment Protection dos previews (setting do Everton, se quiser preview público).
4. Dívida técnica pré-existente no FilmScroll (achada pelo Codex 20/07, não bloqueou este deploy): (a) dessincronia texto/frame em rede lenta — texto usa posição de scroll, frame usa fetch; (b) `createImageBitmap` sem teto de concorrência; (c) rAF do scrub roda permanentemente mesmo com o filme fora do viewport (bateria mobile); (d) `verify-film.mjs` não falha o processo em números ruins, só loga. Nenhuma bloqueia produção hoje; considerar antes do master 1080p ou se houver relato de problema em mobile real.
5. Herdadas: DF7 sócios (aguardando Proton) · escopo Wine House (aguardando cliente).
