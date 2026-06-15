import { cn } from "@/lib/cn";

type GoddessLineworkProps = {
  className?: string;
};

/**
 * ⚠️ PLACEHOLDER — linework dourado da "deusa" (assinatura de marca).
 * O asset oficial ainda não está na pasta (ver PENDENCIAS.md). Este é um
 * linework abstrato de marca-d'água até o vetor real ser fornecido.
 * Uso: watermark gigante em baixa opacidade (~4–6%) como textura de seção.
 */
export function GoddessLinework({ className }: GoddessLineworkProps) {
  return (
    <svg
      viewBox="0 0 200 300"
      aria-hidden="true"
      className={cn("text-gold-base", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
    >
      {/* figura abstrata — arcos concêntricos + eixo vertical (placeholder) */}
      <line x1="100" y1="10" x2="100" y2="290" />
      <circle cx="100" cy="60" r="34" />
      <path d="M40 130 Q100 90 160 130" />
      <path d="M30 180 Q100 120 170 180" />
      <path d="M40 230 Q100 160 160 230" />
      <path d="M55 280 Q100 210 145 280" />
      <ellipse cx="100" cy="150" rx="70" ry="120" />
    </svg>
  );
}
