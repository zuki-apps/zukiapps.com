# ZukiApps-WEB — Project Context

## Product

Marketing and legal site for **Zuki Apps** at **https://zukiapps.com**.

**Job of the site:** Google organic + citations in AI engines (AI Overviews, Gemini, ChatGPT, Perplexity, Claude).

- Next.js 14 App Router, TypeScript, Tailwind CSS
- **next-intl** — 12 locales (`routing.ts`): en (default), he, de, es, it, pt, ru, fr, ja, ko, ar, zh
- Locale prefix: `as-needed` (English unprefixed)
- RTL: Hebrew and Arabic

## Repo layout

```
app/[locale]/            # Public pages
app/robots.ts            # Allow Google + major AI crawlers
app/sitemap.ts
lib/productApps.ts       # Slug → namespace, accent, schema category
lib/productSeo.ts        # buildProductPageMetadata
lib/appPublishState.ts
lib/appStructuredData.ts # Android package IDs
lib/siteCatalog.ts       # ItemList + llms-facing descriptions
lib/loadAppMessages.ts
messages/shared/{locale}.json
messages/apps/{slug}/en.json   # English source of truth per app
public/llms.txt
public/ai.txt
public/{slug}/faq.md
```

There is **no** root `messages/en.json`.

## App pages

Canonical map: **`lib/productApps.ts`** + `i18n.ts` `APPS`.

Also: `/toldya` (pilot until `TOLDYA_PUBLISHED`), `/dreambit-legacy` (archive). Unpublished landings: `noindex` on the main URL; legal pages stay indexed.

## Page patterns

**Full product page:** `'use client'` + `useTranslations`, `StarBackground`, store badges, FAQ/HowTo + SoftwareApplication JSON-LD.

**Metadata:** `buildProductPageMetadata` in `layout.tsx` (`hero.seoTitle`, `hero.metaDescription`).

**AEO lockstep** after copy changes: app JSON → `public/{slug}/faq.md` → `public/llms.txt` → `siteCatalog.ts`. New app: `public/ai.txt`.

## Adding a new app

Follow `.cursor/rules/new-app-playbook.mdc`. Icon `public/images/{slug}-icon.png`. Add folder to `i18n.ts` `APPS`.

## i18n

- English first in `messages/apps/{slug}/en.json` or `messages/shared/en.json`
- Other locales deep-merge (`i18n.ts` / `loadAppMessages.ts`)
- Home carousel `home.{namespace}` must match the product hero
- Legal: `LegalSections`

## SEO / AEO

Rule: `.cursor/rules/seo-aeo.mdc` · Skill: `.cursor/skills/product-page-enrichment/`

Benchmark pages: `hush-gallery`, `whistle-camera`.

Marketing kits: `/Users/zukman/GIT/{AppName}/marketing/` or `Marketing/`.

## Commands

```bash
npm run dev
npm run build
npm run lint
```

## Git / deploy

Cloudflare Workers (`wrangler.jsonc`, OpenNext). **Do not commit** unless asked. No `.env*` / secrets.

## Agents

`.claude/agents/` (mirrored in `.cursor/agents/`). Index: `AGENTS.md`.

Prompts: `seo-audit.md`, `aeo-checklist.md`, `ai-citation.md`, `marketing-enrichment.md`, `ux-review.md`, `review.md`.
