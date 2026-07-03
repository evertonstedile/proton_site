"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Som ambiente — MUTE-FIRST [LEI]: nenhum autoplay, áudio só nasce no clique.
 * - Flag: só renderiza com NEXT_PUBLIC_SOUND="1" (asset /audio/ambient.mp3
 *   ainda não aprovado — até lá o componente fica dormente, sem rede).
 * - WebAudio: GainNode com fade de 0.8s (in/out); pause após o fade-out.
 * - localStorage lembra o opt-in; na volta, retoma no PRIMEIRO gesto do
 *   usuário (pointerdown/keydown) — gesto continua obrigatório, nunca autoplay.
 * - Barras equalizer CSS animadas quando ativo (globals: .eq-bar, respeita
 *   prefers-reduced-motion).
 */
const ENABLED = process.env.NEXT_PUBLIC_SOUND === "1";
const KEY = "proton-sound";
const SRC = "/audio/ambient.mp3";
const FADE_S = 0.8;

type Rig = { ctx: AudioContext; gain: GainNode; el: HTMLAudioElement };

export function SoundToggle({ className }: { className?: string }) {
  const [on, setOn] = useState(false);
  const rig = useRef<Rig | null>(null);
  const pauseT = useRef<number | null>(null);

  const ensure = (): Rig => {
    if (rig.current) return rig.current;
    const el = new Audio(SRC);
    el.loop = true;
    const ctx = new AudioContext();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    ctx.createMediaElementSource(el).connect(gain);
    gain.connect(ctx.destination);
    rig.current = { ctx, gain, el };
    return rig.current;
  };

  const setSound = (next: boolean) => {
    const a = ensure();
    if (pauseT.current) {
      window.clearTimeout(pauseT.current);
      pauseT.current = null;
    }
    const t = a.ctx.currentTime;
    a.gain.gain.cancelScheduledValues(t);
    a.gain.gain.setValueAtTime(a.gain.gain.value, t);
    if (next) {
      a.ctx.resume().catch(() => {});
      a.el.play().catch(() => {});
      a.gain.gain.linearRampToValueAtTime(0.5, t + FADE_S);
    } else {
      a.gain.gain.linearRampToValueAtTime(0.0001, t + FADE_S);
      pauseT.current = window.setTimeout(() => a.el.pause(), FADE_S * 1000 + 60);
    }
    setOn(next);
    try {
      localStorage.setItem(KEY, next ? "1" : "0");
    } catch {}
  };

  // opt-in lembrado → retoma no primeiro gesto (gesto obrigatório; sem autoplay)
  useEffect(() => {
    if (!ENABLED) return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {}
    if (stored !== "1") return;
    const arm = () => setSound(true);
    window.addEventListener("pointerdown", arm, { once: true });
    window.addEventListener("keydown", arm, { once: true });
    return () => {
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // cleanup: nada de áudio órfão após unmount
  useEffect(
    () => () => {
      if (pauseT.current) window.clearTimeout(pauseT.current);
      rig.current?.el.pause();
      rig.current?.ctx.close().catch(() => {});
    },
    [],
  );

  if (!ENABLED) return null;

  return (
    <button
      type="button"
      onClick={() => setSound(!on)}
      aria-pressed={on}
      aria-label={on ? "Desativar som ambiente" : "Ativar som ambiente"}
      className={cn(
        "sound-toggle flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-muted transition-colors duration-short ease-proton hover:text-fg",
        className,
      )}
    >
      <span className="flex h-3 items-end gap-[3px]" aria-hidden>
        <span className="eq-bar h-full w-[2px] bg-current" />
        <span className="eq-bar h-full w-[2px] bg-current" />
        <span className="eq-bar h-full w-[2px] bg-current" />
      </span>
    </button>
  );
}
