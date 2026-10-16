# ZukiApps-WEB — Claude Code

Marketing site for **Zuki Apps** (zukiapps.com). Not the Flutter app code. Optimize for **Google SEO** and **AI-engine citations** (Gemini, ChatGPT, Perplexity, Claude, AI Overviews).

Stack: Next.js 14 App Router, TypeScript, Tailwind, next-intl (12 locales, `en` default, `he`/`ar` RTL), Cloudflare Workers.

## Quick reference

| Topic | Location |
|-------|----------|
| Project map | `.cursor/context/project_context.md` |
| AEO playbook | `.cursor/skills/product-page-enrichment/aeo-reference.md` |
| New app | `.cursor/rules/new-app-playbook.mdc` |
| Agent roster | `AGENTS.md` |
| Pages | `app/[locale]/{slug}/` |
| App copy | `messages/apps/{slug}/en.json` |
| Shared / home | `messages/shared/en.json` (`home.{namespace}`) |
| Metadata | `buildProductPageMetadata` in `lib/productSeo.ts` |
| Slug map | `lib/productApps.ts` |
| Publish flags | `lib/appPublishState.ts` |
| Package IDs | `lib/appStructuredData.ts` |
| Catalog | `lib/siteCatalog.ts`, `public/site-facts.json` |
| Machine index | `public/llms.txt`, `public/ai.txt`, `public/{slug}/faq.md` |
| Benchmark pages | `hush-gallery`, `whistle-camera` |

## Agents (`.claude/agents/`)

Default: work inline. Delegate only when asked.

| Agent | Role |
|-------|------|
| `site-growth-orchestrator` | Multi-app Google + AI exposure |
| `senior-marketing-seo` | SEO, AEO, schema, llms.txt |
| `senior-advertising` | Paid ↔ landing message match |
| `senior-web-developer` | Next.js, metadata, sitemap |
| `senior-ux-designer` | UI, a11y, visible H1/FAQ |
| `content-sync-specialist` | App repo → web page |

Slash commands (`.claude/skills/`): `/seo-audit`, `/aeo-checklist`, `/ai-citation`, `/marketing-enrichment`, `/ux-review`, `/site-review`.

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run verify:store-copy && npm run verify:product-pages   # fast checks after copy/store edits
```

## Store-status changes (e.g. Play goes live)

Update together: `download.googlePlayUrl`, hero badge/socialProof/meta/structuredData, FAQ, status, tips in `messages/apps/{slug}/en.json`; `home.{namespace}` in shared; `siteCatalog.ts`; `site-facts.json`; `faq.md`; `llms.txt`; `ai.txt`; `IOS_ONLY` in `scripts/verify-product-pages.mjs`.

## Hard constraints

- Minimize diff; match neighboring files; no full-file JSON reformats
- No root `messages/en.json`
- Do not invent store IDs or ratings
- Copy change → update `faq.md` + `llms.txt`
- `npm run build` after route/i18n/metadata edits
- Do not commit unless asked
