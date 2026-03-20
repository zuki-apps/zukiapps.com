import { MetadataRoute } from 'next';
import { routing } from '@/routing';
import { getSiteUrl } from '@/lib/hreflang';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  
  // Define all static routes with their metadata
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
      changeFrequency: 'monthly',
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
    {
      path: '/hush-gallery',
      priority: 0.9,
      changeFrequency: 'weekly',
      // Hush Gallery app page - high priority
    },
    {
      path: '/hush-gallery/privacy',
      priority: 0.5,
      changeFrequency: 'monthly',
      // Hush Gallery privacy policy
    },
    {
      path: '/hush-gallery/terms',
      priority: 0.5,
      changeFrequency: 'monthly',
      // Hush Gallery terms of service
    },
    {
      path: '/hush-gallery/support',
      priority: 0.7,
      changeFrequency: 'monthly',
      // Hush Gallery support page
    },
    {
      path: '/hush-gallery/delete-account',
      priority: 0.3,
      changeFrequency: 'yearly',
      // Hush Gallery delete account page
    },
    {
      path: '/whistle-camera',
      priority: 0.9,
      changeFrequency: 'weekly',
      // Whistle Camera app page - high priority
    },
    {
      path: '/whistle-camera/privacy',
      priority: 0.5,
      changeFrequency: 'monthly',
      // Whistle Camera privacy policy
    },
    {
      path: '/whistle-camera/terms',
      priority: 0.5,
      changeFrequency: 'monthly',
      // Whistle Camera terms of service
    },
    {
      path: '/whistle-camera/support',
      priority: 0.7,
      changeFrequency: 'monthly',
      // Whistle Camera support page
    },
    {
      path: '/power-interval-timer',
      priority: 0.9,
      changeFrequency: 'weekly',
      // Power Interval Timer app page - high priority
    },
    {
      path: '/power-interval-timer/privacy',
      priority: 0.5,
      changeFrequency: 'monthly',
      // Power Interval Timer privacy policy
    },
    {
      path: '/power-interval-timer/terms',
      priority: 0.5,
      changeFrequency: 'monthly',
      // Power Interval Timer terms of service
    },
    {
      path: '/power-interval-timer/support',
      priority: 0.7,
      changeFrequency: 'monthly',
      // Power Interval Timer support page
    },
    {
      path: '/bit-scope',
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    { path: '/bit-scope/privacy', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/bit-scope/terms', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/bit-scope/support', priority: 0.7, changeFrequency: 'monthly' },
    {
      path: '/sudoku-puzzle',
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    { path: '/sudoku-puzzle/privacy', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/sudoku-puzzle/terms', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/sudoku-puzzle/support', priority: 0.7, changeFrequency: 'monthly' },
    {
      path: '/tempoLabPro',
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    { path: '/tempoLabPro/privacy', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/tempoLabPro/terms', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/tempoLabPro/support', priority: 0.7, changeFrequency: 'monthly' },
    {
      path: '/football-trivia',
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    { path: '/football-trivia/privacy', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/football-trivia/terms', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/football-trivia/support', priority: 0.7, changeFrequency: 'monthly' },
    {
      path: '/dsa-compliance',
      priority: 0.6,
      changeFrequency: 'monthly',
      // DSA compliance page - important legal page
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
      const xDefaultPrefix =
        routing.localePrefix === 'as-needed' ? '' : `/${routing.defaultLocale}`;
      alternates['x-default'] = `${baseUrl}${xDefaultPrefix}${route.path}`;

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

