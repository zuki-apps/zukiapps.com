import { getTranslations } from 'next-intl/server';

/** Persistent control (IL convention): opens the accessibility statement — not an overlay widget. */
export default async function AccessibilityFab({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'common' });
  const isRtl = locale === 'he' || locale === 'ar';

  return (
    <a
      href={`/${locale}/accessibility`}
      className={`fixed z-[90] bottom-4 ${
        isRtl ? 'right-4' : 'left-4'
      } inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-indigo-950/95 px-3.5 py-2.5 text-sm font-semibold text-emerald-100 shadow-lg shadow-black/40 backdrop-blur-md hover:bg-indigo-900 hover:border-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300`}
      aria-label={t('accessibilityFab')}
    >
      <svg
        className="w-5 h-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="16" cy="4" r="1" />
        <path d="m18 19 1-7-6 1" />
        <path d="m5 8 3-3 5.5 3-2.36 3.5" />
        <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
        <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
      </svg>
      <span>{t('accessibility')}</span>
    </a>
  );
}
