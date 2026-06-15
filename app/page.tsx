/**
 * Home — PLACEHOLDER da Fase 1.
 * Serve apenas para validar build, smooth scroll e baseline de performance.
 * Será substituída pela narrativa cinematográfica na Fase 3.
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="font-sans text-small uppercase tracking-kicker text-gold-base">
          Proton OS · Site institucional
        </p>
        <h1 className="mt-6 font-display text-display-xl text-text-primary">
          Proton <span className="text-gold-metallic">Engenharia</span>
        </h1>
        <p className="mt-6 max-w-xl font-sans text-body-lg text-text-muted">
          Fase 1 — fundação técnica. Setup, tokens, fontes e smooth scroll
          validados. Role para testar a fluidez do Lenis.
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center bg-bg-surface px-6">
        <p className="max-w-2xl text-center font-display text-display-lg text-text-primary">
          O meio é a mensagem.
        </p>
      </section>

      <section className="flex min-h-[60vh] items-center justify-center bg-bg-raised px-6">
        <p className="font-sans text-body text-text-muted">
          Baseline de scroll ok. Próximo: design system (/styleguide).
        </p>
      </section>
    </main>
  );
}
