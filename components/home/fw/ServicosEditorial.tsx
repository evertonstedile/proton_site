import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { serviceGroups, servicesTagline } from "@/lib/content";
import { whatsappUrl } from "@/lib/site";

/**
 * Movimento 09 — Serviços como capítulos editoriais (não cards).
 * Frentes REAIS do catálogo (7 áreas · 33 serviços — lib/content.ts):
 * 4 principais viram capítulos; as demais entram como "complementares".
 * ("Engenharia Caixa" do framework NÃO existe no catálogo — não inventar.)
 * Vídeo 3 (atmosfera) entra como fundo na Task 5.
 */
const PRINCIPAIS = [
  "Projetos de Engenharia e Arquitetura",
  "Regularização e Documentação Imobiliária",
  "Execução e Fiscalização de Obras",
  "Aprovações e Licenciamento",
];

export function ServicosEditorial() {
  const principais = serviceGroups.filter((g) => PRINCIPAIS.includes(g.area));
  const complementares = serviceGroups.filter(
    (g) => !PRINCIPAIS.includes(g.area),
  );

  return (
    <Section surface="surface" id="servicos">
      <Container>
        <p className="mb-6 font-mono text-small uppercase tracking-kicker text-accent">
          Serviços
        </p>
        <SplitReveal as="h2" className="max-w-3xl font-serif text-display-lg text-fg">
          {servicesTagline}
        </SplitReveal>

        <div className="mt-16 space-y-16">
          {principais.map((g, i) => (
            <Reveal
              as="article"
              key={g.area}
              className="grid gap-6 border-t border-line pt-8 lg:grid-cols-12"
            >
              <div className="lg:col-span-5">
                <span className="font-mono text-small text-stone">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-serif text-h2 text-fg">{g.area}</h3>
                <a
                  href={whatsappUrl(
                    `Olá! Quero falar sobre ${g.area.toLowerCase()}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-sans text-small uppercase tracking-kicker text-accent transition-colors duration-short ease-proton hover:text-fg"
                >
                  Falar sobre esta frente →
                </a>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                {g.items.map((item) => (
                  <li key={item.name}>
                    <h4 className="font-sans font-medium text-body text-fg">
                      {item.name}
                    </h4>
                    <p className="mt-1 font-sans text-small text-fg-muted">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* complementares — compactas, mesmo conteúdo real */}
        <Reveal className="mt-16 border-t border-line pt-8">
          <h3 className="font-mono text-small uppercase tracking-kicker text-stone">
            Frentes complementares
          </h3>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {complementares.map((g) => (
              <div key={g.area}>
                <h4 className="font-sans font-medium text-body text-fg">
                  {g.area}
                </h4>
                <p className="mt-1 font-sans text-small text-fg-muted">
                  {g.items.map((i) => i.name).join(" · ")}
                </p>
              </div>
            ))}
          </div>
          <a
            href="/servicos"
            className="mt-8 inline-block font-sans text-small uppercase tracking-kicker text-accent transition-colors duration-short ease-proton hover:text-fg"
          >
            Ver os 33 serviços →
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}
