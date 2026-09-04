import { getTranslations } from 'next-intl/server';

/** First focusable control: jump past chrome to #main-content */
export default async function SkipToContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'common' });

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[200] focus:px-4 focus:py-2.5 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
    >
      {t('skipToContent')}
    </a>
  );
}
