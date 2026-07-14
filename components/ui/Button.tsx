import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-medium uppercase tracking-[0.12em] rounded-full transition-all duration-short ease-cinematic focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "text-small px-6 py-3",
  lg: "text-small md:text-body px-8 py-4",
};

const variants: Record<Variant, string> = {
  // dourado metálico nos momentos grandes; texto sobre dourado nunca preto puro
  primary:
    "bg-accent-metallic text-on-accent hover:brightness-110 hover:-translate-y-0.5 shadow-[0_8px_30px_-12px_rgba(210,172,98,0.6)]",
  // ghost: borda branca → vira dourada no hover
  ghost:
    "border border-line text-fg hover:border-accent hover:text-accent",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  (
    | ({ href?: undefined } & Omit<
        ComponentPropsWithoutRef<"button">,
        keyof CommonProps
      >)
    | ({ href: string } & Omit<
        ComponentPropsWithoutRef<typeof Link>,
        keyof CommonProps | "href"
      >)
  );

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } =
    props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if ("href" in rest && rest.href) {
    return (
      <Link className={classes} {...(rest as ComponentPropsWithoutRef<typeof Link>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
