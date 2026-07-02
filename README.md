# zukiapps.com

Marketing and legal website for **[Zuki Apps](https://zukiapps.com)** — product pages, store links, privacy/terms, SEO/AEO assets, and support info for iOS and Android apps.

**Live site:** [https://zukiapps.com](https://zukiapps.com)  
**Deploy:** [Cloudflare Workers](https://developers.cloudflare.com/workers/) via [OpenNext](https://opennext.js.org/cloudflare) — GitHub Actions on push to `main`  
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · [next-intl](https://next-intl-docs.vercel.app/) (12 locales)  
**Repo:** [github.com/zuki-apps/zukiapps.com](https://github.com/zuki-apps/zukiapps.com)

## Quick start

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run build` | Next.js production build (CI) |
| `npm run preview` | OpenNext build + local Workers preview |
| `npm run deploy` | OpenNext build + deploy to Cloudflare |
| `npm run lint` | ESLint (Next.js config) |
| `npm run ci:check` | Typecheck + lint + build |
| `npm run ci:full` | `ci:check` + sitemap smoke test |
| `npm run messages:sync` | Propagate `messages/en.json` keys to other locales |
| `npm run images:compress` | Compress assets under `public/images/` |

## Cloudflare deploy

Config files:

| File | Purpose |
|------|---------|
| `wrangler.jsonc` | Worker name, assets, routes, compatibility flags |
| `open-next.config.ts` | OpenNext adapter config |
| `public/_headers` | Cache-Control / MIME for static assets |
| `.dev.vars.example` | Local env template (copy to `.dev.vars`) |

### One-time setup

1. **Cloudflare account** — add `zukiapps.com` zone (DNS).
2. **Create Worker** — first deploy creates `zukiapps-com` from `wrangler.jsonc`.
3. **Custom domain** — Workers → `zukiapps-com` → Triggers → add `zukiapps.com` (or uncomment `routes` in `wrangler.jsonc`).
4. **GitHub secrets** (Settings → Secrets → Actions):

   | Secret | Value |
   |--------|-------|
   | `CLOUDFLARE_API_TOKEN` | API token with *Workers Scripts Edit* |
   | `CLOUDFLARE_ACCOUNT_ID` | Account ID from Cloudflare dashboard |
   | `SITE_URL` | `https://zukiapps.com` (sitemap ping workflow) |

5. **Worker secrets** (dashboard or `wrangler secret put`):

   - `FIREBASE_SERVICE_ACCOUNT_KEY` — Zulist invite API
   - `GOOGLE_CLOUD_PROJECT_ID` — Play Integrity API
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_GA_MEASUREMENT_ID` — optional analytics/SEO

6. **GitHub environment** — create `production` environment (optional approval gate for deploy job).

Local Cloudflare preview:

```bash
cp .dev.vars.example .dev.vars
npm run preview
```

Legacy Netlify config remains in `netlify.toml` for reference during migration.

## CI

`.github/workflows/ci.yml` — on push/PR to `main`:

1. `npm run ci:full` (typecheck, lint, build, sitemap smoke)
2. On push to `main` only: `npm run deploy` to Cloudflare (after checks pass)

`.github/workflows/ping-sitemap.yml` — pings Google/Bing when `SITE_URL` secret is set.

## Project layout

```
app/[locale]/     # Routes (home, product pages, legal)
components/       # Shared UI
lib/              # Publish flags, structured data, i18n helpers
messages/         # Copy — en.json is source of truth
public/           # Static assets, llms.txt, _headers
```

See [AGENTS.md](./AGENTS.md) and [`.cursor/context/project_context.md`](./.cursor/context/project_context.md) for maintainer docs.

Private repo — Zuki Apps internal. Support: zuki.apps.dev@gmail.com
