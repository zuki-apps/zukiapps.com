#!/usr/bin/env bash
# Wipe and re-copy Collagio marketing screenshots into public/images/collagio
set -euo pipefail
COLLAGIO="${COLLAGIO_REPO:-/Users/zukman/GIT/Collagio}"
SRC="$COLLAGIO/marketing/screenshots"
DST="$(cd "$(dirname "$0")/.." && pwd)/public/images/collagio"

mkdir -p "$DST"
rm -f "$DST"/*

copy() {
  local from="$1" to="$2"
  if [[ ! -f "$from" ]]; then
    echo "skip (missing): $from" >&2
    return 0
  fi
  cp "$from" "$DST/$to"
  echo "  $to"
}

echo "Hero / web strip:"
copy "$SRC/web/hero-phone-900w.png" hero-phone.png
copy "$SRC/web/feature-editor-640w.png" hero-editor.png
copy "$SRC/web/feature-export-640w.png" hero-export.png
copy "$SRC/web/feature-collage-result-640w.png" hero-collage-result.png
copy "$SRC/web/feature-layout-studio-640w.png" hero-layout-studio.png
copy "$SRC/web/feature-text-640w.png" hero-text.png

echo "App Store frames:"
copy "$SRC/app-store/01_home.png" screenshot-home.png
copy "$SRC/app-store/02_picker_layouts.png" screenshot-picker.png
copy "$SRC/app-store/03_editor.png" screenshot-editor.png
copy "$SRC/app-store/05_editor_stickers.png" screenshot-stickers.png
copy "$SRC/app-store/06_stickers_share.png" screenshot-stickers-share.png
copy "$SRC/app-store/07_export.png" screenshot-export.png
copy "$SRC/app-store/08_layout_studio.png" screenshot-layout-studio.png

echo "Device captures (optional real-device refs):"
copy "$SRC/raw/device/collage-export.png" device-collage-export.png

echo "Social / OG:"
OG_DST="$(cd "$(dirname "$0")/.." && pwd)/public/images/collagio"
copy "$SRC/social/og-1200x630.jpg" og-1200x630.jpg

echo "Done → $DST"
ls -la "$DST"
