---
name: product-page-enrichment
description: Enrich ZukiApps-WEB product pages from sibling app marketing kits for Google SEO, Search Console, and AI answer engines (AEO, citations in Gemini, ChatGPT, Perplexity, Claude). Use when syncing marketing folders, adding FAQ/HowTo schema, llms.txt, ai.txt, faq.md, or upgrading pages to the hush-gallery benchmark.
---

# Product page enrichment

Read [aeo-reference.md](aeo-reference.md) before writing copy or schema.

## When to use

- User provides `/Users/zukman/GIT/{App}/marketing/` or `Marketing/`
- Batch sync of multiple app pages
- SEO/AEO gap vs `hush-gallery` / `whistle-camera`
- Google Search Console / AI-engine citation work

## Orchestrator

Use agent **site-growth-orchestrator** (coordinates marketing-seo, advertising, UX, web-dev, content-sync).

## Current paths (do not use a root `messages/en.json`)

| Item | Location |
|------|----------|
| App copy | `messages/apps/{slug}/en.json` |
| Home carousel | `messages/shared/en.json` → `home.{namespace}` |
| Metadata | `hero.seoTitle`, `hero.metaDescription`, `hero.structuredDataDescription` + `lib/productSeo.ts` |
| Layout | `buildProductPageMetadata` in `app/[locale]/{slug}/layout.tsx` |
| App config | `lib/productApps.ts` |
| Screenshots | `public/images/{slug}/` |
| Crawler Q&A | `public/{slug}/faq.md` |
| Machine index | `public/llms.txt` + `public/ai.txt` |

## Benchmark checklist

- `pageNav`, `screenshots`, `howToUse`, `faq` (8–12), `tips`, `manual`
- `ProductStructuredDataBlock` / FAQ + HowTo JSON-LD matching **on-page** sections
- Expanded `llms.txt` bullet with stores, package IDs, faq.md link

## Copy rules

- Answer-first: sentence 1 of hero and each FAQ answer is quotable
- Publisher entity: **Zuki Apps** (never invent ratings)
- English first; other locales inherit via merge
- Never invent store package IDs — `lib/appStructuredData.ts` + live listings

## Sync

```bash
python3 scripts/sync-product-marketing.py --app all
npm run build
```
