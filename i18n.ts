import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const userMessages = (await import(`./messages/${locale}.json`)).default;
  const dreambitLegacy = (await import('./messages/dreambitLegacy.json')).default;

  return {
    locale,
    messages: {
      ...userMessages,
      dreambitLegacy
    }
  };
});

