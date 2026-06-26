#!/usr/bin/env python3
"""Build messages/collagio-locales/{locale}.json from en.json + locale overlays."""
from __future__ import annotations

import importlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from collagio_i18n._merge import deep_merge  # noqa: E402

LOCALES = ["he", "de", "ar", "fr", "es", "it", "pt", "ru", "ja", "ko", "zh"]
OUT_DIR = ROOT / "messages" / "collagio-locales"
EN_COLLAGIO = json.loads((ROOT / "messages" / "en.json").read_text(encoding="utf-8"))["collagio"]


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for loc in LOCALES:
        mod = importlib.import_module(f"collagio_i18n.overlays.{loc}")
        overlay = mod.OVERLAY
        merged = deep_merge(EN_COLLAGIO, overlay)
        path = OUT_DIR / f"{loc}.json"
        path.write_text(json.dumps(merged, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"Wrote {path.name} ({len(json.dumps(merged))} bytes)")


if __name__ == "__main__":
    main()
