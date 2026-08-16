# Project Context: ZukiApps-WEB

Read `.cursor/context/project_context.md` for the full map.

## Site

**zukiapps.com** — product landings, legal, **Google SEO + AI citations**. Not the Flutter app code.

**Stack:** Next.js 14, TypeScript, Tailwind, next-intl (12 locales, en default, he/ar RTL). Host: Cloudflare Workers.

## Key paths

```
messages/apps/{slug}/en.json
messages/shared/{locale}.json
lib/productApps.ts
lib/productSeo.ts
lib/appPublishState.ts
lib/appStructuredData.ts
lib/siteCatalog.ts
public/llms.txt
public/ai.txt
public/{slug}/faq.md
```

## Rich pages (benchmark)

`hush-gallery`, `whistle-camera`.

AEO playbook: `.cursor/skills/product-page-enrichment/aeo-reference.md`
