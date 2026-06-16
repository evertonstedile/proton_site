import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE, whatsappUrl } from "@/lib/site";

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
                {/* Links reais; número/e-mail vêm de env (placeholder até confirmar) */}
                <ul className="mt-4 flex flex-col gap-3 font-sans text-body text-text-body">
                  <li>
                    <a
                      href={whatsappUrl("Olá! Vim pelo site da Proton.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-short hover:text-gold-light"
                    >
                      WhatsApp →
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="transition-colors duration-short hover:text-gold-light"
                    >
                      {SITE.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={SITE.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-short hover:text-gold-light"
                    >
                      Garopaba/SC — ver no mapa →
                    </a>
                  </li>
                </ul>
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
