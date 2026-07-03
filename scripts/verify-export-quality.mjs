/**
 * Extra export quality checks: SEO, assets, JSON-LD, internal links, compliance.
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { resolveExportRel } from './verify-export-routes.mjs';

const SITE_ORIGIN = 'https://zukiapps.com';
const MIN_HTML_BYTES = 4096;

/** Default-locale apps that must ship privacy + terms (store compliance). */
export const COMPLIANCE_APPS = [
  'zulist',
  'hush-gallery',
  'whistle-camera',
  'power-interval-timer',
  'bit-scope',
  'track-ledger',
  'noise-meter-shusher',
  'paratrooper-blitz',
  'sudoku-puzzle',
  'tempo-lab-pro',
  'football-trivia',
  'fun-facts-trivia',
  'toldya',
  'zuli-collage',
];

export const STATIC_ASSET_PATHS = [
  'icon-32.png',
  'icon-192.png',
  'logo.webp',
  'logo.png',
  'manifest.json',
  'app-ads.txt',
  'apple-app-site-association',
  'images/hush-gallery-icon.webp',
];

export function verifySeoArtifacts(outDir, siteOrigin = SITE_ORIGIN) {
  const errors = [];
  const robots = readFileSync(join(outDir, 'robots.txt'), 'utf8');
  if (!/Sitemap:\s*https:\/\/zukiapps\.com\/sitemap\.xml/i.test(robots)) {
    errors.push('robots.txt missing Sitemap: https://zukiapps.com/sitemap.xml');
  }
  if (!/^Host:\s*zukiapps\.com/im.test(robots)) {
    errors.push('robots.txt missing Host: zukiapps.com');
  }

  const sitemap = readFileSync(join(outDir, 'sitemap.xml'), 'utf8');
  if (!sitemap.includes('<?xml') || !sitemap.includes('<urlset')) {
    errors.push('sitemap.xml is not valid XML urlset');
  }
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const dupes = locs.filter((u, i) => locs.indexOf(u) !== i);
  if (dupes.length) {
    errors.push(`sitemap.xml has ${dupes.length} duplicate URLs`);
  }
  const badOrigin = locs.filter((u) => !u.startsWith(siteOrigin));
  if (badOrigin.length) {
    errors.push(`sitemap.xml has ${badOrigin.length} URLs not on ${siteOrigin}`);
  }

  const llms = readFileSync(join(outDir, 'llms.txt'), 'utf8');
  if (llms.length < 200) errors.push('llms.txt too short');
  if (!/zukiapps\.com/i.test(llms)) errors.push('llms.txt missing site reference');
  if (!/hush-gallery|whistle-camera|zulist/i.test(llms)) {
    errors.push('llms.txt missing product references');
  }

  if (!existsSync(join(outDir, 'ai.txt'))) {
    errors.push('missing ai.txt');
  }

  return { errors, sitemapCount: locs.length };
}

export function verifyStaticAssets(outDir) {
  const errors = [];
  for (const rel of STATIC_ASSET_PATHS) {
    if (!existsSync(join(outDir, rel))) {
      errors.push(`missing static asset: ${rel}`);
    }
  }

  const headers = readFileSync(join(outDir, '_headers'), 'utf8');
  if (!headers.includes('/_next/static/*')) {
    errors.push('_headers missing /_next/static/* cache rule');
  }
  if (!headers.includes('/images/*')) {
    errors.push('_headers missing /images/* cache rule');
  }

  return errors;
}

export function verifyHtmlQuality(outDir) {
  const errors = [];
  const pages = [
    { rel: 'index.html', label: 'home', min: MIN_HTML_BYTES, requireMeta: true },
    { rel: 'hush-gallery/index.html', label: 'hush-gallery', min: MIN_HTML_BYTES, requireMeta: true },
    { rel: '404.html', label: '404', min: 512, requireMeta: false },
  ];

  for (const { rel, label, min, requireMeta } of pages) {
    const path = join(outDir, rel);
    if (!existsSync(path)) {
      errors.push(`${label}: missing ${rel}`);
      continue;
    }
    const size = statSync(path).size;
    if (size < min) errors.push(`${label}: HTML too small (${size} bytes)`);
    const html = readFileSync(path, 'utf8');
    if (!/<title[^>]*>[^<]+<\/title>/i.test(html)) {
      errors.push(`${label}: missing <title>`);
    }
    if (requireMeta && !/<meta[^>]+name=["']description["']/i.test(html)) {
      errors.push(`${label}: missing meta description`);
    }
  }

  const notFound = readFileSync(join(outDir, '404.html'), 'utf8');
  if (!/404|not found|page not found/i.test(notFound)) {
    errors.push('404.html missing not-found copy');
  }

  return errors;
}

export function verifyStructuredData(outDir) {
  const errors = [];
  const home = readFileSync(join(outDir, 'index.html'), 'utf8');
  const product = readFileSync(join(outDir, 'hush-gallery/index.html'), 'utf8');

  if (!home.includes('application/ld+json')) {
    errors.push('home: missing JSON-LD');
  } else if (!/ItemList|Organization|WebSite/i.test(home)) {
    errors.push('home: JSON-LD missing expected @type');
  }

  if (!product.includes('application/ld+json')) {
    errors.push('hush-gallery: missing JSON-LD');
  } else if (!/SoftwareApplication|Product/i.test(product)) {
    errors.push('hush-gallery: JSON-LD missing SoftwareApplication');
  }

  return errors;
}

export function verifyHreflangAlternates(outDir) {
  const errors = [];
  const home = readFileSync(join(outDir, 'index.html'), 'utf8');
  const altCount = (home.match(/hreflang=/gi) ?? []).length;
  if (altCount < 6) {
    errors.push(`home: expected ≥6 hreflang alternates, found ${altCount}`);
  }
  return errors;
}

export function verifyComplianceExports(outDir, apps = COMPLIANCE_APPS) {
  const errors = [];
  for (const app of apps) {
    if (!existsSync(join(outDir, `${app}/index.html`))) continue;
    for (const sub of ['privacy', 'terms']) {
      const rel = `${app}/${sub}/index.html`;
      if (!existsSync(join(outDir, rel))) {
        errors.push(`missing compliance page: /${app}/${sub}`);
      }
    }
  }
  return errors;
}

export function verifyInviteShellsAllLocales(outDir, locales) {
  const errors = [];
  for (const locale of locales) {
    const rel =
      locale === 'en'
        ? 'zulist/invite/_/index.html'
        : `${locale}/zulist/invite/_/index.html`;
    if (!existsSync(join(outDir, rel))) {
      errors.push(`missing invite shell: ${rel}`);
    }
  }
  return errors;
}

/** Resolve internal href to export file (post-static-export layout). */
function resolveInternalHref(outDir, href) {
  let path = href.replace(/\/+$/, '') || '/';
  if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);
  const rel = resolveExportRel(path);
  if (existsSync(join(outDir, rel))) return rel;
  return null;
}

function resolveAssetPath(outDir, href) {
  const rel = decodeURIComponent(href.replace(/^\//, ''));
  return join(outDir, rel);
}

export function verifyInternalLinks(outDir, sampleFiles) {
  const errors = [];
  const hrefRe = /\b(?:href|src)=["'](\/(?!\/)[^"'#?]*)["']/g;
  const checked = new Set();

  for (const rel of sampleFiles) {
    const filePath = join(outDir, rel);
    if (!existsSync(filePath)) continue;
    const html = readFileSync(filePath, 'utf8');
    let m;
    while ((m = hrefRe.exec(html)) !== null) {
      const href = m[1];
      if (href.startsWith('/api/') || href.startsWith('/_next/image')) continue;

      if (href.startsWith('/_next/static/') || href.startsWith('/images/')) {
        if (!existsSync(resolveAssetPath(outDir, href))) {
          const key = `${rel} → ${href}`;
          if (!checked.has(key)) {
            checked.add(key);
            errors.push(`broken asset ref in ${rel}: ${href}`);
          }
        }
        continue;
      }

      if (/\.\w{2,4}$/.test(href)) continue;

      const resolved = resolveInternalHref(outDir, href);
      if (!resolved) {
        const key = `${rel} → ${href}`;
        if (!checked.has(key)) {
          checked.add(key);
          errors.push(`broken internal link in ${rel}: ${href}`);
        }
      }
    }
  }

  return errors.slice(0, 25);
}

export function verifyBundledNextAssets(outDir) {
  const errors = [];
  const html = readFileSync(join(outDir, 'index.html'), 'utf8');
  const assets = [...html.matchAll(/\/_next\/static\/[^"'?]+/g)].map((m) =>
    m[0].split('?')[0].replace(/\\+$/, ''),
  );

  const unique = [...new Set(assets)].slice(0, 40);
  for (const asset of unique) {
    if (!existsSync(resolveAssetPath(outDir, asset))) {
      errors.push(`home references missing bundle: ${asset}`);
    }
  }
  if (unique.length === 0) {
    errors.push('home: no _next/static references found');
  }
  return errors;
}

export function verifyNoSensitiveLeaks(outDir) {
  const errors = [];
  const patterns = [
    /CLOUDFLARE_API_TOKEN/i,
    /FIREBASE_SERVICE_ACCOUNT/i,
    /AIza[0-9A-Za-z_-]{20,}/,
    /-----BEGIN (?:RSA )?PRIVATE KEY-----/,
  ];
  const samples = ['index.html', 'hush-gallery/index.html', 'zulist/index.html'];
  for (const rel of samples) {
    const text = readFileSync(join(outDir, rel), 'utf8');
    for (const re of patterns) {
      if (re.test(text)) {
        errors.push(`${rel}: possible secret leak (${re.source})`);
      }
    }
  }
  return errors;
}

export function runQualityChecks(outDir, locales) {
  const allErrors = [];

  const seo = verifySeoArtifacts(outDir);
  allErrors.push(...seo.errors);

  allErrors.push(...verifyStaticAssets(outDir));
  allErrors.push(...verifyHtmlQuality(outDir));
  allErrors.push(...verifyStructuredData(outDir));
  allErrors.push(...verifyHreflangAlternates(outDir));
  allErrors.push(...verifyComplianceExports(outDir));
  allErrors.push(...verifyInviteShellsAllLocales(outDir, locales));
  allErrors.push(
    ...verifyInternalLinks(outDir, [
      'index.html',
      'hush-gallery/index.html',
      'zulist/index.html',
      'he/hush-gallery/index.html',
    ]),
  );
  allErrors.push(...verifyBundledNextAssets(outDir));
  allErrors.push(...verifyNoSensitiveLeaks(outDir));

  return { errors: allErrors, sitemapCount: seo.sitemapCount };
}

export async function verifyLiveAssetHeaders(base) {
  const errors = [];
  const home = await fetch(`${base}/`);
  const html = await home.text();
  const chunk = html.match(/\/_next\/static\/chunks\/[^"'?]+/)?.[0];
  if (!chunk) {
    errors.push('live home: no _next chunk reference');
    return errors;
  }
  const chunkPath = decodeURIComponent(chunk.split('?')[0]);
  const chunkRes = await fetch(`${base}${chunkPath}`);
  if (chunkRes.status !== 200) {
    errors.push(`live chunk ${chunk} → ${chunkRes.status}`);
  }
  const cache = chunkRes.headers.get('cache-control') ?? '';
  if (!/max-age|immutable/i.test(cache)) {
    errors.push(`live chunk missing long cache-control: ${cache || '(none)'}`);
  }

  const iconRes = await fetch(`${base}/icon-32.png`, { method: 'HEAD' });
  if (iconRes.status !== 200) {
    errors.push(`live /icon-32.png → ${iconRes.status}`);
  }

  return errors;
}
