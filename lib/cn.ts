/** Junta classes condicionalmente sem dependência externa (deps enxutas). */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
