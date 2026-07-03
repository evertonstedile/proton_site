import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

/**
 * Fechamento (passo 8) — clímax editorial antes do Footer. Assinatura tipográfica
 * (serif) com a origem e o registro técnico reais, verbatim [LEI]. Estático,
 * sem motion (é o repouso da narrativa). Acento ouro em 1 elemento (a linha de
 * coordenada/CREA).
 */
export function Fechamento() {
  return (
    <Section surface="base" className="border-t border-line">
      <Container>
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[12ch] font-serif text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.03] text-fg">
            Garopaba,
            <br />
            Santa Catarina
          </h2>

          <div className="flex flex-col gap-6">
            <p className="font-sans text-small uppercase tracking-[0.18em] text-accent">
              28.0323°S · 48.6198°W · CREA-SC 230125-6
            </p>
            <nav
              aria-label="Links legais"
              className="flex gap-6 font-sans text-small text-fg-muted"
            >
              <Link
                href="/privacidade"
                className="transition-colors duration-short ease-proton hover:text-fg"
              >
                Privacidade
              </Link>
              <span aria-hidden="true" className="text-line">
                ·
              </span>
              <Link
                href="/termos"
                className="transition-colors duration-short ease-proton hover:text-fg"
              >
                Termos
              </Link>
            </nav>
          </div>
        </div>
      </Container>
    </Section>
  );
}
