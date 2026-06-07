# Project Context: ZukiApps-WEB

Read `.cursor/context/project_context.md` for full detail.

## Site

**zukiapps.com** — product landing pages, privacy/terms, SEO. Not the Flutter app code.

**Stack:** Next.js 14 App Router, TypeScript, Tailwind, next-intl (12 locales, en default, he/ar RTL).

## Key paths

```
app/[locale]/           # pages per app + home
messages/en.json        # copy source of truth
lib/appPublishState.ts  # TOLDYA_PUBLISHED, COLLAGIO_PUBLISHED
lib/appStructuredData.ts # Android IDs for schema.org
components/             # LegalSections, StoreDownloadBadges, DownloadStoreFab
```

## App slugs (published on home)

zulist, hush-gallery, whistle-camera, power-interval-timer, sudoku-puzzle, football-trivia, fun-facts-trivia, bit-scope, track-ledger, noise-meter-shusher, paratrooper-blitz, tempo-lab-pro, dreambit-legacy

**Hidden until flag:** toldya, collagio

## Patterns

- Full page: `bit-scope/page.tsx` (FAB, badges, JSON-LD)
- Under construction: `collagio/page.tsx` (noindex, legal nav only)
- Legal: server component + `LegalSections` + namespace `*.privacy` / `*.terms`

## UX agent

`.claude/agents/senior-ux-designer.md` — twilight theme, a11y, RTL, Tailwind polish. Rule: `.cursor/rules/ux-design.mdc`.

## Flutter repos

App metadata lives in sibling repos (`Collagio`, `ToldYA`, `ZuList`, …): `docs/*LISTING*.md`, `AppConfig` URLs must match this site.
