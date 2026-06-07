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
  appPublishState.ts       # TOLDYA_PUBLISHED, COLLAGIO_PUBLISHED, etc.
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
| `/collagio` | `collagio` | **Hidden** until `COLLAGIO_PUBLISHED` |
| `/dreambit-legacy` | `dreambitLegacy` | Archive; Google Play only |

## Page patterns

**Full product page** (e.g. `bit-scope/page.tsx`):
- Client component, `useTranslations('{namespace}')`
- `StarBackground`, `Logo`, `LanguageSwitcher`, back link
- `BreadcrumbsStructuredData`, `SoftwareApplicationStructuredData`
- `DownloadStoreFab` + often `StoreDownloadBadges` with `t('download.*')`
- Sub-routes: `privacy/`, `terms/`, sometimes `support/`, `delete-account/`

**Under construction** (e.g. `toldya/`, `collagio/`):
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

## SEO & metadata

- Per-app `layout.tsx` or page `generateMetadata` with `buildCanonical`, `buildLanguageAlternates`
- Store links: prefer `t('download.appStoreUrl')` / `googlePlayUrl`; use `withStoreUtm` in components
- JSON-LD: `SoftwareApplicationStructuredData`, `BreadcrumbsStructuredData`

## Commands

```bash
npm run dev
npm run build          # pre-push hook may run this
npm run lint
```

## Git / deploy

- Host: Netlify (`netlify.toml`), also Bitbucket Pipelines
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

## Specialized agents

| Agent | Path | Use for |
|-------|------|---------|
| Senior UX/UI designer | `.claude/agents/senior-ux-designer.md` | Layout, twilight theme, a11y, RTL, responsive polish |
| UX review prompt | `.claude/prompts/ux-review.md` | Structured UI critique |

Cursor rule: `.cursor/rules/ux-design.mdc` (applies to `app/`, `components/`, `globals.css`).
