#!/usr/bin/env bash
# Deriva versões web dos masters em public/media/video/master/ (NUNCA editar masters).
# Masters 01–08 são 1280×720 nativos — derivado único 720p (upscale p/ 1080 proibido).
# Scrub (construcao/estrutura) usa GOP curto (keyframe a cada 12 frames) p/ seek
# responsivo dirigido por scroll (Safari/iOS engasga com GOP longo).
# Posters: frame 0 → AVIF via sharp (ffmpeg local sem libaom).
set -euo pipefail
cd "$(dirname "$0")/../public/media/video"

# mapa semântico (framework §5): 02→intro 03→atmosfera 04→construcao 06→manifesto 08→estrutura 01→hover
# 05/07/09 ficam só como master (reserva internas / holográfico fora da home)
MAP="02:intro 03:atmosfera 04:construcao 06:manifesto 08:estrutura 01:hover"
SCRUB="construcao estrutura"

for pair in $MAP; do
  n="${pair%%:*}"; name="${pair##*:}"; src="master/${n}.mp4"
  gop=""
  [[ " $SCRUB " == *" $name "* ]] && gop="-g 12 -keyint_min 12 -sc_threshold 0"
  # shellcheck disable=SC2086
  ffmpeg -y -hide_banner -loglevel error -i "$src" -an -c:v libx264 -preset slow -crf 21 $gop -movflags +faststart "${name}-720.mp4"
  ffmpeg -y -hide_banner -loglevel error -i "$src" -frames:v 1 "${name}-poster.png"
done

node -e '
const sharp = require("sharp"), fs = require("fs");
(async () => {
  for (const f of fs.readdirSync(".").filter(f => f.endsWith("-poster.png"))) {
    await sharp(f).avif({ quality: 60 }).toFile(f.replace(".png", ".avif"));
    fs.unlinkSync(f);
    console.log(f, "→ avif");
  }
})();
'
ls -la ./*.mp4 ./*.avif
