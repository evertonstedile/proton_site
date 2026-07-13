"use client";

/* PERF BUDGET (immersive-3d/perf-budget.md — checklist de entrega)
 * DPR: ≤2 (clamp no Scene) · antialias OFF em mobile+DPR>1.5 (glProps via HeroSotd)
 * particles: 6k mobile / 20k desktop · draw calls: ~6 (1 Points + 3 Line + núcleo wireframe + core)
 * frameloop: idle spin contínuo quando na viewport · fora da viewport o Scene troca
 *   frameloop="never" (IO vivo, rootMargin 20%) → useFrame não roda, 0 render · aba oculta (R3F)
 * dispose: ✓ geometria de partículas no unmount (materiais/geo JSX = auto R3F) · texturas: 0 · HDRI: 0 (linework emissivo)
 * fallback: reduced-motion / sem WebGL2 / contextlost / SSR → AtomPoster (via Scene)
 * scroll: proxy createScrollProgress("#hero-sotd") lido no useFrame com damp · kill() no unmount ✓
 * zero bounce: só damp/lerp — nenhum elastic/overshoot [LEI]
 */

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { createScrollProgress } from "@/lib/scroll-progress";

// Conceito (GATE 3D aprovado): Proton = núcleo. progress 0 = átomo espacial
// (marca como objeto 3D); progress 1 = linework desmonta em blueprint plano
// (do conceito ao projeto). Rotação idle SEMPRE (reduced-motion nem monta —
// Scene entrega o poster).
const RX = 2.1;
const RY = 0.8;
const ORBIT_TILTS = [1.05, -0.85, 0.55]; // inclinação X de cada órbita (átomo)
const ORBIT_Z = [0, Math.PI / 3, (2 * Math.PI) / 3]; // 0/60/120° — eco do símbolo 2D
const TWO_PI = Math.PI * 2;

const VERT = /* glsl */ `
attribute vec3 aTarget;
attribute float aRand;
uniform float uProgress;
uniform float uTime;
uniform float uDpr;
varying float vAlpha;
void main() {
  // migração órbita → grade blueprint: mix na GPU entre os 2 buffers pré-computados
  vec3 p = mix(position, aTarget, uProgress);
  float drift = (1.0 - uProgress) * 0.035; // deriva sub-perceptual, some no blueprint
  p.x += sin(uTime * 0.45 + aRand * 6.2831) * drift;
  p.y += cos(uTime * 0.38 + aRand * 6.2831) * drift;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (5.0 + 6.0 * aRand) * uDpr / -mv.z;
  vAlpha = 0.22 + 0.5 * aRand;
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(uColor, smoothstep(0.5, 0.12, d) * vAlpha);
}`;

export function HeroAtom() {
  const root = useRef<THREE.Group>(null);
  const atom = useRef<THREE.Group>(null);
  const nucleus = useRef<THREE.Mesh>(null);
  const orbitRefs = useRef<(THREE.Group | null)[]>([]);
  const pRef = useRef(0);
  const spRef = useRef<ReturnType<typeof createScrollProgress> | null>(null);

  // acento único do canon lido do token CSS (nunca paleta nova por acidente)
  const accent = useMemo(
    () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#c68b4b",
    [],
  );

  const ellipsePts = useMemo(
    () =>
      new THREE.EllipseCurve(0, 0, RX, RY)
        .getPoints(128)
        .map((p) => [p.x, p.y, 0] as [number, number, number]),
    [],
  );

  const { geo, uniforms, scale } = useMemo(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const count = mobile ? 6_000 : 20_000; // teto por tier [LEI]
    const scale = mobile ? 0.8 : 1; // raio menor no mobile

    const start = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    const v = new THREE.Vector3();
    const eulers = ORBIT_TILTS.map((t, i) => new THREE.Euler(t, 0, ORBIT_Z[i]));

    // grade blueprint: interseções de uma grade técnica plana
    const COLS = 40;
    const ROWS = 24;
    const W = 6.2;
    const H = 3.4;

    for (let i = 0; i < count; i++) {
      // início: ponto na órbita (i % 3) com espessura leve de "feixe"
      const a = Math.random() * TWO_PI;
      v.set(
        Math.cos(a) * RX + (Math.random() - 0.5) * 0.07,
        Math.sin(a) * RY + (Math.random() - 0.5) * 0.07,
        (Math.random() - 0.5) * 0.07,
      ).applyEuler(eulers[i % 3]);
      start[i * 3] = v.x;
      start[i * 3 + 1] = v.y;
      start[i * 3 + 2] = v.z;
      // destino: interseção da grade (snap) + jitter mínimo
      target[i * 3] =
        (Math.floor(Math.random() * COLS) / (COLS - 1) - 0.5) * W +
        (Math.random() - 0.5) * 0.02;
      target[i * 3 + 1] =
        (Math.floor(Math.random() * ROWS) / (ROWS - 1) - 0.5) * H +
        (Math.random() - 0.5) * 0.02;
      target[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      rand[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(start, 3));
    geo.setAttribute("aTarget", new THREE.BufferAttribute(target, 3));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));

    const uniforms = {
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uDpr: { value: 1 },
      uColor: { value: new THREE.Color(accent) },
    };
    return { geo, uniforms, scale };
  }, [accent]);

  // dispose da geometria criada fora do JSX [LEI]
  useEffect(() => () => geo.dispose(), [geo]);

  // ponte de scroll: o hero é o trigger; proxy lido por frame (nunca useState)
  useEffect(() => {
    const sp = createScrollProgress("#hero-sotd");
    spRef.current = sp;
    return () => {
      spRef.current = null;
      sp.kill(); // sem trigger zumbi em SPA [LEI]
    };
  }, []);

  useFrame((state, dt) => {
    const targetP = spRef.current?.progress ?? 0;
    const p = (pRef.current = THREE.MathUtils.damp(pRef.current, targetP, 4, dt));

    // idle spin lento SEMPRE; desacelera e "assenta" plano conforme vira blueprint
    const a = atom.current;
    if (a) {
      a.rotation.y += dt * 0.12 * (1 - p);
      if (p > 0.02) {
        const snap = Math.round(a.rotation.y / TWO_PI) * TWO_PI;
        a.rotation.y = THREE.MathUtils.damp(a.rotation.y, snap, 3 * p, dt);
      }
    }
    // off-axis do conjunto → alinha com a "prancheta" no fim
    if (root.current) {
      root.current.rotation.x = 0.3 * (1 - p);
      root.current.rotation.z = -0.16 * (1 - p);
    }
    // órbitas abrem: inclinação → 0 (coplanar, eco do símbolo 2D) + raio cresce
    for (let i = 0; i < ORBIT_TILTS.length; i++) {
      const g = orbitRefs.current[i];
      if (!g) continue;
      g.rotation.x = ORBIT_TILTS[i] * (1 - p);
      g.rotation.z = ORBIT_Z[i];
      g.scale.setScalar(1 + 0.28 * p);
    }
    // vida interna do núcleo (sub-perceptual)
    if (nucleus.current) {
      nucleus.current.rotation.x += dt * 0.05;
      nucleus.current.rotation.y += dt * 0.08;
    }
    uniforms.uProgress.value = p;
    uniforms.uTime.value += dt;
    uniforms.uDpr.value = state.gl.getPixelRatio();
  });

  return (
    <group ref={root} scale={scale}>
      <group ref={atom}>
        {/* núcleo — icosaedro wireframe ouro (Proton = núcleo) */}
        <mesh ref={nucleus}>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshBasicMaterial wireframe color={accent} transparent opacity={0.85} />
        </mesh>
        <mesh scale={0.14}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={accent} />
        </mesh>
        {/* 3 órbitas linework */}
        {ORBIT_TILTS.map((_, i) => (
          <group
            key={i}
            ref={(el) => {
              orbitRefs.current[i] = el;
            }}
          >
            <Line
              points={ellipsePts}
              color={accent}
              lineWidth={1}
              transparent
              opacity={0.42}
            />
          </group>
        ))}
        {/* partículas: 1 draw call, migração no shader */}
        <points geometry={geo} frustumCulled={false}>
          <shaderMaterial
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            uniforms={uniforms}
            vertexShader={VERT}
            fragmentShader={FRAG}
          />
        </points>
      </group>
    </group>
  );
}

export default HeroAtom;
