import { gsap } from "@/lib/gsap";
import type ScrollTrigger from "gsap/ScrollTrigger";

// Proxy de progresso de scroll (0→1) dirigido pelo ScrollTrigger.
// Motivo: consumidores 3D leem `.progress` por FRAME (useFrame) sem passar por
// React state — jamais useState p/ valor contínuo de scroll (LEI do plano SOTD).
export function createScrollProgress(
  trigger: string | Element,
  vars: Partial<ScrollTrigger.Vars> = {},
) {
  const state = { progress: 0 };
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        state.progress = self.progress;
      },
      ...vars,
    },
  });
  return {
    get progress() {
      return state.progress;
    },
    kill: () => tl.scrollTrigger?.kill(),
  };
}
