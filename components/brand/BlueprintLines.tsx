import { cn } from "@/lib/cn";

/**
 * Linework técnico (blueprint) — cantos, régua de medição, eixo áureo, crosshair
 * e coordenada geo real de Garopaba + CREA. Desenha-se no scroll/intro (stroke
 * dashoffset gated por `html.intro-ready`, ver globals.css `.bp-draw`).
 * Decorativo e sutil — controle opacidade/posição pela className do pai.
 * `vector-effect:non-scaling-stroke` vai em CADA elemento (SVG2: não herda de
 * <g>). Duas variantes: paisagem (≥sm) e retrato (mobile) — o viewBox 1440×810
 * com `slice` cortava quase todo o desenho em tela portrait.
 */
export function BlueprintLines({ className }: { className?: string }) {
  // ticks de medição ao longo da base e da lateral esquerda
  const baseTicks = Array.from({ length: 23 }, (_, i) => 60 + i * 58);
  const sideTicks = Array.from({ length: 12 }, (_, i) => 70 + i * 56);
  const mobileTicks = Array.from({ length: 9 }, (_, i) => 40 + i * 44);

  return (
    <>
      {/* ≥sm — paisagem */}
      <svg
        viewBox="0 0 1440 810"
        fill="none"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
        className={cn("hidden text-accent sm:block", className)}
      >
        <g stroke="currentColor" strokeWidth="1">
          {/* cantos (brackets) */}
          {(
            [
              [40, 40, 1, 1],
              [1400, 40, -1, 1],
              [40, 770, 1, -1],
              [1400, 770, -1, -1],
            ] as const
          ).map(([x, y, sx, sy], i) => (
            <path
              key={i}
              className="bp-draw"
              style={{ ["--d" as string]: `${0.1 + i * 0.08}s` }}
              pathLength={1}
              d={`M ${x} ${y + sy * 30} L ${x} ${y} L ${x + sx * 30} ${y}`}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* eixo áureo vertical + horizontal */}
          <line
            className="bp-draw"
            style={{ ["--d" as string]: "0.45s" }}
            pathLength={1}
            x1="894"
            y1="40"
            x2="894"
            y2="770"
            opacity="0.5"
            vectorEffect="non-scaling-stroke"
          />
          <line
            className="bp-draw"
            style={{ ["--d" as string]: "0.6s" }}
            pathLength={1}
            x1="40"
            y1="308"
            x2="1400"
            y2="308"
            opacity="0.32"
            vectorEffect="non-scaling-stroke"
          />

          {/* crosshair na interseção */}
          <g
            className="bp-draw"
            style={{ ["--d" as string]: "0.85s" }}
            opacity="0.7"
          >
            <circle
              cx="894"
              cy="308"
              r="12"
              pathLength={1}
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1="894"
              y1="290"
              x2="894"
              y2="326"
              pathLength={1}
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1="876"
              y1="308"
              x2="912"
              y2="308"
              pathLength={1}
              vectorEffect="non-scaling-stroke"
            />
          </g>

          {/* órbita-eco (echo do símbolo) */}
          <ellipse
            className="bp-draw"
            style={{ ["--d" as string]: "1s" }}
            cx="1240"
            cy="170"
            rx="120"
            ry="46"
            opacity="0.28"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {/* réguas de medição (fade, não draw — muitos traços) */}
        <g
          className="bp-fade"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        >
          {baseTicks.map((x, i) => (
            <line
              key={`b${i}`}
              x1={x}
              y1="770"
              x2={x}
              y2={i % 5 === 0 ? 754 : 762}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {sideTicks.map((y, i) => (
            <line
              key={`s${i}`}
              x1="40"
              y1={y}
              x2={i % 5 === 0 ? 56 : 48}
              y2={y}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        {/* rótulos técnicos reais (geo de Garopaba + registro PJ) */}
        <g className="bp-fade" fill="currentColor" opacity="0.55">
          <text
            x="40"
            y="730"
            fontSize="13"
            letterSpacing="3"
            fontFamily="var(--font-sans), sans-serif"
          >
            28.0323°S · 48.6198°W
          </text>
          <text
            x="1400"
            y="92"
            fontSize="13"
            letterSpacing="3"
            textAnchor="end"
            fontFamily="var(--font-sans), sans-serif"
          >
            CREA-SC 230125-6
          </text>
        </g>
      </svg>

      {/* mobile — retrato (labels no topo, longe do conteúdo do hero) */}
      <svg
        viewBox="0 0 430 932"
        fill="none"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
        className={cn("text-accent sm:hidden", className)}
      >
        <g stroke="currentColor" strokeWidth="1">
          {(
            [
              [24, 24, 1, 1],
              [406, 24, -1, 1],
              [24, 908, 1, -1],
              [406, 908, -1, -1],
            ] as const
          ).map(([x, y, sx, sy], i) => (
            <path
              key={i}
              className="bp-draw"
              style={{ ["--d" as string]: `${0.1 + i * 0.08}s` }}
              pathLength={1}
              d={`M ${x} ${y + sy * 22} L ${x} ${y} L ${x + sx * 22} ${y}`}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <line
            className="bp-draw"
            style={{ ["--d" as string]: "0.45s" }}
            pathLength={1}
            x1="266"
            y1="24"
            x2="266"
            y2="908"
            opacity="0.45"
            vectorEffect="non-scaling-stroke"
          />
          <line
            className="bp-draw"
            style={{ ["--d" as string]: "0.6s" }}
            pathLength={1}
            x1="24"
            y1="356"
            x2="406"
            y2="356"
            opacity="0.3"
            vectorEffect="non-scaling-stroke"
          />
          <g
            className="bp-draw"
            style={{ ["--d" as string]: "0.85s" }}
            opacity="0.7"
          >
            <circle
              cx="266"
              cy="356"
              r="10"
              pathLength={1}
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1="266"
              y1="342"
              x2="266"
              y2="370"
              pathLength={1}
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1="252"
              y1="356"
              x2="280"
              y2="356"
              pathLength={1}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>

        <g
          className="bp-fade"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        >
          {mobileTicks.map((x, i) => (
            <line
              key={`m${i}`}
              x1={x}
              y1="908"
              x2={x}
              y2={i % 4 === 0 ? 894 : 901}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        <g className="bp-fade" fill="currentColor" opacity="0.55">
          <text
            x="24"
            y="120"
            fontSize="11"
            letterSpacing="2"
            fontFamily="var(--font-sans), sans-serif"
          >
            28.0323°S · 48.6198°W
          </text>
          <text
            x="406"
            y="908"
            fontSize="11"
            letterSpacing="2"
            textAnchor="end"
            fontFamily="var(--font-sans), sans-serif"
          >
            CREA-SC 230125-6
          </text>
        </g>
      </svg>
    </>
  );
}
