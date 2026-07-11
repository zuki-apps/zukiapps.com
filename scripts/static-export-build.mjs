#!/usr/bin/env node
/**
 * Static export for Cloudflare Pages (free tier).
 * Disables middleware and API routes during build (no server on static hosting).
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, renameSync, writeFileSync } from 'node:fs';
import { runPostStaticExport } from './post-static-export.mjs';
import { scanBuildOutput } from './verify-build-output-lib.mjs';

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

const BUILD_LOG = '.next-build.log';

const result = spawnSync('npx', ['next', 'build'], {
  encoding: 'utf8',
  env,
  shell: process.platform === 'win32',
  maxBuffer: 64 * 1024 * 1024,
});

const buildOutput = `${result.stdout ?? ''}${result.stderr ?? ''}`;
if (buildOutput) {
  process.stdout.write(result.stdout ?? '');
  process.stderr.write(result.stderr ?? '');
  writeFileSync(BUILD_LOG, buildOutput);
}

for (const [from, to] of disabledPaths) {
  if (existsSync(to) && !existsSync(from)) {
    renameSync(to, from);
  }
}

if ((result.status ?? 1) !== 0) {
  process.exit(result.status ?? 1);
}

const buildScan = scanBuildOutput(buildOutput);
if (buildScan.length) {
  console.error('\nbuild-output: FAIL — known error patterns in build log');
  for (const f of buildScan) {
    console.error(`\n${f.name} (${f.total} occurrence(s)):`);
    for (const item of f.unique) console.error(`  - ${item}`);
    console.error(`Hint: ${f.hint}`);
  }
  process.exit(1);
}

if ((result.status ?? 1) === 0) {
  runPostStaticExport();
}

process.exit(result.status ?? 1);
