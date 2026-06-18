import { SITE, LEGAL } from "@/lib/site";
import { getObras } from "@/lib/obras";

/**
 * /llms.txt — índice curado em Markdown para motores de IA (llmstxt.org).
 * Gerado a partir do config + obras, sempre em sincronia com o site.
 */
export const dynamic = "force-static";

export function GET() {
  const obras = getObras()
    .map((o) => `- [${o.title}](${SITE.url}/obras/${o.slug}): ${o.summary}`)
    .join("\n");

  const body = `# ${SITE.name}

> ${SITE.description}

Empresa de engenharia, arquitetura e regularização em Garopaba/SC. Atendimento full-service: do estudo de viabilidade e do projeto à aprovação, execução e entrega. Razão social: ${LEGAL.legalName} — CNPJ ${LEGAL.cnpj}. Registro CREA-SC ${LEGAL.crea}.

## Páginas principais
- [Início](${SITE.url}): visão geral e proposta de valor
- [Obras](${SITE.url}/obras): portfólio de projetos
- [Serviços](${SITE.url}/servicos): catálogo de serviços por frente
- [Sobre](${SITE.url}/sobre): história, valores e atuação
- [Processo](${SITE.url}/processo): etapas de um projeto (viabilidade → entrega)
- [Contato](${SITE.url}/contato): orçamento e atendimento

## Obras
${obras}

## Institucional
- [Política de Privacidade](${SITE.url}/privacidade)
- [Termos de Uso](${SITE.url}/termos)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
