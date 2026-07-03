"use client";

/* PERF BUDGET (webgl-over-dom + perf-budget refs)
 * contexts: 1 (singleton compartilhado — o mouse só paira em 1 card por vez;
 *           N imagens = N texturas, NUNCA N canvases [LEI])
 * DPR: ≤2 · draw calls: 1 (um plane) · textura: currentSrc do next/image
 *      (já reduzido ao layout, ~≤1024w) · geometria: 1 PlaneGeometry reusada
 * frameloop: rAF SÓ enquanto um card está com hover ativo; para no leave
 * dispose: renderer/geo/material/textura descartados quando o último
 *          DistortImage desmonta (refcount)
 * fallback [LEI]: touch / pointer:coarse / reduced-motion / sem WebGL →
 *          <Image> puro (next/image), zero WebGL. Box NUNCA reflowa: o canvas
 *          é fixed + pointer-events:none sobreposto ao rect do card.
 */

import Image from "next/image";
import { useEffect, useRef } from "react";
import type * as THREE from "three";
import { prefersReduced } from "@/lib/motion";

// three (~150KB) é pesado: NÃO deve entrar no bundle crítico do "/" (mataria o
// LCP do hero em Slow 4G). Import dinâmico — só baixa no 1º hover de desktop;
// mobile/touch/reduced nunca paga. Cache do módulo entre instâncias.
let threePromise: Promise<typeof import("three")> | null = null;
const loadThree = () => (threePromise ??= import("three"));

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Ripple radial a partir do mouse + RGB shift — ambos escalados por uHover
// (0→1 amortecido). Intensidades QUASE imperceptíveis (o premium é o sutil):
// ripple ≤0.006, shift ≤0.006 [LEI webgl-over-dom].
const FRAG = /* glsl */ `
  precision mediump float;
  uniform sampler2D uMap;
  uniform float uHover;
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  void main() {
    float d = distance(vUv, uMouse);
    float ripple = sin(d * 22.0 - uTime * 2.6) * 0.006 * uHover
                 * smoothstep(0.5, 0.0, d);
    vec2 uv = vUv + ripple;
    float shift = 0.006 * uHover;
    float r = texture2D(uMap, uv + vec2(shift, 0.0)).r;
    float g = texture2D(uMap, uv).g;
    float b = texture2D(uMap, uv - vec2(shift, 0.0)).b;
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

// ---- Renderer compartilhado (singleton) -----------------------------------
// Criado sob demanda no 1º hover de desktop; um só contexto WebGL vive por vez.
type Shared = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  loader: THREE.TextureLoader;
};

let shared: Shared | null = null;
let mounted = 0; // refcount de DistortImage montados (desktop)
let active: {
  el: HTMLElement;
  raf: number;
  hover: number;
  hoverTarget: number;
  last: number;
  texture: THREE.Texture | null;
} | null = null;

function ensureShared(T: typeof THREE): Shared {
  if (shared) return shared;
  const renderer = new T.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const canvas = renderer.domElement;
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    pointerEvents: "none",
    zIndex: "5",
    opacity: "0",
    transition: "opacity 0.25s var(--ease, ease)",
  });
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  const scene = new T.Scene();
  const camera = new T.Camera();
  const material = new T.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uMap: { value: null },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new T.Vector2(0.5, 0.5) },
    },
  });
  const mesh = new T.Mesh(new T.PlaneGeometry(2, 2), material);
  scene.add(mesh);

  shared = { renderer, scene, camera, mesh, material, loader: new T.TextureLoader() };
  return shared;
}

function disposeShared() {
  if (!shared) return;
  active?.texture?.dispose();
  shared.mesh.geometry.dispose();
  shared.material.dispose();
  shared.renderer.dispose();
  shared.renderer.domElement.remove();
  shared = null;
  active = null;
}

// Posiciona o canvas exatamente sobre o rect do card (viewport coords: fixed).
function place(el: HTMLElement, s: Shared) {
  const r = el.getBoundingClientRect();
  const canvas = s.renderer.domElement;
  canvas.style.width = `${r.width}px`;
  canvas.style.height = `${r.height}px`;
  canvas.style.transform = `translate(${r.left}px, ${r.top}px)`;
  s.renderer.setSize(r.width, r.height, false);
}

function loop(t: number) {
  if (!active || !shared) return;
  const dt = Math.min((t - active.last) / 1000, 0.05);
  active.last = t;
  // damp frame-independent (mesma família do canon — zero bounce):
  active.hover += (active.hoverTarget - active.hover) * (1 - Math.exp(-7 * dt));
  shared.material.uniforms.uHover.value = active.hover;
  shared.material.uniforms.uTime.value = t / 1000;
  place(active.el, shared);
  shared.renderer.render(shared.scene, shared.camera);
  // sai quando saiu do hover E já dissolveu — desliga canvas e para o rAF
  if (active.hoverTarget === 0 && active.hover < 0.01) {
    shared.renderer.domElement.style.opacity = "0";
    active.raf = 0;
    return;
  }
  active.raf = requestAnimationFrame(loop);
}

/**
 * Imagem com distortion sutil no hover (desktop/pointer:fine). Renderiza sempre
 * um next/image (fallback nativo p/ SEO, a11y, LCP, mobile e reduced-motion).
 * O box tem tamanho fixo pelo aspect do container pai — o efeito vive num canvas
 * sobreposto, então NUNCA há reflow no hover.
 */
export function DistortImage({
  src,
  alt,
  sizes,
  priority,
  interactive = true,
  className,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  /** Liga os listeners/WebGL do hover. false = só o <Image> (evita custo até a
   *  seção chegar perto da viewport — protege o LCP do hero). */
  interactive?: boolean;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !interactive) return;
    // Enhancement SÓ em desktop com mouse fino e sem reduced-motion. Caso
    // contrário o next/image puro basta (fallback de graça).
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced() || !finePointer) return;

    mounted++;
    let disposed = false;
    let s: Shared | null = null; // resolvido no 1º hover (após baixar three)

    const img = imgWrapRef.current?.querySelector("img") as HTMLImageElement | null;

    // Adquire o contexto compartilhado p/ ESTE card (só chamado com three pronto).
    const acquire = (T: typeof THREE) => {
      if (disposed || !img) return;
      try {
        s = ensureShared(T);
      } catch {
        return; // sem WebGL → next/image puro fica
      }
      s.loader.load(img.currentSrc || img.src, (tex) => {
        // O load é assíncrono: entre o disparo e o resolve o usuário pode ter
        // trocado de card (A→sai→A→B). Se ESTE card já não é mais o dono de
        // `active`, ninguém vai adotar a textura → descarta na hora p/ não vazar.
        if (!active || active.el !== wrap) {
          tex.dispose();
          return;
        }
        tex.colorSpace = T.SRGBColorSpace;
        // Se já havia uma textura pendente neste slot (reentrada no mesmo card),
        // descarta a anterior antes de sobrescrever.
        if (active.texture && active.texture !== tex) active.texture.dispose();
        active.texture = tex;
        if (s) {
          s.material.uniforms.uMap.value = tex;
          s.renderer.domElement.style.opacity = "1";
        }
      });
      active = { el: wrap, raf: 0, hover: 0, hoverTarget: 1, last: performance.now(), texture: null };
      place(wrap, s);
      s.material.uniforms.uHover.value = 0;
      active.raf = requestAnimationFrame(loop);
    };

    const onEnter = () => {
      active?.texture?.dispose();
      // marca intenção de hover já; three baixa (uma vez) e então adquire
      active = { el: wrap, raf: 0, hover: 0, hoverTarget: 1, last: performance.now(), texture: null };
      loadThree().then((T) => {
        // se ainda for ESTE card o alvo do hover quando three chegar, adquire
        if (!disposed && active?.el === wrap && active.hoverTarget === 1) acquire(T);
      });
    };
    const onLeave = () => {
      if (active && active.el === wrap) active.hoverTarget = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!s || !active || active.el !== wrap) return;
      const r = wrap.getBoundingClientRect();
      (s.material.uniforms.uMouse.value as THREE.Vector2).set(
        (e.clientX - r.left) / r.width,
        1 - (e.clientY - r.top) / r.height,
      );
    };

    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("pointermove", onMove);

    return () => {
      disposed = true;
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointermove", onMove);
      if (active && active.el === wrap) {
        cancelAnimationFrame(active.raf);
        if (shared) shared.renderer.domElement.style.opacity = "0";
        // este card era o dono e some agora: descarta sua textura antes de
        // soltar `active`, senão ela vira órfã fora do alcance do disposeShared.
        active.texture?.dispose();
        active = null;
      }
      mounted--;
      if (mounted <= 0) disposeShared(); // último a sair apaga a luz [LEI dispose]
    };
  }, [interactive]);

  return (
    <div ref={wrapRef} className={className}>
      <div ref={imgWrapRef} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          decoding="async"
          className="object-cover"
        />
      </div>
    </div>
  );
}
