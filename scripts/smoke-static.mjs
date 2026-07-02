#!/usr/bin/env node
/**
 * Static export smoke: filesystem + full sitemap routing (+ optional live HTTP).
 *
 * Usage:
 *   node scripts/smoke-static.mjs              # disk + local HTTP (all sitemap URLs)
 *   node scripts/smoke-static.mjs --url URL    # live HTTP probe (Pages / production)
 *   node scripts/smoke-static.mjs --disk-only  # skip local HTTP (fast)
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import {
  verifyLegacyRedirectRules,
  verifyLocaleHomes,
  verifySitemapOnDisk,
  verifySourceAppExports,
  verifyLocalHttp,
} from './verify-export-routes.mjs';

const require = createRequire(import.meta.url);
const { LOCALES } = require('../lib/legacySlugRedirects.js');

const OUT = 'out';
const args = process.argv.slice(2);
const diskOnly = args.includes('--disk-only');
const urlFlag =
  args.find((a) => a.startsWith('--url='))?.slice(6) ??
  (args.includes('--url') ? args[args.indexOf('--url') + 1] : null);

const REQUIRED_FILES = [
  'index.html',
  '404.html',
  'sitemap.xml',
  'robots.txt',
  'llms.txt',
  '_redirects',
  'about/index.html',
  'hush-gallery/index.html',
  'hush-gallery/privacy/index.html',
  'zulist/index.html',
  'zulist/invite/_/index.html',
  'en/hush-gallery/index.html',
  'he/hush-gallery/index.html',
  'he/index.html',
  'toldya/child-safety/index.html',
  'zuli-collage/index.html',
];

const LIVE_EXTRA_PATHS = [
  '/collagio',
  '/hushgallery',
  '/zulist/invite/smoke-test-id',
];

function fail(msg) {
  console.error(`smoke: FAIL — ${msg}`);
  process.exit(1);
}

function countHtmlFiles(dir) {
  let count = 0;
  const { spawnSync } = require('node:child_process');
  const result = spawnSync('find', [dir, '-name', '*.html'], { encoding: 'utf8' });
  if (result.stdout) count = result.stdout.trim().split('\n').filter(Boolean).length;
  return count;
}

function checkBasics() {
  if (!existsSync(OUT)) fail(`missing ${OUT}/ — run npm run build:static first`);

  const htmlCount = countHtmlFiles(OUT);
  if (htmlCount < 800) {
    fail(`expected ≥800 HTML files in ${OUT}/, found ${htmlCount}`);
  }

  for (const rel of REQUIRED_FILES) {
    if (!existsSync(join(OUT, rel))) fail(`missing required export: ${rel}`);
  }

  console.log(`smoke: basics OK (${htmlCount} HTML files)`);
}

function checkSitemapAndApps() {
  const sitemapPath = join(OUT, 'sitemap.xml');
  const { paths, missing } = verifySitemapOnDisk(OUT, sitemapPath);

  if (missing.length) {
    const sample = missing
      .slice(0, 15)
      .map((m) => `  ${m.pathname} → ${m.expected}`)
      .join('\n');
    fail(`${missing.length}/${paths.length} sitemap URLs missing on disk:\n${sample}`);
  }

  const localeMissing = verifyLocaleHomes(OUT, LOCALES);
  if (localeMissing.length) {
    fail(`missing locale home pages: ${localeMissing.join(', ')}`);
  }

  const appMissing = verifySourceAppExports(OUT);
  if (appMissing.length) {
    const sample = appMissing.map((m) => m.expected).join(', ');
    fail(`app routes missing default-locale export: ${sample}`);
  }

  const redirectErrors = verifyLegacyRedirectRules(join(OUT, '_redirects'));
  if (redirectErrors.length) {
    fail(`_redirects errors:\n  ${redirectErrors.join('\n  ')}`);
  }

  console.log(`smoke: routing OK (${paths.length} sitemap URLs, ${LOCALES.length} locales)`);
  return paths;
}

async function checkLocalHttp(paths) {
  console.log(`smoke: local HTTP probe (${paths.length} sitemap URLs)…`);
  const { ok, errors, total } = await verifyLocalHttp(OUT, paths);

  if (errors.length) {
    const sample = errors
      .slice(0, 15)
      .map((e) => `  ${e.pathname} → ${e.status}${e.error ? ` (${e.error})` : ''}`)
      .join('\n');
    fail(`${errors.length}/${total} local HTTP failures (ok=${ok}):\n${sample}`);
  }
  console.log(`smoke: local HTTP OK (${ok}/${total})`);
}

async function checkLiveHttp(sitemapPaths) {
  const { probeAllHttp } = await import('./verify-export-routes.mjs');
  const base = urlFlag.replace(/\/+$/, '');
  console.log(`smoke: live HTTP probe ${base} (${sitemapPaths.length} sitemap URLs)`);

  const { ok, errors, total } = await probeAllHttp(base, sitemapPaths, { concurrency: 16 });
  if (errors.length) {
    const sample = errors
      .slice(0, 15)
      .map((e) => `  ${e.pathname} → ${e.status}${e.error ? ` (${e.error})` : ''}`)
      .join('\n');
    fail(`${errors.length}/${total} sitemap URLs failed on live host:\n${sample}`);
  }
  console.log(`smoke: live sitemap OK (${ok}/${total})`);

  const redirectChecks = [
    { path: '/collagio', mustInclude: 'zuli-collage' },
    { path: '/hushgallery', mustInclude: 'hush-gallery' },
    { path: '/zulist/invite/smoke-test-id', mustInclude: 'zulist' },
  ];

  for (const { path, mustInclude } of redirectChecks) {
    const res = await fetch(`${base}${path}`, { redirect: 'follow' });
    if (res.status !== 200 || !res.url.includes(mustInclude)) {
      fail(`live redirect check failed: ${path} → ${res.status} ${res.url}`);
    }
    console.log(`  OK ${path} → 200 (${mustInclude})`);
  }
}

async function main() {
  checkBasics();
  const sitemapPaths = checkSitemapAndApps();

  if (urlFlag) {
    await checkLiveHttp(sitemapPaths);
    return;
  }

  if (!diskOnly) {
    await checkLocalHttp(sitemapPaths);
  } else {
    console.log('smoke: --disk-only (skipped local HTTP)');
  }
}

main().catch((err) => fail(err.message));
