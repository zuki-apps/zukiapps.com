#!/usr/bin/env python3
"""Patch privacy pages to use localized metaDescription from messages."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PRIVACY = {
    "zulist": ("zulist.privacy", "ZuList"),
    "sudoku-puzzle": ("sudokuPuzzle.privacy", "Sudoku Fun Go"),
    "bit-scope": ("bitScope.privacy", "Bit Scope"),
    "football-trivia": ("footballTrivia.privacy", "Football Trivia Master"),
    "power-interval-timer": ("powerIntervalTimer.privacy", "Power Interval Timer"),
    "tempo-lab-pro": ("tempoLabPro.privacy", "TempoLab Pro"),
    "hush-gallery": ("hushGallery.privacy", "Hush Gallery"),
    "whistle-camera": ("whistleCamera.privacy", "Whistle Camera"),
    "fun-facts-trivia": ("funFactsTrivia.privacy", "Fun Facts! Trivia"),
    "dreambit-legacy": ("dreambitLegacy.privacy", "DreamBit Legacy"),
}

BLOCK = """  const t = await getTranslations({{ locale, namespace: '{ns}' }});

  return {{
    title: `${{t('title')}} — {brand} | Zuki Apps`,
    description: t('metaDescription'),"""


def patch(path: Path, ns: str, brand: str) -> bool:
    text = path.read_text(encoding="utf-8")
    if "t('metaDescription')" in text:
        return False
    block = BLOCK.format(ns=ns, brand=brand)
    patterns = [
        r"  const baseUrl = getSiteUrl\(\);\s*\n\s*return \{\s*\n\s*title: '[^']+',[\s\S]*?description: '[^']*',",
        r"  return \{\s*\n\s*title: 'Privacy[^']*',[\s\S]*?description: '[^']*',",
    ]
    for pat in patterns:
        new_text, n = re.subn(pat, block, text, count=1)
        if n:
            path.write_text(new_text, encoding="utf-8")
            return True
    return False


def main() -> None:
    for slug, (ns, brand) in PRIVACY.items():
        path = ROOT / "app" / "[locale]" / slug / "privacy" / "page.tsx"
        if path.exists() and patch(path, ns, brand):
            print("patched", slug)


if __name__ == "__main__":
    main()
