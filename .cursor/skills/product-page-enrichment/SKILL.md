---
name: product-page-enrichment
description: Enrich ZukiApps-WEB product pages from sibling app marketing kits for Google SEO, Search Console, and AI answer engines (AEO). Use when syncing marketing folders, adding FAQ/HowTo schema, llms.txt, or upgrading pages to hush-gallery benchmark.
---

# Product page enrichment

## When to use

- User provides `/Users/zukman/GIT/{App}/marketing/` or `Marketing/`
- Batch sync of multiple app pages
- SEO/AEO gap vs `hush-gallery` / `whistle-camera`

## Orchestrator

Use agent **site-growth-orchestrator** (coordinates marketing-seo, advertising, UX, web-dev, content-sync).

## Benchmark checklist

| Item | Location |
|------|----------|
| `hero.structuredDataDescription` | `messages/en.json` |
| `pageNav`, `screenshots`, `howToUse`, `faq`, `tips`, `manual` | `messages/en.json` |
| `ProductStructuredDataBlock` | `app/[locale]/{slug}/layout.tsx` |
| `ProductMarketingSections` | `app/[locale]/{slug}/page.tsx` after features |
| `public/images/{slug}/` | Screenshots from app repo |
| `public/{slug}/faq.md` | Crawler-friendly Q&A |
| `public/llms.txt` | Expanded bullet with stores + faq.md |

## Sync script

```bash
python3 scripts/sync-product-marketing.py --app all
python3 scripts/sync-product-marketing.py --app noise-meter-shusher
npm run build
```

Config: `scripts/marketing-sync-manifest.json`

## Copy rules

- Lead with user benefit; factual package IDs in structured data only
- FAQ: 8–12 concrete Q&As with real `https://zukiapps.com/...` URLs
- English first in `messages/en.json`; other locales inherit via `i18n.ts` merge

## Specialists

- `.claude/agents/senior-marketing-seo.md`
- `.claude/agents/senior-advertising.md`
- `.claude/agents/senior-ux-designer.md`
- `.claude/agents/senior-web-developer.md`
- `.claude/agents/content-sync-specialist.md`
