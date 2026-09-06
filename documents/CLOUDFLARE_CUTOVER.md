# Cloudflare env mapping (zukiapps.com)

Host is **Cloudflare Pages** (`zukiapps-site`). Secrets live in GitHub Actions and (optional) Worker variables.

| Key | Production value |
|-----|------------------|
| `NEXT_PUBLIC_SITE_URL` | `https://zukiapps.com` |
| `NEXT_PUBLIC_BASE_URL` | `https://zukiapps.com` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-ZQS2LWYD18` |
| `GOOGLE_CLOUD_PROJECT_ID` | `zulist-26` |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | *(full service-account JSON)* |

---

## Where each variable goes

### A) GitHub → Repository secrets

**GitHub** → `zuki-apps/zukiapps.com` → **Settings → Secrets and variables → Actions → New repository secret**

| Secret name | Value |
|-------------|-------|
| `CLOUDFLARE_API_TOKEN` | Create in Cloudflare |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard sidebar |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-ZQS2LWYD18` |
| `SITE_URL` | `https://zukiapps.com` *(sitemap ping workflow)* |

`NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_BASE_URL` are hardcoded in `.github/workflows/ci.yml` as `https://zukiapps.com`.

### B) Cloudflare Worker secrets (runtime — server APIs)

**Cloudflare** → **Workers & Pages** → worker → **Settings** → **Variables and Secrets** → **Add**

| Name | Type | Value |
|------|------|-------|
| `FIREBASE_SERVICE_ACCOUNT_KEY` | **Secret** | Entire JSON (one line is fine) |
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

## Deploy contexts

| Context | Where |
|---------|-------|
| Production | GitHub Actions on `main` → Pages `zukiapps-site` |
| Deploy previews | Not used — PRs only run CI |
| Branch deploys | Not used |
| Local development | `.dev.vars` (copy from `.dev.vars.example`) |

---

## Checklist

- [ ] GitHub: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- [ ] GitHub: `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-ZQS2LWYD18`
- [ ] Cloudflare Worker: `FIREBASE_SERVICE_ACCOUNT_KEY` (secret)
- [ ] Cloudflare Worker: `GOOGLE_CLOUD_PROJECT_ID` = `zulist-26`
- [ ] Run deploy: GitHub **Actions → Deploy Cloudflare**
- [ ] Test: `https://zukiapps.com`, Zulist invite link

---

## Optional

If you add Google Search Console verification later:

| Name | Where |
|------|-------|
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | GitHub secret + add to deploy `env` in `ci.yml` |
