#!/usr/bin/env node
/**
 * Static export smoke: filesystem checks + optional HTTP probe (local or live URL).
 *
 * Usage:
 *   node scripts/smoke-static.mjs
 *   node scripts/smoke-static.mjs --url https://zukiapps-site.pages.dev
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const OUT = 'out';
const args = process.argv.slice(2);
const urlFlag = args.find((a) => a.startsWith('--url='))?.slice(6) ?? (args.includes('--url') ? args[args.indexOf('--url') + 1] : null);

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

const HTTP_PATHS = [
  '/',
  '/about',
  '/hush-gallery',
  '/hush-gallery/privacy',
  '/he',
  '/he/hush-gallery',
  '/en/hush-gallery',
  '/zulist',
  '/sitemap.xml',
  '/robots.txt',
  '/llms.txt',
  '/collagio',
  '/hushgallery',
  '/zulist/invite/smoke-test-id',
];

/** Paths that need Cloudflare/_redirects — skipped on local static server probe */
const REDIRECT_ONLY_PATHS = new Set(['/collagio', '/hushgallery', '/zulist/invite/smoke-test-id']);

function fail(msg) {
  console.error(`smoke: FAIL — ${msg}`);
  process.exit(1);
}

function countHtmlFiles(dir) {
  const result = spawnSync('find', [dir, '-name', '*.html'], { encoding: 'utf8' });
  return result.stdout.trim().split('\n').filter(Boolean).length;
}

function checkFilesystem() {
  if (!existsSync(OUT)) fail(`missing ${OUT}/ directory`);

  const htmlCount = countHtmlFiles(OUT);
  if (htmlCount < 800) {
    fail(`expected ≥800 HTML files in ${OUT}/, found ${htmlCount}`);
  }

  for (const rel of REQUIRED_FILES) {
    const path = join(OUT, rel);
    if (!existsSync(path)) fail(`missing ${rel}`);
  }

  const redirects = readFileSync(join(OUT, '_redirects'), 'utf8');
  if (!redirects.includes('/hushgallery /hush-gallery 301')) {
    fail('_redirects missing unprefixed legacy slug rule');
  }
  if (!redirects.includes('/zulist/invite/*')) {
    fail('_redirects missing ZuList invite rewrite');
  }

  console.log(`smoke: filesystem OK (${htmlCount} HTML files, ${REQUIRED_FILES.length} required paths)`);
}

async function curlStatus(base, path, follow = true) {
  const args = ['-sI', '--max-time', '10', `${base}${path}`];
  if (follow) args.splice(1, 0, '-L');
  const out = spawnSync('curl', args, { encoding: 'utf8', timeout: 15000 });
  if (out.status !== 0) return { status: 'ERR', path };
  const lines = out.stdout.trim().split('\n');
  const statuses = lines.filter((l) => l.startsWith('HTTP/')).map((l) => l.split(' ')[1]);
  const locs = lines.filter((l) => l.toLowerCase().startsWith('location:')).map((l) => l.slice(9).trim());
  return {
    status: statuses.at(-1) ?? 'ERR',
    path,
    chain: statuses,
    location: locs.at(-1),
  };
}

async function checkHttp(base) {
  console.log(`smoke: HTTP probe ${base}`);
  const errors = [];

  for (const path of HTTP_PATHS) {
    if (!urlFlag && REDIRECT_ONLY_PATHS.has(path)) continue;
    const r = await curlStatus(base, path);
    const ok =
      r.status === '200' ||
      (path === '/collagio' && r.status === '301' && r.location?.includes('zuli-collage')) ||
      (path === '/hushgallery' && r.status === '301' && r.location?.includes('hush-gallery'));
    if (!ok) errors.push(`${path} → ${r.status}${r.location ? ` (${r.location})` : ''}`);
    else console.log(`  OK ${path} → ${r.status}${r.chain?.length > 1 ? ` [${r.chain.join('→')}]` : ''}`);
  }

  if (errors.length) {
    fail(`HTTP errors:\n  ${errors.join('\n  ')}`);
  }
  console.log('smoke: HTTP OK');
}

async function main() {
  checkFilesystem();

  if (!urlFlag) {
    console.log('smoke: local filesystem checks passed (use --url for HTTP probe)');
    return;
  }

  await checkHttp(urlFlag.replace(/\/+$/, ''));
}

main().catch((err) => fail(err.message));
