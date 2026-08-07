#!/usr/bin/env node
/**
 * Prepare Pages Functions for deploy: copy scoped _routes.json into out/.
 * Wrangler bundles ./functions automatically during `pages deploy`.
 */
import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'out');
const functionsDir = join(root, 'functions');
const routesSrc = join(functionsDir, '_routes.json');
const routesDest = join(outDir, '_routes.json');

if (!existsSync(outDir)) {
  console.error('Missing out/ — build static export first');
  process.exit(1);
}
if (!existsSync(functionsDir)) {
  console.error('Missing functions/');
  process.exit(1);
}

// Stale prebuilt workers break deploy (multipart blob ≠ JS module).
try {
  const { unlinkSync } = await import('node:fs');
  for (const name of ['_worker.js', '_worker.js.map']) {
    const p = join(outDir, name);
    if (existsSync(p)) unlinkSync(p);
  }
} catch {
  /* ignore */
}

if (existsSync(routesSrc)) {
  copyFileSync(routesSrc, routesDest);
} else {
  writeFileSync(
    routesDest,
    `${JSON.stringify(
      {
        version: 1,
        include: ['/zulist/invite/*', '/*/zulist/invite/*'],
        exclude: [],
      },
      null,
      2
    )}\n`
  );
}

console.log('pages-functions-build: wrote out/_routes.json (Wrangler will bundle functions/ on deploy)');
