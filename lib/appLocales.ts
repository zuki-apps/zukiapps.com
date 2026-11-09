/**
 * Apps whose copy exists only in some locales (messages/apps/{slug}/*.json).
 * Other locale URLs still render (English fallback) but are not advertised:
 * canonical → default-locale URL, hreflang + sitemap list only these locales.
 * Keep in sync with the message folders (checked by scripts/verify-product-pages.mjs).
 */
export const LIMITED_LOCALE_APPS: Record<string, readonly string[]> = {
  '/blockiva': ['en'],
  '/coloring-my-photo': ['en'],
  '/contacts-toolbox': ['en'],
  '/eventtick': ['en'],
  '/photo-stamp': ['en'],
  '/questivo': ['en'],
  '/roamguard': ['en'],
  '/tally-nudge': ['en'],
  '/trickyrooms': ['en'],
  '/ztl-guard': ['en', 'it'],
};

/** Locales that have real copy for `pathname` (e.g. "/blockiva/privacy"). */
export function getPathLocales<T extends string>(
  pathname: string,
  allLocales: readonly T[]
): readonly T[] {
  const first = pathname.split('/').filter(Boolean)[0];
  const limited = first ? LIMITED_LOCALE_APPS[`/${first}`] : undefined;
  return limited ? allLocales.filter((l) => limited.includes(l)) : allLocales;
}
