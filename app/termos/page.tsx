import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { SITE, LEGAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos e condições de uso do site da Proton Engenharia & Consultoria: natureza do conteúdo, serviços de engenharia, propriedade intelectual, responsabilidade e foro.",
  alternates: { canonical: "/termos" },
};

/** Última revisão do texto. Atualize ao alterar os termos. */
const LAST_UPDATED = "junho de 2026";

const para = "font-sans text-body text-fg";
const list =
  "grid gap-2 font-sans text-body text-fg list-disc pl-5 marker:text-accent";

const SECTIONS: { title: string; body: ReactNode }[] = [
  {
    title: "1. Aceitação dos Termos",
    body: (
      <p className={para}>
        Estes Termos de Uso regem o acesso e a utilização do site do{" "}
        {LEGAL.tradeName}, nome fantasia de {LEGAL.legalName}, inscrita no CNPJ{" "}
        {LEGAL.cnpj}. Ao navegar pelo site, você declara ter lido e concordado
        com estes Termos. Se não concordar, por favor não utilize o site.
      </p>
    ),
  },
  {
    title: "2. Sobre o site e seu conteúdo",
    body: (
      <>
        <p className={para}>
          Este é um site institucional, de caráter informativo. As informações,
          imagens de obras, descrições de serviços e demais conteúdos têm
          finalidade de apresentação e não constituem, por si só, oferta,
          proposta comercial vinculante ou contrato.
        </p>
        <p className={para}>
          Eventuais orçamentos, estimativas ou condições mencionados em contato
          são preliminares e só se tornam vinculantes mediante proposta e/ou
          contrato formal firmado entre as partes.
        </p>
      </>
    ),
  },
  {
    title: "3. Serviços de engenharia",
    body: (
      <p className={para}>
        Os serviços de engenharia, arquitetura e regularização são prestados nos
        termos de contrato ou proposta específica, que define escopo, prazos,
        valores e responsabilidades de cada projeto. Tais serviços observam as
        normas técnicas aplicáveis e a devida responsabilidade técnica perante
        os órgãos competentes (CREA/CAU), conforme o caso.
      </p>
    ),
  },
  {
    title: "4. Propriedade intelectual",
    body: (
      <p className={para}>
        A marca, o logotipo, os textos, o projeto visual e as imagens das obras
        exibidas neste site são de titularidade do {LEGAL.tradeName} ou de seus
        respectivos autores e são protegidos por lei. É vedada a reprodução,
        cópia, distribuição ou uso comercial sem autorização prévia e por
        escrito.
      </p>
    ),
  },
  {
    title: "5. Uso permitido e condutas vedadas",
    body: (
      <>
        <p className={para}>Ao utilizar o site, você concorda em não:</p>
        <ul className={list}>
          <li>
            Utilizar o conteúdo para fins ilícitos ou que violem direitos de
            terceiros;
          </li>
          <li>
            Tentar acessar áreas restritas, comprometer a segurança ou o
            funcionamento do site;
          </li>
          <li>
            Reproduzir, copiar ou explorar comercialmente o conteúdo sem
            autorização;
          </li>
          <li>
            Inserir dados falsos ou de terceiros sem consentimento ao entrar em
            contato.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Links e conteúdos de terceiros",
    body: (
      <p className={para}>
        O site pode conter links para serviços de terceiros (por exemplo,
        WhatsApp, mapas e redes sociais). Não nos responsabilizamos pelo
        conteúdo, pelas práticas ou pelas políticas desses serviços, que possuem
        termos próprios.
      </p>
    ),
  },
  {
    title: "7. Limitação de responsabilidade",
    body: (
      <p className={para}>
        O site é disponibilizado no estado em que se encontra. Empenhamo-nos em
        manter as informações corretas e atualizadas, mas não garantimos
        disponibilidade ininterrupta nem ausência total de erros. Na máxima
        extensão permitida pela lei, não nos responsabilizamos por danos
        decorrentes do uso ou da indisponibilidade do site.
      </p>
    ),
  },
  {
    title: "8. Proteção de dados pessoais",
    body: (
      <p className={para}>
        O tratamento de dados pessoais coletados por meio do site segue a nossa{" "}
        <Link
          href="/privacidade"
          className="text-accent underline-offset-4 transition-colors duration-short hover:text-accent"
        >
          Política de Privacidade
        </Link>
        , em conformidade com a Lei Geral de Proteção de Dados (LGPD).
      </p>
    ),
  },
  {
    title: "9. Alterações destes Termos",
    body: (
      <p className={para}>
        Podemos atualizar estes Termos periodicamente. A versão vigente estará
        sempre disponível nesta página, com a data da última atualização
        indicada ao final. O uso continuado do site após alterações representa
        concordância com a versão atualizada.
      </p>
    ),
  },
  {
    title: "10. Legislação aplicável e foro",
    body: (
      <p className={para}>
        Estes Termos são regidos pela legislação brasileira. Fica eleito o foro
        da comarca de Florianópolis/SC para dirimir eventuais controvérsias,
        ressalvado, nas relações de consumo, o direito do consumidor de
        demandar no foro de seu domicílio (art. 101 do Código de Defesa do
        Consumidor).
      </p>
    ),
  },
  {
    title: "11. Contato",
    body: (
      <p className={para}>
        Dúvidas sobre estes Termos podem ser encaminhadas pelo e-mail{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="text-accent underline-offset-4 transition-colors duration-short hover:text-accent"
        >
          {SITE.email}
        </a>
        .
      </p>
    ),
  },
];

export default function TermosPage() {
  return (
    <main className="pt-16">
      <PageHeader
        kicker="Legal"
        title="Termos de Uso"
        intro="Condições de uso do site da Proton Engenharia & Consultoria."
      />

      <Section surface="surface" className="pt-0">
        <Container>
          <Reveal stagger className="grid max-w-3xl gap-12">
            {SECTIONS.map((s) => (
              <div key={s.title} className="border-t border-line pt-8">
                <h2 className="font-display text-h2 text-fg">
                  {s.title}
                </h2>
                <div className="mt-4 grid gap-4">{s.body}</div>
              </div>
            ))}
          </Reveal>

          <p className="mt-12 max-w-3xl font-sans text-small text-fg-muted">
            Última atualização: {LAST_UPDATED}.
          </p>
        </Container>
      </Section>
    </main>
  );
}
