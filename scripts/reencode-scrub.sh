#!/usr/bin/env bash
# Re-encode do vídeo do hero para SCRUB por scroll (Task 7 SOTD).
# -g 5  → keyframe a cada 5 frames: seek fino em video.currentTime (scrub liso;
#         GOP longo faria o browser decodificar do último keyframe = travadinha).
# -an   → sem áudio (o bloco de obras é mudo por design).
# +faststart → moov no início: começa a tocar/seekar antes do download completo.
# Idempotente: rode quando o hero-loop.mp4 mudar. Saída commitada como asset.
set -euo pipefail

SRC="public/hero/hero-loop.mp4"
OUT="public/obras/scrub.mp4"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg não encontrado — pulei o scrub (a seção usa poster estático)." >&2
  exit 0
fi
if [ ! -f "$SRC" ]; then
  echo "fonte $SRC ausente — pulei o scrub." >&2
  exit 0
fi

mkdir -p "$(dirname "$OUT")"
ffmpeg -y -i "$SRC" -g 5 -crf 23 -movflags +faststart -an "$OUT"
echo "scrub gerado em $OUT"
