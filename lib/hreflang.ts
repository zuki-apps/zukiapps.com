import { routing } from '@/routing';

/** Canonical site origin, no trailing slash */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com').replace(/\/+$/, '');
}

/**
 * @param pathname - "" for home, or "/zulist", "/football-trivia/support", etc.
 */
export function buildCanonical(locale: string, pathname: string): string {
  const baseUrl = getSiteUrl();
  const path =
    pathname === '' || pathname === '/'
      ? ''
      : pathname.startsWith('/')
        ? pathname
        : `/${pathname}`;
  if (locale === routing.defaultLocale && routing.localePrefix === 'as-needed') {
    return `${baseUrl}${path}`;
  }
  return `${baseUrl}/${locale}${path}`;
}

/** All locale hreflang URLs + x-default (default locale / unprefixed English URL) */
export function buildLanguageAlternates(pathname: string): Record<string, string> {
  const baseUrl = getSiteUrl();
  const path =
    pathname === '' || pathname === '/'
      ? ''
      : pathname.startsWith('/')
        ? pathname
        : `/${pathname}`;
  const defaultLocaleUrl = `${baseUrl}${path}`;
  const languages = Object.fromEntries(
    routing.locales.map((loc) => [
      loc,
      loc === routing.defaultLocale && routing.localePrefix === 'as-needed'
        ? defaultLocaleUrl
        : `${baseUrl}/${loc}${path}`
    ])
  ) as Record<string, string>;
  languages['x-default'] = defaultLocaleUrl;
  return languages;
}
