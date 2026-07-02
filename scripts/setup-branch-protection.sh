#!/usr/bin/env bash
# Require CI to pass before merging to main.
# Prereq: gh auth login (admin on zuki-apps/zukiapps.com)
set -euo pipefail

REPO="${GITHUB_REPO:-zuki-apps/zukiapps.com}"
BRANCH="${1:-main}"
CHECK="Typecheck, lint, static export smoke"

if ! gh auth status >/dev/null 2>&1; then
  echo "Run: gh auth login"
  exit 1
fi

echo "Setting branch protection on ${REPO}@${BRANCH}…"
echo "Required status check: ${CHECK}"

gh api \
  --method PUT \
  "repos/${REPO}/branches/${BRANCH}/protection" \
  --input - <<EOF
{
  "required_status_checks": {
    "strict": true,
    "checks": [
      { "context": "${CHECK}" }
    ]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": null,
  "restrictions": null,
  "required_linear_history": false,
  "allow_force_pushes": false,
  "allow_deletions": false
}
EOF

echo "Done. Verify: https://github.com/${REPO}/settings/branches"
