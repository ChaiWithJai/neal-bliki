function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

export function getPollinationsTextureUrl({
  title,
  kind,
  width = 1280,
  height = 720,
}: {
  title: string;
  kind: "knowledge" | "story";
  width?: number;
  height?: number;
}) {
  const seed = hashString(`${kind}:${title}`) % 100000;
  const prompt = `${kind} editorial texture for ${title}, abstract layered paper grain, white background, exact Google accent colors #4285F4 #EA4335 #FBBC05 #34A853, modern web layout, subtle geometric flow, high contrast, clean minimal`;
  const encodedPrompt = encodeURIComponent(prompt);

  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
}
