"use client";

import { useEffect, useRef } from "react";
import { prefersReduced } from "@/lib/motion";

/**
 * FilmScroll — o filme-scroll "Da Noite Nasce a Casa" (scroll-film-studio).
 * Uma tomada contínua scrubada no scroll: canvas + frames JPEG pré-extraídos
 * (NUNCA <video currentTime> — seek stutter). Anti-jank: janela deslizante de
 * ImageBitmap (decode off-thread) ao redor do playhead; todo draw é blit GPU.
 * Playhead com lerp; DPR cap 1.5. Contrato dev: ?jump=<y> + window.__ready.
 * Reduced-motion: pôster estático 100vh, sem scrub.
 *
 * DRAFT: 5 de 5 capítulos (301 frames @480p→1280w). Master 1080p re-extrai
 * frames e só muda FRAME_COUNT/SEAM_HEX — o engine não muda.
 */

const FRAME_COUNT = 301;
const FRAME_URL = (i: number) =>
  `/film/frames/f_${String(i + 1).padStart(4, "0")}.jpg`;
const SEAM_HEX = "#3f2d1e"; // cor do frame final (assemble.sh) — handoff p/ conteúdo
const VH_PER_CHAPTER = 170;

const CHAPTERS = [
  { name: "Noite", from: 0 },
  { name: "Hora azul", from: 0.2 },
  { name: "Terreno", from: 0.4 },
  { name: "Estrutura", from: 0.6 },
  { name: "Interior", from: 0.8 },
];

// Beats de copy sobre o filme: envelope in→peak→out em progresso 0..1.
const BEATS = [
  {
    in: -0.1,
    peak: 0,
    out: 0.09,
    align: "center" as const,
    kicker: "Proton Engenharia · Garopaba/SC",
    title: "Da noite\nnasce a casa",
    body: null,
  },
  {
    in: 0.21,
    peak: 0.26,
    out: 0.33,
    align: "left" as const,
    kicker: "O litoral",
    title: "Um litoral que a gente\nconhece de cor",
    body: "Praia da Ferrugem, Garopaba. É aqui que a Proton projeta e constrói.",
  },
  {
    in: 0.42,
    peak: 0.48,
    out: 0.56,
    align: "left" as const,
    kicker: "O começo",
    title: "Todo projeto\ncomeça no terreno",
    body: "Implantação, licenciamento e engenharia antes do primeiro pilar.",
  },
  {
    in: 0.62,
    peak: 0.7,
    out: 0.78,
    align: "left" as const,
    kicker: "A estrutura",
    title: "O que sustenta\nnão aparece",
    body: "Fundação, estrutura e acabamento executados por quem assina o projeto.",
  },
  {
    in: 0.84,
    peak: 0.91,
    out: 0.975,
    align: "left" as const,
    kicker: "A casa",
    title: "A noite, agora,\ntem endereço",
    body: "A obra termina quando a primeira noite dentro dela começa.",
  },
];

const B_AHEAD = 18;
const B_KEEP = 28;

export function FilmScroll() {
  const driverRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLSpanElement>(null);
  const chapterBarRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReduced()) {
      // Sem scrub: pôster já está no DOM (bg do stage); esconde o loader
      // (senão cobre o pôster para sempre), marca pronto e sai.
      if (loaderRef.current) loaderRef.current.style.display = "none";
      (window as unknown as { __ready?: boolean }).__ready = true;
      return;
    }
    const driver = driverRef.current;
    const canvas = canvasRef.current;
    if (!driver || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dead = false;
    const images: (HTMLImageElement | null)[] = Array(FRAME_COUNT).fill(null);
    const bitmaps = new Map<number, ImageBitmap>();
    const decoding = new Set<number>();
    const bmpDecoding = new Set<number>();
    let bmpCenter = -999;
    let loaded = 0;
    let currentFrame = 0;
    let displayed = -1;
    let raf = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    function resize() {
      if (!canvas) return;
      canvas.width = Math.round(innerWidth * dpr);
      canvas.height = Math.round(innerHeight * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      displayed = -1; // força repaint
    }
    resize();
    addEventListener("resize", resize);

    // Pump de frames com concorrência limitada + barra de progresso real.
    let next = 0;
    const CONCURRENCY = 10;
    function pump() {
      if (dead) return;
      while (next < FRAME_COUNT && decoding.size < CONCURRENCY) {
        const i = next++;
        decoding.add(i);
        const img = new Image();
        img.decoding = "async";
        img.onload = img.onerror = () => {
          decoding.delete(i);
          images[i] = img.complete && img.naturalWidth ? img : null;
          loaded++;
          if (barRef.current)
            barRef.current.style.transform = `scaleX(${loaded / FRAME_COUNT})`;
          if (loaded === FRAME_COUNT && loaderRef.current) {
            loaderRef.current.style.opacity = "0";
            loaderRef.current.style.pointerEvents = "none";
            (window as unknown as { __ready?: boolean }).__ready = true;
          }
          if (!dead) pump();
        };
        img.src = FRAME_URL(i);
      }
    }
    // LCP primeiro: o flood de frames (10 conexões) saturava rede lenta e
    // segurava pôster E webfont do h1 (LCP 3.9s no gate Slow-4G). Pump só
    // depois do caminho crítico: pôster decodado + fontes prontas (teto 4s
    // pra nunca atrasar o filme em rede patológica).
    const poster = new Image();
    poster.src = "/film/poster.jpg";
    const fontsReady = Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((r) => setTimeout(r, 4000)),
    ]);
    // window.load também: imagens JS criadas antes do load seguram o evento
    // (e o gate de LCP) — frames nunca entram no caminho crítico da página
    const winLoaded = new Promise<void>((r) => {
      if (document.readyState === "complete") r();
      else addEventListener("load", () => r(), { once: true });
    });
    Promise.all([poster.decode().catch(() => {}), fontsReady, winLoaded]).then(
      pump,
    );

    function nearestFrame(idx: number): number {
      if (images[idx]) return idx;
      for (let d = 1; d < FRAME_COUNT; d++) {
        if (images[idx - d]) return idx - d;
        if (images[idx + d]) return idx + d;
      }
      return -1;
    }

    function ensureBitmaps(center: number) {
      // re-arma também enquanto o frame do playhead não tem bitmap (imagem
      // pode ter carregado DEPOIS da primeira passada — scroll parado)
      if (Math.abs(center - bmpCenter) < 3 && bitmaps.has(center)) return;
      bmpCenter = center;
      const lo = Math.max(0, center - B_AHEAD);
      const hi = Math.min(FRAME_COUNT - 1, center + B_AHEAD);
      for (let i = lo; i <= hi; i++) {
        const img = images[i];
        if (bitmaps.has(i) || bmpDecoding.has(i) || !img) continue;
        bmpDecoding.add(i);
        createImageBitmap(img)
          .then((b) => {
            bmpDecoding.delete(i);
            if (dead || Math.abs(i - bmpCenter) > B_KEEP) {
              b.close();
              return;
            }
            bitmaps.set(i, b);
            if (i === displayed) draw(i, true);
          })
          .catch(() => bmpDecoding.delete(i));
      }
      for (const k of Array.from(bitmaps.keys()))
        if (k < center - B_KEEP || k > center + B_KEEP) {
          bitmaps.get(k)?.close();
          bitmaps.delete(k);
        }
    }

    function draw(idx: number, force = false) {
      if (!canvas || !ctx) return;
      if (idx === displayed && !force) return;
      const bmp = bitmaps.get(idx);
      const nearest = bmp ? idx : nearestFrame(idx);
      const src: ImageBitmap | HTMLImageElement | null =
        bmp ?? images[nearest] ?? null;
      if (!src) return;
      // registra o frame REALMENTE pintado: se foi um fallback vizinho, o tick
      // continua chamando draw até o frame verdadeiro existir (anti-freeze)
      displayed = bmp ? idx : nearest;
      // cover-fit
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = src.width;
      const ih = src.height;
      const s = Math.max(cw / iw, ch / ih);
      const w = iw * s;
      const h = ih * s;
      ctx.drawImage(src, (cw - w) / 2, (ch - h) / 2, w, h);
    }

    function beatAlpha(b: (typeof BEATS)[number], p: number) {
      if (p < b.in || p > b.out) return 0;
      if (p < b.peak) return (p - b.in) / Math.max(1e-4, b.peak - b.in);
      if (b.out > 1.5) return 1;
      return 1 - (p - b.peak) / Math.max(1e-4, b.out - b.peak);
    }

    function tick() {
      if (dead) return;
      const r = driver!.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -r.top / (r.height - innerHeight)));
      const target = p * (FRAME_COUNT - 1);
      currentFrame += (target - currentFrame) * 0.14;
      if (Math.abs(target - currentFrame) < 0.05) currentFrame = target;
      const idx = Math.round(currentFrame);
      ensureBitmaps(idx);
      draw(idx);

      // capítulo + progresso
      let ci = 0;
      for (let i = 0; i < CHAPTERS.length; i++) if (p >= CHAPTERS[i].from) ci = i;
      if (chapterRef.current && chapterRef.current.textContent !== CHAPTERS[ci].name)
        chapterRef.current.textContent = CHAPTERS[ci].name;
      if (chapterBarRef.current)
        chapterBarRef.current.style.transform = `scaleX(${p})`;

      // beats — beat central compõe o offset com o -50% do centering: inline
      // transform substitui a classe, e "pular" o h1 na hidratação re-candidata
      // o texto no LCP (~3.5s no gate mobile) além do glitch visual
      BEATS.forEach((b, i) => {
        const el = beatRefs.current[i];
        if (!el) return;
        const a = beatAlpha(b, p);
        const dy = (1 - a) * 24;
        el.style.opacity = String(a);
        el.style.transform =
          b.align === "center"
            ? `translateY(calc(-50% + ${dy}px))`
            : `translateY(${dy}px)`;
        el.style.visibility = a <= 0.001 ? "hidden" : "visible";
      });

      // handoff: fade p/ seam + grain some nos últimos 8%
      const ramp = Math.max(0, Math.min(1, (p - 0.92) / 0.08));
      if (fadeRef.current) fadeRef.current.style.opacity = String(ramp);

      // sonda de verificação (harness lê window.__film)
      (window as unknown as { __film?: object }).__film = {
        p: +p.toFixed(3),
        target: Math.round(target),
        current: +currentFrame.toFixed(1),
        displayed,
        loaded,
        bitmaps: bitmaps.size,
      };

      raf = requestAnimationFrame(tick);
    }

    // Contrato dev: ?jump=<y> aterrissa pré-scrollado com estado assentado.
    // scrollTo dentro de rAF: depois do layout e da restauração do Next.
    const jump = new URLSearchParams(location.search).get("jump");
    if (jump !== null) {
      history.scrollRestoration = "manual";
      requestAnimationFrame(() => {
        scrollTo(0, +jump || 0);
        const r = driver.getBoundingClientRect();
        const p = Math.max(0, Math.min(1, -r.top / (r.height - innerHeight)));
        currentFrame = p * (FRAME_COUNT - 1);
        raf = requestAnimationFrame(tick);
      });
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      for (const b of bitmaps.values()) b.close();
      bitmaps.clear();
    };
  }, []);

  return (
    <section
      ref={driverRef}
      aria-label="Filme de abertura — da noite nasce a casa"
      style={{ height: `${CHAPTERS.length * VH_PER_CHAPTER}vh` }}
      className="relative motion-reduce:!h-screen"
    >
      {/* React 19 iça o <link> pro <head>: pôster (LCP) parte na frente do
          bundle/fontes na fila de rede — decisivo no gate Slow-4G */}
      <link
        rel="preload"
        as="image"
        href="/film/poster.jpg"
        fetchPriority="high"
      />
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#111311]"
      >
        {/* pôster como <img> real (não bg): entry de LCP dispara no load da
            imagem mesmo sob a cortina do intro — texto só conta no reveal
            (lição D13 do hero antigo: LCP = imagem) */}
        <img
          data-film-poster
          src="/film/poster.jpg"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* vinheta + grain sutil */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* scrim de topo — navbar legível sobre céus claros (caps 3–5);
            determinístico > toggle por luminância (sem flicker de identidade) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[16vh]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,11,10,0.55), transparent)",
          }}
        />

        {/* beats de copy — beat 0 é o h1 da página (a11y/SEO), demais h2 */}
        {BEATS.map((b, i) => {
          const Title = i === 0 ? "h1" : "h2";
          return (
          <div
            key={i}
            ref={(el) => {
              beatRefs.current[i] = el;
            }}
            className={`pointer-events-none absolute inset-x-0 px-6 md:px-16 ${
              b.align === "center"
                ? "top-1/2 -translate-y-1/2 text-center"
                : "bottom-[18vh] max-w-2xl text-left"
            }`}
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <p
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#C68B4B]"
              style={{
                // halo denso: texto fino âmbar precisa sobreviver ao trilho
                // prateado da lua (frame 1) — camadas curtas > uma difusa
                textShadow:
                  "0 0 6px rgba(0,0,0,0.95), 0 0 14px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,1)",
              }}
            >
              {b.kicker}
            </p>
            <Title
              // @ts-expect-error — elementtiming: Element Timing API (diagnóstico de paint/LCP)
              elementtiming={i === 0 ? "beat-h1" : undefined}
              className={`mt-4 whitespace-pre-line font-serif text-white ${
                b.align === "center"
                  ? "text-5xl leading-[1.05] md:text-8xl"
                  : "text-3xl leading-[1.1] md:text-5xl"
              }`}
              style={{
                textShadow:
                  "0 2px 6px rgba(0,0,0,0.7), 0 4px 32px rgba(0,0,0,0.5)",
              }}
            >
              {b.title}
            </Title>
            {b.body && (
              <p
                className="mt-4 max-w-md text-sm leading-relaxed text-white/70 md:text-base"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
              >
                {b.body}
              </p>
            )}
          </div>
          );
        })}

        {/* leitura de capítulo + progresso */}
        <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex items-center gap-4 md:left-16 md:right-16">
          <span
            ref={chapterRef}
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/60"
          >
            Noite
          </span>
          <div className="h-px flex-1 bg-white/15">
            <div
              ref={chapterBarRef}
              className="h-px origin-left bg-[#C68B4B]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>

        {/* handoff p/ conteúdo — cor do seam medida no frame final */}
        <div
          ref={fadeRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh]"
          style={{
            opacity: 0,
            background: `linear-gradient(to bottom, transparent, ${SEAM_HEX})`,
          }}
        />

        {/* loader — barra discreta SOBRE o pôster, nunca um painel opaco:
            pôster+h1 pintam no 1º paint (LCP) e em rede lenta o visitante vê
            o hero imediatamente enquanto os frames chegam por trás */}
        <div
          ref={loaderRef}
          className="pointer-events-none absolute inset-x-0 bottom-14 z-10 flex flex-col items-center gap-3 transition-opacity duration-700"
        >
          <p
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
          >
            Carregando o filme
          </p>
          <div className="h-px w-40 bg-white/15">
            <div
              ref={barRef}
              className="h-px origin-left bg-[#C68B4B]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
