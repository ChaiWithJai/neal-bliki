#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC_DIR="$ROOT_DIR/public"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install ffmpeg and rerun."
  exit 1
fi

echo "Optimizing raster images in $PUBLIC_DIR"

# Keep compatibility-critical icons as PNG. Convert content imagery to WebP.
find "$PUBLIC_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) \
  ! -name "favicon-*.png" \
  ! -name "apple-touch-icon.png" \
  ! -name "android-chrome-192x192.png" \
  ! -name "android-chrome-512x512.png" \
  -print0 | while IFS= read -r -d '' src; do
  out="${src%.*}.webp"
  ffmpeg -y -loglevel error -i "$src" \
    -c:v libwebp -q:v 78 -compression_level 6 -preset picture \
    -an "$out"
  echo "webp: ${out#$ROOT_DIR/}"
done

echo "Done."
