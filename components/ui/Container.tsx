import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Container central com gutters generosos (máx ~1280px de conteúdo). */
export function Container({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        wide ? "max-w-container" : "max-w-content",
        className,
      )}
    >
      {children}
    </div>
  );
}
