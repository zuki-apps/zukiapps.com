import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bundle = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data/noise-paratrooper-en-bundle.json'), 'utf8')
);
const enPath = path.join(__dirname, '../messages/en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

Object.assign(en.home, bundle.homePatch);

const out = {};
for (const k of Object.keys(en)) {
  if (k === 'common') {
    out.noiseMeterShusher = bundle.noiseMeterShusher;
    out.paratrooperBlitz = bundle.paratrooperBlitz;
  }
  out[k] = en[k];
}

fs.writeFileSync(enPath, JSON.stringify(out, null, 2) + '\n');
console.log('Updated messages/en.json with noiseMeterShusher + paratrooperBlitz');
