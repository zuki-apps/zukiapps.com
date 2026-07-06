'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import {
  ArrowLeft,
  Mail,
  Hammer,
  CheckCircle2,
  Shield,
  FileText,
  HelpCircle,
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import AppIconFrame from '@/components/AppIconFrame';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import { GEO_CALC_ICON } from '@/lib/appIcons';
import StarBackground from '@/components/StarBackground';

export default function GeoCalcPage() {
  const t = useTranslations('geoCalc');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const rtl = locale === 'he' || locale === 'ar';
  const highlights = (t.raw('underConstruction.highlights') as string[] | undefined) ?? [];

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: t('hero.subtitle'), path: '/geo-calc' },
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
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('back')}
          </Link>
          <Link href={`/${locale}`} className="flex items-center">
            <Logo size="sm" />
          </Link>
        </div>

        <section className="py-16 px-4 relative z-10">
          <div className={`max-w-2xl mx-auto ${rtl ? 'text-right' : 'text-center'}`}>
            <AppIconFrame
              src={GEO_CALC_ICON}
              alt={t('download.appIconAlt')}
              sizes="(max-width: 768px) 96px, 128px"
              priority
              edgeToEdge
              className="mx-auto mb-8"
              boxClassName="w-24 h-24 md:w-32 md:h-32"
              frameClassName="rounded-[22%] overflow-hidden shadow-2xl ring-2 ring-amber-400/40"
            />

            <div className="inline-flex items-center gap-2 bg-amber-950/60 border border-amber-500/40 text-amber-200 px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <Hammer className="w-4 h-4" aria-hidden />
              {t('hero.badge')}
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-amber-300/90 mb-2">{t('hero.subtitle')}</p>
            <p className="text-gray-400 mb-8 leading-relaxed">{t('hero.description')}</p>

            <div className="card-twilight text-left mb-10">
              <h2 className="text-2xl font-black text-white mb-3 text-center">{t('underConstruction.title')}</h2>
              <p className="text-gray-300 text-center leading-relaxed mb-4">{t('underConstruction.message')}</p>
              <p className="text-sm text-amber-300/90 text-center font-semibold mb-6">{t('underConstruction.note')}</p>
              {highlights.length > 0 && (
                <ul className="space-y-2 text-sm text-gray-400">
                  {highlights.map((item, i) => (
                    <li key={i} className={`flex gap-2 ${rtl ? 'flex-row-reverse text-right' : ''}`}>
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <Link
                href={`/${locale}/geo-calc/privacy`}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 border-2 border-amber-600/30 hover:border-amber-500/50 transition-all group text-left"
              >
                <Shield className="w-7 h-7 text-amber-400 mb-3" aria-hidden />
                <h3 className="font-bold text-white mb-1 group-hover:text-amber-300">{t('legalNav.privacy')}</h3>
                <p className="text-xs text-gray-400">{tCommon('privacyPolicy')}</p>
              </Link>
              <Link
                href={`/${locale}/geo-calc/terms`}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 border-2 border-amber-600/30 hover:border-amber-500/50 transition-all group text-left"
              >
                <FileText className="w-7 h-7 text-amber-400 mb-3" aria-hidden />
                <h3 className="font-bold text-white mb-1 group-hover:text-amber-300">{t('legalNav.terms')}</h3>
                <p className="text-xs text-gray-400">{tCommon('termsOfService')}</p>
              </Link>
              <Link
                href={`/${locale}/geo-calc/support`}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 border-2 border-amber-600/30 hover:border-amber-500/50 transition-all group text-left"
              >
                <HelpCircle className="w-7 h-7 text-amber-400 mb-3" aria-hidden />
                <h3 className="font-bold text-white mb-1 group-hover:text-amber-300">{t('legalNav.support')}</h3>
                <p className="text-xs text-gray-400">{t('links.support.email')}</p>
              </Link>
            </div>

            <nav
              className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm"
              aria-label="Legal and support"
            >
              <Link
                href={`/${locale}/geo-calc/privacy`}
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                {t('legalNav.privacy')}
              </Link>
              <span className="text-slate-600 hidden sm:inline" aria-hidden>|</span>
              <Link
                href={`/${locale}/geo-calc/terms`}
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                {t('legalNav.terms')}
              </Link>
              <span className="text-slate-600 hidden sm:inline" aria-hidden>|</span>
              <Link
                href={`/${locale}/geo-calc/support`}
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden />
                {t('legalNav.contact')}
              </Link>
            </nav>
          </div>
        </section>

        <footer className="twilight-footer-bar text-white py-8 px-4 mt-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 flex justify-center">
              <Logo size="md" />
            </div>
            <p className="text-gray-400 mb-2">{t('footer.copyright')}</p>
            <p className="text-sm text-gray-400">{t('footer.tagline')}</p>
          </div>
        </footer>
      </div>
    </>
  );
}
