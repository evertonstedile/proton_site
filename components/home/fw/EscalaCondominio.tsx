import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CONDOMINIO_JCR } from "@/lib/condominio";

/**
 * Movimentos 07+08 — Transição de escala + Condomínio JCR (estático, F2).
 * Copy honesta com a fase real (DF8): 46 unidades em aprovação e
 * licenciamento ambiental — prova de capacidade de planejamento/aprovação,
 * NUNCA "em execução". Valor 46 sempre no HTML; count-up entra na Task 9.
 */
export function EscalaCondominio() {
  const c = CONDOMINIO_JCR;
  return (
    <Section surface="base" id="condominio" className="overflow-hidden">
      <Container>
        {/* Mov. 07 — transição de escala */}
        <h2 className="max-w-2xl font-serif text-display-lg text-fg">
          A mesma precisão.{" "}
          <em className="italic">Em outra escala.</em>
        </h2>

        {/* Mov. 08 — aérea + dados reais */}
        <div className="relative mt-12 overflow-hidden rounded-lg">
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={c.imagemAerea}
              alt={`Vista aérea do projeto do ${c.nome} — ${c.unidades} unidades em ${c.local}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <p className="font-mono text-display-xl leading-none text-fg">
              {c.unidades}
            </p>
            <p className="mt-2 font-sans text-body text-concrete">
              unidades projetadas · {c.nome}
            </p>
          </div>
        </div>

        <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
          <div>
            <dt className="font-sans text-small text-stone">Local</dt>
            <dd className="mt-1 font-mono text-small text-fg">{c.local}</dd>
          </div>
          <div>
            <dt className="font-sans text-small text-stone">Fase atual</dt>
            <dd className="mt-1 font-mono text-small text-fg">{c.fase}</dd>
          </div>
          <div>
            <dt className="font-sans text-small text-stone">Previsão</dt>
            <dd className="mt-1 font-mono text-small text-fg">{c.previsao}</dd>
          </div>
        </dl>

        <p className="mt-8 max-w-2xl font-sans text-body text-fg-muted">
          Antes do canteiro, um condomínio exige viabilidade, projeto e
          licenciamento resolvidos. É essa engenharia de aprovação — invisível
          na foto — que a Proton conduz no {c.nome}.
        </p>
      </Container>
    </Section>
  );
}
