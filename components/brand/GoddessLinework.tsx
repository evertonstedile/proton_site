import { BrandMark } from "@/components/brand/BrandMark";

/**
 * Watermark de seção — o símbolo oficial da marca (deusa + órbita) em baixa
 * opacidade. Use a opacidade/posição/tamanho via className (ex.: opacity-[0.05]).
 */
export function GoddessLinework({ className }: { className?: string }) {
  return <BrandMark decorative className={className} />;
}
