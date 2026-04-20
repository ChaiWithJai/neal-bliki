import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface AnimatedGradientTextProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
  [key: string]: unknown;
}

export function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = "#4285f4",
  colorTo = "#ea4335",
  style,
  ...props
}: AnimatedGradientTextProps) {
  const cssVars: CSSProperties = {
    ...(style || {}),
    ["--bg-size" as string]: `${speed * 300}%`,
    ["--color-from" as string]: colorFrom,
    ["--color-to" as string]: colorTo,
  };

  return (
    <span
      style={cssVars}
      className={cn(
        "animate-gradient inline bg-linear-to-r from-(--color-from) via-(--color-to) to-(--color-from) bg-size-[var(--bg-size)_100%] bg-clip-text text-transparent",
        className
      )}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </span>
  );
}
