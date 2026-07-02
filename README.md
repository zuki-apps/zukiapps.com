# zukiapps.com

Marketing and legal website for **[Zuki Apps](https://zukiapps.com)** — product pages, store links, privacy/terms, SEO/AEO assets, and support info for iOS and Android apps.

**Live site:** [https://zukiapps.com](https://zukiapps.com)  
**Deploy:** [Netlify](https://www.netlify.com/) (Next.js plugin) — production builds from `main` on push
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · [next-intl](https://next-intl-docs.vercel.app/) (12 locales)
**Primary remote:** [github.com/zuki-apps/zukiapps.com](https://github.com/zuki-apps/zukiapps.com)

## Quick start

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run build` | Production build |
| `npm run lint` | ESLint (Next.js config) |
| `npm run ci:check` | Typecheck + lint + build |
| `npm run ci:full` | `ci:check` + sitemap smoke test |
| `npm run messages:sync` | Propagate `messages/en.json` keys to other locales |
| `npm run images:compress` | Compress assets under `public/images/` |

## Project layout

```
app/[locale]/     # Routes (home, product pages, legal)
components/       # Shared UI
lib/              # Publish flags, structured data, i18n helpers
messages/         # Copy — en.json is source of truth
public/           # Static assets, llms.txt, per-app FAQ markdown
```

See [AGENTS.md](./AGENTS.md) and [`.cursor/context/project_context.md`](./.cursor/context/project_context.md) for maintainer docs.

## CI

GitHub Actions runs on every push/PR to `main`: typecheck, lint, production build, and sitemap smoke test (`.github/workflows/ci.yml`).

On push to `main`, a separate workflow pings search engines when the `SITE_URL` repository secret is set (`.github/workflows/ping-sitemap.yml`).

**Netlify:** Link this repo in site settings → Build & deploy. Build command: `npm run build`. Node **20**. Set env vars in the Netlify dashboard (`NEXT_PUBLIC_BASE_URL`, Firebase keys, analytics — see `netlify.toml` comments.

## Contributing

1. Branch from `main`
2. Run `npm run ci:check` locally (or rely on GitHub Actions)
3. Open a PR — English copy changes go in `messages/en.json` first

Private repo — Zuki Apps internal. Support: zuki.apps.dev@gmail.com
