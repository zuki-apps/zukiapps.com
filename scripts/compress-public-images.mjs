/**
 * Losslessly-ish shrinks raster assets under public/ using sharp.
 * Run after editing source art: `node scripts/compress-public-images.mjs`
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.join(process.cwd(), 'public');

const SKIP_NAMES = new Set(['google-play-badge.png']);

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

async function processFile(absPath) {
  const rel = path.relative(ROOT, absPath).split(path.sep).join('/');
  const base = path.basename(absPath);
  if (SKIP_NAMES.has(base)) return;
  if (rel.startsWith('images/dreambit-legacy/') || rel.startsWith('images/dreambit')) return;

  const ext = path.extname(absPath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) return;

  const buf = await fs.readFile(absPath);
  const meta = await sharp(buf).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;

  let pipeline = sharp(buf).rotate();

  const isLogo = rel === 'logo.png';
  const isFunFacts = rel === 'images/fun-facts-trivia-icon.png';

  if (isFunFacts) {
    pipeline = pipeline.resize(1024, 1024, {
      fit: 'contain',
      position: 'centre',
      kernel: sharp.kernel.lanczos3,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });
  } else if (isLogo) {
    const max = 512;
    if (w > max || h > max) {
      pipeline = pipeline.resize(max, max, { fit: 'inside', withoutEnlargement: true });
    }
  } else if (rel.startsWith('images/monsters/')) {
    const max = 512;
    if (w > max || h > max) {
      pipeline = pipeline.resize(max, max, { fit: 'inside', withoutEnlargement: true });
    }
  } else {
    const max = 1024;
    if (w > max || h > max) {
      pipeline = pipeline.resize(max, max, { fit: 'inside', withoutEnlargement: true });
    }
  }

  let outBuf;
  if (ext === '.png') {
    const targetBytes = 200 * 1024;
    let side = isLogo ? 512 : isFunFacts ? 1024 : Math.min(1024, Math.max(w, h) || 1024);
    let guard = 0;
    outBuf = await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
    while (outBuf.length > targetBytes && guard < 10 && side > 128) {
      guard += 1;
      side = Math.round(side * 0.85);
      outBuf = await sharp(buf)
        .rotate()
        .resize(isFunFacts ? side : side, isFunFacts ? side : side, {
          fit: isFunFacts ? 'contain' : 'inside',
          position: 'centre',
          kernel: sharp.kernel.lanczos3,
          ...(isFunFacts ? { background: { r: 0, g: 0, b: 0, alpha: 0 } } : {}),
          withoutEnlargement: !isFunFacts,
        })
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toBuffer();
    }
  } else if (ext === '.webp') {
    outBuf = await pipeline.webp({ quality: 82, effort: 6 }).toBuffer();
  } else {
    outBuf = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  }

  await fs.writeFile(absPath, outBuf);
  console.log(`${rel}: ${buf.length} → ${outBuf.length} bytes (${meta.width}×${meta.height})`);
}

async function main() {
  const files = (await walk(ROOT)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  for (const f of files) {
    try {
      await processFile(f);
    } catch (e) {
      console.error('failed:', path.relative(ROOT, f), e);
      process.exitCode = 1;
    }
  }
}

main();
