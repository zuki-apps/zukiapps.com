#!/usr/bin/env python3
"""Patch product pages + layouts for marketing enrichment (robust)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PAGE_APPS = [
    ("bit-scope", "bitScope", "cyan", True),
    ("fun-facts-trivia", "funFactsTrivia", "emerald", True),
    ("paratrooper-blitz", "paratrooperBlitz", "green", False),
    ("power-interval-timer", "powerIntervalTimer", "orange", True),
    ("sudoku-puzzle", "sudokuPuzzle", "blue", True),
    ("tempo-lab-pro", "tempoLabPro", "rose", True),
    ("track-ledger", "trackLedger", "teal", False),
    ("zulist", "zulist", "blue", True),
]

LD = re.compile(
    r"\s*<BreadcrumbsStructuredData[\s\S]*?/>\s*<SoftwareApplicationStructuredData[\s\S]*?/>\s*",
    re.MULTILINE,
)


def patch_page(slug: str, ns: str, accent: str, support: bool) -> None:
    path = ROOT / "app" / "[locale]" / slug / "page.tsx"
    text = path.read_text(encoding="utf-8")

    text = text.replace("import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';\n", "")
    text = text.replace("import SoftwareApplicationStructuredData from '@/components/SoftwareApplicationStructuredData';\n", "")
    text = LD.sub("\n", text)

    if "ProductMarketingSections" not in text:
        anchor = "import StarBackground from '@/components/StarBackground';"
        if anchor in text:
            text = text.replace(
                anchor,
                anchor + "\nimport ProductMarketingSections, { ProductPageNav } from '@/components/ProductMarketingSections';",
            )

    feat = text.find("{t('features.title')}")
    if feat == -1:
        print(f"  WARN no features.title in {slug}")
        return

    if 'id="features"' not in text:
        sec = text.rfind("<section", 0, feat)
        old = '<section className="py-12 px-4 relative z-10">'
        if text[sec : sec + len(old)] == old:
            text = text[:sec] + '<section className="py-12 px-4 relative z-10" id="features">' + text[sec + len(old) :]

    if "ProductPageNav" not in text:
        sec = text.rfind("<section", 0, feat)
        hero_end = text.rfind("</section>", 0, sec)
        insert_at = text.rfind("</div>", 0, hero_end)
        nav = f'\n            <ProductPageNav namespace="{ns}" accent="{accent}" />'
        text = text[:insert_at] + nav + text[insert_at:]

    if "ProductMarketingSections" not in text.split("export default")[1]:
        for marker in ("{t('status.title')}", "{t('download.title')}"):
            pos = text.find(marker, feat)
            if pos != -1:
                sec = text.rfind("<section", 0, pos)
                block = (
                    f'\n        <ProductMarketingSections namespace="{ns}" slug="{slug}" '
                    f'accent="{accent}" hasSupportPage={str(support).lower()} />\n'
                )
                text = text[:sec] + block + text[sec:]
                break

    dl = text.find("{t('download.title')}", feat)
    if dl != -1 and 'id="download"' not in text:
        sec = text.rfind("<section", 0, dl)
        old = '<section className="py-12 px-4 relative z-10">'
        if text[sec : sec + len(old)] == old:
            text = text[:sec] + '<section className="py-12 px-4 relative z-10" id="download">' + text[sec + len(old) :]

    path.write_text(text, encoding="utf-8")
    print(f"  page {slug}")


def patch_layout(slug: str) -> None:
    path = ROOT / "app" / "[locale]" / slug / "layout.tsx"
    text = path.read_text(encoding="utf-8")

    if "ProductStructuredDataBlock" not in text:
        text = text.replace(
            "import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';",
            "import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';\n"
            "import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';",
        )

    if "hero.structuredDataDescription" not in text:
        text = re.sub(
            r"const description = [^;]+;",
            "const description = t('hero.structuredDataDescription');",
            text,
            count=1,
        )

    text = re.sub(
        r"export default function (\w+Layout)\(\{\s*children,\s*\}: \{\s*children: React\.ReactNode;\s*\}\) \{\s*return <>\{children\}</>;\s*\}",
        f"""export default async function \\1({{
  children,
  params,
}}: {{
  children: React.ReactNode;
  params: Promise<{{ locale: string }}>;
}}) {{
  const {{ locale }} = await params;
  return (
    <>
      <ProductStructuredDataBlock locale={{locale}} slug="{slug}" />
      {{children}}
    </>
  );
}}""",
        text,
        flags=re.MULTILINE,
    )

    path.write_text(text, encoding="utf-8")
    print(f"  layout {slug}")


if __name__ == "__main__":
    for slug, ns, accent, support in PAGE_APPS:
        print(slug)
        patch_page(slug, ns, accent, support)
        patch_layout(slug)
