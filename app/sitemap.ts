import { MetadataRoute } from 'next';
import { routing } from '@/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  
  // Define all static routes with their metadata
  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  }> = [
    {
      path: '',
      priority: 1.0,
      changeFrequency: 'weekly',
    },
    {
      path: '/zulist',
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      path: '/zulist/privacy',
      priority: 0.5,
      changeFrequency: 'monthly',
    },
    {
      path: '/zulist/terms',
      priority: 0.5,
      changeFrequency: 'monthly',
    },
    {
      path: '/zulist/support',
      priority: 0.7,
      changeFrequency: 'weekly',
    },
    {
      path: '/zulist/delete-account',
      priority: 0.3,
      changeFrequency: 'yearly',
    },
    {
      path: '/zulist/delete-data',
      priority: 0.3,
      changeFrequency: 'yearly',
    },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];
  const currentDate = new Date();

  routing.locales.forEach((locale) => {
    routes.forEach((route) => {
      // For default locale with 'as-needed', don't add locale prefix
      const localePrefix = locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? '' 
        : `/${locale}`;
      
      const url = `${baseUrl}${localePrefix}${route.path}`;
      
      // Build alternates - for default locale, use empty prefix, for others use locale prefix
      const alternates: Record<string, string> = {};
      routing.locales.forEach((loc) => {
        const altPrefix = loc === routing.defaultLocale && routing.localePrefix === 'as-needed' 
          ? '' 
          : `/${loc}`;
        alternates[loc] = `${baseUrl}${altPrefix}${route.path}`;
      });

      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return sitemapEntries;
}

