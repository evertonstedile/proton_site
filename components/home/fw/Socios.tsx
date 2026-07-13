import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { HOME_FW } from "@/lib/content";
import { LEGAL } from "@/lib/site";

/**
 * Movimento 12 — Sócios (proximidade, não corporativo).
 * DF7: fotos e bios aguardando retorno da Proton — publica SÓ o confirmado
 * (nome + credencial de lib/site.ts). Nada de placeholder em produção.
 */
export function Socios() {
  // credencial CREA por sócio quando existir em responsibleTechs
  const socios = LEGAL.partners.map((p) => {
    const nome = p.replace(/\s*\(.*\)$/, "");
    const rt = LEGAL.responsibleTechs.find((t) => t.startsWith(nome));
    const credencial = rt?.match(/\((.*)\)/)?.[1] ?? p.match(/\((.*)\)/)?.[1];
    return { nome, credencial };
  });

  return (
    <Section surface="base" id="socios">
      <Container>
        <p className="mb-6 font-mono text-small uppercase tracking-kicker text-accent">
          {HOME_FW.socios.kicker}
        </p>
        <h2 className="max-w-2xl font-serif text-display-lg text-fg">
          {HOME_FW.socios.headline}
        </h2>
        <ul className="mt-14 grid gap-10 md:grid-cols-3">
          {socios.map((s) => (
            <li key={s.nome} className="border-t border-line pt-5">
              <h3 className="font-serif text-h2 text-fg">{s.nome}</h3>
              {s.credencial ? (
                <p className="mt-2 font-mono text-small text-concrete">
                  {s.credencial}
                </p>
              ) : null}
              {/* foto + bio: TODO: VALIDAR (DF7) — entram quando confirmadas */}
            </li>
          ))}
        </ul>
        <p className="mt-10 font-mono text-small text-stone">
          Registro CREA-SC {LEGAL.crea}
        </p>
      </Container>
    </Section>
  );
}
