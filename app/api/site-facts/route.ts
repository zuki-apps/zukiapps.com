import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/hreflang';
import { routing } from '@/routing';
import { ZUKI_SITE_APPS, buildSoftwareCatalogItemList } from '@/lib/siteCatalog';

/**
 * Machine-readable site summary for crawlers, answer engines, and tooling.
 * Stays in sync with lib/siteCatalog.ts (single source of truth for app list).
 */
export async function GET() {
  const baseUrl = getSiteUrl().replace(/\/+$/, '');
  const itemList = buildSoftwareCatalogItemList(baseUrl);
  const body = {
    kind: 'zukiapps-site-facts',
    version: 1,
    about:
      'Public marketing site index for Zuki Apps (Israel). Same app list as HTML JSON-LD ItemList; not a backend API for mobile apps.',
    publisher: {
      name: 'Zuki Apps',
      url: baseUrl,
      email: 'zuki.apps.dev@gmail.com',
    },
    site: {
      origin: baseUrl,
      locales: routing.locales,
      defaultLocale: routing.defaultLocale,
    },
    discovery: {
      llmsTxt: `${baseUrl}/llms.txt`,
      aiTxt: `${baseUrl}/ai.txt`,
      sitemap: `${baseUrl}/sitemap.xml`,
      robots: `${baseUrl}/robots.txt`,
    },
    apps: ZUKI_SITE_APPS.map((app) => ({
      name: app.name,
      path: app.path,
      url: `${baseUrl}${app.path}`,
      description: app.description,
    })),
    /** Same structure as embedded in page JSON-LD (`#software-catalog`). */
    schemaOrgItemList: itemList,
  };

  return NextResponse.json(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
