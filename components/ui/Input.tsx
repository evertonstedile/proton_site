"use client";

import { cn } from "@/lib/cn";
import { useId } from "react";
import type { ComponentPropsWithoutRef } from "react";

type BaseProps = {
  label: string;
  className?: string;
  hint?: string;
  error?: string;
};

const fieldClasses =
  "w-full rounded-lg border bg-bg-raised px-4 py-3 font-sans text-body text-fg placeholder:text-fg-muted/70 transition-colors duration-short ease-cinematic focus:outline-none";

// Sem token de erro no design-system (decisão D12): vermelho funcional discreto.
const errorRing = "border-[#E5736B] focus:border-[#E5736B]";
const normalRing = "border-line focus:border-accent";

/** Campo de texto (input ou textarea) com label, foco dourado e estado de erro. */
export function Input({
  label,
  hint,
  error,
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
  const errId = `${id}-err`;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="font-sans text-small font-medium text-fg-muted"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          className={cn(fieldClasses, error ? errorRing : normalRing, "resize-none")}
          {...(props as ComponentPropsWithoutRef<"textarea">)}
        />
      ) : (
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          className={cn(fieldClasses, error ? errorRing : normalRing)}
          {...props}
        />
      )}
      {error ? (
        <span id={errId} className="font-sans text-small text-[#E5736B]">
          {error}
        </span>
      ) : hint ? (
        <span className="font-sans text-small text-fg-muted">{hint}</span>
      ) : null}
    </div>
  );
}
