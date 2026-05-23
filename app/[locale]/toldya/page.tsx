'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, Construction, Mail } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import AppIconFrame from '@/components/AppIconFrame';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import StarBackground from '@/components/StarBackground';

export default function ToldyaPage() {
  const t = useTranslations('toldya');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const supportEmail = 'zuki.apps.dev@gmail.com';

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: t('hero.title'), path: '/toldya' },
        ]}
      />
      <div className="min-h-screen relative overflow-hidden">
        <StarBackground />

        <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end relative z-50">
          <LanguageSwitcher />
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-4 flex items-center justify-between relative z-10">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('back')}
          </Link>
          <Link href={`/${locale}`} className="flex items-center">
            <Logo size="sm" />
          </Link>
        </div>

        <section className="py-16 px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <AppIconFrame
              src="/images/toldya-icon.png"
              alt={t('hero.title')}
              sizes="(max-width: 768px) 96px, 128px"
              priority
              className="mx-auto mb-8"
              boxClassName="w-24 h-24 md:w-32 md:h-32"
              frameClassName="rounded-2xl overflow-hidden shadow-2xl ring-2 ring-emerald-400/40 bg-gradient-to-br from-emerald-950/90 via-slate-950 to-slate-950"
            />

            <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <Construction className="w-4 h-4" aria-hidden />
              {t('underConstruction.badge')}
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-300 mb-2">{t('hero.subtitle')}</p>
            <p className="text-gray-400 mb-10 leading-relaxed">{t('hero.description')}</p>

            <div className="card-twilight text-left mb-10">
              <h2 className="text-2xl font-black text-white mb-3 text-center">
                {t('underConstruction.title')}
              </h2>
              <p className="text-gray-300 text-center leading-relaxed">{t('underConstruction.message')}</p>
            </div>

            <nav
              className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm"
              aria-label="Legal and support"
            >
              <Link
                href={`/${locale}/toldya/privacy`}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                {t('legalNav.privacy')}
              </Link>
              <span className="text-slate-600 hidden sm:inline" aria-hidden>
                |
              </span>
              <Link
                href={`/${locale}/toldya/terms`}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                {t('legalNav.terms')}
              </Link>
              <span className="text-slate-600 hidden sm:inline" aria-hidden>
                |
              </span>
              <Link
                href={`/${locale}/toldya/delete-account`}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                {t('legalNav.deleteAccount')}
              </Link>
              <span className="text-slate-600 hidden sm:inline" aria-hidden>
                |
              </span>
              <a
                href={`mailto:${supportEmail}?subject=ToldYa!%20Support`}
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden />
                {t('legalNav.contact')}
              </a>
            </nav>
          </div>
        </section>
      </div>
    </>
  );
}
