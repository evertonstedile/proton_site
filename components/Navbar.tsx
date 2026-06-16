"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/cn";
import { BrandMark } from "@/components/brand/BrandMark";

const LINKS = [
  { label: "Obras", href: "/obras" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Processo", href: "/processo" },
  { label: "Contato", href: "/contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const lenis = useLenis(({ scroll }) => setScrolled(scroll > 40));

  // trava o scroll quando o menu mobile está aberto
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [open, lenis]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-short ease-cinematic",
          scrolled || open
            ? "border-b border-line bg-bg-base/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
      <nav className="mx-auto flex h-16 max-w-container items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <BrandMark className="h-8 w-8" />
          <span className="font-display text-lg uppercase tracking-[0.2em] text-text-primary">
            Proton
          </span>
        </Link>

        {/* desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-sans text-small text-text-muted transition-colors duration-short hover:text-text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contato"
              className="rounded-full border border-line-gold px-5 py-2 font-sans text-small uppercase tracking-[0.1em] text-gold-light transition-colors duration-short hover:bg-gold-base hover:text-on-gold"
            >
              Orçamento
            </Link>
          </li>
        </ul>

        {/* botão mobile */}
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={cn(
              "h-px w-6 bg-text-primary transition-transform duration-short ease-cinematic",
              open && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-text-primary transition-opacity duration-short",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-text-primary transition-transform duration-short ease-cinematic",
              open && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
        </nav>
      </header>

      {/* overlay mobile — fora do <header> para não herdar o containing block
          criado pelo backdrop-blur (que prendia o fixed à altura da navbar) */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-40 origin-top bg-bg-base transition-all duration-reveal ease-cinematic md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <ul className="flex flex-col gap-2 px-6 py-10">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-4 font-display text-display-lg text-text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="mt-6">
            <Link
              href="/contato"
              onClick={() => setOpen(false)}
              className="inline-flex rounded-full bg-gold-metallic px-8 py-4 font-sans text-small uppercase tracking-[0.12em] text-on-gold"
            >
              Pedir orçamento
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
