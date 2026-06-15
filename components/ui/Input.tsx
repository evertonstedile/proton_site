"use client";

import { cn } from "@/lib/cn";
import { useId } from "react";
import type { ComponentPropsWithoutRef } from "react";

type BaseProps = {
  label: string;
  className?: string;
  hint?: string;
};

const fieldClasses =
  "w-full rounded-lg border border-line bg-bg-raised px-4 py-3 font-sans text-body text-text-body placeholder:text-text-muted/70 transition-colors duration-short ease-cinematic focus:border-gold-base focus:outline-none";

/** Campo de texto (input ou textarea) com label e foco dourado. */
export function Input({
  label,
  hint,
  className,
  multiline,
  rows = 4,
  ...props
}: BaseProps &
  Omit<ComponentPropsWithoutRef<"input">, "className"> & {
    multiline?: boolean;
    rows?: number;
  }) {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="font-sans text-small font-medium text-text-muted"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          className={cn(fieldClasses, "resize-none")}
          {...(props as ComponentPropsWithoutRef<"textarea">)}
        />
      ) : (
        <input id={id} className={fieldClasses} {...props} />
      )}
      {hint ? (
        <span className="font-sans text-small text-text-muted">{hint}</span>
      ) : null}
    </div>
  );
}
