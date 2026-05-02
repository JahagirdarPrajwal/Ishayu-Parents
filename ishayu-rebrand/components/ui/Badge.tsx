import { cn } from "@/lib/cn";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "moss" | "ink" | "ghost" | "petal" | "butter";
};

export function Badge({ tone = "moss", className, ...rest }: Props) {
  const map: Record<NonNullable<Props["tone"]>, string> = {
    moss: "bg-[var(--color-moss)] text-[var(--color-bg)]",
    ink: "bg-[var(--color-ink)] text-[var(--color-bg)]",
    petal: "bg-[var(--color-petal)] text-[var(--color-ink)]",
    butter: "bg-[var(--color-butter)] text-[var(--color-ink)]",
    ghost:
      "bg-transparent border border-[var(--color-ink)]/30 text-[var(--color-ink)]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] rounded-full",
        map[tone],
        className
      )}
      {...rest}
    />
  );
}
