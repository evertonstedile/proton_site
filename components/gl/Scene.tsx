"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReduced } from "@/lib/motion";

// Wrapper R3F do motor de experiência (Task 2 SOTD). Contrato:
// - poster: fallback (reduced-motion, sem WebGL2, webglcontextlost) e conteúdo
//   enquanto o chunk do Canvas carrega (ssr:false).
// - eager: monta o Canvas já; default = monta ao entrar na viewport (IO) p/ não
//   pagar GPU fora de tela.
// - DPR clamp Math.min(devicePixelRatio,2); dispose no unmount (R3F o faz ao
//   desmontar o Canvas — aqui garantimos listeners limpos).
export interface SceneProps {
  children: ReactNode;
  poster: ReactNode;
  className?: string;
  eager?: boolean;
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

function SceneImpl({ children, poster, className, eager, glProps }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!!eager);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [lost, setLost] = useState(false);

  // Detecção client-side no mount (evita hydration mismatch: SSR não roda aqui
  // porque o componente exportado é dynamic ssr:false, mas mantemos o guard).
  useEffect(() => {
    setSupported(!prefersReduced() && hasWebGL2());
  }, []);

  // IntersectionObserver: monta o Canvas só quando visível (a menos que eager).
  useEffect(() => {
    if (eager || visible) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager, visible]);

  const showCanvas = supported === true && !lost && visible;

  return (
    <div ref={containerRef} className={className}>
      {showCanvas ? (
        <Canvas
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
