"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type React from "react";
import { createScrollProgress } from "@/lib/scroll-progress";
import { prefersReduced } from "@/lib/motion";
import { DistortImage } from "@/components/fx/DistortImage";
import { getObras } from "@/lib/obras";

/**
 * OBRAS — passo "prova" da narrativa SOTD. Abre com um bloco de vídeo SCRUBBED
 * pelo scroll (video.currentTime = progress*duration, aplicado em rAF com damp
 * — NUNCA seek direto no onUpdate do ScrollTrigger, que travaria o decode) e
 * segue com um grid ASSIMÉTRICO das 6 obras (fonte única: getObras), cada uma
 * com distortion sutil no hover (DistortImage) → /obras/[slug].
 *
 * Copy honesta: "Visualização técnica" (renders). Zero dado inventado.
 * Registro: acento ouro ≤2 (kicker + 1 nome), hover não reflowa layout.
 * Fallback: reduced-motion / sem scroll suave → vídeo mostra o poster (frame
 * inicial) parado; grid vira <Image> puro dentro do próprio DistortImage.
 */

// Bloco de vídeo scrubbed pelo scroll.
function ScrubBlock() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Carrega o vídeo (3MB) só quando o bloco se APROXIMA da viewport — mantê-lo
  // fora do caminho crítico protege o LCP do hero (Slow 4G): o poster segura o
  // layout até lá. IO com margem generosa: fonte pronta bem antes do scrub.
  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video || video.src) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          video.preload = "auto";
          video.src = "/obras/scrub.mp4";
          video.load();
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;
    if (prefersReduced()) return; // vídeo fica no frame 0 (poster), sem scrub

    const sp = createScrollProgress(wrap, { start: "top bottom", end: "bottom top" });
    let raf = 0;
    let ready = false;
    const onMeta = () => (ready = true);
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) ready = true;

    let current = 0;
    const tick = () => {
      if (ready && video.duration) {
        const target = sp.progress * video.duration;
        // damp: aproxima o currentTime do alvo sem seeks bruscos por frame
        current += (target - current) * 0.12;
        if (Math.abs(target - current) < 0.001) current = target;
        // só seta se mudou o suficiente (evita reseek no mesmo frame)
        if (Math.abs(video.currentTime - current) > 0.01) {
          video.currentTime = current;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onMeta);
      sp.kill();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-line bg-bg-2">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster="/hero/hero-noite.jpg"
        muted
        playsInline
        preload="none"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
    </div>
  );
}

// Grid assimétrico: 6 obras em 12 colunas. A primeira ocupa mais largura/altura
// (peso intencional), o resto se acomoda — assimetria do registro SOTD.
const SPAN = [
  "lg:col-span-7 aspect-[16/10]",
  "lg:col-span-5 aspect-[4/5]",
  "lg:col-span-5 aspect-[4/5]",
  "lg:col-span-7 aspect-[16/10]",
  "lg:col-span-6 aspect-[16/11]",
  "lg:col-span-6 aspect-[16/11]",
];

// Seção fica na viewport? Só então liga o custo interativo (GSAP do scrub +
// listeners de distortion). Fica DESLIGADO no 1º paint p/ não competir com o
// LCP do hero na CPU throttled (Slow 4G / 4x CPU). Margem generosa: pronto antes.
function useNearViewport(ref: React.RefObject<HTMLElement | null>) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "200% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, near]);
  return near;
}

export function ObrasShowcase() {
  const obras = getObras();
  const rootRef = useRef<HTMLElement>(null);
  const near = useNearViewport(rootRef);
  return (
    <section
      ref={rootRef}
      id="obras"
      className="relative w-full overflow-hidden bg-bg px-6 py-30 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-container">
        <div className="mb-4 flex items-center gap-4">
          <span className="font-sans text-sm uppercase tracking-kicker text-accent">
            A prova
          </span>
        </div>
        <h2 className="max-w-3xl font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.15] text-fg">
          O projeto antes da obra — e a obra à altura do projeto.
        </h2>

        <div className="mt-14 aspect-[16/9] w-full">{near && <ScrubBlock />}</div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {obras.map((o, i) => (
            <Link
              key={o.slug}
              href={`/obras/${o.slug}`}
              className={`group relative block overflow-hidden rounded-3xl border border-line bg-bg-2 outline-none transition-colors duration-short ease-proton hover:border-accent focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent ${SPAN[i] ?? "lg:col-span-6 aspect-[16/11]"}`}
            >
              <DistortImage
                src={o.cover}
                alt={`${o.title} — ${o.kind}`}
                sizes="(max-width: 1024px) 100vw, 50vw"
                interactive={near}
                className="absolute inset-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-h2 text-fg">{o.title}</h3>
                <p className="mt-1 font-sans text-small text-fg-muted">
                  {o.category} · {o.kind}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ObrasShowcase;
