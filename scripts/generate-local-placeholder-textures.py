#!/usr/bin/env python3
import json
import random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src" / "data.json"
OUT_DIR = ROOT / "public" / "generated" / "placeholders"
OUT_DIR.mkdir(parents=True, exist_ok=True)

GOOGLE = [
    (66, 133, 244),   # blue
    (234, 67, 53),    # red
    (251, 188, 5),    # yellow
    (52, 168, 83),    # green
]


def stable_seed(text: str) -> int:
    h = 2166136261
    for ch in text:
        h ^= ord(ch)
        h = (h * 16777619) & 0xFFFFFFFF
    return h


def gradient_background(w: int, h: int, rng: random.Random) -> Image.Image:
    img = Image.new("RGB", (w, h), "white")
    px = img.load()
    ax = rng.uniform(-0.8, 0.8)
    ay = rng.uniform(-0.8, 0.8)

    for y in range(h):
        for x in range(w):
            t = (x / w) * 0.65 + (y / h) * 0.35
            t2 = (x / w) * ax + (y / h) * ay
            r = int(255 - 16 * t + 10 * t2)
            g = int(255 - 14 * t + 8 * t2)
            b = int(255 - 10 * t + 6 * t2)
            px[x, y] = (
                max(236, min(255, r)),
                max(236, min(255, g)),
                max(236, min(255, b)),
            )
    return img


def add_blobs(base: Image.Image, rng: random.Random) -> None:
    w, h = base.size
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay, "RGBA")

    for i in range(18):
        color = GOOGLE[i % 4]
        alpha = rng.randint(24, 56)
        cx = rng.randint(-120, w + 120)
        cy = rng.randint(-120, h + 120)
        rx = rng.randint(140, 520)
        ry = rng.randint(100, 380)
        draw.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=(*color, alpha))

    overlay = overlay.filter(ImageFilter.GaussianBlur(radius=26))
    base.paste(overlay, (0, 0), overlay)


def add_grid_and_glitch(base: Image.Image, rng: random.Random) -> None:
    w, h = base.size
    draw = ImageDraw.Draw(base, "RGBA")

    step = rng.randint(36, 52)
    for x in range(0, w, step):
        draw.line((x, 0, x, h), fill=(17, 17, 17, 14), width=1)
    for y in range(0, h, step):
        draw.line((0, y, w, y), fill=(17, 17, 17, 12), width=1)

    # datamosh-like channel strips
    for _ in range(26):
        y = rng.randint(0, h - 12)
        hh = rng.randint(4, 14)
        shift = rng.randint(-28, 28)
        color = GOOGLE[rng.randint(0, 3)]
        draw.rectangle((max(0, shift), y, w - 1, y + hh), fill=(*color, rng.randint(10, 28)))


def add_unique_motif(base: Image.Image, seed: int, rng: random.Random) -> None:
    w, h = base.size
    draw = ImageDraw.Draw(base, "RGBA")
    motif = seed % 4

    if motif == 0:
        for i in range(6):
            x = int((i + 1) * w / 7)
            draw.line((x, 80, x - 90, h - 220), fill=(*GOOGLE[i % 4], 56), width=5)
    elif motif == 1:
        for i in range(8):
            y = int((i + 1) * h / 10)
            draw.arc((120, y - 120, w - 120, y + 120), start=10, end=170, fill=(*GOOGLE[i % 4], 62), width=4)
    elif motif == 2:
        for i in range(16):
            x = rng.randint(80, w - 80)
            y = rng.randint(80, h - 220)
            s = rng.randint(20, 58)
            color = GOOGLE[i % 4]
            draw.rectangle((x - s, y - s, x + s, y + s), outline=(*color, 74), width=3)
    else:
        for i in range(10):
            x1 = rng.randint(0, w // 2)
            y1 = rng.randint(20, h - 260)
            x2 = rng.randint(w // 2, w)
            y2 = y1 + rng.randint(-60, 60)
            draw.line((x1, y1, x2, y2), fill=(*GOOGLE[i % 4], 62), width=4)


def add_title_band(base: Image.Image, label: str, descriptor: str) -> None:
    w, h = base.size
    draw = ImageDraw.Draw(base, "RGBA")
    draw.rounded_rectangle((36, h - 148, w - 36, h - 36), radius=20, fill=(255, 255, 255, 196), outline=(17, 17, 17, 32), width=2)
    draw.text((58, h - 132), label.upper(), fill=(17, 17, 17, 180))
    short = descriptor.strip()
    if len(short) > 86:
        short = short[:83] + "..."
    draw.text((58, h - 96), short, fill=(17, 17, 17, 205))


def make_texture(kind: str, item_id: str, idx: int, title: str, descriptor: str, out_path: Path) -> None:
    w, h = 1600, 900
    seed = stable_seed(f"{kind}:{item_id}:{idx}:{title}:{descriptor}")
    rng = random.Random(seed)
    base = gradient_background(w, h, rng)
    add_blobs(base, rng)
    add_grid_and_glitch(base, rng)
    add_unique_motif(base, seed, rng)
    add_title_band(base, kind, descriptor)
    base.save(out_path, format="WEBP", quality=84, method=6)


def iter_placeholders(data):
    for post in data.get("blog_stories", {}).get("posts", []):
        for i, block in enumerate(post.get("content_full", [])):
            if isinstance(block, str):
                t = block.strip()
                if t.startswith("[IMAGE:") and t.endswith("]"):
                    descriptor = t.replace("[IMAGE:", "").replace("]", "").strip()
                    yield "story", post["id"], i, post["title"], descriptor

    for node in data.get("wiki_nodes", {}).get("entities", []):
        for i, block in enumerate(node.get("content_full", [])):
            if isinstance(block, str):
                t = block.strip()
                if t.startswith("[IMAGE:") and t.endswith("]"):
                    descriptor = t.replace("[IMAGE:", "").replace("]", "").strip()
                    yield "knowledge", node["id"], i, node["title"], descriptor


def main():
    data = json.loads(DATA.read_text())
    count = 0
    for kind, item_id, idx, title, descriptor in iter_placeholders(data):
        filename = f"{kind}-{item_id}-{idx}.webp"
        out_path = OUT_DIR / filename
        make_texture(kind, item_id, idx, title, descriptor, out_path)
        count += 1
        print(f"generated {filename}")

    print(f"Generated {count} local placeholder textures in {OUT_DIR}")


if __name__ == "__main__":
    main()
