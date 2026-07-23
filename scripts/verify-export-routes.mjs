/**
 * Verify static export: every sitemap URL resolves on disk and returns 200 locally.
 */
import { createServer } from 'node:http';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { SLUG_PAIRS } = require('../lib/legacySlugRedirects.js');

export function parseSitemapPaths(sitemapPath) {
  const xml = readFileSync(sitemapPath, 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
    const url = new URL(m[1]);
    return url.pathname.replace(/\/+$/, '') || '/';
  });
}

/** Map public pathname to file under out/ (post-static-export layout). */
export function resolveExportRel(pathname) {
  const clean = pathname === '/' ? '' : pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!clean) return 'index.html';
  return `${clean}/index.html`;
}

export function verifySitemapOnDisk(outDir, sitemapPath) {
  const paths = parseSitemapPaths(sitemapPath);
  const missing = [];

  for (const pathname of paths) {
    const rel = resolveExportRel(pathname);
    if (!existsSync(join(outDir, rel))) {
      missing.push({ pathname, expected: rel });
    }
  }

  return { paths, missing };
}

export function verifyLegacyRedirectRules(redirectsPath) {
  const text = readFileSync(redirectsPath, 'utf8');
  const errors = [];

  for (const [from, to] of SLUG_PAIRS) {
    if (!text.includes(`/${from} /${to} 301`)) {
      errors.push(`missing unprefixed redirect: /${from} → /${to}`);
    }
    if (!text.includes(`/:locale/${from} /:locale/${to} 301`)) {
      errors.push(`missing locale redirect: /:locale/${from}`);
    }
  }
  if (!text.includes('/zulist/invite/*')) {
    errors.push('missing ZuList invite rewrite');
  }
  if (!text.includes('/ /index.html 200')) {
    errors.push('missing home rewrite');
  }

  return errors;
}

/**
 * Cloudflare Pages serves /path as 200 only when path.html exists (index.html alone → 308).
 * Verify every compliance route has the sibling .html file.
 */
export function verifyComplianceHtmlSiblings(outDir) {
  const errors = [];
  const { findCompliancePaths } = require('./post-static-export.mjs');

  for (const rel of findCompliancePaths(outDir)) {
    if (!existsSync(join(outDir, `${rel}.html`))) {
      errors.push(`missing compliance sibling: ${rel}.html`);
    }
  }

  return errors;
}

export function verifyLocaleHomes(outDir, locales) {
  const missing = [];
  for (const locale of locales) {
    const rel = `${locale}/index.html`;
    if (!existsSync(join(outDir, rel))) {
      missing.push(rel);
    }
  }
  return missing;
}

/** Top-level app folders under app/[locale]/ that must export for default locale. */
export function verifySourceAppExports(outDir) {
  const localeDir = join(process.cwd(), 'app/[locale]');
  if (!existsSync(localeDir)) return [];

  const skip = new Set(['opengraph-image']);
  const slugs = readdirSync(localeDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
    .map((d) => d.name)
    .filter((name) => !skip.has(name) && existsSync(join(localeDir, name, 'page.tsx')));

  const missing = [];
  for (const slug of slugs) {
    const rel = `${slug}/index.html`;
    if (!existsSync(join(outDir, rel))) {
      missing.push({ slug, expected: rel });
    }
  }
  return missing;
}

function contentType(filePath) {
  const ext = extname(filePath).toLowerCase();
  const map = {
    '.html': 'text/html; charset=utf-8',
    '.xml': 'application/xml',
    '.txt': 'text/plain; charset=utf-8',
    '.json': 'application/json',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
  };
  return map[ext] ?? 'application/octet-stream';
}

function resolveFile(root, pathname) {
  let rel = resolveExportRel(pathname);
  if (rel !== 'index.html' && !existsSync(join(root, rel))) {
    const alt = pathname.replace(/^\/+/, '');
    if (alt && existsSync(join(root, `${alt}.html`))) rel = `${alt}.html`;
  }
  return join(root, rel);
}

export function startStaticServer(outDir, port = 0) {
  const server = createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://127.0.0.1').pathname);
    const filePath = resolveFile(outDir, pathname);
    if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType(filePath) });
    res.end(readFileSync(filePath));
  });

  return new Promise((resolve, reject) => {
    server.listen(port, '127.0.0.1', () => {
      const addr = server.address();
      resolve({ server, port: typeof addr === 'object' && addr ? addr.port : port });
    });
    server.on('error', reject);
  });
}

export async function probeHttp(base, pathname) {
  const url = `${base.replace(/\/+$/, '')}${pathname === '/' ? '/' : pathname}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'manual', signal: controller.signal });
    return { pathname, status: res.status, location: res.headers.get('location') };
  } catch (err) {
    return { pathname, status: 'ERR', error: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}

export async function probeAllHttp(base, paths, { concurrency = 32, expectRedirect } = {}) {
  const errors = [];
  let ok = 0;

  for (let i = 0; i < paths.length; i += concurrency) {
    const batch = paths.slice(i, i + concurrency);
    const results = await Promise.all(batch.map((p) => probeHttp(base, p)));
    for (const r of results) {
      const redirectOk = expectRedirect?.(r);
      if (r.status === 200 || redirectOk) {
        ok++;
      } else {
        errors.push(r);
      }
    }
  }

  return { ok, errors, total: paths.length };
}

export async function verifyLocalHttp(outDir, paths) {
  const { server, port } = await startStaticServer(outDir);
  const base = `http://127.0.0.1:${port}`;
  try {
    return await probeAllHttp(base, paths);
  } finally {
    server.close();
  }
}

/** Public URL path for a locale + page segment (matches localePrefix as-needed). */
export function localePublicPath(locale, pageSegment, defaultLocale = 'en') {
  const seg = pageSegment.replace(/^\/+|\/+$/g, '');
  if (locale === defaultLocale) {
    return seg ? `/${seg}` : '/';
  }
  return seg ? `/${locale}/${seg}` : `/${locale}`;
}

/** Probe paths: home + sample apps for every locale. */
export function buildLocaleProbePaths(
  locales,
  samplePages,
  defaultLocale = 'en',
) {
  const paths = [];
  for (const locale of locales) {
    for (const page of samplePages) {
      paths.push(localePublicPath(locale, page, defaultLocale));
    }
  }
  return paths;
}

export function verifyLocaleSampleExports(outDir, locales, samplePages, defaultLocale = 'en') {
  const missing = [];
  for (const locale of locales) {
    for (const page of samplePages) {
      const pathname = localePublicPath(locale, page, defaultLocale);
      const rel = resolveExportRel(pathname);
      if (!existsSync(join(outDir, rel))) {
        missing.push({ locale, page, pathname, expected: rel });
      }
    }
  }
  return missing;
}

/** Ensure exported pages are locale-specific (routing + RTL content where applicable). */
export function verifyLocaleContentMarkers(outDir, locales, rtlLocales, defaultLocale = 'en') {
  const errors = [];
  const samplePage = 'hush-gallery';
  const hebrew = /[\u0590-\u05FF]/;
  const arabic = /[\u0600-\u06FF]/;

  for (const locale of locales) {
    const pathname = localePublicPath(locale, samplePage, defaultLocale);
    const filePath = join(outDir, resolveExportRel(pathname));
    if (!existsSync(filePath)) {
      errors.push(`${locale}: missing ${samplePage} export`);
      continue;
    }
    const html = readFileSync(filePath, 'utf8');

    if (locale === defaultLocale) {
      continue;
    }

    if (!html.includes(`/${locale}/`)) {
      errors.push(`${locale}: missing /${locale}/ paths in ${samplePage} HTML`);
    }

    if (locale === 'he' && !hebrew.test(html)) {
      errors.push(`${locale}: expected Hebrew script in ${samplePage}`);
    }
    if (locale === 'ar' && !arabic.test(html)) {
      errors.push(`${locale}: expected Arabic script in ${samplePage}`);
    }

    if (rtlLocales.includes(locale) && !/\bdir=["']rtl["']/i.test(html)) {
      // LocaleHtmlSync or inline markup should set rtl somewhere in the tree
      if (!html.includes('"rtl"') && !html.includes("'rtl'")) {
        errors.push(`${locale}: missing rtl marker in ${samplePage}`);
      }
    }
  }

  return errors;
}

export async function verifyLocaleHttp(base, locales, samplePages, defaultLocale = 'en') {
  const paths = buildLocaleProbePaths(locales, samplePages, defaultLocale);
  return probeAllHttp(base, paths);
}
