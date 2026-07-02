#!/usr/bin/env bash
# Set GitHub repo description, homepage, and topics (requires: gh auth login).
set -euo pipefail

REPO="${1:-zuki-apps/zukiapps.com}"

gh repo edit "$REPO" \
  --description "Marketing site for Zuki Apps — Next.js, i18n, SEO/AEO, Netlify deploy (zukiapps.com)" \
  --homepage "https://zukiapps.com" \
  --add-topic nextjs \
  --add-topic typescript \
  --add-topic tailwindcss \
  --add-topic next-intl \
  --add-topic netlify \
  --add-topic seo \
  --add-topic marketing-site \
  --add-topic zuki-apps

echo "Done. Verify: gh repo view $REPO"
