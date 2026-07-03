import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { deepMergeMessages } from '@/lib/deepMergeMessages';

/**
 * App folder names under messages/apps/.
 * Each folder has en.json (English base) and optional {locale}.json overlays.
 * Adding a new app = add its folder + list it here.
 */
const APPS = [
  'hush-gallery',
  'whistle-camera',
  'zulist',
  'sudoku-puzzle',
  'football-trivia',
  'fun-facts-trivia',
  'power-interval-timer',
  'tempo-lab-pro',
  'bit-scope',
  'track-ledger',
  'noise-meter-shusher',
  'paratrooper-blitz',
  'toldya',
  'zuli-collage',
  'dreambit-legacy',
  'timesince',
] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Load shared messages: home, common, dsa
  const sharedEn = (await import('./messages/shared/en.json')).default as Record<string, unknown>;
  let messages: Record<string, unknown> = sharedEn;

  if (locale !== routing.defaultLocale) {
    try {
      const sharedLocale = (
        await import(`./messages/shared/${locale}.json`)
      ).default as Record<string, unknown>;
      messages = deepMergeMessages(messages, sharedLocale) as Record<string, unknown>;
    } catch {
      /* no shared locale file — use English */
    }
  }

  // Load per-app messages: en.json as base, deep-merged with locale overlay when available
  for (const app of APPS) {
    try {
      const appEn = (
        await import(`./messages/apps/${app}/en.json`)
      ).default as Record<string, unknown>;
      let appMessages: Record<string, unknown> = appEn;

      if (locale !== routing.defaultLocale) {
        try {
          const appLocale = (
            await import(`./messages/apps/${app}/${locale}.json`)
          ).default as Record<string, unknown>;
          appMessages = deepMergeMessages(appEn, appLocale) as Record<string, unknown>;
        } catch {
          /* no locale file for this app — use English */
        }
      }

      messages = deepMergeMessages(messages, appMessages) as Record<string, unknown>;
    } catch {
      /* app folder not found — skip */
    }
  }

  return { locale, messages };
});
