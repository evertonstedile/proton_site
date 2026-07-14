"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useVideoScrub } from "@/lib/useVideoScrub";
import { getTier, type Tier } from "@/lib/device-tier";
import { cn } from "@/lib/cn";

export type ScrubMark = { at: number; label: string; desc: string };

/**
 * Palco de vídeo-scrub pinado (movs. 05/06): seção alta com visual sticky,
 * currentTime dirigido pelo scroll (useVideoScrub, derivados GOP-12) e
 * overlay da etapa ativa em mono.
 * Tier C / reduced-motion: CSS desfaz altura e sticky (h-auto/static) e o
 * vídeo fica parado no poster — o conteúdo integral (etapas) vive FORA
 * deste palco, no server component pai.
 */
export function VideoScrubStage({
  src,
  poster,
  marks,
  snapStops = false,
  heightClass = "h-[300svh]",
  className,
}: {
  src: string;
  poster: string;
  marks: ScrubMark[];
  /** gruda o tempo nos marcos (mov. 06) em vez de timeline contínua */
  snapStops?: boolean;
  heightClass?: string;
  className?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tier, setTier] = useState<Tier | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => setTier(getTier()), []);
  const enabled = tier === "A" || tier === "B";

  const snapTo = useMemo(
    () => (snapStops ? marks.map((m) => m.at / 100) : undefined),
    [snapStops, marks],
  );
  const onProgress = useMemo(
    () => (p: number) => {
      let idx = 0;
      for (let i = 0; i < marks.length; i++) if (p * 100 >= marks[i].at) idx = i;
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
    },
    [marks],
  );

  useVideoScrub(videoRef, stageRef, { enabled, snapTo, onProgress });

  const mark = marks[active];

  return (
    <div
      ref={stageRef}
      className={cn("relative motion-reduce:h-auto", heightClass, className)}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center py-24 motion-reduce:static motion-reduce:h-auto motion-reduce:py-0">
        <div className="relative overflow-hidden rounded-lg border border-line">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="none"
            poster={poster}
            className="aspect-video w-full object-cover"
          >
            <source src={src} type="video/mp4" />
          </video>
          {/* overlay da etapa ativa — só quando o scrub está ligado */}
          {enabled ? (
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-6 bg-gradient-to-t from-bg/80 to-transparent p-6">
              <div>
                <p className="font-mono text-small text-accent">
                  {String(active + 1).padStart(2, "0")} · {mark.label}
                </p>
                <p className="mt-1 max-w-md font-sans text-small text-fg-muted">
                  {mark.desc}
                </p>
              </div>
              <p className="font-mono text-small text-stone">
                {mark.at}%–
                {marks[active + 1] ? `${marks[active + 1].at}%` : "100%"}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
