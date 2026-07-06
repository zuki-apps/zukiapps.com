#!/usr/bin/env python3
"""Generate per-app locale overlays from en.json using batched Google Translate.

Usage:
  python3 scripts/generate-app-locales.py timesince timeSince
  python3 scripts/generate-app-locales.py geo-calc geoCalc
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

LOCALE_MAP = {
    "he": "iw",
    "ar": "ar",
    "de": "de",
    "es": "es",
    "fr": "fr",
    "it": "it",
    "pt": "pt",
    "ru": "ru",
    "ja": "ja",
    "ko": "ko",
    "zh": "zh-CN",
}

SKIP_PATTERN = re.compile(
    r"^(https?://|mailto:|com\.zuki\.|/images/|zuki\.apps\.dev@|Nachshol)",
    re.I,
)

BRAND_PATTERNS = [
    r"https?://[^\s)]+",
    r"com\.zuki\.apps\.[\w.]+",
    r"/images/[^\s\"']+",
    r"zuki\.apps\.dev@gmail\.com",
    r"Nachshol 36, SAAR, p\.o\. 22805, ISRAEL",
    r"public/[\w-]+/faq\.md",
    r"\b(?:iOS|iPad|Android|RTL|Premium|AdMob|Firebase Analytics|Crashlytics|App Tracking Transparency|Google Play|Apple App Store|Apple ID|Zuki Apps|Zuki\.Apps|Time Since|GEO Calc)\b",
]


def protect(text: str) -> tuple[str, dict[str, str]]:
    protected: dict[str, str] = {}
    out = text

    def repl(m: re.Match[str]) -> str:
        key = f"__PH{len(protected)}__"
        protected[key] = m.group(0)
        return key

    for pat in BRAND_PATTERNS:
        out = re.sub(pat, repl, out)
    return out, protected


def restore(text: str, protected: dict[str, str]) -> str:
    for key, val in protected.items():
        text = text.replace(key, val)
    return text


def collect_strings(obj, out: list[str]) -> None:
    if isinstance(obj, dict):
        for v in obj.values():
            collect_strings(v, out)
    elif isinstance(obj, list):
        for v in obj:
            collect_strings(v, out)
    elif isinstance(obj, str) and obj.strip() and not SKIP_PATTERN.search(obj.strip()):
        out.append(obj)


def apply_translations(obj, mapping: dict[str, str]):
    if isinstance(obj, dict):
        return {k: apply_translations(v, mapping) for k, v in obj.items()}
    if isinstance(obj, list):
        return [apply_translations(v, mapping) for v in obj]
    if isinstance(obj, str):
        return mapping.get(obj, obj)
    return obj


def batch_translate(strings: list[str], target: str) -> dict[str, str]:
    from deep_translator import GoogleTranslator

    unique = list(dict.fromkeys(strings))
    mapping: dict[str, str] = {}
    protected_by_original: dict[str, tuple[str, dict[str, str]]] = {}
    to_translate: list[str] = []

    for s in unique:
        protected, tokens = protect(s)
        protected_by_original[s] = (protected, tokens)
        if protected.strip():
            to_translate.append(protected)
        else:
            mapping[s] = s

    translator = GoogleTranslator(source="en", target=target)
    batch_size = 40
    translated_chunks: list[str] = []

    for i in range(0, len(to_translate), batch_size):
        chunk = to_translate[i : i + batch_size]
        try:
            translated_chunks.extend(translator.translate_batch(chunk))
        except Exception as exc:  # noqa: BLE001
            print(f"  batch warn ({target}): {exc!r}, falling back per-string")
            for item in chunk:
                try:
                    translated_chunks.append(translator.translate(item))
                except Exception:
                    translated_chunks.append(item)

    for original, translated in zip(
        [s for s in unique if protected_by_original[s][0].strip()], translated_chunks
    ):
        protected, tokens = protected_by_original[original]
        mapping[original] = restore(translated, tokens)

    return mapping


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate app locale overlays from en.json")
    parser.add_argument("app_folder", help="Folder under messages/apps/ (e.g. timesince)")
    parser.add_argument("namespace", help="JSON root key (e.g. timeSince)")
    args = parser.parse_args()

    en_path = ROOT / "messages" / "apps" / args.app_folder / "en.json"
    out_dir = ROOT / "messages" / "apps" / args.app_folder

    if not en_path.is_file():
        print(f"Missing {en_path}", file=sys.stderr)
        sys.exit(1)

    en = json.loads(en_path.read_text(encoding="utf-8"))
    if args.namespace not in en:
        print(f"Namespace {args.namespace!r} not found in {en_path}", file=sys.stderr)
        sys.exit(1)

    app_en = en[args.namespace]
    all_strings: list[str] = []
    collect_strings(app_en, all_strings)

    for locale, target in LOCALE_MAP.items():
        print(f"Translating {locale} ({target})...")
        mapping = batch_translate(all_strings, target)
        translated = apply_translations(app_en, mapping)
        out_path = out_dir / f"{locale}.json"
        out_path.write_text(
            json.dumps({args.namespace: translated}, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"  wrote {out_path.name}")

    print("Done.")


if __name__ == "__main__":
    main()
