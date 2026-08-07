'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

/** Site-wide legal / accessibility strip under every page. */
export default function SiteLegalStrip() {
  const t = useTranslations('common');
  const tHome = useTranslations('home');
  const locale = useLocale();
  const isRtl = locale === 'he' || locale === 'ar';

  const linkClass =
    'text-indigo-100 hover:text-white underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400';

  return (
    <nav
      aria-label={t('siteLegalNav')}
      className="relative z-20 border-t border-indigo-500/25 bg-indigo-950/90 px-4 py-3 text-center text-sm"
    >
      <ul
        className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-2 ${
          isRtl ? 'flex-row-reverse' : ''
        }`}
      >
        <li>
          <Link href={`/${locale}/about`} className={linkClass}>
            {tHome('footer.about')}
          </Link>
        </li>
        <li className="text-slate-500" aria-hidden>
          |
        </li>
        <li>
          <Link href={`/${locale}/privacy`} className={linkClass}>
            {t('privacyShort')}
          </Link>
        </li>
        <li className="text-slate-500" aria-hidden>
          |
        </li>
        <li>
          <Link href={`/${locale}/dsa-compliance`} className={linkClass}>
            {t('dsaCompliance')}
          </Link>
        </li>
        <li className="text-slate-500" aria-hidden>
          |
        </li>
        <li>
          <Link href={`/${locale}/accessibility`} className={linkClass}>
            {t('accessibility')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
