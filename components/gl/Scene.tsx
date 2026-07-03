"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReduced } from "@/lib/motion";

// Wrapper R3F do motor de experiência (Task 2 SOTD). Contrato:
// - poster: fallback (reduced-motion, sem WebGL2, webglcontextlost) e conteúdo
//   enquanto o chunk do Canvas carrega (ssr:false).
// - eager: monta o Canvas já; default = monta ao entrar na viewport (IO) p/ não
//   pagar GPU fora de tela.
// - pauseOffscreen (default true): IO fica VIVO mesmo com eager e alterna o
//   frameloop do Canvas "always"↔"never" conforme a seção entra/sai da viewport
//   (rootMargin generoso p/ não pausar durante transição visível). Canvas montado
//   fora de tela = 0 render; useFrame não roda enquanto "never".
// - DPR clamp Math.min(devicePixelRatio,2); dispose no unmount (R3F o faz ao
//   desmontar o Canvas — aqui garantimos listeners limpos).
export interface SceneProps {
  children: ReactNode;
  poster: ReactNode;
  className?: string;
  eager?: boolean;
  /** Pausa o render (frameloop="never") quando a seção sai da viewport. Default true. */
  pauseOffscreen?: boolean;
  /** Overrides do contexto GL (Task 4: ex. antialias:false em mobile DPR>1.5). */
  glProps?: Partial<import("three").WebGLRendererParameters>;
}

function hasWebGL2(): boolean {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

// Canvas do R3F carregado só no cliente (ssr:false). Enquanto baixa → poster.
const Canvas = dynamic(
  () => import("@react-three/fiber").then((m) => m.Canvas),
  { ssr: false },
);

function SceneImpl({
  children,
  poster,
  className,
  eager,
  pauseOffscreen = true,
  glProps,
}: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!!eager);
  // onscreen: a seção está na viewport (margem generosa). Controla o frameloop.
  // Começa true c/ eager (já visível no 1º paint); o IO corrige no 1º callback.
  const [onscreen, setOnscreen] = useState(!!eager);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [lost, setLost] = useState(false);

  // Detecção client-side no mount (evita hydration mismatch: SSR não roda aqui
  // porque o componente exportado é dynamic ssr:false, mas mantemos o guard).
  useEffect(() => {
    setSupported(!prefersReduced() && hasWebGL2());
  }, []);

  // IntersectionObserver VIVO: (1) monta o Canvas ao entrar (a menos que eager já
  // montou) e (2) alterna onscreen p/ pausar/retomar o frameloop — não se
  // desconecta, senão o Canvas renderizaria fora de tela pra sempre.
  useEffect(() => {
    if (!pauseOffscreen && (eager || visible)) return; // sem pausa e já montado
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((e) => e.isIntersecting);
        if (isVisible) setVisible(true);
        if (pauseOffscreen) setOnscreen(isVisible);
      },
      { rootMargin: "20%" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager, visible, pauseOffscreen]);

  const showCanvas = supported === true && !lost && visible;

  return (
    <div ref={containerRef} className={className}>
      {showCanvas ? (
        <Canvas
          frameloop={pauseOffscreen && !onscreen ? "never" : "always"}
          dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)]}
          gl={{ antialias: true, powerPreference: "high-performance", ...glProps }}
          onCreated={({ gl }) => {
            const onLost = (e: Event) => {
              e.preventDefault();
              setLost(true);
            };
            gl.domElement.addEventListener("webglcontextlost", onLost, false);
            // ponytail: sem remove explícito — ao perder o contexto trocamos pro
            // poster, o <Canvas> desmonta e o R3F descarta o canvas (listener vai
            // junto). onCreated não expõe teardown; se um dia reusar o mesmo
            // canvas sem remontar, guardar onLost num ref e remover no unmount.
          }}
        >
          {children}
        </Canvas>
      ) : (
        poster
      )}
    </div>
  );
}

// Export final: dynamic ssr:false. Durante SSR / chunk loading → poster.
export const Scene = dynamic(() => Promise.resolve(SceneImpl), {
  ssr: false,
});
