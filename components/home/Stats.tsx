import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/ui/Counter";
import { stats } from "@/lib/content";

/** Números / prova — counters animados. VALORES ILUSTRATIVOS (aviso visível). */
export function Stats() {
  return (
    <Section surface="base" className="border-y border-line">
      <Container>
        <Reveal
          stagger
          className="grid grid-cols-1 gap-12 text-center sm:grid-cols-3"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <Counter
                value={s.value}
                suffix={s.suffix}
                className="block font-display text-display-xl text-gold-metallic"
              />
              <p className="mt-3 font-sans text-small uppercase tracking-[0.18em] text-text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>
        <p className="mt-10 text-center font-sans text-small text-text-muted/70">
          * Valores ilustrativos — a confirmar com os dados reais da Proton.
        </p>
      </Container>
    </Section>
  );
}
