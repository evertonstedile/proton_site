import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Variant = "gold" | "muted";

const variants: Record<Variant, string> = {
  gold: "border-line-gold text-gold-light",
  muted: "border-line text-text-muted",
};

/** Tag/badge — caixa-alta, tracking aberto, borda por token. */
export function Tag({
  children,
  variant = "muted",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-sans text-[0.7rem] uppercase tracking-[0.18em]",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
