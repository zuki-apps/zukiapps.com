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

const gitDateCache = new Map<string, Date | null>();

/** Last commit date touching `repoRelativePath`, or null if unavailable (cached per build). */
export function getGitLastModifiedForFile(repoRelativePath: string): Date | null {
  if (process.env.SITEMAP_USE_GIT !== 'true') return null;
  if (gitDateCache.has(repoRelativePath)) return gitDateCache.get(repoRelativePath) ?? null;
  const d = readGitLastModified(repoRelativePath);
  gitDateCache.set(repoRelativePath, d);
  return d;
}

function readGitLastModified(repoRelativePath: string): Date | null {
  const out = spawnSync(
    'git',
    ['log', '-1', '--format=%cI', '--', repoRelativePath],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
  );
  if (out.error || out.status !== 0) return null;
  const line = out.stdout.trim();
  if (!line) return null;
  const d = new Date(line);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Files that typically drive content for a public route (page + English messages).
 * Using the latest git date among them so copy-only updates bump lastmod.
 */
export function contentSourceFilesForRoute(routePath: string): string[] {
  const page = routePathToSourceFile(routePath);
  const files = [page];
  const slug = routePath.replace(/^\//, '').split('/')[0];
  if (slug) {
    files.push(`messages/apps/${slug}/en.json`);
  } else {
    files.push('messages/shared/en.json');
  }
  return files;
}

export function resolveRouteLastModified(
  route: SitemapRouteMeta,
  fallback: Date
): Date {
  if (route.lastModified) return route.lastModified;
  const files = route.sourceFile
    ? [route.sourceFile]
    : contentSourceFilesForRoute(route.path);
  let latest: Date | null = null;
  for (const file of files) {
    const fromGit = getGitLastModifiedForFile(file);
    if (fromGit && (!latest || fromGit > latest)) latest = fromGit;
  }
  return latest ?? fallback;
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
