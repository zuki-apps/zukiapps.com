/**
 * Resize + compress home LCP assets (logo + grid icons).
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
];

async function writeOptimizedIcon(relPath) {
  const input = path.join(publicDir, relPath);
  const webpOut = input.replace(/\.png$/i, '.webp');
  const pngTmp = `${input}.opt.tmp`;

  const pipeline = sharp(input).resize(256, 256, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

  await pipeline.clone().webp({ quality: 85, effort: 6 }).toFile(webpOut);
  await pipeline.clone().png({ compressionLevel: 9 }).toFile(pngTmp);
  fs.renameSync(pngTmp, input);

  const before = fs.statSync(input).size;
  const afterWebp = fs.statSync(webpOut).size;
  console.log(`${relPath} → webp ${(afterWebp / 1024).toFixed(1)} KiB, png ${(before / 1024).toFixed(1)} KiB`);
}

async function writeOptimizedLogo() {
  const input = path.join(publicDir, 'logo.png');
  const webpOut = path.join(publicDir, 'logo.webp');
  const pngTmp = path.join(publicDir, 'logo.opt.tmp');

  await sharp(input).webp({ quality: 85, effort: 6 }).toFile(webpOut);
  await sharp(input).png({ compressionLevel: 9 }).toFile(pngTmp);
  fs.renameSync(pngTmp, input);

  console.log(
    `logo → webp ${(fs.statSync(webpOut).size / 1024).toFixed(1)} KiB, png ${(fs.statSync(input).size / 1024).toFixed(1)} KiB`
  );
}

for (const rel of HOME_ICONS) {
  await writeOptimizedIcon(rel);
}
await writeOptimizedLogo();
console.log('Done.');
