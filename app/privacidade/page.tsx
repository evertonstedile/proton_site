import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { SITE, LEGAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Proton trata seus dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD): dados coletados, finalidade, base legal, retenção e direitos do titular.",
  alternates: { canonical: "/privacidade" },
};

/** Última revisão do texto. Atualize ao alterar a política. */
const LAST_UPDATED = "junho de 2026";

const para = "font-sans text-body text-fg";
const list =
  "grid gap-2 font-sans text-body text-fg list-disc pl-5 marker:text-accent";

const SECTIONS: { title: string; body: ReactNode }[] = [
  {
    title: "1. Controlador dos dados",
    body: (
      <>
        <p className={para}>
          O {LEGAL.tradeName} é nome fantasia de {LEGAL.legalName}, inscrita no
          CNPJ {LEGAL.cnpj} ({LEGAL.legalNature}), com endereço fiscal em{" "}
          {LEGAL.address.full}. A empresa é a controladora dos dados pessoais
          tratados por meio deste site, nos termos da Lei nº 13.709/2018 (Lei
          Geral de Proteção de Dados — LGPD).
        </p>
      </>
    ),
  },
  {
    title: "2. Dados que coletamos",
    body: (
      <>
        <p className={para}>
          Coletamos apenas os dados que você nos fornece voluntariamente ao
          entrar em contato:
        </p>
        <ul className={list}>
          <li>Nome;</li>
          <li>E-mail;</li>
          <li>Telefone e/ou número de WhatsApp;</li>
          <li>
            Conteúdo das mensagens enviadas (por formulário, e-mail ou
            WhatsApp).
          </li>
        </ul>
        <p className={para}>
          Também podemos coletar dados de navegação anônimos e agregados
          (estatísticas de acesso) para entender o uso do site, sem identificar
          você individualmente.
        </p>
      </>
    ),
  },
  {
    title: "3. Finalidade do tratamento",
    body: (
      <ul className={list}>
        <li>Responder a solicitações de contato e de orçamento;</li>
        <li>
          Dar andamento a propostas e a serviços de engenharia, arquitetura e
          regularização;
        </li>
        <li>
          Comunicar sobre o andamento de projetos e serviços contratados;
        </li>
        <li>Cumprir obrigações legais e regulatórias.</li>
      </ul>
    ),
  },
  {
    title: "4. Base legal",
    body: (
      <>
        <p className={para}>
          O tratamento se apoia nas seguintes bases legais previstas no art. 7º
          da LGPD:
        </p>
        <ul className={list}>
          <li>Consentimento do titular, ao iniciar o contato;</li>
          <li>
            Execução de contrato ou de procedimentos preliminares relacionados
            a contrato, a pedido do titular;
          </li>
          <li>Cumprimento de obrigação legal ou regulatória;</li>
          <li>
            Legítimo interesse, para atendimento e melhoria dos nossos serviços,
            sempre respeitando os direitos do titular.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Compartilhamento",
    body: (
      <>
        <p className={para}>Não vendemos seus dados. Podemos compartilhá-los apenas com:</p>
        <ul className={list}>
          <li>
            Provedores que viabilizam nosso atendimento e operação — como
            plataformas de mensageria (WhatsApp / Meta Platforms), e-mail e
            hospedagem do site —, na qualidade de operadores;
          </li>
          <li>Autoridades públicas, quando exigido por lei ou ordem judicial.</li>
        </ul>
        <p className={para}>
          Ao nos contatar pelo WhatsApp, o tratamento da mensagem também se
          sujeita às políticas da Meta Platforms, Inc.
        </p>
      </>
    ),
  },
  {
    title: "6. Retenção",
    body: (
      <p className={para}>
        Mantemos seus dados pelo tempo necessário às finalidades acima e ao
        cumprimento de obrigações legais. Encerrada a finalidade, os dados são
        eliminados ou anonimizados, salvo nas hipóteses de guarda obrigatória
        previstas em lei.
      </p>
    ),
  },
  {
    title: "7. Direitos do titular",
    body: (
      <>
        <p className={para}>
          Nos termos do art. 18 da LGPD, você pode, a qualquer momento:
        </p>
        <ul className={list}>
          <li>Confirmar a existência de tratamento;</li>
          <li>Acessar seus dados;</li>
          <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
          <li>
            Solicitar a anonimização, o bloqueio ou a eliminação de dados
            desnecessários ou tratados em desconformidade com a lei;
          </li>
          <li>Solicitar a portabilidade dos dados;</li>
          <li>
            Revogar o consentimento e solicitar a eliminação dos dados tratados
            com base nele;
          </li>
          <li>
            Obter informação sobre as entidades com as quais compartilhamos seus
            dados.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "8. Segurança",
    body: (
      <p className={para}>
        Adotamos medidas técnicas e administrativas razoáveis para proteger seus
        dados contra acessos não autorizados e situações de destruição, perda,
        alteração ou difusão indevidas.
      </p>
    ),
  },
  {
    title: "9. Cookies e estatísticas de acesso",
    body: (
      <p className={para}>
        Cookies essenciais garantem o funcionamento do site e são sempre
        ativos. Cookies e tecnologias de análise e marketing só são ativados
        mediante o seu consentimento, coletado por meio de um aviso exibido no
        primeiro acesso, no qual você pode aceitar ou recusar com a mesma
        facilidade. Você pode rever sua escolha a qualquer momento limpando os
        cookies e o armazenamento do navegador, sem prejuízo da navegação.
      </p>
    ),
  },
  {
    title: "10. Contato e exercício de direitos",
    body: (
      <p className={para}>
        Para exercer seus direitos ou esclarecer dúvidas sobre esta Política,
        fale com o controlador pelo e-mail{" "}
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
  {
    title: "11. Alterações desta Política",
    body: (
      <p className={para}>
        Podemos atualizar esta Política periodicamente. A versão vigente estará
        sempre disponível nesta página, com a data da última atualização
        indicada ao final.
      </p>
    ),
  },
];

export default function PrivacidadePage() {
  return (
    <main className="pt-16">
      <PageHeader
        kicker="Legal"
        title="Política de Privacidade"
        intro="Como tratamos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD)."
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
