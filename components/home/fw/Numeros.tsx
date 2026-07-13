import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HOME_FW, stats } from "@/lib/content";

/**
 * Movimento 11 — Números reais (371 · 119 · 70.400 · 11).
 * Valor final SEMPRE no HTML (SEO/A11y); count-up leve entra na Task 5
 * sem substituir o valor renderizado no servidor.
 */
export function Numeros() {
  return (
    <Section surface="surface" id="numeros">
      <Container>
        <p className="mb-10 font-mono text-small uppercase tracking-kicker text-accent">
          {HOME_FW.numeros.kicker}
        </p>
        <dl className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-t border-line pt-5">
              <dd className="font-mono text-display-lg text-fg">
                {s.value.toLocaleString("pt-BR")}
                {s.suffix}
              </dd>
              <dt className="mt-2 font-sans text-small text-fg-muted">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
