#!/usr/bin/env bash
# Copy Collagio marketing screenshots → public/images/collagio/
# Prefer raw/device captures (unique real screens); resize to 640w for the web gallery.
set -euo pipefail
COLLAGIO="${COLLAGIO_REPO:-/Users/zukman/GIT/Collagio}"
SRC="$COLLAGIO/marketing/screenshots"
DEVICE="$SRC/raw/device"
DST="$(cd "$(dirname "$0")/.." && pwd)/public/images/collagio"

mkdir -p "$DST"

resize640() {
  local from="$1" to="$2"
  if [[ ! -f "$from" ]]; then
    echo "skip (missing): $from" >&2
    return 0
  fi
  sips -Z 640 "$from" --out "$DST/$to" >/dev/null
  echo "  $to (640w)"
}

copy() {
  local from="$1" to="$2"
  if [[ ! -f "$from" ]]; then
    echo "skip (missing): $from" >&2
    return 0
  fi
  cp "$from" "$DST/$to"
  echo "  $to"
}

echo "Gallery screenshots (device captures):"
resize640 "$DEVICE/01-home.png" screenshot-home.png
resize640 "$DEVICE/02-picker.png" screenshot-picker.png
resize640 "$DEVICE/05-editor-stickers.png" screenshot-stickers.png
resize640 "$DEVICE/06-stickers-share.png" screenshot-stickers-share.png
resize640 "$DEVICE/07-export.png" screenshot-export.png
resize640 "$DEVICE/08-layout-studio.png" screenshot-layout-studio.png
resize640 "$DEVICE/collage-export.png" screenshot-collage-result.png

echo "Hero:"
copy "$SRC/web/hero-phone-900w.png" hero-phone.png

# Drop legacy duplicate if present
rm -f "$DST/screenshot-editor.png"

echo "Done → $DST"
ls -lh "$DST"
