#!/usr/bin/env python3
"""Generate maps/he.json from Hebrew marketing + legal overlays."""
from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from collagio_i18n.he_legal import PRIVACY_HE, TERMS_HE  # noqa: E402
from collagio_i18n.materialize import walk_paths, set_path  # noqa: E402

FIX = Path(__file__).resolve().parents[1] / "fix-collagio-locales.py"
spec = importlib.util.spec_from_file_location("fix_collagio_locales", FIX)
mod = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(mod)

EN = json.loads((ROOT / "messages" / "en.json").read_text(encoding="utf-8"))["collagio"]
HE = {**mod.HEBREW, "privacy": PRIVACY_HE, "terms": TERMS_HE}

he_map: dict[str, object] = {}
for path, en_val in walk_paths(EN):
    he_val = dict(walk_paths(HE))
    # walk_paths returns list; build dict
for path, en_val in dict(walk_paths(EN)).items() if False else []:
    pass

# build he value lookup
he_lookup = dict(walk_paths(HE))
en_lookup = dict(walk_paths(EN))
for path in en_lookup:
    if path in he_lookup and he_lookup[path] != en_lookup[path]:
        he_map[path] = he_lookup[path]
    elif path in he_lookup:
        he_map[path] = he_lookup[path]

maps_dir = Path(__file__).resolve().parent / "maps"
maps_dir.mkdir(exist_ok=True)
(maps_dir / "he.json").write_text(json.dumps(he_map, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"he.json — {len(he_map)} paths")
