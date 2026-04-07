import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

/** Deep-merge locale JSON over English so missing nested keys (e.g. bitScope.terms) never 500 in prod. */
function deepMergeMessages(
  base: Record<string, unknown>,
  override: Record<string, unknown>
): Record<string, unknown> {
  if (override === null || override === undefined) return base;
  if (base === null || base === undefined) return override;
  if (
    typeof base !== 'object' ||
    typeof override !== 'object' ||
    Array.isArray(base) ||
    Array.isArray(override)
  ) {
    return override;
  }
  const result: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    result[key] = deepMergeMessages(
      base[key] as Record<string, unknown>,
      override[key] as Record<string, unknown>
    );
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const enMessages = (await import('./messages/en.json')).default as Record<
    string,
    unknown
  >;
  const userMessages = (await import(`./messages/${locale}.json`)).default as Record<
    string,
    unknown
  >;
  const dreambitLegacy = (await import('./messages/dreambitLegacy.json')).default;

  return {
    locale,
    messages: {
      ...deepMergeMessages(enMessages, userMessages),
      dreambitLegacy,
    },
  };
});

