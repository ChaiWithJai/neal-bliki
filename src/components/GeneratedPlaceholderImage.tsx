import { useState } from "react";

import { getPollinationsTextureUrl } from "@/lib/pollinations";

function stableHash(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

const STORY_QUOTES = [
  "Ship the lesson, not just the launch.",
  "Clarity converts faster than cleverness.",
  "Good process turns pressure into progress.",
  "Every fix should remove one real friction point.",
  "Momentum is built one finished page at a time.",
];

const KNOWLEDGE_QUOTES = [
  "Strong systems beat last-minute heroics.",
  "Measure, simplify, then scale.",
  "Practical beats perfect when users are waiting.",
  "If it is repeatable, it is reliable.",
  "Documentation is design for future decisions.",
];

export function GeneratedPlaceholderImage({
  title,
  kind,
  descriptor,
  localSrc,
}: {
  title: string;
  kind: "knowledge" | "story";
  descriptor: string;
  localSrc?: string;
}) {
  const fallbackUrl = getPollinationsTextureUrl({
    title: `${title} ${descriptor}`,
    kind,
    width: 1600,
    height: 900,
  });
  const [imageSrc, setImageSrc] = useState(localSrc || fallbackUrl);
  const pool = kind === "story" ? STORY_QUOTES : KNOWLEDGE_QUOTES;
  const quote = pool[stableHash(`${title}:${descriptor}:${kind}`) % pool.length];

  return (
    <figure className="group my-8 overflow-hidden rounded-2xl border border-black/10 bg-white">
      <div className="relative aspect-[16/9]">
        <img
          src={imageSrc}
          alt={`${kind} texture illustration for ${title}`}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => {
            if (imageSrc !== fallbackUrl) setImageSrc(fallbackUrl);
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-white/16" />
        <img
          src="/logo-neal-avatar-transparent-bg.webp"
          alt=""
          className="pointer-events-none absolute right-4 bottom-4 h-16 w-16 rounded-full object-cover mix-blend-multiply opacity-65 animate-datamosh transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <figcaption className="border-t border-black/10 bg-black/[0.02] px-4 py-3 text-xs tracking-wide text-[#4b5563]">
        <div>{descriptor}</div>
        <div className="mt-1 text-[11px] italic text-[#6b7280]">“{quote}”</div>
      </figcaption>
    </figure>
  );
}
