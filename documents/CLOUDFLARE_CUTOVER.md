# Netlify → Cloudflare env mapping (zukiapps.com)

Copy **Production** values from Netlify. Your Netlify list:

| Netlify key | Netlify value (production) |
|-------------|----------------------------|
| `NEXT_PUBLIC_SITE_URL` | `https://zukiapps.com` |
| `NEXT_PUBLIC_BASE_URL` | `https://zukiapps.com` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-ZQS2LWYD18` |
| `GOOGLE_CLOUD_PROJECT_ID` | `zulist-26` |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | *(full JSON — copy from Netlify Production)* |

---

## Where each variable goes

Cloudflare splits this differently than Netlify. Use **two places**:

### A) GitHub → Repository secrets

**GitHub** → `zuki-apps/zukiapps.com` → **Settings → Secrets and variables → Actions → New repository secret**

| Secret name | Paste from Netlify |
|-------------|-------------------|
| `CLOUDFLARE_API_TOKEN` | *(create in Cloudflare — not from Netlify)* |
| `CLOUDFLARE_ACCOUNT_ID` | *(Cloudflare dashboard sidebar — not from Netlify)* |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-ZQS2LWYD18` |
| `SITE_URL` | `https://zukiapps.com` *(sitemap ping workflow)* |

`NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_BASE_URL` are already hardcoded in `.github/workflows/ci.yml` as `https://zukiapps.com`.

### B) Cloudflare Worker secrets (runtime — server APIs)

**Cloudflare** → **Workers & Pages** → **zukiapps-com** → **Settings** → **Variables and Secrets** → **Add**

| Name | Type | Value |
|------|------|-------|
| `FIREBASE_SERVICE_ACCOUNT_KEY` | **Secret** | Entire JSON from Netlify (one line is fine) |
| `GOOGLE_CLOUD_PROJECT_ID` | **Secret** or Text | `zulist-26` |

Used by:
- `/api/zulist/invite/[id]` → Firebase Admin
- `/api/play-integrity/verify` → Google Play Integrity API

**CLI** (after `npm ci`, with `CLOUDFLARE_API_TOKEN` exported):

```bash
wrangler secret put FIREBASE_SERVICE_ACCOUNT_KEY
wrangler secret put GOOGLE_CLOUD_PROJECT_ID
# paste values when prompted
```

---

## Netlify “4 deploy contexts” → Cloudflare

| Netlify context | Cloudflare equivalent |
|-----------------|----------------------|
| Production | Worker **Production** secrets (above) |
| Deploy Previews | Not used — PRs only run CI, no deploy |
| Branch deploys | Not used |
| Local development | `.dev.vars` (copy from `.dev.vars.example`) |

For cutover, copy the **Production** value of `FIREBASE_SERVICE_ACCOUNT_KEY` only (all 4 Netlify contexts had the same key).

---

## Checklist

- [ ] GitHub: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- [ ] GitHub: `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-ZQS2LWYD18`
- [ ] Cloudflare Worker: `FIREBASE_SERVICE_ACCOUNT_KEY` (secret)
- [ ] Cloudflare Worker: `GOOGLE_CLOUD_PROJECT_ID` = `zulist-26`
- [ ] Run deploy: GitHub **Actions → CI → Run workflow**
- [ ] Test: `https://zukiapps.com`, `/api/site-facts`, Zulist invite link

---

## Optional (not in your Netlify list)

If you add Google Search Console verification later:

| Name | Where |
|------|-------|
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | GitHub secret + add to deploy `env` in `ci.yml` |
