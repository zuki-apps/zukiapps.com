#!/usr/bin/env python3
"""Translate missing app overlay strings from English into locale JSON files."""
from __future__ import annotations

import json
import re
import sys
import time
from copy import deepcopy
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
APPS_DIR = ROOT / "messages" / "apps"
SHARED_DIR = ROOT / "messages" / "shared"
CACHE = Path(__file__).resolve().parent / "overlay_maps"
LOCALES = ["he", "de", "ar", "fr", "es", "it", "pt", "ru", "ja", "ko", "zh"]
LANG = {"he": "iw", "de": "de", "ar": "ar", "fr": "fr", "es": "es", "it": "it", "pt": "pt", "ru": "ru", "ja": "ja", "ko": "ko", "zh": "zh-CN"}

KEEP = re.compile(
    r"(Zuki Apps|ZuList|Collagio|ToldYa|Hush Gallery|Whistle Camera|Bit Scope|"
    r"Sudoku Fun Go|Google Play|App Store|Firebase|Game Center|Play Games|"
    r"WhatsApp|iMessage|Instagram|Layout Studio|Zuli Monsters|Premium|"
    r"com\.zuki\.|zuki\.apps\.|zukiapps\.com|Nachshol 36|support@zukiapps\.com|"
    r"iOS|Android|RTL|PNG|CSV|GPX|GeoJSON|GPS|GNSS|CSAE|ATT|FAQ)",
    re.I,
)

# Apps: full overlay gap sync (missing or same-as-English → re-translate)
FULL_SYNC_APPS = frozenset({
    "toldya",
    "dreambit-legacy",
    "football-trivia",
    "sudoku-puzzle",
    "tempo-lab-pro",
    "whistle-camera",
    "zulist",
    "power-interval-timer",
    "bit-scope",
    "fun-facts-trivia",
    "track-ledger",
    "noise-meter-shusher",
    "paratrooper-blitz",
    "hush-gallery",
})

# Apps / subtrees to force-sync (full subtree from en → overlay)
FORCE_SUBTREES: dict[str, list[str]] = {
    "collagio": ["collagio.hero", "collagio.download", "collagio.status"],
    "whistle-camera": [
        "whistleCamera.features.calibration",
        "whistleCamera.manual",
        "whistleCamera.screenshots",
        "whistleCamera.support.faq",
        "whistleCamera.faq",
        "whistleCamera.tips",
    ],
    "paratrooper-blitz": ["paratrooperBlitz.support"],
    "track-ledger": ["trackLedger.support"],
    "noise-meter-shusher": ["noiseMeterShusher.support"],
    "toldya": ["toldya.hero", "toldya.support", "toldya.childSafety"],
}

# Meta keys to sync for apps with localized SEO fields
META_APPS: dict[str, str] = {
    "zulist": "zulist",
    "sudoku-puzzle": "sudokuPuzzle",
    "bit-scope": "bitScope",
    "football-trivia": "footballTrivia",
    "power-interval-timer": "powerIntervalTimer",
    "tempo-lab-pro": "tempoLabPro",
    "hush-gallery": "hushGallery",
    "whistle-camera": "whistleCamera",
    "fun-facts-trivia": "funFactsTrivia",
    "paratrooper-blitz": "paratrooperBlitz",
    "track-ledger": "trackLedger",
    "noise-meter-shusher": "noiseMeterShusher",
    "toldya": "toldya",
    "collagio": "collagio",
}


def deep_merge(base: dict, override: dict) -> dict:
    out = deepcopy(base)
    for k, v in override.items():
        if k in out and isinstance(out[k], dict) and isinstance(v, dict):
            out[k] = deep_merge(out[k], v)
        else:
            out[k] = deepcopy(v)
    return out


def get_at(node: Any, parts: list[str]) -> Any:
    cur = node
    for p in parts:
        if not isinstance(cur, dict) or p not in cur:
            return None
        cur = cur[p]
    return cur


def set_at(node: dict, parts: list[str], value: Any) -> None:
    cur = node
    for p in parts[:-1]:
        cur = cur.setdefault(p, {})
    cur[parts[-1]] = value


def walk_leaves(node: Any, prefix: str = "") -> list[tuple[str, str]]:
    out: list[tuple[str, str]] = []
    if isinstance(node, dict):
        for k, v in node.items():
            p = f"{prefix}.{k}" if prefix else k
            out.extend(walk_leaves(v, p))
    elif isinstance(node, list):
        for i, v in enumerate(node):
            out.extend(walk_leaves(v, f"{prefix}[{i}]"))
    elif isinstance(node, str):
        out.append((prefix, node))
    return out


def should_skip(value: str) -> bool:
    if not value or value.isdigit():
        return True
    if value.startswith(("http", "/images/", "mailto:")):
        return True
    if "@" in value and "gmail.com" in value:
        return True
    return False


def protect_terms(text: str) -> tuple[str, list[tuple[str, str]]]:
    reps: list[tuple[str, str]] = []

    def repl(m: re.Match[str]) -> str:
        t = f"⟦{len(reps)}⟧"
        reps.append((t, m.group(0)))
        return t

    return KEEP.sub(repl, text), reps


def restore_terms(text: str, reps: list[tuple[str, str]]) -> str:
    for token, orig in reps:
        text = text.replace(token, orig)
    for i, (_, orig) in enumerate(reps):
        text = re.sub(rf"⟦{i}⟧|__\w*{i}__", orig, text)
    return text


def translate_batch(strings: list[str], target: str) -> dict[str, str]:
    from deep_translator import GoogleTranslator
    from deep_translator.exceptions import TranslationNotFound

    tr = GoogleTranslator(source="en", target=target)
    out: dict[str, str] = {}
    for i in range(0, len(strings), 25):
        batch = strings[i : i + 25]
        protected, metas = [], []
        for s in batch:
            p, m = protect_terms(s)
            protected.append(p)
            metas.append(m)
        try:
            res = tr.translate_batch(protected)
        except (TranslationNotFound, Exception):
            res = []
            for p in protected:
                try:
                    res.append(tr.translate(p))
                except Exception:
                    res.append(p)
                time.sleep(0.12)
        for src, tgt, meta in zip(batch, res, metas):
            out[src] = restore_terms(tgt or src, meta)
        time.sleep(0.3)
    return out


def subtree_paths(en_ns: dict, prefix: str) -> list[tuple[str, str]]:
    parts = prefix.split(".")
    node = get_at(en_ns, parts)
    if node is None:
        return []
    if len(parts) == 1:
        return walk_leaves({parts[0]: node})
    return [(f"{prefix}.{p}" if not p.startswith(parts[-1]) else p, v) for p, v in walk_leaves(node, prefix)]


def set_by_path(root: dict, path: str, value: Any) -> None:
    """Set value at dotted path with optional [index] segments."""
    parts = path.split(".")
    ns = parts[0]
    cur: Any = root.setdefault(ns, {})
    for part in parts[1:-1]:
        m = re.match(r"^(\w+)\[(\d+)\]$", part)
        if m:
            key, idx = m.group(1), int(m.group(2))
            arr = cur.setdefault(key, [])
            while len(arr) <= idx:
                arr.append({})
            cur = arr[idx]
        else:
            cur = cur.setdefault(part, {})
    last = parts[-1]
    m = re.match(r"^(\w+)\[(\d+)\]$", last)
    if m:
        key, idx = m.group(1), int(m.group(2))
        arr = cur.setdefault(key, [])
        while len(arr) <= idx:
            arr.append({})
        arr[idx] = value
    else:
        cur[last] = value


def collect_force_strings(en_app: dict, app_slug: str) -> list[tuple[str, str]]:
    leaves: list[tuple[str, str]] = []
    for prefix in FORCE_SUBTREES.get(app_slug, []):
        parts = prefix.split(".")
        node: Any = en_app
        for p in parts:
            node = node.get(p, {}) if isinstance(node, dict) else {}
        if node:
            leaves.extend(walk_leaves(node, prefix))
    return leaves


def collect_missing_faq(en_app: dict, overlay: dict, ns: str) -> list[tuple[str, str]]:
    en_faq = en_app.get(ns, {}).get("faq", {}).get("items", [])
    ov_faq = overlay.get(ns, {}).get("faq", {}).get("items", [])
    missing: list[tuple[str, str]] = []
    for i, item in enumerate(en_faq):
        ov_item = ov_faq[i] if i < len(ov_faq) else {}
        if not ov_item.get("question") or ov_item.get("question") == item["question"]:
            missing.append((f"{ns}.faq.items[{i}].question", item["question"]))
        if not ov_item.get("answer") or ov_item.get("answer") == item["answer"]:
            missing.append((f"{ns}.faq.items[{i}].answer", item["answer"]))
    return missing


def collect_all_missing(en_app: dict, overlay: dict) -> list[tuple[str, str]]:
    """Paths present in en but absent from overlay (any namespace root in en)."""
    missing: list[tuple[str, str]] = []
    for ns, en_ns in en_app.items():
        if not isinstance(en_ns, dict):
            continue
        ov_ns = overlay.get(ns, {}) if isinstance(overlay.get(ns), dict) else {}
        en_leaves = {p: v for p, v in walk_leaves({ns: en_ns})}
        ov_leaves = {p: v for p, v in walk_leaves({ns: ov_ns}) if ov_ns}
        for path, val in en_leaves.items():
            if not isinstance(val, str) or should_skip(val):
                continue
            ov_val = ov_leaves.get(path)
            if ov_val is None or ov_val == val:
                missing.append((path, val))
    return missing


def apply_translations_to_overlay(overlay: dict, paths: list[tuple[str, str]], smap: dict[str, str]) -> dict:
    out = deepcopy(overlay)
    for path, src in paths:
        if src not in smap:
            continue
        set_by_path(out, path, smap[src])
    return out


def sync_shared_messages() -> None:
    """Translate missing keys in messages/shared/{locale}.json from shared/en.json."""
    en_path = SHARED_DIR / "en.json"
    en_shared = json.loads(en_path.read_text(encoding="utf-8"))
    en_leaves = {p: v for p, v in walk_leaves(en_shared) if isinstance(v, str) and not should_skip(v)}

    shared_keys = [
        p
        for p in en_leaves
        if p.startswith(("home.aboutTeaser.", "home.seoTitle", "home.metaDescription", "home.footer.about", "about."))
    ]

    for loc in LOCALES:
        loc_path = SHARED_DIR / f"{loc}.json"
        overlay = json.loads(loc_path.read_text(encoding="utf-8")) if loc_path.exists() else {}
        ov_leaves = {p: v for p, v in walk_leaves(overlay) if isinstance(v, str)}

        to_translate: list[tuple[str, str]] = []
        for path in shared_keys:
            src = en_leaves[path]
            ov_val = ov_leaves.get(path)
            if ov_val is None or ov_val == src:
                to_translate.append((path, src))

        if not to_translate:
            continue

        cache_file = CACHE / f"shared_{loc}.json"
        strings = sorted({v for _, v in to_translate})
        if cache_file.exists():
            smap = json.loads(cache_file.read_text(encoding="utf-8"))
            missing_strings = [s for s in strings if s not in smap]
            if missing_strings:
                print(f"Translating shared/{loc}: {len(missing_strings)} new strings...", flush=True)
                smap.update(translate_batch(missing_strings, LANG[loc]))
                cache_file.write_text(json.dumps(smap, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        else:
            print(f"Translating shared/{loc}: {len(strings)} strings...", flush=True)
            smap = translate_batch(strings, LANG[loc])
            cache_file.write_text(json.dumps(smap, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

        overlay = apply_translations_to_overlay(overlay, to_translate, smap)
        loc_path.write_text(json.dumps(overlay, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"Updated shared/{loc}.json ({len(to_translate)} paths)", flush=True)


def main() -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    targets = set(sys.argv[1:]) if len(sys.argv) > 1 else None

    if targets is None or "shared" in targets:
        sync_shared_messages()
        if targets == {"shared"}:
            return

    for app_dir in sorted(APPS_DIR.iterdir()):
        if not app_dir.is_dir():
            continue
        app_slug = app_dir.name
        if targets and app_slug not in targets:
            continue
        en_path = app_dir / "en.json"
        if not en_path.exists():
            continue
        en_app = json.loads(en_path.read_text(encoding="utf-8"))

        for loc in LOCALES:
            loc_path = app_dir / f"{loc}.json"
            overlay = json.loads(loc_path.read_text(encoding="utf-8")) if loc_path.exists() else {}

            to_translate: list[tuple[str, str]] = []
            to_translate.extend(collect_force_strings(en_app, app_slug))

            if app_slug in META_APPS:
                ns = META_APPS[app_slug]
                for key in (
                    "support.metaTitle",
                    "support.metaDescription",
                    "privacy.metaDescription",
                    "childSafety.metaDescription",
                ):
                    parts = key.split(".")
                    node = en_app.get(ns, {})
                    for p in parts:
                        node = node.get(p, {}) if isinstance(node, dict) else None
                    if isinstance(node, str) and not should_skip(node):
                        to_translate.append((f"{ns}.{key}", node))

            ns_keys = [k for k in en_app if isinstance(en_app[k], dict)]
            if app_slug in ("hush-gallery", "collagio", "toldya"):
                for ns in ns_keys:
                    to_translate.extend(collect_missing_faq(en_app, overlay, ns))
            if app_slug in FULL_SYNC_APPS:
                to_translate.extend(collect_all_missing(en_app, overlay))

            # dedupe by english source string
            seen_paths: set[str] = set()
            unique: list[tuple[str, str]] = []
            for path, val in to_translate:
                if path in seen_paths or should_skip(val):
                    continue
                seen_paths.add(path)
                unique.append((path, val))

            if not unique:
                continue

            cache_file = CACHE / f"{app_slug}_{loc}.json"
            strings = sorted({v for _, v in unique})
            if cache_file.exists():
                smap = json.loads(cache_file.read_text(encoding="utf-8"))
                missing_strings = [s for s in strings if s not in smap]
                if missing_strings:
                    print(f"Translating {app_slug}/{loc}: {len(missing_strings)} new strings...", flush=True)
                    smap.update(translate_batch(missing_strings, LANG[loc]))
                    cache_file.write_text(json.dumps(smap, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            else:
                print(f"Translating {app_slug}/{loc}: {len(strings)} strings...", flush=True)
                smap = translate_batch(strings, LANG[loc])
                cache_file.write_text(json.dumps(smap, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

            overlay = apply_translations_to_overlay(overlay, unique, smap)
            loc_path.write_text(json.dumps(overlay, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            print(f"Updated {app_slug}/{loc}.json ({len(unique)} paths)", flush=True)


if __name__ == "__main__":
    main()
