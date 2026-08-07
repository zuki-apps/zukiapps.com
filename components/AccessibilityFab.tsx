'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Accessibility } from 'lucide-react';

/** Persistent control (IL convention): opens the accessibility statement — not an overlay widget. */
export default function AccessibilityFab() {
  const t = useTranslations('common');
  const locale = useLocale();
  const isRtl = locale === 'he' || locale === 'ar';

  return (
    <Link
      href={`/${locale}/accessibility`}
      className={`fixed z-[90] bottom-4 ${
        isRtl ? 'right-4' : 'left-4'
      } inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-indigo-950/95 px-3.5 py-2.5 text-sm font-semibold text-emerald-100 shadow-lg shadow-black/40 backdrop-blur-md hover:bg-indigo-900 hover:border-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300`}
      aria-label={t('accessibilityFab')}
    >
      <Accessibility className="w-5 h-5 shrink-0" aria-hidden />
      <span>{t('accessibility')}</span>
    </Link>
  );
}
