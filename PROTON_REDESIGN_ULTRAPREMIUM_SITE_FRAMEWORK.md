# PROTON ENGENHARIA — Framework Mestre do Site Ultrapremium

> Documento de direção estratégica, narrativa, audiovisual, arquitetura técnica e execução para Claude Code + Higgsfield MCP.
>
> **Regra central:** o novo site deve reaproveitar integralmente as informações válidas do site atual da Proton — textos institucionais, serviços, números, dados, contatos, regiões atendidas, diferenciais, projetos, equipe e informações legais — reorganizando e refinando a apresentação, sem apagar conteúdo importante e sem inventar dados.

---

## 1. Objetivo do projeto

Construir um site institucional ultrapremium, imersivo e tecnicamente avançado para a Proton Engenharia, capaz de comunicar simultaneamente:

- autoridade técnica;
- capacidade de projeto, gerenciamento e execução;
- domínio de obras complexas;
- sofisticação arquitetônica;
- precisão, transparência e confiabilidade;
- escala de operação, de residências exclusivas a empreendimentos com 100 unidades;
- presença real no canteiro e capacidade de transformar planejamento em obra concluída.

O site não deve parecer:

- template de construtora;
- landing page imobiliária;
- startup de tecnologia;
- portfólio genérico de arquitetura;
- demonstração gratuita de efeitos WebGL;
- site pesado em que a tecnologia atrapalha a navegação.

A experiência deve fazer o visitante concluir:

> **A Proton domina a complexidade de uma obra do projeto à entrega.**

---

## 2. Conceito criativo

### Conceito principal

# Da complexidade à forma

A narrativa acompanha a transformação:

**território → estudo → projeto → coordenação → estrutura → execução → acabamento → entrega**

A tecnologia deve permanecer visualmente sofisticada, porém invisível como ferramenta. Cada animação deve servir a pelo menos um destes objetivos:

1. explicar escala;
2. revelar lógica de engenharia;
3. demonstrar processo;
4. enfatizar materialidade;
5. criar percepção espacial;
6. orientar a leitura;
7. conectar uma etapa à seguinte.

Se um efeito não cumprir uma dessas funções, ele deve ser removido.

---

## 3. Preservação obrigatória do conteúdo do site atual

Antes de alterar a arquitetura do site, o Claude Code deve executar uma auditoria de conteúdo do domínio atual:

- `https://protonsc.com.br`
- `https://www.protonsc.com.br`

### 3.1. Criar inventário de conteúdo

Salvar em:

```text
/content/audit/current-site-content.md
/content/audit/current-site-urls.json
/content/audit/current-site-assets.json
```

O inventário deve registrar:

- títulos e subtítulos;
- textos institucionais;
- manifesto e proposta de valor;
- todos os serviços;
- números e métricas;
- anos de experiência;
- número de projetos, obras, metros quadrados ou qualquer indicador publicado;
- dados dos sócios;
- áreas de atuação;
- cidades e regiões atendidas;
- contatos, telefones, e-mails e WhatsApp;
- links de redes sociais;
- endereço;
- depoimentos;
- FAQs;
- informações de financiamento imobiliário;
- imagens, vídeos, logotipos e ícones;
- metadados SEO;
- títulos e descrições das páginas;
- políticas e textos legais.

### 3.2. Política de migração

Classificar cada item como:

```text
KEEP      = reaproveitar praticamente como está
REFINE    = manter informação, melhorar redação e hierarquia
MERGE     = combinar com conteúdo semelhante
VERIFY    = dado precisa de confirmação antes da publicação
ARCHIVE   = conteúdo antigo, duplicado ou não mais válido
```

### 3.3. Regras invioláveis

- Não excluir um serviço existente sem autorização.
- Não alterar números sem fonte ou confirmação.
- Não inventar premiações, certificações, clientes, áreas ou métricas.
- Não atribuir à Proton escopos que ela não executou.
- Manter SEO e redirecionamentos das URLs existentes.
- Preservar dados estruturados e metadados relevantes.
- Quando um dado não puder ser validado, usar marcador `TODO: VALIDAR COM A PROTON`.
- Nenhum placeholder deve chegar à produção.

### 3.4. Serviços já identificados e que devem constar na auditoria

A comunicação pública atual da Proton menciona, no mínimo:

- Projetos de Engenharia;
- Execução de Obras;
- Administração e Gerenciamento de Obras;
- Financiamento Imobiliário / Engenharia Caixa;
- soluções para obras residenciais e corporativas.

Também devem ser validados no site atual todos os serviços complementares e disciplinas já publicados, como projetos estruturais, elétricos, hidráulicos, hidrossanitários e outros eventualmente existentes.

### 3.5. Equipe a preservar e validar

Os dados já fornecidos para o projeto são:

- **João Pedro Medeiros de Souza** — Projetos / Administrativo;
- **Vitor Mateus Macuglia** — Projetos / Administração e Gerenciamento de Obras;
- **Romulo Rodrigues** — Projetos / Comercial.

Antes da publicação, conferir cargos, grafia, biografias, CREA, fotos e atribuições no material oficial da Proton.

---

## 4. Hierarquia narrativa da home

### 01 — Prelude

Objetivo: introduzir a marca sem criar um loading cansativo.

- fundo carbono;
- monograma ou logotipo formado por linhas técnicas;
- duração ideal de 0,8 a 1,5 segundo;
- pular imediatamente quando os assets essenciais já estiverem em cache;
- jamais bloquear o site esperando todos os vídeos.

### 02 — Hero imersivo

Material principal:

- fotografia frontal diurna da residência;
- fotografia frontal noturna da mesma residência;
- vídeo gerado a partir do par, caso preserve perfeitamente a arquitetura;
- fallback com transição WebGL/CSS entre as duas imagens.

Experiência:

1. fachada durante o dia;
2. scroll reduz progressivamente a luz natural;
3. interior e paisagismo acendem;
4. cascata ganha presença;
5. ambiente chega à hora azul;
6. headline entra em máscara editorial.

Copy-base, sujeita a refinamento com o conteúdo atual:

> **Engenharia que transforma complexidade em forma.**
>
> Projetos, gerenciamento e execução com precisão do primeiro cálculo ao último detalhe.

CTA:

- `Explorar projetos`
- CTA secundário discreto: `Falar com a Proton`

Configuração de scroll:

- seção entre 220 e 300vh;
- visual pinado;
- vídeo com `currentTime` associado ao progresso;
- snap suave apenas se não prejudicar a sensação de controle;
- fallback para usuário com redução de movimento.

### 03 — Manifesto institucional

Usar o conteúdo real do site atual, refinado, sem substituir a essência.

Formato:

- headline forte;
- 2 a 4 parágrafos curtos;
- números reais em tipografia técnica;
- vídeo 6 em moldura editorial, mostrando profissionais em obra e análise de plantas.

Mensagem desejada:

> Engenharia não acontece apenas no cálculo. Acontece em cada decisão tomada durante a obra.

### 04 — Case principal: residência de alto padrão

As primeiras oito imagens enviadas pertencem ao projeto residencial principal, incluindo pares de dia e noite.

O case deve ser dividido em capítulos.

#### Capítulo A — Implantação e território

Imagem sugerida: vista posterior/lateral com montanhas.

- aproximação muito lenta;
- sobreposição de linhas de implantação;
- labels técnicos discretos;
- nenhuma interface que pareça planta de videogame.

Copy-base:

> **Projetar o edifício. Respeitar o território.**

#### Capítulo B — Estrutura e materialidade

Imagens sugeridas:

- fachadas laterais;
- deck, piscina, concreto, pedra, madeira e vidro.

Interação:

- galeria horizontal controlada pelo scroll vertical;
- parallax muito moderado;
- zoom máximo entre 1.00 e 1.06;
- dados técnicos reais do projeto quando disponíveis.

#### Capítulo C — Interior dia/noite

Materiais:

- `interior_dia(2).jpeg`
- `interior_noite.jpeg`

Experiência:

- transição temporal mais íntima;
- câmera estável ou avanço máximo de 1–2%;
- luz externa diminui;
- iluminação quente interna aparece;
- jardim e parede de pedra ganham leitura;
- nenhum objeto muda de posição.

Copy-base:

> **Quando estrutura, matéria e experiência ocupam o mesmo espaço.**

#### Capítulo D — Escala humana

Usar a imagem frontal com pessoas no pavimento superior.

Mensagem:

> A engenharia é técnica. O resultado precisa ser humano.

#### Capítulo E — Ficha técnica

Usar somente dados confirmados:

- localização;
- tipologia;
- área;
- ano;
- status;
- escopo da Proton;
- disciplinas envolvidas;
- sistemas relevantes;
- desafios e soluções;
- equipe.

### 05 — Construção: do terreno à entrega

Vídeo principal: **vídeo 4**.

Função:

- mostrar fundação, estrutura, fechamento, piscina e conclusão;
- ser a principal timeline de construção do site;
- controlar o vídeo pelo scroll.

Sugestão de timeline:

```text
0–20%   fundação
20–45%  estrutura
45–70%  envoltória
70–90%  acabamentos
90–100% entrega e iluminação final
```

Sobreposições possíveis:

- etapa;
- decisão técnica;
- disciplina envolvida;
- dado real;
- marco de obra.

### 06 — Visão estrutural e coordenação

Vídeo: **vídeo 8**.

Função:

- explicar evolução estrutural;
- apresentar fundação, estrutura, sistemas, fechamento e entrega;
- permitir pequenos stops ou capítulos no scroll;
- adicionar overlays vetoriais leves.

Evitar transformar esta seção em apresentação BIM fictícia. Usar tecnologia apenas para explicar o processo real.

### 07 — Transição de escala

A residência individual se reduz visualmente e conduz ao empreendimento de 100 casas.

Headline:

> **A mesma precisão. Em outra escala.**

A transição pode utilizar:

- zoom-out;
- mudança de grid;
- repetição modular abstrata;
- corte para a vista aérea do condomínio.

### 08 — Case: condomínio com 100 casas

Materiais:

- imagem de rua do condomínio;
- imagem aérea do empreendimento;
- dados e números reais do projeto atual.

O case precisa enfatizar:

- 100 unidades em execução;
- planejamento;
- repetibilidade com controle de qualidade;
- logística de canteiro;
- cronograma;
- padronização;
- coordenação de equipes;
- infraestrutura;
- capacidade operacional.

Não inventar metragem, prazo, percentual de avanço ou volume executado.

#### Cena interativa recomendada

A vista aérea pode receber:

- aproximação suave;
- destaque progressivo das unidades;
- contador até 100;
- agrupamento por quadras ou fases, quando real;
- vias e áreas comuns como camadas SVG/Three.js;
- leitura de progresso somente se houver dados atualizados.

Implementação:

- preferir instancing para objetos repetidos;
- evitar 100 meshes independentes pesados;
- fallback estático completo;
- não depender de WebGL para transmitir números ou texto.

### 09 — Serviços

Reaproveitar **todos os serviços atuais**, reorganizados em uma arquitetura mais clara.

Possível estrutura de apresentação:

1. Projetos de Engenharia;
2. Administração e Gerenciamento de Obras;
3. Execução de Obras;
4. Engenharia Caixa / Financiamento Imobiliário;
5. serviços e disciplinas complementares validados no site atual.

Cada serviço deve conter:

- descrição real;
- entregáveis;
- para quem é indicado;
- como a Proton atua;
- benefícios concretos;
- CTA contextual;
- link para página própria, quando houver conteúdo suficiente.

Evitar cards genéricos. Preferir capítulos editoriais, diagramas técnicos e microinterações úteis.

### 10 — Método Proton

Criar uma seção que organize o processo real da empresa.

Estrutura inicial a validar:

```text
Diagnóstico
Planejamento
Projeto e compatibilização
Orçamento e cronograma
Execução / gerenciamento
Controle e acompanhamento
Entrega
```

Usar o método real; não criar nomes proprietários sem aprovação.

### 11 — Números e provas

Reaproveitar os números existentes no site atual.

Possíveis categorias, apenas quando confirmadas:

- projetos realizados;
- obras executadas ou gerenciadas;
- metros quadrados;
- anos de experiência;
- cidades atendidas;
- unidades em execução;
- disciplinas coordenadas.

Animação:

- contador leve;
- nenhum número deve depender da animação para ser lido;
- valor final já deve existir no HTML para SEO e acessibilidade.

### 12 — Sócios

Apresentar João Pedro, Vitor e Romulo com:

- fotografia consistente;
- função;
- biografia curta;
- áreas de atuação;
- credenciais verificadas;
- links profissionais, quando aplicável.

Evitar retratos excessivamente corporativos e artificiais. A direção deve comunicar proximidade, responsabilidade e presença técnica.

### 13 — CTA final

Mensagem-base:

> **Seu projeto começa com uma decisão bem fundamentada.**

Ações:

- solicitar uma conversa;
- abrir WhatsApp;
- enviar briefing;
- conhecer serviços.

Reaproveitar os canais reais do site atual.

### 14 — Footer técnico

Conter:

- contato;
- endereço;
- redes sociais;
- serviços;
- navegação;
- informações legais;
- política de privacidade;
- CNPJ e registros, se já publicados e validados;
- créditos do site, se desejado.

---

## 5. Inventário e uso dos vídeos existentes

Arquivo recebido: `Vídeos Site Proton.zip`

### Vídeo 1

**Uso:** card do projeto, hover, abertura curta ou transição.

- revelação rápida da residência;
- bom para 3–5 segundos;
- não usar junto do vídeo 2 na mesma sequência principal.

### Vídeo 2

**Uso:** introdução do projeto e passagem do terreno à arquitetura.

- adequado para manifesto ou abertura do case;
- pode anteceder a residência principal;
- bom como ponte narrativa.

### Vídeo 3

**Uso:** experiência espacial, interiores e acabamentos.

- comunica mais arquitetura e atmosfera do que engenharia;
- usar como loop curto ou transição;
- não apresentar como timelapse de construção.

### Vídeo 4 — prioridade máxima

**Uso:** timeline principal de construção.

- fundação;
- estrutura;
- fechamento;
- piscina;
- residência concluída e iluminada.

É o melhor ativo para demonstrar a capacidade de materialização da Proton.

### Vídeo 5

**Uso:** reserva para acompanhamento técnico.

- profissionais analisando projeto;
- composição mais fechada;
- não prioritário para a home.

### Vídeo 6 — prioridade alta

**Uso:** manifesto, gerenciamento e acompanhamento técnico.

- presença humana;
- capacete e canteiro comunicam engenharia;
- preferir moldura editorial entre 40% e 55% da tela;
- não precisa ocupar a viewport inteira.

### Vídeo 7

**Uso:** seção técnica secundária ou página interna.

- evolução interessante;
- usar trecho curto;
- evitar tela cheia se elementos artificiais ficarem evidentes.

### Vídeo 8 — prioridade máxima

**Uso:** evolução estrutural e coordenação.

- excelente leitura de etapas;
- adequado para scroll com stops;
- complementar ao vídeo 4, sem repetir exatamente a mesma mensagem.

### Vídeo 9

**Uso:** somente página de BIM, tecnologia ou compatibilização, se fizer sentido com o serviço real.

- estética tecnológica e holográfica;
- não usar no hero;
- não usar como representação de uma tecnologia que a Proton não oferece;
- preferir trecho de 2–3 segundos e crop mais técnico;
- excluir da home caso diminua a percepção de autenticidade.

### Seleção recomendada para a home

```text
Vídeo 2  → introdução do projeto
Vídeo 6  → gerenciamento e presença em obra
Vídeo 4  → construção principal
Vídeo 8  → visão técnica das etapas
Vídeo 3  → atmosfera e acabamento
Vídeo 1  → hover ou transição curta
```

Reservas:

```text
Vídeo 7  → seção interna
Vídeo 5  → alternativa ao vídeo 6
Vídeo 9  → BIM/tecnologia, somente se verdadeiro e relevante
```

---

## 6. Plano revisado para Higgsfield — 100 créditos restantes

Como já existem bons vídeos reais de construção, o objetivo não é gerar muitos vídeos. O orçamento deve ser concentrado em lacunas específicas.

### 6.1. Vídeo essencial 1 — Hero dia para hora azul

Frames:

- início: fachada frontal diurna;
- fim: fachada frontal noturna.

Objetivo:

- transição de fim de tarde para hora azul;
- arquitetura completamente preservada;
- câmera bloqueada;
- iluminação interna e paisagística surgindo de forma progressiva;
- movimento mínimo da água e da vegetação;
- carros e pessoas imóveis;
- nada de morphing.

#### Modelo inicial

**Seedance 2.0 Mini**

Configuração recomendada:

```text
Duração: 5–6 segundos
Resolução de teste: 720p, se reduzir bastante o custo
Resolução final: 1080p, somente após aprovar o movimento
Aspect ratio: 16:9
Áudio: desligado
Movimento: baixo
Câmera: locked-off / static architectural camera
```

O Mini deve ser utilizado primeiro como validação. Se preservar geometria, vidro, pessoas, carros e iluminação, o resultado pode ser final ou receber upscale.

Se houver deformações:

1. reduzir a quantidade de movimento;
2. simplificar o prompt;
3. repetir uma única vez;
4. testar Seedance 2.0 Fast ou Standard apenas para o hero;
5. abandonar a geração e usar crossfade/WebGL real entre as fotos se a fidelidade continuar insuficiente.

Não sacrificar precisão arquitetônica por movimento.

### 6.2. Vídeo essencial 2 — Condomínio

Base:

- imagem aérea do condomínio de 100 casas.

Objetivo:

- avanço aéreo lento e estável;
- profundidade muito discreta;
- nenhuma unidade criada, apagada ou deformada;
- carros imóveis;
- implantação preservada;
- vegetação com movimento quase imperceptível.

Modelo:

**Seedance 2.0 Mini**

Configuração:

```text
Duração: 4–5 segundos
Resolução: 720p para teste; 1080p se aprovado e necessário
Aspect ratio: 16:9
Áudio: desligado
Câmera: slow aerial push-in
Movimento: mínimo
```

Esta geração é opcional se GSAP/Three.js produzir uma aproximação mais limpa a partir da foto.

### 6.3. Vídeo opcional — Interior dia/noite

Gerar apenas se o hero demonstrar que o Mini mantém a arquitetura com qualidade.

Frames:

- `interior_dia(2).jpeg`
- `interior_noite.jpeg`

Configuração:

```text
Duração: 5–6 segundos
Câmera: estática
Movimento: mínimo
Áudio: desligado
Nenhum objeto móvel
Nenhum fogo ou fumaça inventados
```

### 6.4. Regra de orçamento

Antes de cada geração, registrar:

```text
modelo
duração
resolução
custo exibido
objetivo do take
número da tentativa
resultado
problemas encontrados
```

Salvar em:

```text
/content/production/higgsfield-log.md
```

Prioridade do orçamento:

1. teste do hero no Mini;
2. uma correção do hero;
3. condomínio, se necessário;
4. interior, somente se houver créditos suficientes;
5. upscale apenas dos takes aprovados.

Não gastar créditos com:

- áudio;
- vídeos de 15 segundos;
- movimentos de drone dramáticos;
- personagens;
- 4K antes da aprovação;
- várias imagens que já podem ser animadas com código;
- vídeos de construção adicionais;
- efeitos de fantasia.

### 6.5. Prompt-base do hero

```text
Use the provided daytime architectural image as the exact first frame and the
provided blue-hour image as the exact final frame.

Create a seamless, physically accurate transition from late afternoon to blue
hour, approximately 20 to 30 minutes after sunset.

Strictly preserve the complete architecture, structural geometry, concrete,
stone, timber, glass openings, roofline, balcony, vehicles, people, pool,
waterfall, landscaping, furniture and every spatial relationship.

The camera is completely locked and must not move.

Interior lights and landscape lights turn on progressively and naturally.
The waterfall receives restrained architectural lighting. Keep readable
exterior shadows, realistic glass reflections and subtle residual blue light
in the sky.

Only minimal natural motion is allowed in foliage and water.

This is a controlled time-of-day conversion, not a redesign, not a new scene,
not a cinematic fantasy and not an architectural reinterpretation.

Avoid geometry drift, morphing, moving walls, changing windows, deforming
vehicles, moving people, new objects, excessive glow, oversaturated orange
lighting, full black night, dramatic camera movement and artificial lens effects.
```

### 6.6. Prompt-base do condomínio

```text
Use the provided aerial image as the strict structural and spatial reference.

Create an ultra-realistic, extremely slow aerial push-in toward the center of
the residential development.

Preserve exactly all 100 housing units, roofs, streets, sidewalks, walls,
parking positions, vehicles, common areas, landscaping and the complete site
layout. Do not create, remove, move or deform any building.

The camera movement must be subtle, smooth and physically plausible, with no
orbit, no dramatic drone movement and no perspective warping.

Only minimal natural foliage movement is allowed. Cars and people remain
nearly static.

The result must look like high-end professional drone footage captured during
the same photography session.
```

---

## 7. Stack técnica recomendada

### Base

- Next.js com App Router;
- React;
- TypeScript strict;
- GSAP;
- ScrollTrigger;
- Lenis;
- Three.js;
- React Three Fiber apenas onde facilitar manutenção;
- CSS Modules, Tailwind ou solução equivalente baseada em tokens;
- sistema de conteúdo estruturado;
- `next/image` para imagens comuns;
- pipeline próprio para vídeo web.

### Responsabilidades

```text
Lenis        → sensação e suavidade do scroll
GSAP         → timelines, pinning, scrub, máscaras, transições
Three.js     → profundidade e visualização espacial com significado
CSS          → tudo que não exige canvas
Vídeo real   → processo e construção
Higgsfield   → lacunas cinematográficas específicas
React        → estrutura, estado, conteúdo e acessibilidade
```

### Regra

Não utilizar Three.js em todas as seções. O site deve continuar elegante e completo sem WebGL.

---

## 8. Arquitetura sugerida do projeto

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── projetos/
│   ├── servicos/
│   ├── sobre/
│   ├── contato/
│   └── api/
├── components/
│   ├── layout/
│   ├── typography/
│   ├── media/
│   ├── motion/
│   ├── project/
│   └── ui/
├── sections/
│   ├── prelude/
│   ├── hero/
│   ├── manifesto/
│   ├── flagship-project/
│   ├── construction-process/
│   ├── scale-transition/
│   ├── condominium/
│   ├── services/
│   ├── method/
│   ├── numbers/
│   ├── partners/
│   └── contact/
├── motion/
│   ├── scroll-engine.ts
│   ├── gsap-context.ts
│   ├── timelines/
│   ├── breakpoints.ts
│   └── reduced-motion.ts
├── three/
│   ├── renderer/
│   ├── scenes/
│   ├── shaders/
│   ├── materials/
│   └── loaders/
├── content/
│   ├── site.ts
│   ├── projects.ts
│   ├── services.ts
│   ├── team.ts
│   ├── numbers.ts
│   └── audit/
├── styles/
│   ├── tokens.css
│   ├── typography.css
│   └── globals.css
└── lib/
    ├── performance.ts
    ├── device-tier.ts
    ├── media-loader.ts
    ├── seo.ts
    └── analytics.ts
```

---

## 9. Motor único de animação

Evitar loops independentes competindo entre Lenis, GSAP e Three.js.

Base conceitual:

```ts
const lenis = new Lenis({
  duration: 1.1,
  smoothWheel: true,
  syncTouch: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```

Regras:

- renderer WebGL deve pausar fora da viewport;
- atualizar Three.js somente quando houver movimento;
- limitar `devicePixelRatio`;
- limpar timelines e listeners ao desmontar componentes;
- evitar múltiplos `requestAnimationFrame` permanentes;
- usar `gsap.context()` para escopo e cleanup;
- recalcular ScrollTrigger após carregamento de fontes e mídia;
- controlar vídeo por progresso normalizado, não por eventos de wheel isolados.

---

## 10. Sistema de performance tiers

### Tier A — desktop potente

- WebGL/WebGPU quando estável;
- vídeo 1080p;
- displacement sutil;
- pós-processamento moderado;
- DPR limitado;
- experiência completa.

### Tier B — notebook e celular moderno

- WebGL simplificado;
- vídeo 720p ou 1080p comprimido;
- menos pós-processamento;
- menos camadas de parallax;
- texturas menores.

### Tier C — dispositivo limitado

- imagens estáticas;
- crossfades CSS;
- sem canvas persistente;
- scroll nativo;
- conteúdo integral preservado.

### Reduced motion

Respeitar `prefers-reduced-motion`:

- remover pinning longo;
- substituir scrub por cortes ou fades;
- pausar autoplay;
- oferecer controle manual;
- manter toda a informação acessível.

---

## 11. Direção visual

### Paleta-base

```text
Carbono       #111311
Concreto      #B8B2A8
Pedra         #776F65
Madeira       #6D4A31
Off-white     #ECE9E2
Verde profundo#263228
Âmbar técnico #C68B4B
```

Adaptar à identidade existente da Proton. Não substituir cores oficiais sem aprovação.

### Tipografia

Combinação recomendada:

- serif editorial para headlines;
- grotesca/suíça para interface e corpo;
- mono discreta para números, coordenadas e dados técnicos.

Exemplos de direção, não obrigação:

```text
Headlines  → Instrument Serif / Fraunces / equivalente premium
Interface  → Geist / Inter / equivalente grotesco
Technical  → Geist Mono / IBM Plex Mono
```

Priorizar licenças adequadas, performance e consistência.

### Movimento

- câmera com sensação de peso;
- easing suave;
- transições longas somente em cenas principais;
- microinterações entre 180 e 350 ms;
- texto revelado por linha ou máscara;
- sem letras voando por toda a página;
- zoom de imagem contido;
- cursor customizado apenas no desktop;
- nenhuma elasticidade exagerada.

---

## 12. Tratamento dos vídeos para web

### Masters

Preservar os arquivos originais em:

```text
/public/media/video/master/
```

Nunca editar diretamente os masters.

### Derivados recomendados

```text
Desktop high:  1920×1080
Desktop mid:   1280×720
Mobile:        720p ou crop específico
Poster:        AVIF/WebP
Fallback:      MP4 H.264
Preferencial:  WebM VP9 ou AV1, após testes de compatibilidade
```

### Regras

- sem áudio por padrão;
- `muted`, `playsInline` e controles coerentes;
- preload somente do poster ou metadata;
- lazy-load próximo da viewport;
- não baixar todos os vídeos na abertura;
- oferecer poster estático;
- testar scrub em Safari/iOS;
- evitar GOP excessivamente longo em vídeos controlados por scroll;
- criar versões com keyframes mais frequentes para seek responsivo;
- comprimir sem destruir detalhes de concreto, vidro, vegetação e sombras.

---

## 13. SEO e preservação de autoridade

### Obrigatório

- inventariar URLs atuais;
- manter URLs quando possível;
- criar redirects 301 para rotas alteradas;
- preservar títulos e descrições valiosas;
- criar canonical correto;
- gerar sitemap e robots;
- implementar Open Graph;
- adicionar schema apropriado para empresa local/profissional;
- manter conteúdo textual fora do canvas;
- não renderizar informações essenciais apenas em vídeo;
- otimizar páginas de serviço individualmente;
- preservar contatos e localização real.

### Conteúdo

O site ultrapremium não pode sacrificar clareza por minimalismo. Serviços, escopos, números e diferenciais devem permanecer legíveis e indexáveis.

---

## 14. Acessibilidade

- HTML semântico;
- navegação por teclado;
- foco visível;
- contraste adequado;
- alt text descritivo;
- legendas ou descrições para vídeos relevantes;
- nenhum texto essencial embutido apenas em imagem;
- botão para pausar animações contínuas;
- reduced motion real;
- áreas clicáveis adequadas em mobile;
- menus e modais com gerenciamento de foco;
- leitura lógica sem JavaScript.

---

## 15. Métricas e qualidade

Metas recomendadas, ajustadas após testes reais:

- LCP rápido com poster estático;
- CLS próximo de zero;
- INP consistente;
- hero interativo antes do download dos vídeos secundários;
- sem scroll jank;
- sem canvas bloqueando a thread principal;
- navegação funcional em Safari, Chrome e Firefox;
- testes em iPhone e Android reais;
- nenhum vazamento de memória ao trocar de rota;
- nenhum vídeo sendo reproduzido fora da viewport sem necessidade.

O objetivo não é alcançar nota artificial sacrificando a experiência, mas manter uma experiência premium com desempenho previsível.

---

## 16. Plano de execução em fases para Claude Code

### Fase 0 — Auditoria e backup

- clonar ou exportar o site atual;
- salvar conteúdo, URLs, assets e SEO;
- criar matriz KEEP/REFINE/MERGE/VERIFY/ARCHIVE;
- confirmar escopo e dados pendentes.

### Fase 1 — Fundação

- criar projeto Next.js;
- configurar TypeScript strict;
- criar tokens;
- definir tipografia;
- configurar lint, format e testes;
- criar estrutura de conteúdo.

### Fase 2 — Site completo sem animação

- implementar todas as seções;
- inserir conteúdo atual;
- garantir responsividade;
- finalizar navegação;
- validar SEO e acessibilidade estrutural.

### Fase 3 — Sistema de movimento

- Lenis;
- GSAP e ScrollTrigger;
- providers e cleanup;
- reduced motion;
- breakpoints e tiers.

### Fase 4 — Hero

- poster;
- scrub de vídeo;
- fallback dia/noite;
- carregamento progressivo;
- teste em Safari/iOS.

### Fase 5 — Case residencial

- capítulos;
- galeria horizontal;
- interior dia/noite;
- ficha técnica;
- microinterações.

### Fase 6 — Construção

- vídeo 4 com timeline;
- vídeo 8 com etapas;
- vídeo 6 no manifesto;
- edição e compressão.

### Fase 7 — Condomínio

- imagem aérea;
- cena de escala;
- contador de 100 unidades;
- dados reais;
- Three.js somente se agregar clareza.

### Fase 8 — Serviços, método, números e equipe

- migrar todo conteúdo;
- melhorar hierarquia;
- criar páginas internas;
- validar CTAs.

### Fase 9 — Performance e acessibilidade

- budgets;
- lazy loading;
- tiers;
- reduced motion;
- teclado;
- leitores de tela;
- dispositivos reais.

### Fase 10 — SEO, analytics e lançamento

- redirects;
- schema;
- sitemap;
- eventos de conversão;
- revisão de conteúdo;
- QA visual;
- checklist de produção.

---

## 17. Critérios de aprovação por seção

Cada seção só deve ser considerada pronta quando:

- comunica uma mensagem clara;
- funciona sem animação;
- funciona no mobile;
- respeita reduced motion;
- não apresenta layout shift;
- não bloqueia a navegação;
- usa conteúdo real;
- possui fallback;
- foi testada em Safari;
- não repete a função narrativa de outra seção.

---

## 18. Constituição do projeto para o Claude Code

Inserir este texto no início das instruções do projeto:

```text
PROJECT CONSTITUTION — PROTON ENGENHARIA

This is an ultra-premium engineering studio website.

The experience must communicate precision, scale, technical authority,
materiality, transparency and execution capacity.

The current Proton website is the source of truth for all existing services,
company data, metrics, contact information, team information and institutional
content. Audit and preserve that information before replacing the existing site.
Do not invent metrics, credentials, project scopes or services.

The website must never resemble:
- a generic construction company template
- a real estate landing page
- a technology startup
- a gaming experience
- an animation showcase
- a collection of unrelated WebGL effects

Every animation must support at least one purpose:
1. explain scale
2. reveal engineering logic
3. demonstrate process
4. establish materiality
5. create spatial immersion
6. guide attention
7. improve narrative continuity

Performance, accessibility, content integrity, SEO preservation and visual
fidelity are non-negotiable.

The complete website must remain understandable, functional and elegant
without WebGL, without smooth scrolling and with reduced motion enabled.

Real construction videos should be prioritized over AI-generated imagery.
AI-generated video must never alter architecture, imply a false project,
misrepresent a service or replace factual documentation.
```

---

## 19. Checklist antes do lançamento

### Conteúdo

- [ ] Todos os serviços do site atual foram migrados.
- [ ] Todos os números foram verificados.
- [ ] Dados dos sócios estão corretos.
- [ ] Contatos e links funcionam.
- [ ] Escopos dos projetos foram confirmados.
- [ ] Nenhum placeholder permanece.
- [ ] Nenhum texto genérico de IA permanece.

### Audiovisual

- [ ] Vídeos reais foram priorizados.
- [ ] Hero não deforma a arquitetura.
- [ ] Posters existem para todos os vídeos.
- [ ] Vídeos possuem versões mobile.
- [ ] Scrub funciona no Safari/iOS.
- [ ] Não há downloads desnecessários no carregamento inicial.
- [ ] Vídeo 9 só aparece se houver contexto real de BIM/tecnologia.

### Técnica

- [ ] Cleanup de GSAP e listeners validado.
- [ ] Three.js pausa fora da viewport.
- [ ] Reduced motion funciona.
- [ ] Tier C possui experiência completa.
- [ ] Navegação por teclado funciona.
- [ ] Redirects do site antigo funcionam.
- [ ] Sitemap, robots e canonical estão corretos.
- [ ] Analytics e conversões estão configurados com consentimento adequado.

### Qualidade visual

- [ ] Tipografia consistente.
- [ ] Paleta alinhada à marca.
- [ ] Animações não competem entre si.
- [ ] Não existem efeitos gratuitos.
- [ ] Mobile não é uma versão mutilada do desktop.
- [ ] Materialidade das fotos foi preservada.

---

## 20. Decisão final de produção

A estratégia audiovisual recomendada é:

```text
1 vídeo gerado para o hero dia/noite
1 vídeo opcional para o condomínio
1 vídeo opcional para o interior, somente se houver orçamento e qualidade
+ vídeos reais 2, 3, 4, 6 e 8 integrados à narrativa
+ imagens arquitetônicas animadas com GSAP/WebGL discreto
```

O diferencial do novo site não será a quantidade de efeitos ou vídeos. Será a combinação de:

- conteúdo real da Proton;
- projetos fortes;
- timelapses autênticos;
- narrativa de engenharia;
- direção editorial;
- movimento controlado;
- excelente performance;
- clareza comercial.

> **A tecnologia deve amplificar a prova. Nunca substituir a prova.**

---

## Fontes de referência do conteúdo institucional

- Site oficial atual: `https://protonsc.com.br`
- Comunicação pública da Proton: serviços ligados a projetos, execução, administração e gerenciamento de obras e Engenharia Caixa.
- Arquivos visuais e vídeos fornecidos para este projeto.

> Observação para implementação: o site atual deve ser auditado diretamente no ambiente do Claude Code antes da migração. Caso alguma página impeça crawling automatizado, realizar captura manual ou exportação do CMS e registrar as informações no inventário de conteúdo.
