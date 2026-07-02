# Get zukiapps.com back online

**Current status (checked):** `https://zukiapps.com` returns **503** from **Netlify** with `"Usage exceeded"`.  
DNS still uses Netlify nameservers (`*.nsone.net`). Netlify cannot serve the site until the plan resets or you upgrade — **moving to Cloudflare is the fix**.

---

## Overview (≈30 minutes)

```
1. Cloudflare account + add zukiapps.com
2. GitHub secrets → deploy Worker
3. Change nameservers (GoDaddy/registrar) → Cloudflare
4. Attach custom domain to Worker
5. Copy secrets from Netlify → Cloudflare Worker
```

---

## Step 1 — Cloudflare account

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Sign up** (free plan is fine).
2. **Add a site** → enter `zukiapps.com` → Continue.
3. Choose **Free** plan.
4. Cloudflare shows **two nameservers** (e.g. `ada.ns.cloudflare.com`, `bob.ns.cloudflare.com`).  
   **Keep this tab open** — you need them in Step 4.
5. Copy your **Account ID** (right sidebar on any Cloudflare page).

---

## Step 2 — Cloudflare API token

1. [Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens) → **Create Token**.
2. Use template **Edit Cloudflare Workers** → Create.
3. Copy the token (shown once).

---

## Step 3 — GitHub secrets

**GitHub** → [zuki-apps/zukiapps.com](https://github.com/zuki-apps/zukiapps.com) → **Settings → Secrets and variables → Actions → New repository secret**

| Name | Value |
|------|-------|
| `CLOUDFLARE_API_TOKEN` | Token from Step 2 |
| `CLOUDFLARE_ACCOUNT_ID` | From Step 1 sidebar |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-ZQS2LWYD18` |
| `SITE_URL` | `https://zukiapps.com` |

---

## Step 4 — Deploy to Cloudflare Pages (static, free)

**GitHub** → **Actions** → **Deploy Cloudflare** → **Run workflow** (or push to `main`).

Wait for:
- ✅ Typecheck, lint, static export smoke (CI)
- ✅ Deploy to Cloudflare Pages

Build command: `npm run deploy` → static export to `out/` → `wrangler pages deploy`.

**Verify:** Cloudflare → **Workers & Pages** → **zukiapps-com** → `*.pages.dev` URL loads.

> **Note:** Static hosting serves all marketing pages. `/api/*` routes are disabled until you add a small Worker later (optional). ZuList invite pages use a client shell + `_redirects` rewrite.

---

## Step 5 — Worker secrets (optional — APIs only)

Skip for initial recovery. Only needed if you restore `/api/zulist/invite`, Play Integrity, etc. on a Worker.

**Cloudflare** → **Workers & Pages** → (future Worker) → **Settings** → **Variables and Secrets**

| Name | Type | Value |
|------|------|-------|
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Secret | Full JSON from Netlify |
| `GOOGLE_CLOUD_PROJECT_ID` | Secret | `zulist-26` |

---

## Step 6 — Point DNS to Cloudflare (this brings zukiapps.com live)

Your domain currently uses **Netlify DNS** (`dns1.p09.nsone.net`, etc.).

1. Log in where you manage the domain (**GoDaddy**, etc.).
2. **Nameservers** → **Custom** → replace Netlify NS with the **two Cloudflare nameservers** from Step 1.
3. Save. Propagation can take 5 minutes–48 hours (often under 1 hour).

In **Cloudflare** → **DNS** for `zukiapps.com`:
- Ensure `@` and `www` exist (Cloudflare usually adds them).
- Records should be **Proxied** (orange cloud).

---

## Step 7 — Attach domain to Pages

**Cloudflare** → **Workers & Pages** → **zukiapps-com** → **Custom domains** → **Set up a custom domain**

Add:
- `zukiapps.com`
- `www.zukiapps.com`

SSL is automatic. Test `https://zukiapps.com`.

---

## Step 8 — Turn off Netlify

Netlify → your site → **Site configuration → Build & deploy → Stop builds**  
Remove custom domain from Netlify so traffic doesn’t hit the capped account.

---

## Local deploy (optional)

If GitHub Actions isn’t ready:

```bash
export CLOUDFLARE_API_TOKEN="your-token"
export CLOUDFLARE_ACCOUNT_ID="your-account-id"
npm run deploy
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Still 503 + `server: Netlify` | DNS not switched yet; wait for NS propagation or flush local DNS |
| Deploy fails “authentication” | Check `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` in GitHub |
| Worker URL works, domain doesn’t | Complete Steps 6–7; confirm Pages custom domain (not old Netlify origin) |
| Zulist invites fail | Expected on static-only — invite page shell loads; API needs a Worker later |
| GA missing | Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` GitHub secret, redeploy |

---

## Why not fix Netlify?

Netlify is returning **usage exceeded** — restoring `netlify.toml` will not help until bandwidth resets or you pay for more. Cloudflare free tier avoids this cap for a marketing site.
