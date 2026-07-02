#!/usr/bin/env node
/**
 * Static export for Cloudflare Pages (free tier).
 * Disables middleware and API routes during build (no server on static hosting).
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, renameSync } from 'node:fs';
import { runPostStaticExport } from './post-static-export.mjs';

const stashRoot = '.static-export-stash';
mkdirSync(stashRoot, { recursive: true });

const disabledPaths = [
  ['middleware.ts', `${stashRoot}/middleware.ts`],
  ['app/api', `${stashRoot}/api`],
];

for (const [from, to] of disabledPaths) {
  if (existsSync(from) && !existsSync(to)) {
    renameSync(from, to);
  }
}

const env = {
  ...process.env,
  STATIC_EXPORT: '1',
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zukiapps.com',
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? 'https://zukiapps.com',
};

const result = spawnSync('npx', ['next', 'build'], {
  stdio: 'inherit',
  env,
  shell: process.platform === 'win32',
});

for (const [from, to] of disabledPaths) {
  if (existsSync(to) && !existsSync(from)) {
    renameSync(to, from);
  }
}

if ((result.status ?? 1) === 0) {
  runPostStaticExport();
}

process.exit(result.status ?? 1);
