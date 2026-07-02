#!/usr/bin/env node
/**
 * Fail CI if wrangler pages deploy uploaded too few assets (partial/cached deploy).
 * Usage: node scripts/verify-deploy-log.mjs deploy.log
 */
import { readFileSync } from 'node:fs';

const logPath = process.argv[2];
const minAssets = Number(process.env.MIN_PAGES_ASSETS ?? 1500);

if (!logPath) {
  console.error('Usage: node scripts/verify-deploy-log.mjs <deploy.log>');
  process.exit(1);
}

const log = readFileSync(logPath, 'utf8');

// wrangler 4.x: "Uploaded N of M assets" or "Success! Uploaded N files"
const patterns = [
  /Uploaded\s+(\d+)\s+of\s+(\d+)\s+assets/i,
  /Success!\s+Uploaded\s+(\d+)\s+files?/i,
  /Uploaded\s+(\d+)\s+new or modified static assets?/i,
];

let uploaded = null;
for (const re of patterns) {
  const m = log.match(re);
  if (m) {
    uploaded = Number(m[1]);
    break;
  }
}

if (uploaded === null) {
  console.warn('verify-deploy-log: could not parse upload count — check deploy.log manually');
  console.warn(log.split('\n').filter((l) => /upload|asset|file/i.test(l)).slice(-20).join('\n'));
  process.exit(0);
}

console.log(`verify-deploy-log: wrangler uploaded ${uploaded} assets (min ${minAssets})`);

if (uploaded < minAssets) {
  console.error(
    `verify-deploy-log: FAIL — only ${uploaded} assets uploaded; expected ≥${minAssets}.`,
  );
  console.error('Retry with --skip-caching or purge Pages asset cache in Cloudflare dashboard.');
  process.exit(1);
}
