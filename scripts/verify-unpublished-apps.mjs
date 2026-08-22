#!/usr/bin/env node
/**
 * Guard unpublished / under-construction apps:
 * - not on the home grid
 * - listed on About (ZUKI_IN_DEVELOPMENT_APPS)
 * - kept out of the public JSON-LD catalog
 * - product + privacy/terms/support routes and EN legal keys exist
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

const UNPUBLISHED = [
  { slug: 'questivo', namespace: 'questivo', flag: 'QUESTIVO' },
  { slug: 'coloring-my-photo', namespace: 'coloringMyPhoto', flag: 'COLORING_MY_PHOTO' },
  { slug: 'photo-stamp', namespace: 'photoStamp', flag: 'PHOTO_STAMP' },
];

const LEGAL_PAGES = ['privacy', 'terms', 'support'];

function fail(msg) {
  console.error(`unpublished-apps: FAIL — ${msg}`);
  process.exit(1);
}

function assert(cond, msg) {
  if (!cond) fail(msg);
}

function read(rel) {
  return readFileSync(join(ROOT, rel), 'utf8');
}

function hasPath(obj, path) {
  let cur = obj;
  for (const part of path.split('.')) {
    if (cur == null || typeof cur !== 'object' || !(part in cur)) return false;
    cur = cur[part];
  }
  return typeof cur === 'string' ? cur.trim().length > 0 : cur != null;
}

const homeSrc = read('lib/homeApps.ts');
const catalogSrc = read('lib/siteCatalog.ts');
const aboutSrc = read('app/[locale]/about/page.tsx');
const flagsSrc = read('lib/appPublishState.ts');
const i18nSrc = read('i18n.ts');
const productSrc = read('lib/productApps.ts');
const sitemapSrc = read('app/sitemap.ts');

assert(catalogSrc.includes('ZUKI_IN_DEVELOPMENT_APPS'), 'missing ZUKI_IN_DEVELOPMENT_APPS');
assert(aboutSrc.includes('ZUKI_IN_DEVELOPMENT_APPS'), 'about page must list in-development apps');
assert(!aboutSrc.includes('ZUKI_IN_DEVELOPMENT_APPS') || aboutSrc.includes('ZUKI_SITE_APPS'), 'about catalog still required');

for (const app of UNPUBLISHED) {
  assert(!new RegExp(`['"]${app.slug}['"]`).test(homeSrc), `${app.slug} must not be in homeApps.ts`);
  assert(
    catalogSrc.includes(`path: '/${app.slug}'`) &&
      catalogSrc.indexOf('ZUKI_IN_DEVELOPMENT_APPS') < catalogSrc.lastIndexOf(`path: '/${app.slug}'`),
    `${app.slug} must be in ZUKI_IN_DEVELOPMENT_APPS`,
  );
  const siteAppsBlock = catalogSrc.slice(0, catalogSrc.indexOf('ZUKI_IN_DEVELOPMENT_APPS'));
  assert(!siteAppsBlock.includes(`path: '/${app.slug}'`), `${app.slug} must not be in ZUKI_SITE_APPS`);

  assert(flagsSrc.includes(`${app.flag}_UNDER_CONSTRUCTION = true`), `${app.flag}_UNDER_CONSTRUCTION must be true`);
  assert(flagsSrc.includes(`${app.flag}_PUBLISHED = false`), `${app.flag}_PUBLISHED must be false`);
  assert(flagsSrc.includes(`${app.flag}_PILOT = false`), `${app.flag}_PILOT must be false`);

  assert(i18nSrc.includes(`'${app.slug}'`), `${app.slug} missing from i18n.ts APPS`);
  assert(productSrc.includes(`'${app.slug}'`), `${app.slug} missing from productApps.ts`);
  assert(sitemapSrc.includes(`path: '/${app.slug}/privacy'`), `${app.slug}/privacy missing from sitemap.ts`);

  const folder = join(ROOT, 'app', '[locale]', app.slug);
  assert(existsSync(join(folder, 'page.tsx')), `missing ${app.slug}/page.tsx`);
  for (const page of LEGAL_PAGES) {
    assert(existsSync(join(folder, page, 'page.tsx')), `missing ${app.slug}/${page}/page.tsx`);
  }

  const msgPath = join(ROOT, 'messages', 'apps', app.slug, 'en.json');
  assert(existsSync(msgPath), `missing messages/apps/${app.slug}/en.json`);
  const messages = JSON.parse(readFileSync(msgPath, 'utf8'));
  const ns = messages[app.namespace];
  assert(ns && typeof ns === 'object', `${app.slug} en.json missing namespace ${app.namespace}`);
  for (const key of [
    'hero.title',
    'hero.metaDescription',
    'privacy.title',
    'privacy.intro',
    'privacy.sectionContact.email',
    'terms.title',
    'terms.intro',
    'support.metaTitle',
    'support.faq.q1.question',
    'support.faq.q1.answer',
  ]) {
    assert(hasPath(ns, key), `${app.slug} missing ${app.namespace}.${key}`);
  }
}

if (process.argv.includes('--export')) {
  const outDir = join(ROOT, 'out');
  assert(existsSync(outDir), 'missing out/ — run build:static first');
  const homeHtml = readFileSync(join(outDir, 'index.html'), 'utf8');
  const aboutHtml = readFileSync(join(outDir, 'about/index.html'), 'utf8');
  for (const app of UNPUBLISHED) {
    for (const rel of [
      `${app.slug}/index.html`,
      `${app.slug}/privacy/index.html`,
      `${app.slug}/terms/index.html`,
      `${app.slug}/support/index.html`,
    ]) {
      assert(existsSync(join(outDir, rel)), `export missing ${rel}`);
    }
    const landing = readFileSync(join(outDir, `${app.slug}/index.html`), 'utf8');
    assert(/noindex/i.test(landing), `${app.slug} landing export should be noindex`);
    const privacy = readFileSync(join(outDir, `${app.slug}/privacy/index.html`), 'utf8');
    assert(!/noindex/i.test(privacy), `${app.slug}/privacy should be indexable`);
    assert(aboutHtml.includes(`/${app.slug}`), `about export must link ${app.slug}`);
    const homeGridHit =
      homeHtml.includes(`href="/${app.slug}"`) || homeHtml.includes(`href="/en/${app.slug}"`);
    assert(!homeGridHit, `${app.slug} must not appear as a home-grid link`);
  }
  console.log('unpublished-apps: export checks OK');
}

console.log(`unpublished-apps: OK (${UNPUBLISHED.length} apps)`);
