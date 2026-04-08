#!/usr/bin/env node
/**
 * Deep-merge en.json into each locale file: missing keys get English values.
 * Existing translations in locale files are preserved.
 * Usage: node scripts/sync-messages-from-en.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const messagesDir = path.join(__dirname, '..', 'messages');

/** Locale wins on leaf keys; missing branches filled from en (clone). */
function mergeLocaleWithEn(locale, en) {
  if (en === null || en === undefined) return locale;
  if (locale === null || locale === undefined) return structuredClone(en);
  if (typeof locale === 'string' || typeof locale === 'number' || typeof locale === 'boolean') return locale;
  if (typeof en === 'string' || typeof en === 'number' || typeof en === 'boolean') return locale;
  if (Array.isArray(locale)) return locale;
  if (Array.isArray(en)) return locale ?? structuredClone(en);

  const out = {};
  for (const k of Object.keys(en)) {
    if (!(k in locale)) {
      out[k] = structuredClone(en[k]);
      continue;
    }
    const lv = locale[k];
    const ev = en[k];
    if (
      lv !== null &&
      typeof lv === 'object' &&
      !Array.isArray(lv) &&
      ev !== null &&
      typeof ev === 'object' &&
      !Array.isArray(ev)
    ) {
      out[k] = mergeLocaleWithEn(lv, ev);
    } else {
      out[k] = lv;
    }
  }
  for (const k of Object.keys(locale)) {
    if (!(k in en)) out[k] = locale[k];
  }
  return out;
}

const enPath = path.join(messagesDir, 'en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const locales = ['he', 'de', 'es', 'it', 'pt', 'ru', 'fr', 'ja', 'ko', 'ar', 'zh'];

for (const loc of locales) {
  const p = path.join(messagesDir, `${loc}.json`);
  const locData = JSON.parse(fs.readFileSync(p, 'utf8'));
  const merged = mergeLocaleWithEn(locData, en);
  fs.writeFileSync(p, JSON.stringify(merged, null, 2) + '\n', 'utf8');
  console.log(`Synced ${loc}.json`);
}

console.log('Done. dreambitLegacy.json unchanged (loaded separately in i18n).');
