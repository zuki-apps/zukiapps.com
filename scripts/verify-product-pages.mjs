#!/usr/bin/env node
/**
 * Product-page lockstep for marketing + AEO:
 * - every product app has public/{slug}/faq.md
 * - screenshot image files referenced in EN JSON exist
 * - FAQ items >= 8
 * - unpublished apps have empty store URLs
 * - published store URLs match operatingSystem
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

const SKIP_SLUGS = new Set(['dreambit-legacy']);

const UNPUBLISHED = new Set([
  'questivo',
  'coloring-my-photo',
  'ztl-guard',
  'contacts-toolbox',
  'roamguard',
]);

const IOS_ONLY = new Set(['blockiva', 'eventtick', 'tally-nudge', 'photo-stamp']);
const ANDROID_ONLY = new Set(['roamguard']);

function fail(msg) {
  console.error(`product-pages: FAIL — ${msg}`);
  process.exit(1);
}

function assert(cond, msg) {
  if (!cond) fail(msg);
}

function loadJson(rel) {
  return JSON.parse(readFileSync(join(ROOT, rel), 'utf8'));
}

function stripQuery(url) {
  return url.split('?')[0];
}

function publicFileFromImagePath(image) {
  const clean = stripQuery(image).replace(/^\/+/, '');
  return join(ROOT, 'public', clean);
}

const appsDir = join(ROOT, 'messages', 'apps');
const slugs = readdirSync(appsDir).filter((name) => {
  if (SKIP_SLUGS.has(name)) return false;
  return existsSync(join(appsDir, name, 'en.json'));
});

assert(slugs.length >= 20, `expected 20+ product apps, found ${slugs.length}`);

for (const slug of slugs) {
  const faqMd = join(ROOT, 'public', slug, 'faq.md');
  assert(existsSync(faqMd), `missing public/${slug}/faq.md`);

  const data = loadJson(`messages/apps/${slug}/en.json`);
  const namespace = Object.keys(data)[0];
  const ns = data[namespace];
  assert(ns && typeof ns === 'object', `${slug} missing namespace`);

  const faqItems = ns.faq?.items;
  assert(Array.isArray(faqItems), `${slug} faq.items must be an array`);
  assert(faqItems.length >= 8, `${slug} needs at least 8 FAQ items (has ${faqItems.length})`);
  for (const [i, item] of faqItems.entries()) {
    assert(typeof item?.question === 'string' && item.question.trim(), `${slug} faq.items[${i}].question`);
    assert(typeof item?.answer === 'string' && item.answer.trim(), `${slug} faq.items[${i}].answer`);
  }

  const download = ns.download || {};
  const ios = typeof download.appStoreUrl === 'string' ? download.appStoreUrl.trim() : '';
  const play = typeof download.googlePlayUrl === 'string' ? download.googlePlayUrl.trim() : '';

  if (UNPUBLISHED.has(slug)) {
    assert(!ios, `${slug} is unpublished — appStoreUrl must stay empty`);
    assert(!play, `${slug} is unpublished — googlePlayUrl must stay empty`);
  } else if (IOS_ONLY.has(slug)) {
    assert(/^https:\/\/apps\.apple\.com\//.test(ios), `${slug} needs a live App Store URL`);
    assert(!play, `${slug} is iOS-first — googlePlayUrl must stay empty until Play is live`);
  } else if (ANDROID_ONLY.has(slug)) {
    assert(!ios, `${slug} is Android-only — appStoreUrl must stay empty`);
  } else {
    assert(/^https:\/\/apps\.apple\.com\//.test(ios), `${slug} needs a live App Store URL`);
    assert(/^https:\/\/play\.google\.com\//.test(play), `${slug} needs a live Play URL`);
  }

  const shots = ns.screenshots?.items;
  if (Array.isArray(shots) && shots.length > 0) {
    for (const [i, item] of shots.entries()) {
      assert(item?.image, `${slug} screenshots.items[${i}] missing image`);
      const file = publicFileFromImagePath(item.image);
      assert(existsSync(file), `${slug} missing screenshot file ${item.image}`);
    }
  } else if (!UNPUBLISHED.has(slug)) {
    fail(`${slug} published page needs screenshots.items`);
  }
}

const flags = readFileSync(join(ROOT, 'lib/appPublishState.ts'), 'utf8');
for (const slug of UNPUBLISHED) {
  const flag = slug === 'roamguard' ? 'ROAMGUARD' : slug.replace(/-/g, '_').toUpperCase();
  assert(flags.includes(`${flag}_PUBLISHED = false`), `${flag}_PUBLISHED must be false`);
}

console.log(`product-pages: OK (${slugs.length} apps, ${UNPUBLISHED.size} unpublished)`);
