"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Vídeo que toca sozinho (muted) ao entrar na viewport e pausa ao sair —
 * 1 vídeo ativo por vez na prática (spec §9). Toca uma única vez e para no
 * último frame (aéreas de materialização não fazem loop).
 * Reduced-motion: nunca toca — poster estático.
 */
export function AutoplayVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let played = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          if (!played || !v.ended) v.play().catch(() => {});
          played = true;
        } else {
          v.pause();
        }
      },
      { rootMargin: "10%" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      playsInline
      preload="none"
      poster={poster}
      className={cn("w-full object-cover", className)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
