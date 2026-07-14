"use client";

import { useEffect, type RefObject } from "react";
import { createScrollProgress } from "@/lib/scroll-progress";

/**
 * Scrub de vídeo por scroll: currentTime dirigido pelo progresso do trigger.
 * - Quantiza a ~1/30s (seek-spam trava o pipeline do Safari; masters têm
 *   GOP-12, seek é barato).
 * - IntersectionObserver liga/desliga o rAF e só inicia o download do vídeo
 *   quando a seção se aproxima (preload none → auto no 1º intersect).
 * - snapTo: lista de progressos-alvo (0–1) — o tempo gruda no stop mais
 *   próximo (mov. 06, stops capitulados).
 * - onProgress: callback por tick (overlays discretos; quem consome decide
 *   quando re-renderizar).
 */
export function useVideoScrub(
  video: RefObject<HTMLVideoElement | null>,
  trigger: RefObject<HTMLElement | null>,
  {
    enabled = true,
    snapTo,
    onProgress,
  }: {
    enabled?: boolean;
    snapTo?: number[];
    onProgress?: (p: number) => void;
  } = {},
) {
  useEffect(() => {
    const v = video.current;
    const t = trigger.current;
    if (!v || !t || !enabled) return;

    const sp = createScrollProgress(t, { end: "bottom bottom" });
    let raf = 0;
    let last = -1;
    let loaded = false;

    const tick = () => {
      let p = sp.progress;
      if (snapTo?.length) {
        // eased-snap: gruda no stop mais próximo
        p = snapTo.reduce((a, b) => (Math.abs(b - p) < Math.abs(a - p) ? b : a));
      }
      onProgress?.(sp.progress);
      if (v.duration) {
        const target = Math.round(p * v.duration * 30) / 30;
        if (target !== last && !v.seeking) {
          v.currentTime = Math.min(target, v.duration - 0.05);
          last = target;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          if (!loaded) {
            v.preload = "auto";
            v.load();
            loaded = true;
          }
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { rootMargin: "50%" },
    );
    io.observe(t);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      sp.kill();
    };
  }, [video, trigger, enabled, snapTo, onProgress]);
}
