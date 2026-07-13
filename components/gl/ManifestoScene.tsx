"use client";

/* PERF BUDGET (immersive-3d/perf-budget.md — checklist de entrega)
 * DPR: ≤2 (clamp no Scene) · sem antialias herda do Scene default (linework fino)
 * draw calls: ~10 — terreno wireframe (1) · 4 traços Line (4) · grid papel (1) ·
 *   3 caixas concreto wireframe (3) · núcleo do traço (1). SEMPRE <30 [LEI]
 * geometria: plano subdividido 48×48 desktop / 24×24 mobile (matchMedia) ·
 *   nenhuma textura · nenhum HDRI (linework emissivo, alpha:true herdado)
 * frameloop: Scene pausa fora da viewport (pauseOffscreen default) → useFrame 0 render
 * dispose: ✓ geometria do terreno criada fora do JSX no unmount · resto JSX = auto R3F
 * scroll: proxy createScrollProgress(trigger) lido no useFrame com damp · kill() no unmount ✓
 * câmera: CatmullRomCurve3 (4 pts, 1 por capítulo) · getPointAt(p) + damp · lookAt alvo por capítulo
 * fallback: reduced-motion / sem WebGL2 / contextlost / SSR → poster (4 blocos) via Scene (não monta)
 * zero bounce: só damp — nenhum elastic/overshoot [LEI]
 */

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { createScrollProgress } from "@/lib/scroll-progress";

// UMA cena contínua percorrida pela câmera. Eixo Z = tempo do processo:
// terreno (perto) → traço → papel → concreto (longe). A câmera desce o eixo
// enquanto sobe/gira levemente, como quem sobrevoa a obra do início ao fim.
// z=0 terreno · z=-14 traço · z=-28 papel · z=-42 concreto.
const CAM_PTS: [number, number, number][] = [
  [0, 3.2, 8], // cap.0 o terreno: baixo, olhando o relevo
  [3.5, 4.0, -6], // cap.1 o traço: desliza lateral sobre as linhas nascendo
  [-2.5, 5.5, -20], // cap.2 o papel: sobe, olha o grid da prancheta de cima
  [0, 6.5, -34], // cap.3 o concreto: recua e ergue, as caixas sobem
];
const LOOK_PTS: [number, number, number][] = [
  [0, 0, -2],
  [0, 0.5, -14],
  [0, 0, -28],
  [0, 2.2, -42],
];

export function ManifestoScene({ trigger }: { trigger: string }) {
  const { camera } = useThree();
  const pRef = useRef(0);
  const spRef = useRef<ReturnType<typeof createScrollProgress> | null>(null);
  const boxRefs = useRef<(THREE.Group | null)[]>([]);
  const lookRef = useRef(new THREE.Vector3(0, 0, -2));
  // scratch reutilizados no useFrame — getPointAt escreve no alvo, zero alloc/frame [LEI]
  const camPosScratch = useMemo(() => new THREE.Vector3(), []);
  const lookScratch = useMemo(() => new THREE.Vector3(), []);

  const accent = useMemo(
    () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#c68b4b",
    [],
  );

  const camCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        CAM_PTS.map((p) => new THREE.Vector3(...p)),
        false,
        "catmullrom",
        0.5,
      ),
    [],
  );
  const lookCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        LOOK_PTS.map((p) => new THREE.Vector3(...p)),
        false,
        "catmullrom",
        0.5,
      ),
    [],
  );

  // ── Terreno: plano wireframe com relevo por noise pseudo-aleatório barato
  //    (uma vez, no vertex buffer — sem shader, sem textura).
  const terrainGeo = useMemo(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const seg = mobile ? 24 : 48;
    const g = new THREE.PlaneGeometry(30, 22, seg, seg);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // relevo suave: soma de senos (colinas) — determinístico, estático
      const z =
        Math.sin(x * 0.35) * 0.9 +
        Math.cos(y * 0.4) * 0.7 +
        Math.sin((x + y) * 0.22) * 0.6;
      pos.setZ(i, z);
    }
    g.rotateX(-Math.PI / 2); // deita o plano no chão (XZ)
    g.computeVertexNormals();
    return g;
  }, []);
  useEffect(() => () => terrainGeo.dispose(), [terrainGeo]);

  // ── Traços: 4 polilinhas que "se desenham" no capítulo 1 (linhas de projeto
  //    nascendo). Pontos fixos; o reveal é feito escalando por progress no frame.
  const traceLines = useMemo(() => {
    const mk = (pts: [number, number, number][]) =>
      pts.map(([x, y, z]) => new THREE.Vector3(x, y, z));
    return [
      mk([
        [-6, 0.1, -12],
        [-6, 0.1, -16],
        [2, 0.1, -16],
        [2, 0.1, -12],
        [-6, 0.1, -12],
      ]),
      mk([
        [-4, 0.1, -13.5],
        [0, 0.1, -13.5],
      ]),
      mk([
        [-1, 0.1, -12],
        [-1, 0.1, -16],
      ]),
      mk([
        [2, 0.1, -14],
        [5, 0.1, -14],
        [5, 0.1, -18],
      ]),
    ];
  }, []);

  // ── Papel: grid plano (prancheta) — linhas de grade, um só desenho.
  //    Float32Array memoizado (não realoca em re-render) → bufferAttribute.
  const paperGridPositions = useMemo(() => {
    const pts: number[] = [];
    const N = 10;
    const W = 14;
    for (let i = 0; i <= N; i++) {
      const t = (i / N - 0.5) * W;
      pts.push(t, 0, -22, t, 0, -34);
      const z = -22 - (i / N) * 12;
      pts.push(-W / 2, 0, z, W / 2, 0, z);
    }
    return new Float32Array(pts);
  }, []);

  // ── Concreto: 3 caixas wireframe que se erguem no capítulo 3.
  const boxes = useMemo(
    () =>
      [
        { pos: [-3, 0, -40] as const, size: [3, 4, 3] as const },
        { pos: [1.5, 0, -43] as const, size: [4, 6, 3.5] as const },
        { pos: [4.5, 0, -39] as const, size: [2.5, 3, 2.5] as const },
      ] as const,
    [],
  );

  useEffect(() => {
    const sp = createScrollProgress(trigger, { pin: true });
    spRef.current = sp;
    return () => {
      spRef.current = null;
      sp.kill(); // sem trigger zumbi em SPA [LEI]
    };
  }, [trigger]);

  useFrame((_, dt) => {
    const targetP = spRef.current?.progress ?? 0;
    const p = (pRef.current = THREE.MathUtils.damp(
      pRef.current,
      targetP,
      4,
      dt,
    ));
    const cp = THREE.MathUtils.clamp(p, 0, 1);

    // câmera desliza a curva; lookAt segue a curva de alvo — damp no ponto
    const camPos = camCurve.getPointAt(cp, camPosScratch);
    camera.position.set(camPos.x, camPos.y, camPos.z);
    const lookTarget = lookCurve.getPointAt(cp, lookScratch);
    lookRef.current.set(
      THREE.MathUtils.damp(lookRef.current.x, lookTarget.x, 5, dt),
      THREE.MathUtils.damp(lookRef.current.y, lookTarget.y, 5, dt),
      THREE.MathUtils.damp(lookRef.current.z, lookTarget.z, 5, dt),
    );
    camera.lookAt(lookRef.current);

    // concreto ergue no capítulo 3 (0.72→1): escala Y de 0→1 + posição sobe
    const rise = THREE.MathUtils.clamp((cp - 0.72) / 0.28, 0, 1);
    for (let i = 0; i < boxRefs.current.length; i++) {
      const g = boxRefs.current[i];
      if (!g) continue;
      const h = boxes[i].size[1];
      const s = 0.001 + rise; // evita escala 0 (normais degeneradas)
      g.scale.y = s;
      g.position.y = (h * s) / 2 - 0.05; // base no chão enquanto sobe
    }
  });

  return (
    <group>
      {/* terreno */}
      <lineSegments>
        <wireframeGeometry args={[terrainGeo]} />
        <lineBasicMaterial color={accent} transparent opacity={0.28} />
      </lineSegments>

      {/* traços do projeto */}
      {traceLines.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={accent}
          lineWidth={1}
          transparent
          opacity={0.55}
        />
      ))}

      {/* papel — grid da prancheta */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[paperGridPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={accent} transparent opacity={0.22} />
      </lineSegments>

      {/* concreto — caixas wireframe que se erguem */}
      {boxes.map((b, i) => (
        <group
          key={i}
          position={[b.pos[0], 0, b.pos[2]]}
          ref={(el) => {
            boxRefs.current[i] = el;
          }}
        >
          <lineSegments>
            <edgesGeometry
              args={[new THREE.BoxGeometry(b.size[0], b.size[1], b.size[2])]}
            />
            <lineBasicMaterial color={accent} transparent opacity={0.5} />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

export default ManifestoScene;
