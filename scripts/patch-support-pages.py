#!/usr/bin/env python3
"""Patch support pages: localized metadata, RTL, brand H1 from hero."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SUPPORT = ROOT / "app" / "[locale]"

METADATA_BLOCK = '''  const t = await getTranslations({ locale, namespace: '{ns}.support' });

  return {{
    title: t('metaTitle'),
    description: t('metaDescription'),'''

OLD_PATTERNS = [
    ("locale === 'he'", "locale === 'he' || locale === 'ar'"),
    ("locale === \"he\"", "locale === 'he' || locale === 'ar'"),
]

# Apps with hardcoded brand in h1 - map slug -> namespace
BRAND_FIXES = {
    "Sudoku Fun Go": "{tHero('title')}",
    "Bit Scope": "{tHero('title')}",
    "ZuList": "{tHero('title')}",
    "Football Trivia Master": "{tHero('title')}",
    "Power Interval Timer": "{tHero('title')}",
    "TempoLab Pro": "{tHero('title')}",
    "Hush Gallery": "{tHero('title')}",
    "Whistle Camera": "{tHero('title')}",
    "Fun Facts! Trivia": "{tHero('title')}",
}


def patch_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    orig = text
    for old, new in OLD_PATTERNS:
        text = text.replace(old, new)
    for brand, repl in BRAND_FIXES.items():
        text = text.replace(f">{brand}</h1>", f">{{tHero('title')}}</h1>")
        text = text.replace(f'">{brand}</h1>', f'">{{tHero(\'title\')}}</h1>')
    if text != orig:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def patch_metadata(path: Path, ns: str) -> bool:
    text = path.read_text(encoding="utf-8")
    if "t('metaTitle')" in text:
        return False
    # Replace hardcoded title/description in generateMetadata
    import re

    def repl(m):
        return f"""  const t = await getTranslations({{ locale, namespace: '{ns}.support' }});

  return {{
    title: t('metaTitle'),
    description: t('metaDescription'),"""

    new_text, n = re.subn(
        r"  const baseUrl = getSiteUrl\(\);\s*\n\s*return \{\s*\n\s*title: '[^']+',[\s\S]*?description: '[^']*',",
        repl,
        text,
        count=1,
    )
    if n:
        # remove unused baseUrl import usage if only for metadata - keep import if used elsewhere
        path.write_text(new_text, encoding="utf-8")
        return True
    # football-trivia / fun-facts pattern without baseUrl
    new_text2, n2 = re.subn(
        r"  return \{\s*\n\s*title: 'Support[^']*',[\s\S]*?description: '[^']*',",
        repl,
        text,
        count=1,
    )
    if n2:
        path.write_text(new_text2, encoding="utf-8")
        return True
    return False


NS_MAP = {
    "zulist": "zulist",
    "sudoku-puzzle": "sudokuPuzzle",
    "bit-scope": "bitScope",
    "football-trivia": "footballTrivia",
    "power-interval-timer": "powerIntervalTimer",
    "tempo-lab-pro": "tempoLabPro",
    "hush-gallery": "hushGallery",
    "whistle-camera": "whistleCamera",
    "fun-facts-trivia": "funFactsTrivia",
}


def main() -> None:
    for path in SUPPORT.glob("*/support/page.tsx"):
        slug = path.parts[-3]
        changed = patch_file(path)
        if slug in NS_MAP:
            changed = patch_metadata(path, NS_MAP[slug]) or changed
        if changed:
            print("patched", path.relative_to(ROOT))


if __name__ == "__main__":
    main()
