/* eslint-disable @next/next/no-img-element */

/**
 * Símbolo oficial da Proton (deusa + órbita atômica), dourado.
 * SVG transparente recortado — funciona sobre fundos escuros (a figura escura
 * funde com o preto, deixando a silhueta da deusa em negativo no disco dourado).
 * Usamos <img> (não next/image) por ser SVG vetorial escalado por className.
 */
export function BrandMark({
  className,
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <img
      src="/brand/marca.svg"
      alt={decorative ? "" : "Proton Engenharia"}
      aria-hidden={decorative || undefined}
      className={className}
      draggable={false}
    />
  );
}
