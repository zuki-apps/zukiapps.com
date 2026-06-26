#!/usr/bin/env bash
# Resize product screenshot PNGs to 640px max edge (web gallery size). Safe to re-run.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)/public/images"
MAX=640

compress_dir() {
  local dir="$1"
  [[ -d "$dir" ]] || return 0
  echo "==> $(basename "$dir")"
  local f before after total_before=0 total_after=0
  for f in "$dir"/screenshot*.png "$dir"/*-screenshot*.png; do
    [[ -f "$f" ]] || continue
    before=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f")
    total_before=$((total_before + before))
    sips -Z "$MAX" "$f" >/dev/null
    after=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f")
    total_after=$((total_after + after))
    echo "  $(basename "$f"): $((before/1024))KB → $((after/1024))KB"
  done
  if [[ $total_before -gt 0 ]]; then
    echo "  total: $((total_before/1024))KB → $((total_after/1024))KB"
  fi
}

for slug in fun-facts-trivia tempo-lab-pro noise-meter-shusher; do
  compress_dir "$ROOT/$slug"
done

echo "Done."
