#!/usr/bin/env python3
"""Materialize messages/collagio-locales/*.json from en.json + path-based locale maps."""
from __future__ import annotations

import json
import sys
from copy import deepcopy
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from collagio_i18n._merge import deep_merge  # noqa: E402
from collagio_i18n.path_maps import PATH_MAPS  # noqa: E402

LOCALES = ["he", "de", "ar", "fr", "es", "it", "pt", "ru", "ja", "ko", "zh"]
OUT = ROOT / "messages" / "collagio-locales"
EN = json.loads((ROOT / "messages" / "en.json").read_text(encoding="utf-8"))["collagio"]


def set_path(obj: dict[str, Any], path: str, value: Any) -> None:
    parts = path.split(".")
    cur: Any = obj
    for part in parts[:-1]:
        if part.isdigit():
            cur = cur[int(part)]
        else:
            cur = cur[part]
    last = parts[-1]
    if last.isdigit():
        cur[int(last)] = value
    else:
        cur[last] = value


def walk_paths(d: Any, prefix: str = "") -> list[tuple[str, Any]]:
    out: list[tuple[str, Any]] = []
    if isinstance(d, dict):
        for k, v in d.items():
            p = f"{prefix}.{k}" if prefix else k
            out.extend(walk_paths(v, p))
    elif isinstance(d, list):
        for i, v in enumerate(d):
            out.extend(walk_paths(v, f"{prefix}.{i}"))
    else:
        out.append((prefix, d))
    return out


def apply_map(en_tree: dict[str, Any], locale: str) -> dict[str, Any]:
    result = deepcopy(en_tree)
    mapping = PATH_MAPS.get(locale, {})
    for path, _ in walk_paths(en_tree):
        if path in mapping:
            set_path(result, path, mapping[path])
    return result


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for loc in LOCALES:
        merged = apply_map(EN, loc)
        path = OUT / f"{loc}.json"
        path.write_text(json.dumps(merged, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        mapped = len(PATH_MAPS.get(loc, {}))
        print(f"{loc}.json — {mapped} path overrides")


if __name__ == "__main__":
    main()
