#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DATA_JSON="$ROOT_DIR/src/data.json"
OUT_DIR="$ROOT_DIR/public/generated/placeholders"
TMP_LIST="$ROOT_DIR/.generated/pollinations-placeholders.tsv"

mkdir -p "$OUT_DIR"
mkdir -p "$ROOT_DIR/.generated"

python3 - "$DATA_JSON" "$TMP_LIST" <<'PY'
import json,sys,urllib.parse
from pathlib import Path

data_path=Path(sys.argv[1])
out_path=Path(sys.argv[2])

def seed_for(s:str)->int:
    h=2166136261
    for ch in s:
        h ^= ord(ch)
        h = (h * 16777619) & 0xffffffff
    return abs(h) % 100000

with data_path.open() as f:
    data=json.load(f)

rows=[]

def maybe_add(kind,item_id,title,idx,text):
    t=text.strip()
    if not (t.startswith('[IMAGE:') and t.endswith(']')):
        return
    descriptor=t.replace('[IMAGE:','').replace(']','').strip()
    prompt=(
        f"{kind} editorial texture for {title}. {descriptor}. "
        "abstract layered paper grain, white background, exact Google accent colors "
        "#4285F4 #EA4335 #FBBC05 #34A853, modern web layout, subtle geometric flow, "
        "clean minimal, high contrast"
    )
    encoded=urllib.parse.quote(prompt,safe='')
    seed=seed_for(f"{kind}:{item_id}:{idx}:{descriptor}")
    if kind=='story':
        filename=f"story-{item_id}-{idx}.png"
    else:
        filename=f"knowledge-{item_id}-{idx}.png"
    url=(
        f"https://image.pollinations.ai/prompt/{encoded}?width=1600&height=900&seed={seed}&nologo=true"
    )
    rows.append((kind,item_id,str(idx),filename,url,descriptor))

for post in data.get('blog_stories',{}).get('posts',[]):
    for i,block in enumerate(post.get('content_full',[])):
        if isinstance(block,str):
            maybe_add('story',post['id'],post['title'],i,block)

for node in data.get('wiki_nodes',{}).get('entities',[]):
    for i,block in enumerate(node.get('content_full',[])):
        if isinstance(block,str):
            maybe_add('knowledge',node['id'],node['title'],i,block)

with out_path.open('w') as f:
    for r in rows:
        f.write('\t'.join(r)+'\n')

print(f"Prepared {len(rows)} image prompts")
PY

count=0
failed=0
while IFS=$'\t' read -r kind item_id idx filename url descriptor; do
  [ -n "$filename" ] || continue
  if [ -s "$OUT_DIR/$filename" ]; then
    echo "Skipping existing $filename"
    continue
  fi
  echo "Generating $filename"
  if curl -L --fail --silent --show-error \
    --connect-timeout 15 \
    --max-time 60 \
    --retry 2 \
    "$url" -o "$OUT_DIR/$filename"; then
    count=$((count+1))
  else
    echo "Failed $filename"
    rm -f "$OUT_DIR/$filename"
    failed=$((failed+1))
  fi
done < "$TMP_LIST"

echo "Generated $count images in $OUT_DIR"
if [ "$failed" -gt 0 ]; then
  echo "Failed images: $failed"
  exit 1
fi
