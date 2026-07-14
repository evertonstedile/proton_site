"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Cap. C — interior dia→noite por crossfade CSS de opacity dirigida pelo
 * scroll (sem WebGL; câmera estática, nenhum objeto se move — spec mov.04).
 * Reduced-motion / fallback: par lado a lado (informação completa).
 * Sem JS: a foto DIA fica visível (noite em opacity-0 via CSS).
 */
const DIA = {
  src: "/media/img/interior_dia.png",
  alt: "Interior da Wine House de dia — estar integrado à cozinha, pedra e luz natural",
};
const NOITE = {
  src: "/media/img/interior_noite.png",
  alt: "Interior da Wine House à noite — iluminação quente sobre os mesmos materiais",
};

export function InteriorDiaNoite({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const night = ref.current?.querySelector("[data-noite]");
      if (!night) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        night,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 40%",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {/* crossfade (motion) */}
      <figure className="relative aspect-[16/10] overflow-hidden rounded-lg motion-reduce:hidden">
        <Image src={DIA.src} alt={DIA.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
        <div data-noite className="absolute inset-0 opacity-0">
          <Image src={NOITE.src} alt="" aria-hidden fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
        </div>
        <figcaption className="absolute bottom-3 left-3 font-mono text-small text-fg/80">
          Dia → Noite
        </figcaption>
      </figure>

      {/* reduced-motion: par estático, informação completa */}
      <div className="hidden gap-4 motion-reduce:grid sm:motion-reduce:grid-cols-2">
        {[
          { ...DIA, label: "Dia" },
          { ...NOITE, label: "Noite" },
        ].map((img) => (
          <figure key={img.src} className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            <figcaption className="absolute bottom-3 left-3 font-mono text-small text-fg/80">
              {img.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
