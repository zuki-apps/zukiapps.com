import { routing } from '@/routing';
import { deepMergeMessages } from '@/lib/deepMergeMessages';

/** Client provider: shared namespaces only (home grid copy lives under home.*). */
export function pickSharedClientMessages(
  all: Record<string, unknown>
): Record<string, unknown> {
  const picked: Record<string, unknown> = {};
  for (const key of ['home', 'common', 'dsa'] as const) {
    if (all[key] !== undefined) picked[key] = all[key];
  }
  return picked;
}

/** Load shared messages (home, common, dsa) for client provider. */
export async function loadSharedMessagesBundle(
  locale: string
): Promise<Record<string, unknown>> {
  const sharedEn = (
    await import('../messages/shared/en.json')
  ).default as Record<string, unknown>;
  if (locale === routing.defaultLocale) return pickSharedClientMessages(sharedEn);

  try {
    const sharedLocale = (
      await import(`../messages/shared/${locale}.json`)
    ).default as Record<string, unknown>;
    const merged = deepMergeMessages(sharedEn, sharedLocale) as Record<string, unknown>;
    return pickSharedClientMessages(merged);
  } catch {
    return pickSharedClientMessages(sharedEn);
  }
}

/** Shared + one app folder for nested NextIntlClientProvider (replaces parent context). */
export async function loadClientMessagesForApp(
  locale: string,
  appFolder: string
): Promise<Record<string, unknown>> {
  const shared = await loadSharedMessagesBundle(locale);
  const app = await loadAppMessagesBundle(locale, appFolder);
  return { ...shared, ...app };
}

/** Load one app folder (e.g. zuli-collage) for nested NextIntlClientProvider. */
export async function loadAppMessagesBundle(
  locale: string,
  appFolder: string
): Promise<Record<string, unknown>> {
  try {
    const appEn = (
      await import(`../messages/apps/${appFolder}/en.json`)
    ).default as Record<string, unknown>;
    if (locale === routing.defaultLocale) return appEn;

    try {
      const appLocale = (
        await import(`../messages/apps/${appFolder}/${locale}.json`)
      ).default as Record<string, unknown>;
      return deepMergeMessages(appEn, appLocale) as Record<string, unknown>;
    } catch {
      return appEn;
    }
  } catch {
    return {};
  }
}
