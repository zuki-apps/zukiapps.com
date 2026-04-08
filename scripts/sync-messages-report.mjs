#!/usr/bin/env node
/**
 * Report missing / extra keys vs en.json for each locale JSON (excluding dreambitLegacy).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const messagesDir = path.join(__dirname, '..', 'messages');

function flattenKeys(obj, prefix = '') {
  const keys = [];
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) return keys;
  for (const k of Object.keys(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    keys.push(p);
    if (obj[k] !== null && typeof obj[k] === 'object' && !Array.isArray(obj[k])) {
      keys.push(...flattenKeys(obj[k], p));
    }
  }
  return keys;
}

function getAt(obj, pathStr) {
  const parts = pathStr.split('.');
  let cur = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = cur[p];
  }
  return cur;
}

const en = JSON.parse(fs.readFileSync(path.join(messagesDir, 'en.json'), 'utf8'));
const enKeys = new Set(flattenKeys(en));

const locales = ['he', 'de', 'es', 'it', 'pt', 'ru', 'fr', 'ja', 'ko', 'ar', 'zh'];
const report = {};

for (const loc of locales) {
  const data = JSON.parse(fs.readFileSync(path.join(messagesDir, `${loc}.json`), 'utf8'));
  const locKeys = new Set(flattenKeys(data));
  const missing = [...enKeys].filter((k) => !locKeys.has(k)).sort();
  const extra = [...locKeys].filter((k) => !enKeys.has(k)).sort();
  report[loc] = { missing: missing.length, extra: extra.length, missingPaths: missing, extraPaths: extra };
}

console.log(JSON.stringify(report, null, 2));

let totalMissing = 0;
for (const loc of locales) {
  totalMissing += report[loc].missingPaths.length;
  console.error(`${loc}: missing ${report[loc].missing}, extra ${report[loc].extra}`);
}
console.error(`Total missing key-paths (sum over locales): ${totalMissing}`);
