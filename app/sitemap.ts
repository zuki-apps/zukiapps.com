import { MetadataRoute } from 'next';
import { routing } from '@/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  
  // Define all static routes with their metadata
  // Note: /hush-gallery and /whistle-camera are excluded because they have robots: 'noindex, nofollow'
  // Note: /zulist/invite/[id] is excluded because it's a dynamic route with parameters
  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    lastModified?: Date; // Optional: specific last modified date
  }> = [
    {
      path: '',
      priority: 1.0,
      changeFrequency: 'weekly',
      // Home page - updated frequently
    },
    {
      path: '/zulist',
      priority: 0.9,
      changeFrequency: 'weekly',
      // Main app page - high priority, updated frequently
    },
    {
      path: '/zulist/support',
      priority: 0.7,
      changeFrequency: 'weekly',
      // Support page - updated when FAQ changes
    },
    {
      path: '/zulist/privacy',
      priority: 0.5,
      changeFrequency: 'monthly',
      // Privacy policy - updated occasionally
    },
    {
      path: '/zulist/terms',
      priority: 0.5,
      changeFrequency: 'monthly',
      // Terms of service - updated occasionally
    },
    {
      path: '/zulist/delete-account',
      priority: 0.3,
      changeFrequency: 'yearly',
      // Delete account page - rarely changes
    },
    {
      path: '/zulist/delete-data',
      priority: 0.3,
      changeFrequency: 'yearly',
      // Delete data page - rarely changes
    },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];
  // Use current date as default, but routes can override with specific dates
  const defaultLastModified = new Date();

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
        lastModified: route.lastModified || defaultLastModified,
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

