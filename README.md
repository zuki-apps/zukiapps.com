# zukiapps.com

Marketing and legal website for **[Zuki Apps](https://zukiapps.com)** — product pages, store links, privacy/terms, SEO/AEO assets, and support info for iOS and Android apps.

**Live site:** [https://zukiapps.com](https://zukiapps.com)  
**Host:** [Cloudflare Pages](https://developers.cloudflare.com/pages/) (`zukiapps-site`)  
**CI/CD:** GitHub Actions → deploy on push to `main`  
**Stack:** Next.js 14 · TypeScript · Tailwind · next-intl (12 locales)

**Site down?** → [`documents/SITE_RECOVERY.md`](documents/SITE_RECOVERY.md)

## Quick start

```bash
npm ci
npm run dev
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run deploy` | Static export + deploy to Cloudflare Pages |
| `npm run preview` | Local Workers preview |
| `npm run ci:full` | Typecheck, lint, build, sitemap smoke |
| `./scripts/cloudflare-deploy.sh` | Deploy with env check |

## Config

| File | Purpose |
|------|---------|
| `wrangler.jsonc` | Worker / Pages project, custom domains |
| `open-next.config.ts` | OpenNext adapter |
| `public/_headers` | Cache-Control for static assets |
| `public/_redirects` | `www` → apex |
| `.dev.vars.example` | Local secrets template |

See [AGENTS.md](./AGENTS.md) for maintainer docs.
