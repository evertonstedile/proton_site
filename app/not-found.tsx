import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

/**
 * 404 no registro Cinematic Dark — conceito "coordenada fora do terreno".
 * Copy sóbria (sem "Oops!"), uma saída clara de volta. Estático, reduced-motion
 * safe. Acento ouro em 1 elemento (a coordenada deslocada).
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-bg px-6 text-center">
      <p className="font-sans text-small uppercase tracking-[0.2em] text-accent">
        00.0000°S · 00.0000°W
      </p>
      <h1 className="mt-6 font-serif text-[clamp(3rem,12vw,8rem)] leading-none text-fg">
        404
      </h1>
      <p className="mt-6 max-w-md font-sans text-body text-fg-muted">
        Esse lote não existe no nosso mapa. A página que você procura foi movida
        ou nunca esteve aqui.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-line px-8 py-4 font-sans text-small uppercase tracking-[0.12em] text-fg transition-colors duration-short ease-proton hover:border-accent hover:text-accent"
      >
        Voltar ao início
      </Link>
    </main>
  );
}
