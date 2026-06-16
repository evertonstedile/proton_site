import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Button } from "@/components/ui/Button";
import { WorkCard } from "@/components/ui/WorkCard";
import { featuredWorks } from "@/lib/content";

/** Obras em destaque — revelação cinematográfica (placeholder; Fase 4: Supabase). */
export function FeaturedWorks() {
  return (
    <Section surface="surface" id="obras">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-sans text-small uppercase tracking-kicker text-gold-base">
              Portfólio
            </p>
            <SplitReveal
              as="h2"
              className="font-display text-display-lg text-text-primary"
            >
              Obras em destaque
            </SplitReveal>
          </div>
          <Reveal>
            <Button href="/obras" variant="ghost">
              Ver todas as obras
            </Button>
          </Reveal>
        </div>

        <Reveal stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredWorks.map((w) => (
            <WorkCard key={w.title} work={w} />
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
