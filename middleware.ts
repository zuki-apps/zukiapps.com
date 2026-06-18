import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: routing.localePrefix,
  localeDetection: false,
  alternateLinks: false,
});

function localeFromPathname(pathname: string) {
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg && (routing.locales as readonly string[]).includes(seg)) {
    return seg;
  }
  return routing.defaultLocale;
}

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const locale = localeFromPathname(request.nextUrl.pathname);
  const dir = locale === 'he' || locale === 'ar' ? 'rtl' : 'ltr';
  response.headers.set('x-zuki-locale', locale);
  response.headers.set('x-zuki-dir', dir);

  // next-intl sets a NEXT_LOCALE cookie even with localeDetection:false, which forces
  // Cache-Control:no-store and blocks the browser back/forward cache.
  // Since localePrefix:"as-needed" encodes locale in the URL, the cookie is redundant.
  // Strip it so pages remain bfcache-eligible and CDN-cacheable.
  const setCookie = response.headers.get('set-cookie');
  if (setCookie && /^NEXT_LOCALE=[^;]+;/.test(setCookie)) {
    response.headers.delete('set-cookie');
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|\\.well-known|app-ads\\.txt|.*\\..*).*)'],
};
