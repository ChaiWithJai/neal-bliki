import { useMemo, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useInView } from "motion/react";

import { cn } from "@/lib/utils";

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket";

interface HighlighterProps {
  children: ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
  className?: string;
}

export function Highlighter({
  children,
  action = "highlight",
  color = "rgba(251, 188, 5, 0.45)",
  strokeWidth = 2,
  padding = 2,
  isView = false,
  className,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-10%" });
  const shouldShow = !isView || isInView;

  const styles = useMemo<CSSProperties>(() => {
    if (!shouldShow) return { opacity: 0.35 };

    switch (action) {
      case "underline":
        return {
          textDecoration: `underline ${color}`,
          textDecorationThickness: `${strokeWidth}px`,
          textUnderlineOffset: "3px",
        };
      case "box":
        return { boxShadow: `0 0 0 ${strokeWidth}px ${color} inset`, borderRadius: 6, padding };
      case "circle":
        return {
          boxShadow: `0 0 0 ${strokeWidth}px ${color} inset`,
          borderRadius: 999,
          padding: `0 ${padding + 3}px`,
        };
      case "strike-through":
        return {
          textDecoration: `line-through ${color}`,
          textDecorationThickness: `${strokeWidth}px`,
        };
      case "crossed-off":
        return {
          textDecoration: `line-through ${color}`,
          textDecorationThickness: `${strokeWidth}px`,
          backgroundImage: `linear-gradient(transparent 56%, ${color} 56%)`,
        };
      case "bracket":
        return {
          borderLeft: `${strokeWidth}px solid ${color}`,
          borderRight: `${strokeWidth}px solid ${color}`,
          padding: `0 ${padding + 4}px`,
        };
      case "highlight":
      default:
        return {
          backgroundImage: `linear-gradient(transparent 56%, ${color} 56%)`,
          borderRadius: 4,
          padding: `0 ${padding}px`,
        };
    }
  }, [action, color, strokeWidth, padding, shouldShow]);

  return (
    <span ref={elementRef} className={cn("relative inline", className)} style={styles}>
      {children}
    </span>
  );
}
