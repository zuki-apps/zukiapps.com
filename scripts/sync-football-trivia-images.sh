#!/usr/bin/env bash
# Copy Football Trivia marketing screenshots → public/images/football-trivia/
set -euo pipefail
REPO="${FOOTBALL_TRIVIA_REPO:-/Users/zukman/GIT/FootballTrivia}"
SRC="$REPO/marketing/screenshots/device"
DST="$(cd "$(dirname "$0")/.." && pwd)/public/images/football-trivia"

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

echo "Football Trivia screenshots:"
resize640 "$SRC/01-home.png" screenshot-home.png
resize640 "$SRC/02-category.png" screenshot-category.png
resize640 "$SRC/03-game.png" screenshot-game.png
resize640 "$SRC/04-results.png" screenshot-results.png
resize640 "$SRC/05-leaderboard.png" screenshot-leaderboard.png
resize640 "$SRC/06-stats.png" screenshot-stats.png
resize640 "$SRC/07-settings.png" screenshot-settings.png

ICON_SRC="$REPO/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-1024x1024@1x.png"
if [[ -f "$ICON_SRC" ]]; then
  sips -Z 512 "$ICON_SRC" --out "$(dirname "$0")/../public/images/football-trivia-icon.png" >/dev/null
  echo "  football-trivia-icon.png (512w)"
fi

echo "Done → $DST"
ls -lh "$DST"
