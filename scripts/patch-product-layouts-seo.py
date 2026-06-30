#!/usr/bin/env python3
"""Patch product layout.tsx files to use buildProductPageMetadata."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOCALE = ROOT / "app" / "[locale]"

LAYOUTS: dict[str, tuple[str, str]] = {
    "hush-gallery": ("/hush-gallery", "hushGallery"),
    "whistle-camera": ("/whistle-camera", "whistleCamera"),
    "zulist": ("/zulist", "zulist"),
    "power-interval-timer": ("/power-interval-timer", "powerIntervalTimer"),
    "bit-scope": ("/bit-scope", "bitScope"),
    "track-ledger": ("/track-ledger", "trackLedger"),
    "noise-meter-shusher": ("/noise-meter-shusher", "noiseMeterShusher"),
    "paratrooper-blitz": ("/paratrooper-blitz", "paratrooperBlitz"),
    "sudoku-puzzle": ("/sudoku-puzzle", "sudokuPuzzle"),
    "tempo-lab-pro": ("/tempo-lab-pro", "tempoLabPro"),
    "fun-facts-trivia": ("/fun-facts-trivia", "funFactsTrivia"),
    "zuli-collage": ("/zuli-collage", "zuliCollage"),
    "football-trivia": ("/football-trivia", "footballTrivia"),
    "toldya": ("/toldya", "toldya"),
}


def patch(path: Path, app_path: str, namespace: str) -> bool:
    text = path.read_text(encoding="utf-8")
    if "buildProductPageMetadata" in text:
        return False

    if "from '@/lib/productSeo'" not in text:
        text = text.replace(
            "import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';",
            "import { buildProductPageMetadata } from '@/lib/productSeo';",
        )
        text = text.replace(
            "import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';\n",
            "import { buildProductPageMetadata } from '@/lib/productSeo';\n",
        )
        if "buildProductPageMetadata" not in text:
            text = text.replace(
                "import { buildCanonical, buildLanguageAlternates } from '@/lib/hreflang';",
                "import { buildProductPageMetadata } from '@/lib/productSeo';",
            )

    # Remove unused icon imports if only used for OG
    text = re.sub(r"\nimport \{ [^}]*ICON[^}]* \} from '@/lib/appIcons';\n", "\n", text)

    body = f"""  const t = await getTranslations({{ locale, namespace: '{namespace}' }});

  return buildProductPageMetadata({{
    locale,
    appPath: '{app_path}',
    t,
  }});"""

    new_text, n = re.subn(
        r"  const baseUrl = getSiteUrl\(\);[\s\S]*?return \{[\s\S]*?robots: \{[\s\S]*?\},\s*\};",
        body,
        text,
        count=1,
    )
    if not n:
        new_text, n = re.subn(
            r"  const t = await getTranslations\(\{ locale, namespace: '[^']+' \}\);[\s\S]*?return \{[\s\S]*?robots: \{[\s\S]*?\},\s*\};",
            body,
            text,
            count=1,
        )
    if n:
        path.write_text(new_text, encoding="utf-8")
        return True
    return False


def main() -> None:
    for slug, (app_path, ns) in LAYOUTS.items():
        path = LOCALE / slug / "layout.tsx"
        if path.exists() and patch(path, app_path, ns):
            print("patched", slug)


if __name__ == "__main__":
    main()
