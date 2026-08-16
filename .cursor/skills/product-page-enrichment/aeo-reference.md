# Google + AI-engine playbook

Use this when enriching or auditing a product page. Goal: **rank on Google** and **be the cited source** in AI Overviews, Gemini, ChatGPT, Perplexity, and Claude.

## What models and Google actually cite

1. A clear entity (app name + **Zuki Apps** + platforms)
2. A specific fact in the first sentence (what it does, iOS/Android, free vs paid)
3. The same fact in HTML, FAQ markdown, `llms.txt`, and JSON-LD — no contradictions
4. Absolute URLs (`https://zukiapps.com/{slug}`)
5. Package IDs and App Store IDs as identifiers, not keyword stuffing

Skip adjectives models ignore: “best”, “ultimate”, “revolutionary”, “#1”.

## Page anatomy (citation order)

1. **Title** (`hero.seoTitle`, ≤58) — `{App} — {use case} | Zuki Apps`
2. **Meta** (`hero.metaDescription`, ≤155) — who it’s for + platform + free/paid
3. **H1 + lead** — answers “what is {app}?”
4. **How-to** (3 real steps) — `HowTo` schema only if steps are on the page
5. **FAQ** (8–12) — real objections: price, offline, permissions, iOS vs Android, account deletion
6. **Stores** — live URLs from `download.*`

## Four-surface lockstep

After any copy change, update all that apply:

- `messages/apps/{slug}/en.json`
- `public/{slug}/faq.md` — `##` questions; answer line 1 is the claim; link the canonical page
- `public/llms.txt` — one dense bullet: support, faq.md, Play package, iOS id, 3 features
- `lib/siteCatalog.ts` description if positioning changed

New app: also `public/ai.txt` and `lib/productApps.ts`.

## Schema (Google spam-safe)

- `SoftwareApplication` — name, operatingSystem, offers (free/paid as truth), applicationCategory from `lib/productApps.ts`
- `FAQPage` / `HowTo` — only for visible content
- `BreadcrumbList` — every product URL
- Do **not** add `AggregateRating` unless `lib/appStoreRatings.ts` has a live verified value

## Robots / crawlers

Keep `app/robots.ts` allowing: Googlebot, Google-Extended, Bingbot, GPTBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, CCBot.

Do not `noindex` a published app. Unpublished landings may `noindex`; legal pages stay indexed.

## Home + ads message match

`home.{namespace}` in `messages/shared/en.json` must match the product hero. Stale carousel copy hurts SEO and Quality Score.

## Audit output format

1. Critical (wrong IDs, noindex, contradictory facts)
2. Google gaps (title/meta/H1/schema)
3. AI-citation gaps (faq.md, llms.txt, weak first sentences)
4. Minimal patch list
