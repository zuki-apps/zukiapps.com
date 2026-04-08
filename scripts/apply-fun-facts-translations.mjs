#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const messagesDir = path.join(__dirname, '..', 'messages');
const patchesDir = path.join(__dirname, 'patches', 'fun-facts');

function deepAssign(target, source) {
  if (source === null || source === undefined) return target;
  if (typeof source !== 'object' || Array.isArray(source)) return target;
  for (const k of Object.keys(source)) {
    const sv = source[k];
    const tv = target[k];
    if (sv !== null && typeof sv === 'object' && !Array.isArray(sv) && tv !== null && typeof tv === 'object' && !Array.isArray(tv)) {
      deepAssign(tv, sv);
    } else {
      target[k] = sv;
    }
  }
  return target;
}

const en = JSON.parse(fs.readFileSync(path.join(messagesDir, 'en.json'), 'utf8'));
const baseFunFacts = () => structuredClone(en.funFactsTrivia);

if (!fs.existsSync(patchesDir)) {
  console.error('No patches dir:', patchesDir);
  process.exit(1);
}

const files = fs.readdirSync(patchesDir).filter((f) => f.endsWith('.json'));
for (const f of files) {
  const loc = f.replace(/\.json$/, '');
  const patch = JSON.parse(fs.readFileSync(path.join(patchesDir, f), 'utf8'));
  const j = JSON.parse(fs.readFileSync(path.join(messagesDir, `${loc}.json`), 'utf8'));
  if (patch.homeFunFacts) {
    deepAssign(j.home.funFactsTrivia, patch.homeFunFacts);
  }
  if (patch.funFactsTrivia) {
    const merged = baseFunFacts();
    deepAssign(merged, patch.funFactsTrivia);
    j.funFactsTrivia = merged;
  }
  fs.writeFileSync(path.join(messagesDir, `${loc}.json`), JSON.stringify(j, null, 2) + '\n', 'utf8');
  console.log('Applied fun-facts patch:', loc);
}
