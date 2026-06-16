import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/ui/Counter";
import { stats } from "@/lib/content";

/** Números / prova — counters animados (dados reais da Proton). */
export function Stats() {
  return (
    <Section surface="base" className="border-y border-line">
      <Container>
        <Reveal
          stagger
          className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 lg:grid-cols-4"
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
      </Container>
    </Section>
  );
}
