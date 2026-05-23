import { MetadataRoute } from 'next';
import { TOLDYA_PUBLISHED } from '@/lib/appPublishState';
import { routing } from '@/routing';
import { getSiteUrl } from '@/lib/hreflang';
import {
  type SitemapRouteMeta,
  joinPublicUrl,
  getDefaultSitemapLastModified,
  resolveRouteLastModified,
  buildLanguageAlternateMap,
} from '@/lib/sitemap-build';

/**
 * Static routes for sitemap generation.
 * Dynamic/private routes (e.g. /zulist/invite/[id]) are intentionally omitted.
 *
 * LastModified resolution (per URL):
 * 1. route.lastModified if set
 * 2. Else if SITEMAP_USE_GIT=true: git log -1 on route's page.tsx (or sourceFile)
 * 3. Else: SITE_LASTMOD env (ISO) or new Date()
 *
 * Git/spawnSync runs only when Next generates this module at build time; set
 * SITEMAP_USE_GIT=true on Netlify/CI where .git exists. Omit on hosts without git.
 */
const routes: SitemapRouteMeta[] = [
  { path: '', priority: 1.0, changefreq: 'weekly' },
  { path: '/zulist', priority: 0.9, changefreq: 'weekly' },
  { path: '/zulist/support', priority: 0.7, changefreq: 'monthly' },
  { path: '/zulist/privacy', priority: 0.5, changefreq: 'monthly' },
  { path: '/zulist/terms', priority: 0.5, changefreq: 'monthly' },
  { path: '/zulist/delete-account', priority: 0.3, changefreq: 'yearly' },
  { path: '/zulist/delete-data', priority: 0.3, changefreq: 'yearly' },
  { path: '/hush-gallery', priority: 0.9, changefreq: 'weekly' },
  { path: '/hush-gallery/privacy', priority: 0.5, changefreq: 'monthly' },
  { path: '/hush-gallery/terms', priority: 0.5, changefreq: 'monthly' },
  { path: '/hush-gallery/support', priority: 0.7, changefreq: 'monthly' },
  { path: '/hush-gallery/delete-account', priority: 0.3, changefreq: 'yearly' },
  { path: '/whistle-camera', priority: 0.9, changefreq: 'weekly' },
  { path: '/whistle-camera/privacy', priority: 0.5, changefreq: 'monthly' },
  { path: '/whistle-camera/terms', priority: 0.5, changefreq: 'monthly' },
  { path: '/whistle-camera/support', priority: 0.7, changefreq: 'monthly' },
  { path: '/power-interval-timer', priority: 0.9, changefreq: 'weekly' },
  { path: '/power-interval-timer/privacy', priority: 0.5, changefreq: 'monthly' },
  { path: '/power-interval-timer/terms', priority: 0.5, changefreq: 'monthly' },
  { path: '/power-interval-timer/support', priority: 0.7, changefreq: 'monthly' },
  { path: '/bit-scope', priority: 0.9, changefreq: 'weekly' },
  { path: '/bit-scope/privacy', priority: 0.5, changefreq: 'monthly' },
  { path: '/bit-scope/terms', priority: 0.5, changefreq: 'monthly' },
  { path: '/bit-scope/support', priority: 0.7, changefreq: 'monthly' },
  { path: '/track-ledger', priority: 0.9, changefreq: 'weekly' },
  { path: '/track-ledger/privacy', priority: 0.5, changefreq: 'monthly' },
  { path: '/track-ledger/terms', priority: 0.5, changefreq: 'monthly' },
  { path: '/noise-meter-shusher', priority: 0.9, changefreq: 'weekly' },
  { path: '/noise-meter-shusher/privacy', priority: 0.5, changefreq: 'monthly' },
  { path: '/noise-meter-shusher/terms', priority: 0.5, changefreq: 'monthly' },
  { path: '/paratrooper-blitz', priority: 0.9, changefreq: 'weekly' },
  { path: '/paratrooper-blitz/privacy', priority: 0.5, changefreq: 'monthly' },
  { path: '/paratrooper-blitz/terms', priority: 0.5, changefreq: 'monthly' },
  { path: '/sudoku-puzzle', priority: 0.9, changefreq: 'weekly' },
  { path: '/sudoku-puzzle/privacy', priority: 0.5, changefreq: 'monthly' },
  { path: '/sudoku-puzzle/terms', priority: 0.5, changefreq: 'monthly' },
  { path: '/sudoku-puzzle/support', priority: 0.7, changefreq: 'monthly' },
  { path: '/tempo-lab-pro', priority: 0.9, changefreq: 'weekly' },
  { path: '/tempo-lab-pro/privacy', priority: 0.5, changefreq: 'monthly' },
  { path: '/tempo-lab-pro/terms', priority: 0.5, changefreq: 'monthly' },
  { path: '/tempo-lab-pro/support', priority: 0.7, changefreq: 'monthly' },
  { path: '/football-trivia', priority: 0.9, changefreq: 'weekly' },
  { path: '/football-trivia/privacy', priority: 0.5, changefreq: 'monthly' },
  { path: '/football-trivia/terms', priority: 0.5, changefreq: 'monthly' },
  { path: '/football-trivia/support', priority: 0.7, changefreq: 'monthly' },
  { path: '/fun-facts-trivia', priority: 0.9, changefreq: 'weekly' },
  { path: '/fun-facts-trivia/privacy', priority: 0.5, changefreq: 'monthly' },
  { path: '/fun-facts-trivia/terms', priority: 0.5, changefreq: 'monthly' },
  { path: '/fun-facts-trivia/support', priority: 0.7, changefreq: 'monthly' },
  { path: '/dsa-compliance', priority: 0.6, changefreq: 'monthly' },
  ...(TOLDYA_PUBLISHED
    ? [{ path: '/toldya', priority: 0.9, changefreq: 'weekly' } satisfies SitemapRouteMeta]
    : []),
  { path: '/toldya/child-safety', priority: 0.55, changefreq: 'monthly' },
  { path: '/toldya/privacy', priority: 0.5, changefreq: 'monthly' },
  { path: '/toldya/terms', priority: 0.5, changefreq: 'monthly' },
  { path: '/toldya/delete-account', priority: 0.35, changefreq: 'yearly' },
  { path: '/dreambit-legacy', priority: 0.55, changefreq: 'yearly' },
  { path: '/dreambit-legacy/privacy', priority: 0.4, changefreq: 'yearly' },
  { path: '/dreambit-legacy/terms', priority: 0.4, changefreq: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const defaultLastModified = getDefaultSitemapLastModified();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  routing.locales.forEach((locale) => {
    const localeSegment =
      locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
        ? ''
        : locale;

    routes.forEach((route) => {
      const url = joinPublicUrl(baseUrl, localeSegment, route.path);
      const lastModified = resolveRouteLastModified(route, defaultLastModified);
      const alternates = buildLanguageAlternateMap(
        baseUrl,
        routing.locales,
        routing.defaultLocale,
        routing.localePrefix,
        route.path
      );

      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency: route.changefreq,
        priority: route.priority,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return sitemapEntries;
}
