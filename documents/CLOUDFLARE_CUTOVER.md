# Cloudflare cutover — copy env from Netlify

Migrate these from **Netlify → Site settings → Environment variables** to **Cloudflare Workers → zukiapps-com → Settings → Variables**.

## Build-time (GitHub Actions — already in `.github/workflows/ci.yml`)

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://zukiapps.com` |
| `NEXT_PUBLIC_BASE_URL` | `https://zukiapps.com` |
| `SITEMAP_USE_GIT` | `true` |

## Worker secrets (encrypted — copy from Netlify)

| Secret | Notes |
|--------|-------|
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Full JSON service account |
| `GOOGLE_CLOUD_PROJECT_ID` | e.g. `zulist-26` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional — or set as plain var |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional — e.g. `G-ZQS2LWYD18` |

CLI:

```bash
wrangler secret put FIREBASE_SERVICE_ACCOUNT_KEY
wrangler secret put GOOGLE_CLOUD_PROJECT_ID
```

## DNS (after first deploy)

1. Cloudflare zone `zukiapps.com` — nameservers at registrar → Cloudflare.
2. Remove Netlify A/CNAME records; apex + `www` proxied (orange cloud) to Worker routes in `wrangler.jsonc`.
3. Netlify: **Site configuration → Domain management → Remove domain** (or disable auto-publish).

## Disable Netlify builds

Netlify → Site configuration → Build & deploy → **Stop builds** (or unlink repo).
