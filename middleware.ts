import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export default createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: routing.localePrefix,
  localeDetection: false // Disable automatic locale detection from browser
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|\\.well-known|app-ads\\.txt|.*\\..*).*)']
};

