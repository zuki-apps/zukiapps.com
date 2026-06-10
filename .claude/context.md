# Project Context: ZukiApps-WEB

Read `.cursor/context/project_context.md` for full detail.

## Site

**zukiapps.com** — product landing pages, privacy/terms, **SEO/AEO**. Not the Flutter/native app code.

**Stack:** Next.js 14, TypeScript, Tailwind, next-intl (12 locales, en default, he/ar RTL).

## Key paths

```
app/[locale]/           # pages per app + home
messages/en.json        # copy source of truth
lib/appIcons.ts         # icon URLs with ?v= cache bust
lib/appPublishState.ts
lib/appStructuredData.ts
lib/siteCatalog.ts
public/llms.txt
public/{slug}/faq.md
scripts/patch-*-content.py
```

## Rich pages (SEO benchmark)

`hush-gallery`, `whistle-camera` — screenshots, FAQ, manual, tips, how-to, JSON-LD.

## Agents

`.claude/agents/` — marketing-seo, advertising, web-developer, ux-designer, content-sync

## App repos (marketing source)

`/Users/zukman/GIT/{AppName}/marketing/` — sync via `content-sync-specialist` or `marketing-enrichment` prompt.
