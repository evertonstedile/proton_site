# Redesign Framework Literal — Design Spec

> Data: 2026-07-13 · Branch: `redesign-framework` · Fonte estratégica: `PROTON_REDESIGN_ULTRAPREMIUM_SITE_FRAMEWORK.md`
> Plano ilustrado aprovado: https://claude.ai/code/artifact/55491d95-041d-4b63-9e5f-566d76b3ad81
> Substitui a direção visual/narrativa de `2026-07-02-redesign-sotd-design.md`. NÃO substitui infra, conteúdo real nem lições do `PENDENCIAS.md` (D1–D16 permanecem válidas onde não conflitam).

## 1. Objetivo

Reconstruir o site da Proton Engenharia como experiência ultrapremium imersiva scroll-driven, narrada sobre **footage real** (9 vídeos + 10 fotos), seguindo o framework literal: paleta material, serif editorial, home em 14 movimentos, internas retrabalhadas. Mensagem-alvo: *"A Proton domina a complexidade de uma obra do projeto à entrega."*

Anti-objetivos (do framework §1): não parecer template de construtora, landing imobiliária, startup, showcase WebGL. Toda animação serve a ≥1 das 7 funções do framework §2; efeito sem função é removido.

## 2. Decisões travadas (13 jul 2026, Everton)

| # | Decisão | Valor |
|---|---------|-------|
| DF1 | Direção | **Framework literal** — pele + narrativa novas; infra invisível preservada (ver §3) |
| DF2 | Hero | **Residência dia→noite** scroll-driven; átomo 3D sai do hero (marca permanece como logo/watermark) |
| DF3 | Higgsfield | **Fallback primeiro** — crossfade WebGL das fotos; créditos (100) só após gate de aprovação do hero |
| DF4 | Escopo | **Home + todas internas** (/obras case modelo, /servicos editorial, /sobre com sócios) |
| DF5 | Serif | **Newsreader** (display opsz, itálico) — já self-host no repo; Fraunces/Instrument aposentadas no canon |
| DF6 | Domínio | **protonsc.com.br** — atualizar `lib/site.ts` (fecha B6) |
| DF7 | Dados/fotos dos sócios | **Aguardando retorno da Proton** — construir com `TODO: VALIDAR`, nenhum dado inventado, nada de placeholder em produção |
| DF8 | Condomínio (real, 13 jul) | **Condomínio JCR** — 46 unidades · Areias de Palhocinha, Garopaba/SC · fase: aprovação e licenciamento ambiental · previsão 2028. Corrige o framework ("100 casas em execução" NÃO procede): contador vai até **46** e a narrativa enfatiza planejamento/aprovação/licenciamento, não canteiro |
| DF9 | Residência do case (real, 13 jul) | **Wine House** — Praia da Ferrugem, Garopaba/SC · 91,79 m² · 2026 · concluída. Ficha técnica (cap. E) usa esses dados; escopo/disciplinas ainda a confirmar |

## 3. Preserva vs. refaz

**Preserva (infra invisível, já validada):**
- Conteúdo real auditado: 371 projetos · 119 laudos · 70.400 m² · 11 anos · 33 serviços com escopo · contato real (WhatsApp 5548996031782, Web3Forms) · Garopaba/SC · CREA · dados legais.
- Next 15 App Router + TS strict; SEO (sitemap, robots, JSON-LD, OG, llms.txt); /privacidade, /termos, cookies ANPD.
- Motor de experiência (redesign-sotd): Lenis dirigido pelo ticker GSAP (1 loop), scroll proxy, pausa de GPU fora da viewport, reduced-motion, preloader com progresso real skippable.
- Lições D1–D16 (`PENDENCIAS.md`): LCP do hero pinta em CSS antes do bundle GSAP; `backdrop-filter` ancora fixed; etc.

**Refaz:**
- Design system completo (tokens, tipografia) — ver §4.
- Home inteira: 14 movimentos (§5) substituem a narrativa SOTD. Componentes SOTD da home saem do fluxo (arquivos removidos na limpeza final).
- /obras (case residência em capítulos vira modelo), /servicos (capítulos editoriais), /sobre (sócios).
- Pipeline de vídeo: masters → derivados web.

## 4. Design system

Registro: **Cinematic Dark** (canon) · variação Proton-material. Leis do DNA valem: nunca #000/#fff puros, 1 acento cirúrgico (máx 1–2 elementos/seção), ease único `cubic-bezier(.2,.7,.2,1)` sem bounce, radius ≤ 20px, assimetria, hover sem layout shift, grain presente.

**Paleta (framework §11):**

```
Carbono        #111311  fundo
Off-white      #ECE9E2  texto
Concreto       #B8B2A8  secundário
Pedra          #776F65  faint
Madeira        #6D4A31  material/detalhe
Verde profundo #263228  superfície alternativa
Âmbar técnico  #C68B4B  acento único
```

**Tipografia (self-host, nunca Google Fonts em produção):**
- Headlines: **Newsreader** (opsz display, itálico nos destaques; nunca no corpo).
- Interface/corpo: **Archivo** (já no repo: 400/500/600).
- Dados técnicos/números/labels: **Geist Mono** (adicionar woff2 self-host).
- Necmato sai dos títulos. Marca (deusa + órbita, `public/brand/`) permanece como logotipo, watermark e microdetalhe.

**Motion (framework §11):** câmera com peso, transições longas só em cenas principais, micro 180–350ms, texto por linha/máscara, zoom de imagem ≤ 1.06, cursor custom só desktop.

## 5. Home — 14 movimentos

| # | Movimento | Asset | Implementação |
|---|-----------|-------|---------------|
| 01 | Prelude | marca.svg | Preloader existente re-skinado; 0,8–1,5s; pula com cache; nunca bloqueia por vídeo |
| 02 | **Hero dia→noite** | fora2.png + image2_noite.png | 220–300vh pinado; crossfade WebGL + máscara de luz progressiva (dia esmaece → interiores/paisagismo acendem → hora azul); headline em máscara editorial; CTA `Explorar projetos` + `Falar com a Proton`; poster estático = LCP; fallback reduced-motion = corte simples. Gate Higgsfield depois (§7) |
| 03 | Manifesto | vídeo 6 + números reais | Copy institucional refinada (não inventar); vídeo em moldura editorial 40–55% da viewport; números em mono |
| 04 | **Case Wine House (cap. A–E)** | 8 fotos residência, interior_dia/noite, vídeo 2 na abertura | A: território (aproximação lenta + linhas de implantação discretas). B: materialidade (galeria horizontal via scroll vertical, parallax moderado, zoom ≤1.06). C: interior dia→noite (câmera estável, avanço ≤1–2%, nenhum objeto se move). D: escala humana (foto com pessoas). E: ficha técnica confirmada (DF9): Wine House · Praia da Ferrugem, Garopaba/SC · 91,79 m² · 2026 · concluída; escopo/disciplinas `TODO: VALIDAR` |
| 05 | **Construção** | vídeo 4 ★ | `currentTime` dirigido pelo progresso; timeline 0–20 fundação / 20–45 estrutura / 45–70 envoltória / 70–90 acabamento / 90–100 entrega; overlays de etapa/disciplina |
| 06 | Visão estrutural | vídeo 8 ★ | Stops capitulados no scroll + overlays vetoriais leves; complementa 05 sem repetir; sem BIM fictício |
| 07 | Transição de escala | — | Zoom-out/mudança de grid → corte para aérea; headline "A mesma precisão. Em outra escala." |
| 08 | Condomínio JCR | cond2.png | Aproximação suave, contador até **46** (valor final no HTML), camadas SVG de vias/quadras; **fallback estático completo**. Copy honesta com a fase real (DF8): 46 unidades · aprovação e licenciamento ambiental · previsão 2028 · Areias de Palhocinha, Garopaba/SC — prova de capacidade de planejamento/aprovação, não de canteiro |
| 09 | Serviços | 33 serviços reais, vídeo 3 (atmosfera) | Capítulos editoriais (não cards): Projetos · Administração/Gerenciamento · Execução · Engenharia Caixa + complementares; cada um com descrição real, entregáveis, para quem, CTA contextual |
| 10 | Método | fluxo real do repo | Viabilidade → Projeto → Aprovação & Regularização → Execução & Entrega; sem nomes proprietários inventados |
| 11 | Números | 371 · 119 · 70.400 · 11 | Contador leve; valor final sempre no HTML (SEO/A11y) |
| 12 | Sócios | fotos pendentes (DF7) | João Pedro Medeiros de Souza · Vitor Mateus Macuglia · Romulo Rodrigues; proximidade, não corporativo |
| 13 | CTA final | vídeo 1 (hover/transição) | "Seu projeto começa com uma decisão bem fundamentada." WhatsApp + form reais |
| 14 | Footer técnico | dados legais existentes | Contato, endereço, CNPJ/CREA, navegação, legal, redes |

Critério por seção (framework §17): mensagem clara · funciona sem animação · mobile · reduced-motion · sem layout shift · conteúdo real · fallback · testada em Safari · não repete função narrativa.

## 6. Internas

- **/obras**: grid re-skinado + `/obras/[slug]` da residência = case rico (capítulos A–E, ficha técnica). Modelo para futuras obras.
- **/servicos**: capítulos editoriais espelhando movimento 09, com âncoras/subpáginas por frente.
- **/sobre**: manifesto + sócios (DF7) + método.
- **/processo, /contato, /privacidade, /termos**: re-skin de tokens, estrutura mantida.
- Vídeo 7: reserva para seção interna. Vídeo 9 (holográfico): fora da home; só entra em página de tecnologia se existir serviço BIM real (validar).
- Vídeo 5: alternativa ao 6.

## 7. Higgsfield — gate de créditos (100)

Nada gerado antes do hero fallback aprovado pelo Everton. Ordem: ① teste hero Seedance 2.0 Mini 720p (frames = fora2/image2_noite, prompt-base do framework §6.5) → ② uma correção → ③ condomínio (só se zoom em código não bastar) → ④ interior (só com sobra) → ⑤ upscale dos aprovados. Log obrigatório por take em `/content/production/higgsfield-log.md` (modelo, duração, resolução, custo, objetivo, tentativa, resultado, problemas). Proibido: áudio, 15s, drone dramático, 4K antes de aprovar, personagens, efeitos fantasia. Se geometria deformar após 2 tentativas de ajuste: abandonar geração, crossfade é final. Gasto de crédito = trava: pergunta antes de cada take.

## 8. Mídia — pipeline

- Masters intocados em `public/media/video/master/` (extrair de `Vídeos Site Proton.zip`).
- Derivados ffmpeg: 1920×1080 + 1280×720 (desktop), 720p/crop mobile; H.264 MP4 fallback + WebM (VP9/AV1 após teste); **keyframes frequentes (GOP curto) nos vídeos de scrub (4, 8, hero)**; posters AVIF/WebP para todos.
- Fotos: extrair de `~/Desktop/Imagens proton site.zip`, otimizar via `next/image` (AVIF/WebP).
- `muted playsInline`, preload só poster/metadata, lazy perto da viewport, nada de baixar todos os vídeos na abertura.

## 9. Performance, tiers e acessibilidade

Tiers do framework §10: A (desktop potente — WebGL + 1080p), B (notebook/celular moderno — simplificado, 720p), C (limitado — estático, crossfades CSS, scroll nativo, conteúdo integral). `prefers-reduced-motion`: sem pinning longo, scrub vira cortes/fades, autoplay pausado, informação 100% acessível. Budgets: LCP < 2,5s mobile (poster estático, lição D13), CLS ≈ 0, sem jank, hero interativo antes dos vídeos secundários. A11y: HTML semântico, teclado, foco visível, alt text, texto essencial nunca só em vídeo/canvas.

## 10. SEO

- Manter URLs atuais; redirects 301 para o que mudar (F0 confirma delta vs protonsc.com.br).
- `lib/site.ts` → domínio `https://protonsc.com.br` (DF6); metadata, sitemap, robots, JSON-LD, OG herdando.
- Conteúdo textual fora do canvas; serviços/números/escopos legíveis e indexáveis; páginas de serviço otimizadas individualmente.

## 11. Fases (F0–F9)

| Fase | Entrega | Gate |
|------|---------|------|
| F0 | Delta de auditoria vs protonsc.com.br; matriz KEEP/REFINE/VERIFY; redirects mapeados (~80% já coberto pelo repo) | Inventário em `/content/audit` |
| F1 | Tokens novos + tipografia + unzip assets + pipeline ffmpeg + styleguide | Styleguide aprovado |
| F2 | Home completa **sem animação** (14 movimentos, conteúdo real) + responsivo | Preview desktop+mobile |
| F3 | Movimento: pins, scrubs, máscaras, tiers, reduced-motion (motor existente re-escopado) | 60fps, zero jank |
| F4 | Hero dia→noite (crossfade WebGL, poster LCP, Safari/iOS) | **→ gate Higgsfield** |
| F5 | Case residência + construção (vídeos 4/8 scrub, galeria, interior) | Scrub ok no iOS |
| F6 | Escala + condomínio (contador, camadas, fallback estático) | Fallback completo |
| F7 | Internas (/obras, /servicos, /sobre, método) | CTAs validados |
| F8 | Performance + A11y (budgets, devices reais, teclado, leitores) | LCP/CLS/INP no alvo |
| F9 | SEO + redirects + QA visual + checklist framework §19 | **Push p/ main só com ok do Everton** |

Verificação de entrega (skill `entrega-verificada`) obrigatória em toda fase com superfície visual: smoke + screenshot desktop+mobile.

## 12. Riscos

1. **Scrub de vídeo no iOS/Safari** — mitigar com GOP curto, teste cedo (F4/F5), fallback por posters sequenciais.
2. **Fidelidade Higgsfield** — arquitetura deformada = descarte; crossfade real é sempre o piso de qualidade.
3. **Dados pendentes (DF7)** — sócios (fotos/bios/CREA) e escopo/disciplinas da Wine House; se retorno não vier até F7, seções publicam só o confirmado.
4. **Peso da home** (5 vídeos + WebGL) — lazy agressivo, 1 vídeo ativo por vez, GPU pausada fora da viewport, tier C sem canvas.
5. **Newsreader como display em PT-BR** — validar acentos/travessões cedo no styleguide (lição B8/D10 não se aplica — Newsreader tem diacríticos completos — mas verificar pesos ópticos).
