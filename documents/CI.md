# CI and pre-push gates

## What runs before you can push

**Husky `pre-push`** → `npm run ci:check`:

1. `tsc --noEmit` — TypeScript must compile
2. `next lint` — ESLint must pass
3. `npm run build:static` — full static export must succeed
4. `npm run smoke:static` — routing verification:
   - ≥800 HTML files in `out/`
   - **All sitemap URLs** resolve on disk (`*/index.html`)
   - Every app slug from `app/[locale]/` exports for default locale
   - All 12 locale home pages exist
   - `_redirects` contains legacy slug + invite rules
   - **Local HTTP**: all sitemap paths return 200 via in-process static server

Emergency bypass (not recommended):

```bash
SKIP_CI=1 git push
```

## GitHub Actions (`CI` workflow)

Same checks on every **push** and **pull request** to `main`.

On push to `main`, after checks pass:

- Deploy to Cloudflare Pages (`zukiapps-site`)
- **`npm run smoke:live`** — all 804 sitemap URLs + legacy redirects on `pages.dev`

## Branch protection (recommended)

GitHub → **Settings → Branches → Add rule** for `main`:

| Setting | Value |
|---------|--------|
| Require status checks | ✅ |
| Required check | **Typecheck, lint, static export smoke** |
| Require branches up to date | ✅ (optional) |

Direct pushes to `main` still run CI; branch protection blocks merge when CI fails.

## Commands

```bash
npm run ci:check          # full local gate (same as pre-push)
npm run smoke:static      # disk + local HTTP (needs out/)
npm run smoke:static:disk   # disk only (fast, after build)
npm run smoke:live        # live pages.dev probe
```
