import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: ReactNode;
}

export const ShimmerButton = forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#4285f4",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "999px",
      background = "#ffffff",
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const cssVars: CSSProperties = {
      ...(style || {}),
      ["--spread" as string]: "90deg",
      ["--shimmer-color" as string]: shimmerColor,
      ["--radius" as string]: borderRadius,
      ["--speed" as string]: shimmerDuration,
      ["--cut" as string]: shimmerSize,
      ["--bg" as string]: background,
    };

    return (
      <button
        style={cssVars}
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-black/20 px-6 py-3 whitespace-nowrap text-black [background:var(--bg)]",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="@container-[size] absolute inset-0 -z-30 overflow-visible blur-[2px]">
          <div className="animate-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none]">
            <div className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
          </div>
        </div>

        {children}

        <div className="absolute inset-0 size-full rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_rgba(66,133,244,0.16)] transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_rgba(52,168,83,0.24)] group-active:shadow-[inset_0_-10px_10px_rgba(251,188,5,0.24)]" />
        <div className="absolute inset-(--cut) -z-20 [border-radius:var(--radius)] [background:var(--bg)]" />
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
