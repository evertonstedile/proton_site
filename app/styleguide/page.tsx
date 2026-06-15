import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Input } from "@/components/ui/Input";
import { WorkCard, type Work } from "@/components/ui/WorkCard";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Parallax } from "@/components/motion/Parallax";
import { AtomicOrbit } from "@/components/brand/AtomicOrbit";
import { GoddessLinework } from "@/components/brand/GoddessLinework";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

/* ----------------------------------------------------------------- dados */

const colorGroups: {
  group: string;
  tokens: { name: string; value: string; className: string; border?: boolean }[];
}[] = [
  {
    group: "Fundo",
    tokens: [
      { name: "bg/base", value: "#000000", className: "bg-bg-base", border: true },
      { name: "bg/surface", value: "#0C0C0D", className: "bg-bg-surface" },
      { name: "bg/raised", value: "#141416", className: "bg-bg-raised" },
      { name: "bg/elevated", value: "#1C1C1F", className: "bg-bg-elevated" },
    ],
  },
  {
    group: "Texto",
    tokens: [
      { name: "text/primary", value: "#FFFFFF", className: "bg-text-primary" },
      { name: "text/body", value: "#F4F3F1", className: "bg-text-body" },
      {
        name: "text/muted",
        value: "rgba(255,255,255,.60)",
        className: "bg-text-muted",
      },
    ],
  },
  {
    group: "Dourado",
    tokens: [
      { name: "gold/light", value: "#E7CE8C", className: "bg-gold-light" },
      { name: "gold/base", value: "#C8A24C", className: "bg-gold-base" },
      { name: "gold/deep", value: "#9C7A2E", className: "bg-gold-deep" },
      { name: "on-gold", value: "#2A1D05", className: "bg-on-gold", border: true },
    ],
  },
  {
    group: "Linhas",
    tokens: [
      {
        name: "line",
        value: "rgba(255,255,255,.10)",
        className: "bg-line",
        border: true,
      },
      {
        name: "line/gold",
        value: "rgba(200,162,76,.30)",
        className: "bg-line-gold",
        border: true,
      },
    ],
  },
];

const typeScale: {
  token: string;
  className: string;
  family: string;
  sample: string;
}[] = [
  {
    token: "display-xl",
    className: "font-display text-display-xl text-text-primary",
    family: "Necmato",
    sample: "Proton Engenharia",
  },
  {
    token: "display-lg",
    className: "font-display text-display-lg text-text-primary",
    family: "Necmato",
    sample: "O meio é a mensagem",
  },
  {
    token: "h2",
    className: "font-display text-h2 text-text-primary",
    family: "Necmato",
    sample: "Precisão e sofisticação",
  },
  {
    token: "body-lg",
    className: "font-sans text-body-lg text-text-body",
    family: "Montserrat",
    sample: "Engenharia residencial de alto padrão, do projeto à entrega.",
  },
  {
    token: "body",
    className: "font-sans text-body text-text-body",
    family: "Montserrat",
    sample: "Corpo de texto padrão em off-white para reduzir o glare.",
  },
  {
    token: "small",
    className: "font-sans text-small text-text-muted",
    family: "Montserrat",
    sample: "Texto secundário / legendas / labels.",
  },
];

const spacing = ["4", "8", "12", "16", "24", "32", "48", "64", "96", "128"];

const demoWorks: Work[] = [
  { title: "Obra 01", meta: "Residencial · 000 m² · Local/SC — placeholder" },
  { title: "Obra 02", meta: "Reforma · 000 m² · Local/SC — placeholder" },
  { title: "Obra 03", meta: "Residencial · 000 m² · Local/SC — placeholder" },
];

/* ------------------------------------------------------------- helpers */

function H2({ children }: { children: React.ReactNode }) {
  return (
    <SplitReveal as="h2" className="font-display text-display-lg text-text-primary">
      {children as string}
    </SplitReveal>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-sans text-small uppercase tracking-kicker text-gold-base">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------- página */

export default function StyleguidePage() {
  return (
    <main className="pt-16">
      {/* HERO */}
      <Section surface="base" className="relative overflow-hidden">
        <GoddessLinework className="pointer-events-none absolute -right-10 top-0 h-[120%] opacity-[0.05]" />
        <Container>
          <Kicker>Proton · Design System</Kicker>
          <h1 className="font-display text-display-xl text-text-primary">
            Styleguide
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-body-lg text-text-muted">
            Fundação de taste — todos os tokens e componentes base herdam daqui.
            Fonte de verdade: <code className="text-gold-light">design-system.md</code>.
          </p>
        </Container>
      </Section>

      {/* CORES */}
      <Section surface="surface">
        <Container>
          <Kicker>01 · Cor</Kicker>
          <H2>Paleta &amp; tokens</H2>
          <p className="mt-4 max-w-2xl font-sans text-body text-text-muted">
            A marca dá 3 cores; o site usa uma escala. Dourado é acento, nunca
            corpo de texto.
            <span className="text-gold-light">
              {" "}
              ⚠ Dourado é aproximação até amostrar o hex do logo (ver PENDENCIAS).
            </span>
          </p>

          <div className="mt-10 space-y-10">
            {colorGroups.map((g) => (
              <div key={g.group}>
                <h3 className="mb-4 font-sans text-small uppercase tracking-[0.18em] text-text-muted">
                  {g.group}
                </h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {g.tokens.map((t) => (
                    <div key={t.name}>
                      <div
                        className={`h-20 w-full rounded-lg ${t.className} ${
                          t.border ? "border border-line" : ""
                        }`}
                      />
                      <p className="mt-2 font-sans text-small text-text-primary">
                        {t.name}
                      </p>
                      <p className="font-sans text-[0.7rem] text-text-muted">
                        {t.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* dourado metálico */}
            <div>
              <h3 className="mb-4 font-sans text-small uppercase tracking-[0.18em] text-text-muted">
                Dourado metálico (momentos grandes)
              </h3>
              <div className="h-24 w-full rounded-lg bg-gold-metallic" />
              <p className="mt-2 font-sans text-[0.7rem] text-text-muted">
                linear-gradient(135deg, #E7CE8C, #C8A24C 45%, #9C7A2E)
              </p>
              <p className="mt-4 font-display text-display-lg text-gold-metallic">
                Texto em dourado metálico
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* TIPOGRAFIA */}
      <Section surface="base">
        <Container>
          <Kicker>02 · Tipografia</Kicker>
          <H2>Necmato &amp; Montserrat</H2>
          <p className="mt-4 max-w-2xl font-sans text-body text-text-muted">
            Necmato (display, peso único Regular) carrega o luxo nos títulos —
            hierarquia por tamanho/tracking/cor, nunca por peso. Montserrat na
            UI/corpo.
          </p>

          <div className="mt-10 divide-y divide-line">
            {typeScale.map((t) => (
              <div
                key={t.token}
                className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-8"
              >
                <div className="w-40 shrink-0">
                  <p className="font-sans text-small text-gold-light">{t.token}</p>
                  <p className="font-sans text-[0.7rem] text-text-muted">
                    {t.family}
                  </p>
                </div>
                <p className={t.className}>{t.sample}</p>
              </div>
            ))}
            <div className="flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-8">
              <div className="w-40 shrink-0">
                <p className="font-sans text-small text-gold-light">kicker</p>
                <p className="font-sans text-[0.7rem] text-text-muted">
                  Montserrat · caixa-alta
                </p>
              </div>
              <p className="font-sans text-small uppercase tracking-kicker text-gold-base">
                Engenharia de alto padrão
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ESPAÇO */}
      <Section surface="surface">
        <Container>
          <Kicker>03 · Espaço &amp; grid</Kicker>
          <H2>Escala 4 / 8</H2>
          <div className="mt-10 space-y-3">
            {spacing.map((s) => (
              <div key={s} className="flex items-center gap-4">
                <span className="w-12 font-sans text-small text-text-muted">
                  {s}
                </span>
                <div
                  className="h-4 bg-gold-base"
                  style={{ width: `${parseInt(s, 10) * 0.25}rem` }}
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* MOTION */}
      <Section surface="base">
        <Container>
          <Kicker>04 · Motion</Kicker>
          <H2>Primitivos reutilizáveis</H2>
          <p className="mt-4 max-w-2xl font-sans text-body text-text-muted">
            ease/cinematic <code className="text-gold-light">cubic-bezier(0.22,1,0.36,1)</code> ·
            dur/reveal 0.9s · stagger 0.08s. Tudo respeita prefers-reduced-motion.
          </p>

          <div className="mt-12 grid gap-12">
            <div>
              <p className="mb-4 font-sans text-small text-gold-light">
                Reveal (fade + translateY)
              </p>
              <Reveal stagger className="grid gap-4 sm:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="rounded-lg border border-line bg-bg-raised p-6 font-sans text-body text-text-body"
                  >
                    Bloco {n}
                  </div>
                ))}
              </Reveal>
            </div>

            <div>
              <p className="mb-4 font-sans text-small text-gold-light">
                SplitReveal (por linha)
              </p>
              <SplitReveal
                as="p"
                className="max-w-3xl font-display text-display-lg text-text-primary"
              >
                Cada linha deste título revela em sequência, com máscara e ease
                cinematográfico, conforme entra na viewport.
              </SplitReveal>
            </div>

            <div>
              <p className="mb-4 font-sans text-small text-gold-light">
                Parallax (scrub)
              </p>
              <div className="relative h-48 overflow-hidden rounded-lg border border-line bg-bg-surface">
                <Parallax speed={20} className="absolute inset-0">
                  <div className="flex h-[140%] items-center justify-center bg-[radial-gradient(circle_at_50%_30%,#1c1c1f,#000)]">
                    <span className="font-display text-h2 text-text-muted">
                      Camada em parallax
                    </span>
                  </div>
                </Parallax>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* COMPONENTES */}
      <Section surface="surface">
        <Container>
          <Kicker>05 · Componentes</Kicker>
          <H2>Base</H2>

          {/* Botões */}
          <div className="mt-10">
            <h3 className="mb-4 font-sans text-small uppercase tracking-[0.18em] text-text-muted">
              Botões
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Pedir orçamento</Button>
              <Button variant="primary" size="lg">
                Pedir orçamento
              </Button>
              <Button variant="ghost">Ver obras</Button>
              <Button variant="ghost" size="lg">
                Ver obras
              </Button>
              <Button variant="primary" disabled>
                Desabilitado
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-12">
            <h3 className="mb-4 font-sans text-small uppercase tracking-[0.18em] text-text-muted">
              Tags / badges
            </h3>
            <div className="flex flex-wrap gap-3">
              <Tag variant="gold">Residencial</Tag>
              <Tag variant="gold">Alto padrão</Tag>
              <Tag variant="muted">Reforma</Tag>
              <Tag variant="muted">420 m²</Tag>
            </div>
          </div>

          {/* Inputs */}
          <div className="mt-12 max-w-xl">
            <h3 className="mb-4 font-sans text-small uppercase tracking-[0.18em] text-text-muted">
              Inputs
            </h3>
            <div className="space-y-5">
              <Input label="Nome" placeholder="Seu nome" />
              <Input label="E-mail" type="email" placeholder="voce@email.com" />
              <Input
                label="Mensagem"
                multiline
                placeholder="Conte sobre o seu projeto…"
                hint="Foco dourado, fundo bg/raised, borda por token."
              />
            </div>
          </div>

          {/* Cards de obra */}
          <div className="mt-12">
            <h3 className="mb-4 font-sans text-small uppercase tracking-[0.18em] text-text-muted">
              Card de obra (placeholders — sem fotos reais)
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {demoWorks.map((w) => (
                <WorkCard key={w.title} work={w} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* MARCA */}
      <Section surface="base">
        <Container>
          <Kicker>06 · Assinatura de marca</Kicker>
          <H2>Órbita &amp; linework</H2>
          <div className="mt-10 grid gap-12 md:grid-cols-2">
            <div>
              <p className="mb-6 font-sans text-small text-gold-light">
                Órbita atômica (estática / animada)
              </p>
              <div className="flex items-center gap-10">
                <AtomicOrbit className="h-24 w-24" />
                <AtomicOrbit className="h-24 w-24" animated />
              </div>
            </div>
            <div>
              <p className="mb-6 font-sans text-small text-gold-light">
                Linework da deusa — watermark{" "}
                <span className="text-text-muted">(PLACEHOLDER)</span>
              </p>
              <div className="relative h-64 overflow-hidden rounded-lg border border-line bg-bg-surface">
                <GoddessLinework className="absolute left-1/2 top-1/2 h-[130%] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CHROME */}
      <Section surface="surface">
        <Container>
          <Kicker>07 · Chrome global</Kicker>
          <H2>Navbar &amp; footer</H2>
          <p className="mt-4 max-w-2xl font-sans text-body text-text-muted">
            A navbar (transparente → sólida no scroll, com menu mobile) está fixa
            no topo desta página. O footer está ao final. Ambos montados sobre
            tokens.
          </p>
        </Container>
      </Section>
    </main>
  );
}
