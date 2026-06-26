#!/usr/bin/env python3
"""Add RTL ar support and fix hardcoded brand headers on legal/sub pages."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "app" / "[locale]"

REPLACEMENTS = [
    ("locale === 'he'", "locale === 'he' || locale === 'ar'"),
    ('locale === "he"', "locale === 'he' || locale === 'ar'"),
    ("`${locale === 'he' ? 'text-right' : 'text-left'}`", "`${locale === 'he' || locale === 'ar' ? 'text-right' : 'text-left'}`"),
    ("locale === 'he' ? 'text-right' : 'text-left'", "locale === 'he' || locale === 'ar' ? 'text-right' : 'text-left'"),
    ("locale === 'he' ? 'flex-row-reverse' : ''", "locale === 'he' || locale === 'ar' ? 'flex-row-reverse' : ''"),
    ("locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'", "locale === 'he' || locale === 'ar' ? 'list-disc list-inside' : 'list-disc list-inside'"),
    ("locale === 'he' ? 'list-decimal list-inside' : 'list-decimal list-inside'", "locale === 'he' || locale === 'ar' ? 'list-decimal list-inside' : 'list-decimal list-inside'"),
    ("locale === 'he' ? 'mr-6' : 'ml-6'", "locale === 'he' || locale === 'ar' ? 'mr-6' : 'ml-6'"),
    ("locale === 'he' ? 'border-r-4' : 'border-l-4'", "locale === 'he' || locale === 'ar' ? 'border-r-4' : 'border-l-4'"),
]

BRAND_H1 = {
    "ZuList": "{tApp('title')}",
    "Sudoku Fun Go": "{tApp('title')}",
    "Bit Scope": "{tApp('title')}",
}


def main() -> None:
    for path in APP.rglob("page.tsx"):
        if path.parts[-2] not in {
            "privacy",
            "terms",
            "support",
            "delete-account",
            "delete-data",
            "child-safety",
        } and "dsa" not in str(path):
            continue
        text = path.read_text(encoding="utf-8")
        orig = text
        for a, b in REPLACEMENTS:
            text = text.replace(a, b)
        for brand, repl in BRAND_H1.items():
            text = text.replace(f">{brand}</h1>", f">{{tApp('title')}}</h1>")
        if text != orig:
            path.write_text(text, encoding="utf-8")
            print("patched", path.relative_to(ROOT))


if __name__ == "__main__":
    main()
