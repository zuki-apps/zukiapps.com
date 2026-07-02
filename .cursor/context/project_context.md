# ZukiApps-WEB — Project Context

## Product

Marketing and legal site for **Zuki Apps** mobile products at **https://zukiapps.com**.

- Next.js 14 App Router, TypeScript, Tailwind CSS
- **next-intl** — 12 locales (`routing.ts`): en (default), he, de, es, it, pt, ru, fr, ja, ko, ar, zh
- Locale prefix: `as-needed` (English unprefixed)
- RTL: Hebrew and Arabic (`middleware.ts` sets `x-zuki-dir`)

## Repo layout

```
app/
  [locale]/              # All public pages (product, legal, home)
  sitemap.ts               # Static routes + publish flags
  robots.ts
components/                # Shared UI (Logo, LegalSections, store badges, SEO)
lib/
  appPublishState.ts       # TOLDYA_PUBLISHED, ZULI_COLLAGE_PUBLISHED, etc.
  appStructuredData.ts     # Android package IDs for JSON-LD
  siteCatalog.ts           # Home JSON-LD ItemList (published apps only)
  hreflang.ts              # Canonical + language alternates
  withStoreUtm.ts          # UTM on store links
messages/
  en.json                  # Source of truth — full copy per app namespace
  {locale}.json            # Deep-merged over en (i18n.ts)
  dreambitLegacy.json      # Always merged as dreambitLegacy namespace
  dreambit-legacy/{locale}.json
public/
  images/{app}-icon.png
  llms.txt                 # Machine-readable app index
```

## App pages (slug → message namespace)

| Route | Namespace | Notes |
|-------|-----------|-------|
| `/zulist` | `zulist` | Some hardcoded store URLs in page.tsx |
| `/hush-gallery` | `hushGallery` | |
| `/whistle-camera` | `whistleCamera` | Support page has legacy DreamBit Play link |
| `/power-interval-timer` | `powerIntervalTimer` | |
| `/sudoku-puzzle` | `sudokuPuzzle` | |
| `/football-trivia` | `footballTrivia` | |
| `/fun-facts-trivia` | `funFactsTrivia` | |
| `/bit-scope` | `bitScope` | |
| `/track-ledger` | `trackLedger` | |
| `/noise-meter-shusher` | `noiseMeterShusher` | Play: `com.zuki.apps.noisemeter` |
| `/paratrooper-blitz` | `paratrooperBlitz` | |
| `/tempo-lab-pro` | `tempoLabPro` | |
| `/toldya` | `toldya` | **Hidden** until `TOLDYA_PUBLISHED` |
| `/zuli-collage` | `zuliCollage` | **Hidden** until `ZULI_COLLAGE_PUBLISHED` |
| `/dreambit-legacy` | `dreambitLegacy` | Archive; Google Play only |

## Page patterns

**Full product page** (e.g. `bit-scope/page.tsx`):
- Client component, `useTranslations('{namespace}')`
- `StarBackground`, `Logo`, `LanguageSwitcher`, back link
- `BreadcrumbsStructuredData`, `SoftwareApplicationStructuredData`
- `DownloadStoreFab` + often `StoreDownloadBadges` with `t('download.*')`
- Sub-routes: `privacy/`, `terms/`, sometimes `support/`, `delete-account/`

**Under construction** (e.g. `toldya/`, `zuli-collage/`):
- Coming-soon landing, `robots: noindex` until publish flag true
- Legal pages indexed (`privacy`, `terms`; ToldYa also `child-safety`, `delete-account`)
- Copy from sibling Flutter repo `docs/` + `AppConfig` legal URLs

## Adding a new app (checklist)

1. Copy icon → `public/images/{slug}-icon.png`
2. Add namespace to `messages/en.json` (hero, download, privacy, terms, …)
3. Create `app/[locale]/{slug}/` (layout, page, legal pages)
4. `lib/appStructuredData.ts` — Android ID if on Play
5. `lib/appPublishState.ts` — `{APP}_PUBLISHED = false` if pre-launch
6. `app/sitemap.ts` — legal routes always; main route if published
7. When live: `lib/siteCatalog.ts`, `AppsGrid.tsx`, `AppsCarousel.tsx`, `public/llms.txt`
8. Verify store URLs with HTTP check; package IDs must match live listings

## i18n rules

- **Always update `messages/en.json` first** with complete nested keys
- Other locales deep-merge over English (`i18n.ts`) — missing keys fall back to en
- Legal pages use `LegalSections` + section keys (`section1`, …, `sectionContact`)
- Dreambit legacy: base `dreambitLegacy.json` + optional `dreambit-legacy/{locale}.json`

## SEO, AEO & ranking

**Cursor rule:** `.cursor/rules/seo-aeo.mdc` · **Marketing sync:** `.cursor/rules/marketing-content.mdc`

### Rich product pages (benchmark)

`hush-gallery`, `whistle-camera` — sections: hero + `pageNav`, features, screenshots, how-to, use cases, manual, tips, FAQ, download.

| Concern | Location |
|---------|----------|
| Copy | `messages/en.json` → `hero.structuredDataDescription`, `faq.items`, `howToUse`, `screenshots.items` |
| JSON-LD | `FaqStructuredData`, `HowToStructuredData`, `SoftwareApplicationStructuredData` |
| Crawlers | `public/llms.txt`, `public/{slug}/faq.md` |
| Icons cache-bust | `lib/appIcons.ts` (`?v=N`) + `AppIconFrame` `unoptimized` |
| Patch scripts | `scripts/patch-hush-gallery-content.py`, `scripts/patch-whistle-camera-content.py` |

### Metadata (every app)

- `layout.tsx`: title, description, OG, keywords, canonical/hreflang
- Store links: `t('download.*')` + `withStoreUtm`
- Android ID: `lib/appStructuredData.ts`

### App marketing source repos

`/Users/zukman/GIT/{AppName}/marketing/` — FAQ, manuals, screenshots, `aeo/faq.json`, ad copy.

## Commands

```bash
npm run dev
npm run build          # pre-push hook may run this
npm run lint
```

## Git / deploy

- Host: Cloudflare Workers (`wrangler.jsonc`, OpenNext), GitHub Actions deploy; Bitbucket Pipelines backup CI
- **Do not commit** unless user asks
- **Do not commit** `.env*`, secrets

## Related Flutter repos (source of truth for app copy)

Each app has its own repo under `/Users/zukman/GIT/{AppName}/` with `docs/APP_STORE_LISTING_*.md`, `docs/GOOGLE_PLAY_LISTING_*.md`, `lib/core/config/app_config.dart` (or equivalent) for bundle IDs and legal URLs.

## Agent instructions

- Minimize diff scope; match neighboring app pages
- One concern per change; no drive-by refactors
- Run `npm run build` after routing/i18n/metadata changes
- Prefer `t('…')` over hardcoded store URLs
- Keep rules in `.cursor/rules/` and this file in sync when architecture changes

## AI agents (`.claude/agents/` · index in `.cursor/agents/`)

| Agent | Use for |
|-------|---------|
| **senior-marketing-seo** | Organic SEO, AEO, llms.txt, FAQ/schema, page enrichment |
| **senior-advertising** | SEA/UAC/Meta/ASA message match, landing ↔ ads |
| **senior-web-developer** | Next.js, i18n, builds, routes, structured data |
| **senior-ux-designer** | Twilight UI, a11y, RTL, responsive polish |
| **content-sync-specialist** | Scan app repo → update product page |

**Prompts:** `.claude/prompts/` — `seo-audit.md`, `marketing-enrichment.md`, `aeo-checklist.md`, `ux-review.md`, `review.md`

**Cursor rules:** `project-overview.mdc` (always), `seo-aeo.mdc`, `marketing-content.mdc`, `ux-design.mdc`, `new-app-playbook.mdc`, `nextjs-app-pages.mdc`, `i18n-messages.mdc`

See **`AGENTS.md`** at repo root.
