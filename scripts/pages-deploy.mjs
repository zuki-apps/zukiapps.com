#!/usr/bin/env node
/**
 * Deploy static export to Cloudflare Pages (creates project on first run).
 * Usage: node scripts/pages-deploy.mjs [--domains-only]
 */
import { spawnSync } from 'node:child_process';
import { existsSync, renameSync } from 'node:fs';

const domainsOnly = process.argv.includes('--domains-only');
const projectName = process.env.CF_PAGES_PROJECT_NAME ?? 'zukiapps-site';
const branch = process.env.CF_PAGES_BRANCH ?? 'main';
const customDomains = (process.env.CF_PAGES_CUSTOM_DOMAINS ?? 'zukiapps.com,www.zukiapps.com')
  .split(',')
  .map((d) => d.trim())
  .filter(Boolean);

function run(args, { allowFail = false, label = args.join(' ') } = {}) {
  console.log(`\n> npx ${args.join(' ')}`);
  const result = spawnSync('npx', args, {
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
  });
  if (result.status !== 0 && !allowFail) {
    console.error(`Command failed (${label}): exit ${result.status ?? 1}`);
    process.exit(result.status ?? 1);
  }
  return result.status ?? 0;
}

async function verifyToken() {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!token || !accountId) {
    console.error('Missing CLOUDFLARE_API_TOKEN or CLOUDFLARE_ACCOUNT_ID');
    process.exit(1);
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errors = body.errors?.map((e) => e.message).join('; ') ?? response.statusText;
    console.error(`Cloudflare Pages API check failed: ${errors}`);
    console.error('Token needs Account → Cloudflare Pages → Edit permission.');
    process.exit(1);
  }
  console.log(`Cloudflare Pages API OK (${body.result?.length ?? 0} existing projects)`);
}

async function attachCustomDomains() {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!token || !accountId || customDomains.length === 0) {
    return;
  }

  for (const name of customDomains) {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/domains`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      }
    );
    const body = await response.json().catch(() => ({}));
    if (response.ok) {
      console.log(`Attached custom domain: ${name}`);
      continue;
    }
    const errors = body.errors?.map((e) => e.message).join('; ') ?? response.statusText;
    if (/already exists|duplicate|already been added/i.test(errors)) {
      console.log(`Custom domain already attached: ${name}`);
      continue;
    }
    console.warn(`Could not attach ${name}: ${errors}`);
  }
}

function hideWorkerConfig() {
  if (existsSync('wrangler.jsonc') && !existsSync('wrangler.jsonc.worker.disabled')) {
    renameSync('wrangler.jsonc', 'wrangler.jsonc.worker.disabled');
  }
}

function restoreWorkerConfig() {
  if (existsSync('wrangler.jsonc.worker.disabled') && !existsSync('wrangler.jsonc')) {
    renameSync('wrangler.jsonc.worker.disabled', 'wrangler.jsonc');
  }
}

await verifyToken();

if (domainsOnly) {
  await attachCustomDomains();
  process.exit(0);
}

hideWorkerConfig();

try {
  run(['wrangler', 'pages', 'project', 'list', '--config', 'wrangler.pages.jsonc'], { allowFail: true });

  run(
    [
      'wrangler',
      'pages',
      'project',
      'create',
      projectName,
      '--production-branch',
      branch,
      '--config',
      'wrangler.pages.jsonc',
    ],
    { allowFail: true }
  );

  const deployArgs = [
    'wrangler',
    'pages',
    'deploy',
    'out',
    '--project-name',
    projectName,
    '--branch',
    branch,
    '--config',
    'wrangler.pages.jsonc',
  ];

  if (process.env.GITHUB_SHA) {
    deployArgs.push('--commit-hash', process.env.GITHUB_SHA);
  } else {
    deployArgs.push('--commit-dirty=true');
  }

  run(deployArgs);
  await attachCustomDomains();
  console.log(`\nPages preview: https://${projectName}.pages.dev`);
} finally {
  restoreWorkerConfig();
}
