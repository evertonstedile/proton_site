import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { stats } from "@/lib/content";

/**
 * NÚMEROS — passo 6 da narrativa SOTD (prova em números, só depois do desejo).
 * Reskin Jeton nos tokens: contadores em serif, tabular-nums, entrada única e
 * sóbria (stagger com ease do canon — zero circo). Números [LEI] de content.ts,
 * nada inventado. Hover não existe aqui; layout alinhado, premium e quieto.
 */
export function Stats() {
  return (
    <section className="w-full border-y border-line bg-bg px-6 py-30 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-container">
        <div className="mb-14 flex items-center gap-4">
          <span className="font-sans text-sm uppercase tracking-kicker text-accent">
            Em números
          </span>
        </div>
        <Reveal
          stagger
          className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="border-l border-line pl-6">
              <Counter
                value={s.value}
                suffix={s.suffix}
                className="block font-serif text-[clamp(2.4rem,4.5vw,3.4rem)] leading-none tabular-nums text-fg"
              />
              <p className="mt-4 font-sans text-small uppercase tracking-[0.16em] text-fg-muted">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
