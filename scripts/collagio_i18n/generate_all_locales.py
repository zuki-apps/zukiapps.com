#!/usr/bin/env python3
"""Generate messages/collagio-locales/*.json from en.json + Hebrew hand-off + MT for other locales."""
from __future__ import annotations

import importlib.util
import json
import re
import sys
import time
from copy import deepcopy
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "messages" / "collagio-locales"
CACHE = Path(__file__).resolve().parent / "maps"
FIX = Path(__file__).resolve().parents[1] / "fix-collagio-locales.py"

LOCALES_MT = ["de", "ar", "fr", "es", "it", "pt", "ru", "ja", "ko", "zh"]
LANG_CODE = {
    "de": "de",
    "ar": "ar",
    "fr": "fr",
    "es": "es",
    "it": "it",
    "pt": "pt",
    "ru": "ru",
    "ja": "ja",
    "ko": "ko",
    "zh": "zh-CN",
}

KEEP_LITERAL = re.compile(
    r"(Collagio|Zuli Monsters|Zuki Apps|WhatsApp|iMessage|Instagram|Layout Studio|"
    r"Google Play|App Store|Premium|Firebase|Crashlytics|iOS|Android|RTL|PNG|"
    r"com\.zuki\.apps\.collagio|collagio\.remove_watermark|zuki\.apps\.dev@gmail\.com|"
    r"Nachshol 36|zukiapps\.com|public/collagio/faq\.md|/images/collagio/)",
    re.I,
)


def should_skip_translate(value: str) -> bool:
    if not value or value.isdigit():
        return True
    if value.startswith("/images/") or value.startswith("http"):
        return True
    if "@" in value and "gmail.com" in value:
        return True
    if value in {"features", "home", "picker", "stickers", "export", "layoutStudio", "stickersShare", "collageResult"}:
        return True
    return False


def walk_strings(node: Any):
    if isinstance(node, dict):
        for v in node.values():
            yield from walk_strings(v)
    elif isinstance(node, list):
        for v in node:
            yield from walk_strings(v)
    elif isinstance(node, str):
        yield node


def apply_string_map(node: Any, smap: dict[str, str]) -> Any:
    if isinstance(node, dict):
        return {k: apply_string_map(v, smap) for k, v in node.items()}
    if isinstance(node, list):
        return [apply_string_map(v, smap) for v in node]
    if isinstance(node, str):
        return smap.get(node, node)
    return node


def protect_terms(text: str) -> tuple[str, list[tuple[str, str]]]:
    replacements: list[tuple[str, str]] = []

    def repl(match: re.Match[str]) -> str:
        token = f"⟦{len(replacements)}⟧"
        replacements.append((token, match.group(0)))
        return token

    protected = KEEP_LITERAL.sub(repl, text)
    return protected, replacements


def restore_terms(text: str, replacements: list[tuple[str, str]]) -> str:
    for token, original in replacements:
        text = text.replace(token, original)
    # Google sometimes mutates placeholder tokens — restore by index.
    for i, (_, original) in enumerate(replacements):
        text = re.sub(rf"⟦{i}⟧|__\w*{i}__", original, text)
    return text


def repair_string_map(smap: dict[str, str]) -> dict[str, str]:
    """Fix cached maps where MT mangled brand placeholders."""
    out: dict[str, str] = {}
    for src, tgt in smap.items():
        _, meta = protect_terms(src)
        out[src] = restore_terms(tgt, meta)
    return out


def translate_batch(strings: list[str], target: str) -> dict[str, str]:
    from deep_translator import GoogleTranslator
    from deep_translator.exceptions import TranslationNotFound

    translator = GoogleTranslator(source="en", target=target)
    out: dict[str, str] = {}
    batch_size = 20
    for i in range(0, len(strings), batch_size):
        batch = strings[i : i + batch_size]
        protected_batch: list[str] = []
        batch_meta: list[list[tuple[str, str]]] = []
        for s in batch:
            p, meta = protect_terms(s)
            protected_batch.append(p)
            batch_meta.append(meta)
        try:
            translated = translator.translate_batch(protected_batch)
        except (TranslationNotFound, Exception):
            time.sleep(1)
            translated = []
            for p in protected_batch:
                try:
                    translated.append(translator.translate(p))
                except (TranslationNotFound, Exception):
                    translated.append(p)
                time.sleep(0.15)
        for src, tgt, meta in zip(batch, translated, batch_meta):
            out[src] = restore_terms(tgt or src, meta)
        time.sleep(0.35)
    return out


def load_hebrew_tree() -> dict[str, Any]:
    from collagio_i18n.he_legal import PRIVACY_HE, TERMS_HE  # noqa: WPS433

    spec = importlib.util.spec_from_file_location("fix_collagio_locales", FIX)
    mod = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(mod)
    return {**mod.HEBREW, "privacy": PRIVACY_HE, "terms": TERMS_HE}


def build_he_map(en_tree: dict[str, Any], he_tree: dict[str, Any]) -> dict[str, str]:
    en_strings = list(walk_strings(en_tree))
    he_strings = list(walk_strings(he_tree))
    if len(en_strings) != len(he_strings):
        raise RuntimeError(f"Hebrew tree shape mismatch: {len(en_strings)} vs {len(he_strings)}")
    return {e: h for e, h in zip(en_strings, he_strings) if e != h or not should_skip_translate(e)}


def main() -> None:
    sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
    OUT.mkdir(parents=True, exist_ok=True)
    CACHE.mkdir(parents=True, exist_ok=True)

    en_tree = json.loads((ROOT / "messages" / "en.json").read_text(encoding="utf-8"))["collagio"]
    unique = sorted({s for s in walk_strings(en_tree) if not should_skip_translate(s)}, key=len)

    # Hebrew — hand-crafted
    he_tree = load_hebrew_tree()
    he_map = build_he_map(en_tree, he_tree)
    he_out = apply_string_map(deepcopy(en_tree), he_map)
    (OUT / "he.json").write_text(json.dumps(he_out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("he.json — hand-crafted")

    for loc in LOCALES_MT:
        cache_file = CACHE / f"{loc}_strings.json"
        if cache_file.exists():
            smap = repair_string_map(json.loads(cache_file.read_text(encoding="utf-8")))
            cache_file.write_text(json.dumps(smap, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        else:
            print(f"Translating {loc} ({len(unique)} strings)...")
            smap = translate_batch(unique, LANG_CODE[loc])
            cache_file.write_text(json.dumps(smap, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        merged = apply_string_map(deepcopy(en_tree), smap)
        (OUT / f"{loc}.json").write_text(json.dumps(merged, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{loc}.json — {len(smap)} strings")

    # Remove inline collagio blocks from locale message files (overlays only)
    for loc in LOCALES_MT + ["he"]:
        path = ROOT / "messages" / f"{loc}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        if "collagio" in data:
            del data["collagio"]
            path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            print(f"Removed inline collagio from {loc}.json")


if __name__ == "__main__":
    main()
