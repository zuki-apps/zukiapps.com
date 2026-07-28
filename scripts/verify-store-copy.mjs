#!/usr/bin/env node
/**
 * Fail CI when store URLs are live but marketing/FAQ copy still says "coming soon",
 * or when locale FAQ answers look corrupted (English store blob / privacy→store swap).
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const APPS_DIR = join(ROOT, 'messages', 'apps');

/** Phrase-level (avoid matching inside words like German "erfolgt"). */
const SOON_RE = new RegExp(
  [
    'coming\\s+soon',
    'google\\s*play\\s+coming',
    'android\\s+coming',
    'قريب(?:اً|ً)?',
    '\\bfolgt\\b',
    'demnächst',
    'próximamente',
    'bientôt',
    'בקרוב',
    'in\\s+arrivo',
    'まもなく',
    '곧\\s*출시',
    'em\\s+breve',
    '\\bскоро\\b',
    '即将',
  ].join('|'),
  'i',
);

const PLAY_HINT_RE = /google\s*play|android|play\.google/i;
const STORE_URL_RE = /https?:\/\/(?:apps\.apple\.com|play\.google\.com)\//i;
const EN_STORE_BLOB_RE = /^Free on the App Store\b/i;
const PRIVACY_Q_RE =
  /upload|server|servers|خوادم|העלא|hochgeladen|servidor|serveurs|サーバー|서버|сервер|上传|caricat/i;

const SKIP_KEYS = new Set([
  'googlePlaySoon',
  'soon',
  'googlePlayAlt',
  'appStoreAlt',
  'appStoreUrl',
  'googlePlayUrl',
]);

const MARKETING_PATH_RE =
  /\.(hero|status|faq|links|download\.description|download\.title|structuredDataDescription)\b/;

function isHttp(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url.trim());
}

function walkStrings(value, path, out) {
  if (value == null) return;
  if (typeof value === 'string') {
    out.push({ path, text: value });
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => walkStrings(item, `${path}[${i}]`, out));
    return;
  }
  if (typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (SKIP_KEYS.has(key)) continue;
      walkStrings(child, path ? `${path}.${key}` : key, out);
    }
  }
}

function loadJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function checkAppLocale(appSlug, locale, data) {
  const errors = [];
  const namespace = Object.keys(data)[0];
  if (!namespace) {
    errors.push(`${appSlug}/${locale}.json: empty namespace`);
    return errors;
  }
  const root = data[namespace];
  const download = root?.download ?? {};
  const playLive = isHttp(download.googlePlayUrl);
  const iosLive = isHttp(download.appStoreUrl);

  const strings = [];
  walkStrings(root, namespace, strings);

  for (const { path, text } of strings) {
    if (!SOON_RE.test(text)) continue;
    if (!MARKETING_PATH_RE.test(path) && !path.includes('.faq')) continue;

    if (playLive && PLAY_HINT_RE.test(text)) {
      errors.push(
        `${appSlug}/${locale}.json: ${path} still says coming-soon while googlePlayUrl is live`,
      );
    }
    if (
      iosLive &&
      playLive &&
      SOON_RE.test(text) &&
      (PLAY_HINT_RE.test(text) || /app\s*store/i.test(text))
    ) {
      // dual-live "coming soon on App Store and Google Play"
      if (!errors.some((e) => e.includes(path))) {
        errors.push(
          `${appSlug}/${locale}.json: ${path} still says coming-soon while both stores are live`,
        );
      }
    }
  }

  // FAQ integrity
  const faqItems = root?.faq?.items;
  if (Array.isArray(faqItems)) {
    for (let i = 0; i < faqItems.length; i++) {
      const item = faqItems[i];
      if (!item || typeof item !== 'object') continue;
      const q = String(item.question ?? '');
      const a = String(item.answer ?? '');

      if (locale !== 'en' && EN_STORE_BLOB_RE.test(a.trim())) {
        errors.push(
          `${appSlug}/${locale}.json: faq.items[${i}] answer is English store blob under localized FAQ`,
        );
      }

      if (PRIVACY_Q_RE.test(q) && STORE_URL_RE.test(a) && !/privacy|خصوصية|פרטיות/i.test(a)) {
        // Privacy/upload question answered with store URLs only
        if (!/on your device|auf Ihrem Gerät|جهازك|במכשיר|dispositivo|appareil|デバイス|기기|устройств|设备/i.test(a)) {
          errors.push(
            `${appSlug}/${locale}.json: faq.items[${i}] privacy/upload question has store-URL answer (likely bad merge)`,
          );
        }
      }
    }
  }

  return errors;
}

function main() {
  if (!existsSync(APPS_DIR)) {
    console.error('store-copy: FAIL — messages/apps missing');
    process.exit(1);
  }

  const apps = readdirSync(APPS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const allErrors = [];

  for (const appSlug of apps) {
    const dir = join(APPS_DIR, appSlug);
    const locales = readdirSync(dir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''));

    for (const locale of locales) {
      const path = join(dir, `${locale}.json`);
      try {
        allErrors.push(...checkAppLocale(appSlug, locale, loadJson(path)));
      } catch (err) {
        allErrors.push(`${appSlug}/${locale}.json: ${err.message}`);
      }
    }
  }

  if (allErrors.length) {
    console.error(`store-copy: FAIL (${allErrors.length} issue(s))`);
    for (const e of allErrors.slice(0, 80)) console.error(`  - ${e}`);
    if (allErrors.length > 80) console.error(`  … ${allErrors.length - 80} more`);
    process.exit(1);
  }

  console.log(`store-copy: OK (${apps.length} apps scanned)`);
}

main();
