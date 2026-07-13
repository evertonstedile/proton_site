"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Scene } from "@/components/gl/Scene";
import { gsap, useGSAP } from "@/lib/gsap";
import { useRef } from "react";
import { createScrollProgress } from "@/lib/scroll-progress";
import { getTier, type Tier } from "@/lib/device-tier";

/**
 * Crossfade dia→noite do hero (spec mov. 02, F4).
 * Tier A: WebGL — máscara de luz por luminância (janelas/paisagismo acendem
 *         antes do céu escurecer; não é fade linear). Progresso lido por frame
 *         do proxy (nunca React state).
 * Tier B (e fallback sem WebGL2): crossfade CSS de opacity via scrub.
 * Tier C / reduced-motion: null — foto dia estática do server permanece.
 * A foto DIA é o <Image priority> do server (LCP) — este componente só
 * adiciona a camada noturna por cima.
 */
const DAY = "/media/img/image2.png";
const NIGHT = "/media/img/image2_noite.png";
const IMG_ASPECT = 1672 / 941;

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// mix dirigido por progress com curva por luminância: áreas mais luminosas da
// foto noturna (luzes acesas) entram primeiro — threshold deslocado pelo lum.
const fragment = /* glsl */ `
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform float uProgress;
  uniform vec2 uUvScale;
  varying vec2 vUv;
  void main() {
    vec2 uv = (vUv - 0.5) * uUvScale + 0.5;
    vec4 day = texture2D(uDay, uv);
    vec4 night = texture2D(uNight, uv);
    float lum = dot(night.rgb, vec3(0.299, 0.587, 0.114));
    float t = smoothstep(0.0, 1.0, clamp(uProgress * (1.0 + lum * 0.8), 0.0, 1.0));
    gl_FragColor = mix(day, night, t);
  }
`;

function CrossfadePlane() {
  const [day, night] = useTexture([DAY, NIGHT]);
  const { viewport } = useThree();

  useEffect(() => {
    // NoColorSpace de propósito: ShaderMaterial não re-encoda gl_FragColor;
    // com decode sRGB→linear na amostra a imagem sai ESCURA. Sem conversão
    // nenhuma, texel entra = texel sai (1:1 com a foto).
    day.colorSpace = THREE.NoColorSpace;
    night.colorSpace = THREE.NoColorSpace;
    day.needsUpdate = night.needsUpdate = true;
  }, [day, night]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uDay: { value: day },
          uNight: { value: night },
          uProgress: { value: 0 },
          uUvScale: { value: new THREE.Vector2(1, 1) },
        },
        vertexShader: vertex,
        fragmentShader: fragment,
      }),
    [day, night],
  );
  useEffect(() => () => material.dispose(), [material]);

  const sp = useMemo(
    () => createScrollProgress("#hero", { end: "bottom bottom" }),
    [],
  );
  useEffect(() => () => sp.kill(), [sp]);

  useFrame(() => {
    material.uniforms.uProgress.value = sp.progress;
    // object-fit: cover no shader — recalculado por frame (resize barato)
    const planeAspect = viewport.width / viewport.height;
    const s = material.uniforms.uUvScale.value as THREE.Vector2;
    if (planeAspect > IMG_ASPECT) s.set(1, IMG_ASPECT / planeAspect);
    else s.set(planeAspect / IMG_ASPECT, 1);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
}

/** Tier B / fallback: noite por cima com opacity dirigida pelo scroll. */
function NightFade() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className="absolute inset-0 opacity-0">
      <Image
        src={NIGHT}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
    </div>
  );
}

export function CrossfadeDiaNoite() {
  const [tier, setTier] = useState<Tier | null>(null);
  useEffect(() => setTier(getTier()), []);

  if (!tier || tier === "C") return null;
  if (tier === "B") return <NightFade />;
  // Tier A: canvas com pausa fora da viewport; sem WebGL2/context-lost → NightFade
  return (
    <Scene poster={<NightFade />} eager className="absolute inset-0">
      <CrossfadePlane />
    </Scene>
  );
}
