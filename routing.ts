export const locales = ['en', 'he', 'de', 'es', 'it', 'pt'] as const;
export const defaultLocale = 'en' as const;

export const routing = {
  locales,
  defaultLocale,
  localePrefix: 'as-needed' as const
};

