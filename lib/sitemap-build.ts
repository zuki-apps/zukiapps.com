import { spawnSync } from 'child_process';

/** Route row used by app/sitemap.ts */
export type SitemapRouteMeta = {
  path: string;
  priority: number;
  changefreq:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  /** Optional fixed lastModified (overrides git/env defaults) */
  lastModified?: Date;
  /**
   * Optional path to a repo file for git lastmod (relative to repo root).
   * If omitted, derived from `path` as app/[locale]/<segments>/page.tsx
   */
  sourceFile?: string;
};

/**
 * Join site origin with locale prefix and pathname — avoids double slashes.
 * baseUrl must have no trailing slash (use getSiteUrl()).
 */
export function joinPublicUrl(
  baseUrl: string,
  localeSegment: string,
  pathname: string
): string {
  const base = baseUrl.replace(/\/+$/, '');
  const loc = localeSegment.replace(/^\/+|\/+$/g, '');
  const path = pathname.replace(/^\/+|\/+$/g, '');
  const parts = [loc, path].filter(Boolean);
  if (parts.length === 0) return base;
  return `${base}/${parts.join('/')}`;
}

/** Map public route path to primary page.tsx under app/[locale]/ */
export function routePathToSourceFile(routePath: string): string {
  const slug = routePath === '' || routePath === '/' ? '' : routePath.replace(/^\//, '');
  return slug ? `app/[locale]/${slug}/page.tsx` : 'app/[locale]/page.tsx';
}

function parseEnvDate(iso: string | undefined): Date | null {
  if (!iso?.trim()) return null;
  const d = new Date(iso.trim());
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Default lastModified when not using per-route git:
 * - SITE_LASTMOD (ISO 8601) if set
 * - else git repo HEAD if SITEMAP_USE_GIT === 'true'
 * - else new Date()
 *
 * execSync runs at build time only (Next sitemap generation). It may fail on
 * shallow clones or hosts without git — always wrapped in try/catch.
 */
export function getDefaultSitemapLastModified(): Date {
  const fromEnv = parseEnvDate(process.env.SITE_LASTMOD);
  if (fromEnv) return fromEnv;

  if (process.env.SITEMAP_USE_GIT !== 'true') {
    return new Date();
  }

  const out = spawnSync('git', ['log', '-1', '--format=%cI'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });
  if (out.error || out.status !== 0) return new Date();
  const d = new Date(out.stdout.trim());
  return isNaN(d.getTime()) ? new Date() : d;
}

/** Last commit date touching `repoRelativePath`, or null if unavailable */
export function getGitLastModifiedForFile(repoRelativePath: string): Date | null {
  if (process.env.SITEMAP_USE_GIT !== 'true') return null;
  const out = spawnSync(
    'git',
    ['log', '-1', '--format=%cI', '--', repoRelativePath],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
  );
  if (out.error || out.status !== 0) return null;
  const d = new Date(out.stdout.trim());
  return isNaN(d.getTime()) ? null : d;
}

export function resolveRouteLastModified(
  route: SitemapRouteMeta,
  fallback: Date
): Date {
  if (route.lastModified) return route.lastModified;
  const file = route.sourceFile ?? routePathToSourceFile(route.path);
  const fromGit = getGitLastModifiedForFile(file);
  return fromGit ?? fallback;
}

/** Build hreflang map; every locale and x-default are valid absolute URLs */
export function buildLanguageAlternateMap(
  baseUrl: string,
  locales: readonly string[],
  defaultLocale: string,
  localePrefix: 'as-needed' | 'always',
  routePath: string
): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const loc of locales) {
    const seg =
      loc === defaultLocale && localePrefix === 'as-needed'
        ? ''
        : loc;
    alternates[loc] = joinPublicUrl(baseUrl, seg, routePath);
  }
  const xDefaultSeg =
    localePrefix === 'as-needed' ? '' : defaultLocale;
  alternates['x-default'] = joinPublicUrl(baseUrl, xDefaultSeg, routePath);
  return alternates;
}
