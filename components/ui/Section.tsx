import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import type { PolymorphicTag, RenderableTag } from "@/lib/polymorphic";

type Surface = "base" | "surface" | "raised";

const surfaceMap: Record<Surface, string> = {
  base: "bg-bg",
  surface: "bg-bg-2",
  raised: "bg-bg-raised",
};

/** Seção com respiro vertical generoso (96–160px desktop) e fundo por token. */
export function Section({
  children,
  className,
  surface = "surface",
  as,
  id,
}: {
  children: ReactNode;
  className?: string;
  surface?: Surface;
  as?: PolymorphicTag;
  id?: string;
}) {
  const Tag = (as ?? "section") as unknown as RenderableTag;
  return (
    <Tag
      id={id}
      className={cn(
        "py-24 md:py-30 lg:py-38",
        surfaceMap[surface],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
