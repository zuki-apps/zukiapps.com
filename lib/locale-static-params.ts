import { routing } from '@/routing';

export function localeStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** @vercel/og lacks full Arabic shaping — use English copy on /ar OG images */
export function ogTextLocale(locale: string): string {
  return locale === 'ar' ? 'en' : locale;
}
