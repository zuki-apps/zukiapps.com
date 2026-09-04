/**
 * Resize + compress home LCP assets (logo, grid icons, carousel monsters, CTA).
 * Run: node scripts/optimize-home-images.mjs
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');

const HOME_ICONS = [
  'images/zulist-icon.png',
  'images/hush-gallery-icon.png',
  'images/whistle-camera-icon.png',
  'images/power-interval-timer-icon.png',
  'images/bit-scope-icon.png',
  'images/track-ledger-icon.png',
  'images/noise-meter-shusher-icon.png',
  'images/paratrooper-blitz-icon.png',
  'images/sudoku-puzzle-icon.png',
  'images/tempo-lab-pro-icon.png',
  'images/football-trivia-icon.png',
  'images/fun-facts-trivia-icon.png',
  'images/geo-calc-icon.png',
  'images/zuli-collage-icon.png',
  'images/timesince-icon.png',
  'images/toldya-icon.png',
];

const MONSTERS = ['images/monsters/zuli-01.png', 'images/monsters/zuli-04.png', 'images/monsters/zuli-15.png'];

async function writeOptimizedIcon(relPath) {
  const input = path.join(publicDir, relPath);
  if (!fs.existsSync(input)) {
    console.warn(`skip missing ${relPath}`);
    return;
  }
  const webpOut = input.replace(/\.png$/i, '.webp');
  const pngTmp = `${input}.opt.tmp`;

  // Grid/carousel display ≤128 CSS px → 192 covers 1.5–2×; keeps files small for LCP.
  const pipeline = sharp(input).resize(192, 192, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

  await pipeline.clone().webp({ quality: 82, effort: 6 }).toFile(webpOut);
  await pipeline.clone().png({ compressionLevel: 9 }).toFile(pngTmp);
  fs.renameSync(pngTmp, input);

  console.log(
    `${relPath} → webp ${(fs.statSync(webpOut).size / 1024).toFixed(1)} KiB, png ${(fs.statSync(input).size / 1024).toFixed(1)} KiB`
  );
}

async function writeOptimizedMonster(relPath) {
  const input = path.join(publicDir, relPath);
  if (!fs.existsSync(input)) {
    console.warn(`skip missing ${relPath}`);
    return;
  }
  const webpOut = input.replace(/\.png$/i, '.webp');
  await sharp(input)
    .resize(256, 256, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 72, effort: 6 })
    .toFile(webpOut);

  console.log(`${relPath} → webp ${(fs.statSync(webpOut).size / 1024).toFixed(1)} KiB`);
}

async function writeOptimizedLogo() {
  const input = path.join(publicDir, 'logo.png');
  const webpOut = path.join(publicDir, 'logo.webp');
  // Hero display 180px → 270px covers ~1.5× DPR without a huge download.
  await sharp(input)
    .resize(270, 270, { fit: 'inside' })
    .webp({ quality: 58, effort: 6 })
    .toFile(webpOut);

  console.log(`logo → webp ${(fs.statSync(webpOut).size / 1024).toFixed(1)} KiB`);
}

async function writeCoffeeButton() {
  const input = path.join(publicDir, 'images/buy-me-a-coffee-button.png');
  if (!fs.existsSync(input)) return;
  const webpOut = input.replace(/\.png$/i, '.webp');
  await sharp(input)
    .resize({ width: 290, withoutEnlargement: true })
    .webp({ quality: 75, effort: 6 })
    .toFile(webpOut);
  console.log(`coffee → webp ${(fs.statSync(webpOut).size / 1024).toFixed(1)} KiB`);
}

for (const rel of HOME_ICONS) {
  await writeOptimizedIcon(rel);
}
for (const rel of MONSTERS) {
  await writeOptimizedMonster(rel);
}
await writeOptimizedLogo();
await writeCoffeeButton();
console.log('Done.');
