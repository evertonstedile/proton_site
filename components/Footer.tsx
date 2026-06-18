import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { SITE, LEGAL, whatsappUrl } from "@/lib/site";

const NAV = [
  { label: "Obras", href: "/obras" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Processo", href: "/processo" },
  { label: "Contato", href: "/contato" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-base">
      <div className="mx-auto max-w-container px-6 py-16 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <BrandMark className="h-9 w-9" />
              <span className="font-display text-xl uppercase tracking-[0.2em] text-text-primary">
                Proton
              </span>
            </Link>
            <p className="mt-4 font-sans text-small text-text-muted">
              Engenharia residencial de alto padrão. Precisão técnica e
              sofisticação. {/* PLACEHOLDER copy institucional */}
            </p>
            <div className="mt-4 flex flex-col gap-1.5 font-sans text-small text-text-muted">
              <a
                href={whatsappUrl("Olá! Vim pelo site da Proton.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit transition-colors duration-short hover:text-gold-light"
              >
                WhatsApp →
              </a>
              <Link
                href="/contato#orcamento"
                className="w-fit transition-colors duration-short hover:text-gold-light"
              >
                E-mail →
              </Link>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit transition-colors duration-short hover:text-gold-light"
              >
                Garopaba/SC →
              </a>
              <span>
                {SITE.street} — {SITE.district} · {SITE.postalCode}
              </span>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-sans text-small text-text-muted transition-colors duration-short hover:text-gold-light"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 h-px w-full bg-line" />

        {/* Dados legais (entidade) — exigência da verificação de negócio Meta + LGPD */}
        <div className="mt-8 flex flex-col gap-1.5 font-sans text-small text-text-muted">
          <p>
            <span className="text-text-body">{LEGAL.legalName}</span>
            {" · "}CNPJ {LEGAL.cnpj}
          </p>
          <p>
            Nome fantasia: {LEGAL.tradeName} · {LEGAL.legalNature}
          </p>
          <p>Endereço fiscal (CNPJ): {LEGAL.address.full}</p>
          <a
            href={`mailto:${SITE.email}`}
            className="w-fit transition-colors duration-short hover:text-gold-light"
          >
            {SITE.email}
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-small text-text-muted">
            © {new Date().getFullYear()} {LEGAL.tradeName}.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link
              href="/privacidade"
              className="font-sans text-small text-text-muted transition-colors duration-short hover:text-gold-light"
            >
              Política de Privacidade
            </Link>
            <span className="font-sans text-small text-text-muted">
              Engenharia · Arquitetura · Regularização
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
