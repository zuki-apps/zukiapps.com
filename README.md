# zukiapps.com

Marketing and legal website for **[Zuki Apps](https://zukiapps.com)** — product pages, store links, privacy/terms, SEO/AEO assets, and support info for iOS and Android apps.

**Live site:** [https://zukiapps.com](https://zukiapps.com)  
**Host:** [Cloudflare Workers](https://developers.cloudflare.com/workers/) + [OpenNext](https://opennext.js.org/cloudflare)  
**CI/CD:** GitHub Actions → deploy on push to `main`  
**Stack:** Next.js 14 · TypeScript · Tailwind · next-intl (12 locales)

## Cutover checklist (Netlify → Cloudflare)

Do these in order:

1. **Cloudflare zone** — add `zukiapps.com`, import DNS from Netlify/registrar.
2. **GitHub secrets** — `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `SITE_URL=https://zukiapps.com`.
3. **Push to `main`** (or run `./scripts/cloudflare-deploy.sh` locally with tokens exported).
4. **Worker secrets** (Cloudflare dashboard or CLI):
   - `FIREBASE_SERVICE_ACCOUNT_KEY`
   - `GOOGLE_CLOUD_PROJECT_ID`
5. **Verify** — open `https://zukiapps-com.<account>.workers.dev` then `https://zukiapps.com`.
6. **Disable Netlify** — stop builds / remove domain from Netlify site (avoid dual deploy).
7. **DNS** — apex + `www` proxied through Cloudflare (orange cloud). `www` → apex redirect is in `public/_redirects` + `next.config.js`.

## Quick start

```bash
npm ci
npm run dev
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run deploy` | OpenNext build + deploy to Cloudflare Workers |
| `npm run preview` | Local Workers preview |
| `npm run ci:full` | Typecheck, lint, build, sitemap smoke |
| `./scripts/cloudflare-deploy.sh` | Deploy with env check |

## Config

| File | Purpose |
|------|---------|
| `wrangler.jsonc` | Worker, custom domains, `nodejs_compat` |
| `open-next.config.ts` | OpenNext adapter |
| `public/_headers` | Cache-Control for static assets |
| `public/_redirects` | `www` → apex |
| `.dev.vars.example` | Local secrets template |

See [AGENTS.md](./AGENTS.md) for maintainer docs.
