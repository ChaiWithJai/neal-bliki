import { useCallback } from "react";
import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";

interface MagicCardProps {
  children?: ReactNode;
  className?: string;
  gradientSize?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  glowOpacity?: number;
}

export function MagicCard({
  children,
  className,
  gradientSize = 240,
  gradientFrom = "#4285f4",
  gradientTo = "#34a853",
  glowColor = "#fbbc05",
  glowOpacity = 0.1,
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const reset = useCallback(() => {
    const off = -gradientSize;
    mouseX.set(off);
    mouseY.set(off);
  }, [gradientSize, mouseX, mouseY]);

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  return (
    <motion.div
      className={cn(
        "group relative isolate overflow-hidden rounded-3xl border border-black/10 bg-white/95 shadow-[0_24px_80px_-50px_rgba(66,133,244,0.35)]",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{
        background: useMotionTemplate`
          linear-gradient(#ffffff 0 0) padding-box,
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientFrom}, ${gradientTo}, rgba(255, 255, 255, 0.55) 100%) border-box
        `,
      }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: useMotionTemplate`radial-gradient(${Math.round(gradientSize * 0.75)}px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 100%)`,
          opacity: glowOpacity,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
