import { useRef } from "react";
import { useInView } from "motion/react";

import { cn } from "@/lib/utils";
import { getPollinationsTextureUrl } from "@/lib/pollinations";

export function TextureDatamosh({
  title,
  kind,
  className,
}: {
  title: string;
  kind: "knowledge" | "story";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10%" });
  const textureUrl = getPollinationsTextureUrl({ title, kind });

  return (
    <div ref={ref} className={cn("pointer-events-none absolute inset-0", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-cover bg-center transition-opacity duration-500",
          inView ? "opacity-28" : "opacity-0 group-hover:opacity-28"
        )}
        style={{ backgroundImage: `url(${textureUrl})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white/92"
      />
      <img
        src="/logo-neal-avatar-transparent-bg.webp"
        alt=""
        className={cn(
          "absolute right-4 bottom-3 h-12 w-12 rounded-full object-cover mix-blend-multiply transition-all duration-300",
          inView
            ? "opacity-50 animate-datamosh"
            : "opacity-0 group-hover:opacity-50 group-hover:animate-datamosh"
        )}
        loading="lazy"
      />
    </div>
  );
}
