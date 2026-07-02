#!/usr/bin/env bash
# First deploy or manual cutover: npm run deploy (needs CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID).
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" || -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
  echo "Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID (export or .env.local)." >&2
  exit 1
fi

export NEXT_PUBLIC_SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://zukiapps.com}"
export NEXT_PUBLIC_BASE_URL="${NEXT_PUBLIC_BASE_URL:-https://zukiapps.com}"
export SITEMAP_USE_GIT="${SITEMAP_USE_GIT:-true}"

npm run deploy

echo ""
echo "Next: Cloudflare dashboard → Workers → zukiapps-com → Settings → Variables"
echo "  wrangler secret put FIREBASE_SERVICE_ACCOUNT_KEY"
echo "  wrangler secret put GOOGLE_CLOUD_PROJECT_ID"
echo ""
echo "DNS: point zukiapps.com A/CNAME to Cloudflare (orange cloud). Disable Netlify deploy hook."
