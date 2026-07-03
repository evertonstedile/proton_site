import type { Ref, ReactNode } from "react";

// Tag polimórfica p/ prop `as` (Section/Reveal/SplitReveal).
// Por que NÃO usar React.ElementType: o @react-three/fiber v9 mescla ~200
// elementos three em JSX.IntrinsicElements; o ElementType do @types/react@19
// enumera essa união e, num <Tag> polimórfico, os props colapsam para `never`.
// Restringir a tags HTML mantém o `as` seguro (aceita "h2", "section", …) e
// imune à poluição global de tipos que o R3F introduz.
export type PolymorphicTag = keyof HTMLElementTagNameMap;

// Forma da tag para RENDERIZAR com ref genérico: a união crua de refs por tag
// (HTMLObjectElement etc.) explode em JSX; este alias aceita ref de HTMLElement.
export type RenderableTag = (props: {
  children?: ReactNode;
  className?: string;
  id?: string;
  ref?: Ref<HTMLElement>;
}) => ReactNode;
