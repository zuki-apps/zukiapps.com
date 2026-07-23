#!/usr/bin/env node
/**
 * Post-process Next.js static export for Cloudflare Pages:
 * - Mirror default locale (en) to unprefixed URLs
 * - Convert page.html into page/index.html for clean paths
 * - Emit compliance siblings (privacy.html) so CF serves /privacy as 200 (no 308)
 * - Write complete _redirects (www, home, legacy slugs)
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { getNetlifyRedirectLines, LOCALES } = require('../lib/legacySlugRedirects.js');

const OUT = 'out';
const localeSet = new Set(LOCALES);

/** Legal / store-compliance segments exported as {segment}/index.html */
const COMPLIANCE_SEGMENTS = new Set([
  'privacy',
  'terms',
  'support',
  'child-safety',
  'delete-account',
  'delete-data',
]);

const RSC_TXT_ARTIFACTS = new Set([
  'privacy.txt',
  'terms.txt',
  'support.txt',
  'child-safety.txt',
  'delete-account.txt',
  'delete-data.txt',
]);

export function mirrorDefaultLocaleToRoot(outDir = OUT) {
  const enDir = join(outDir, 'en');
  if (!existsSync(enDir)) {
    console.warn('post-static-export: out/en missing — skip mirror');
    return;
  }

  for (const entry of readdirSync(enDir)) {
    const src = join(enDir, entry);
    const dest = join(outDir, entry);
    if (existsSync(dest)) {
      if (statSync(dest).isDirectory()) {
        copyTree(src, dest);
      } else {
        copyFileSync(src, dest);
      }
    } else {
      copyTree(src, dest);
    }
  }
  console.log('post-static-export: mirrored out/en → out/');
}

function copyTree(src, dest) {
  if (!existsSync(src)) return;
  if (statSync(src).isDirectory()) {
    mkdirSync(dest, { recursive: true });
    for (const entry of readdirSync(src)) {
      copyTree(join(src, entry), join(dest, entry));
    }
    return;
  }
  mkdirSync(join(dest, '..'), { recursive: true });
  copyFileSync(src, dest);
}

export function promoteLocaleHomePages(outDir = OUT) {
  for (const locale of LOCALES) {
    const htmlPath = join(outDir, `${locale}.html`);
    if (!existsSync(htmlPath)) continue;
    const localeDir = join(outDir, locale);
    mkdirSync(localeDir, { recursive: true });
    const indexPath = join(localeDir, 'index.html');
    if (!existsSync(indexPath)) {
      copyFileSync(htmlPath, indexPath);
    }
    rmSync(htmlPath);
  }
  console.log('post-static-export: locale home pages → {locale}/index.html');
}

export function convertHtmlFilesToIndexDirs(outDir = OUT) {
  walkAndConvert(outDir);
  console.log('post-static-export: page.html → page/index.html');
}

function walkAndConvert(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    if (ent.isDirectory()) {
      walkAndConvert(join(dir, ent.name));
    }
  }
  for (const ent of entries) {
    if (!ent.isFile() || !ent.name.endsWith('.html')) continue;
    if (ent.name === 'index.html' || ent.name === '404.html') continue;

    const htmlPath = join(dir, ent.name);
    const slug = ent.name.slice(0, -5);
    const targetDir = join(dir, slug);
    mkdirSync(targetDir, { recursive: true });
    renameSync(htmlPath, join(targetDir, 'index.html'));
  }
}

export function findCompliancePaths(outDir = OUT) {
  const paths = [];

  function walk(dir, prefix = '') {
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      if (!ent.isDirectory()) continue;
      const rel = prefix ? `${prefix}/${ent.name}` : ent.name;
      const full = join(dir, ent.name);
      if (COMPLIANCE_SEGMENTS.has(ent.name) && existsSync(join(full, 'index.html'))) {
        paths.push(rel);
      }
      walk(full, rel);
    }
  }

  walk(outDir);
  return paths.sort();
}

/** Every directory with index.html (locale homes, apps, nested pages). */
export function findIndexHtmlDirs(outDir = OUT) {
  const paths = [];

  function walk(dir, prefix = '') {
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      if (!ent.isDirectory()) continue;
      const rel = prefix ? `${prefix}/${ent.name}` : ent.name;
      const full = join(dir, ent.name);
      if (existsSync(join(full, 'index.html'))) {
        paths.push(rel);
      }
      walk(full, rel);
    }
  }

  walk(outDir);
  return paths.sort();
}

/**
 * Cloudflare Pages 308s /path → /path/ when only path/index.html exists.
 * A sibling path.html makes /path return 200 (locale switcher, Play URLs, SEO).
 * Keep path/index.html so /path/ still works.
 */
export function emitExtensionlessHtmlFiles(outDir = OUT) {
  const paths = findIndexHtmlDirs(outDir);
  for (const rel of paths) {
    const indexPath = join(outDir, rel, 'index.html');
    const htmlPath = join(outDir, `${rel}.html`);
    copyFileSync(indexPath, htmlPath);
  }
  console.log(`post-static-export: emitted ${paths.length} extensionless .html siblings`);
  return paths;
}

/** @deprecated use emitExtensionlessHtmlFiles */
export function emitComplianceHtmlFiles(outDir = OUT) {
  return emitExtensionlessHtmlFiles(outDir);
}

export function removeRscTxtArtifacts(outDir = OUT) {
  let removed = 0;

  function walk(dir) {
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, ent.name);
      if (ent.isDirectory()) {
        walk(full);
        continue;
      }
      if (!RSC_TXT_ARTIFACTS.has(ent.name)) continue;
      rmSync(full);
      removed++;
    }
  }

  walk(outDir);
  if (removed) {
    console.log(`post-static-export: removed ${removed} RSC .txt artifacts`);
  }
}

export function writeRedirectsFile(outDir = OUT) {
  const lines = [
    '# Generated by scripts/post-static-export.mjs — do not edit out/_redirects by hand',
    'https://www.zukiapps.com/* https://zukiapps.com/:splat 301',
    '',
    '# Default locale home (static export has no middleware)',
    '/ /index.html 200',
    '',
    '# Legacy app slug redirects',
    ...getNetlifyRedirectLines(),
    '',
  ];
  writeFileSync(join(outDir, '_redirects'), `${lines.join('\n')}\n`);
  console.log('post-static-export: wrote out/_redirects');
}

export function runPostStaticExport(outDir = OUT) {
  if (!existsSync(outDir)) {
    throw new Error(`Missing ${outDir}/ — run next build with STATIC_EXPORT=1 first`);
  }

  if (existsSync(join(outDir, 'en.html'))) {
    copyFileSync(join(outDir, 'en.html'), join(outDir, 'index.html'));
  }

  mirrorDefaultLocaleToRoot(outDir);
  promoteLocaleHomePages(outDir);
  convertHtmlFilesToIndexDirs(outDir);
  emitExtensionlessHtmlFiles(outDir);
  removeRscTxtArtifacts(outDir);
  writeRedirectsFile(outDir);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runPostStaticExport();
}
