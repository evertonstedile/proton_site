import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Peça um orçamento ou agende uma conversa com a Proton Engenharia.",
};

export default function ContatoPage() {
  return (
    <main className="pt-16">
      <PageHeader
        kicker="Contato"
        title="Vamos conversar"
        intro="Conte sobre o seu projeto. Retornamos com os próximos passos do orçamento."
      />

      <Section surface="surface" className="pt-0">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <ContactForm />

            <aside className="flex flex-col gap-8">
              <div>
                <h2 className="font-sans text-small uppercase tracking-[0.18em] text-text-muted">
                  Contato direto
                </h2>
                {/* PLACEHOLDER — dados reais de contato (B2) */}
                <ul className="mt-4 flex flex-col gap-2 font-sans text-body text-text-body">
                  <li>contato@proton.eng.br</li>
                  <li>(00) 00000-0000 · WhatsApp</li>
                  <li>Blumenau/SC</li>
                </ul>
                <p className="mt-3 font-sans text-small text-text-muted/70">
                  * Dados de contato placeholder — confirmar.
                </p>
              </div>

              <div className="rounded-xl border border-line bg-bg-raised p-6">
                <p className="font-display text-h2 text-text-primary">
                  Atendimento de alto padrão
                </p>
                <p className="mt-3 font-sans text-body text-text-muted">
                  Cada projeto começa com uma conversa. Sem compromisso.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </main>
  );
}
