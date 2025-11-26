import { MetadataRoute } from 'next';
import { routing } from '@/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  
  const routes = [
    '',
    '/zulist',
    '/zulist/privacy',
    '/zulist/terms',
    '/zulist/support',
    '/zulist/delete-account',
    '/zulist/delete-data',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      // For default locale with 'as-needed', don't add locale prefix
      const localePrefix = locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? '' 
        : `/${locale}`;
      
      const url = `${baseUrl}${localePrefix}${route}`;
      
      // Build alternates - for default locale, use empty prefix, for others use locale prefix
      const alternates: Record<string, string> = {};
      routing.locales.forEach((loc) => {
        const altPrefix = loc === routing.defaultLocale && routing.localePrefix === 'as-needed' 
          ? '' 
          : `/${loc}`;
        alternates[loc] = `${baseUrl}${altPrefix}${route}`;
      });

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return sitemapEntries;
}

