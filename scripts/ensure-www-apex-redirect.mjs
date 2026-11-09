#!/usr/bin/env node
/**
 * Upsert a zone Single Redirect: www.zukiapps.com/* → https://zukiapps.com/${1} (301).
 *
 * Cloudflare Pages ignores absolute-host rules in _redirects; this must live in
 * Rules → Redirect Rules (phase http_request_dynamic_redirect).
 *
 * Requires CLOUDFLARE_API_TOKEN with Zone → Single Redirect → Edit (and Zone → Zone → Read).
 */
const ZONE_NAME = process.env.CF_ZONE_NAME ?? 'zukiapps.com';
const RULE_REF = 'www_to_apex';
const REQUEST_PATTERN = 'https://www.zukiapps.com/*';
const TARGET_PATTERN = 'https://zukiapps.com/${1}';
const PHASE = 'http_request_dynamic_redirect';

const token = process.env.CLOUDFLARE_API_TOKEN;
if (!token) {
  console.error('Missing CLOUDFLARE_API_TOKEN');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

function redirectRule() {
  return {
    ref: RULE_REF,
    description: 'www.zukiapps.com → zukiapps.com (301, preserve path + query)',
    expression: `(http.request.full_uri wildcard r"${REQUEST_PATTERN}")`,
    action: 'redirect',
    enabled: true,
    action_parameters: {
      from_value: {
        target_url: {
          expression: `wildcard_replace(http.request.full_uri, r"${REQUEST_PATTERN}", r"${TARGET_PATTERN}")`,
        },
        status_code: 301,
        preserve_query_string: true,
      },
    },
  };
}

function sameRedirect(rule) {
  const expr = rule?.action_parameters?.from_value?.target_url?.expression ?? '';
  const status = rule?.action_parameters?.from_value?.status_code;
  const preserve = rule?.action_parameters?.from_value?.preserve_query_string;
  return (
    rule?.expression === `(http.request.full_uri wildcard r"${REQUEST_PATTERN}")` &&
    expr.includes(REQUEST_PATTERN) &&
    expr.includes('zukiapps.com/${1}') &&
    status === 301 &&
    preserve === true &&
    rule?.enabled !== false
  );
}

async function cf(path, { method = 'GET', body } = {}) {
  const response = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok || json.success === false) {
    const errors = json.errors?.map((e) => e.message).join('; ') ?? response.statusText;
    const err = new Error(`Cloudflare API ${method} ${path}: ${errors}`);
    err.status = response.status;
    err.json = json;
    throw err;
  }
  return json.result;
}

async function resolveZoneId() {
  if (process.env.CLOUDFLARE_ZONE_ID) return process.env.CLOUDFLARE_ZONE_ID;
  const zones = await cf(`/zones?name=${encodeURIComponent(ZONE_NAME)}`);
  const zone = Array.isArray(zones) ? zones[0] : null;
  if (!zone?.id) {
    throw new Error(`Zone not found: ${ZONE_NAME}`);
  }
  return zone.id;
}

async function getEntrypoint(zoneId) {
  try {
    return await cf(`/zones/${zoneId}/rulesets/phases/${PHASE}/entrypoint`);
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

async function main() {
  const zoneId = await resolveZoneId();
  console.log(`Zone ${ZONE_NAME} → ${zoneId}`);

  const desired = redirectRule();
  let entry = await getEntrypoint(zoneId);

  if (!entry) {
    entry = await cf(`/zones/${zoneId}/rulesets`, {
      method: 'POST',
      body: {
        name: 'Redirect rules ruleset',
        kind: 'zone',
        phase: PHASE,
        rules: [desired],
      },
    });
    console.log(`Created ${PHASE} ruleset with ${RULE_REF}`);
    return;
  }

  const rules = Array.isArray(entry.rules) ? [...entry.rules] : [];
  const idx = rules.findIndex((r) => r.ref === RULE_REF || sameRedirect(r));

  if (idx >= 0 && sameRedirect(rules[idx])) {
    console.log(`OK: ${RULE_REF} already present (${rules[idx].id})`);
    return;
  }

  if (idx >= 0) {
    const existing = rules[idx];
    await cf(`/zones/${zoneId}/rulesets/${entry.id}/rules/${existing.id}`, {
      method: 'PATCH',
      body: {
        ...desired,
        // Keep Cloudflare id stable; ref stays RULE_REF.
      },
    });
    console.log(`Updated ${RULE_REF} (${existing.id})`);
    return;
  }

  await cf(`/zones/${zoneId}/rulesets/${entry.id}/rules`, {
    method: 'POST',
    body: desired,
  });
  console.log(`Added ${RULE_REF} to existing redirect ruleset (${entry.id})`);
}

main().catch((err) => {
  console.error(err.message);
  if (err.json?.errors) console.error(JSON.stringify(err.json.errors, null, 2));
  process.exit(1);
});
