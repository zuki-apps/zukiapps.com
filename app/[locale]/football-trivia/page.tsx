'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import AppIconFrame from '@/components/AppIconFrame';
import StarBackground from '@/components/StarBackground';
import { ProductMarketingSections, ProductPageNav, DownloadStoreFab } from '@/lib/lazyProductComponents';
import StoreRatingBadge from '@/components/StoreRatingBadge';

export default function FootballTriviaPage() {
  const t = useTranslations('footballTrivia');
  const tCommon = useTranslations('common');
  const tHome = useTranslations('home');
  const locale = useLocale();

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <StarBackground />

        <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end relative z-50">
          <LanguageSwitcher />
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-4 flex items-center justify-between relative z-0">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sky-300 hover:text-slate-200 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('back')}
          </Link>
          <Link href={`/${locale}`} className="flex items-center">
            <Logo size="sm" />
          </Link>
        </div>

        <section className="py-12 px-4 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <AppIconFrame
                src="/images/football-trivia-icon.png"
                alt={t('hero.title')}
                sizes="(max-width: 768px) 96px, 128px"
                priority
                className="mx-auto mb-6"
                boxClassName="w-24 h-24 md:w-32 md:h-32"
                frameClassName="rounded-2xl overflow-hidden shadow-2xl ring-2 ring-sky-400/40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-slate-100 via-sky-200 to-blue-400 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.45))' }}>
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-gray-300 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
            <StoreRatingBadge appPath="/football-trivia" className="mb-6" />
            <ProductPageNav namespace="footballTrivia" accent="sky" />
            {(t.raw('statsBar.items') as Array<{ label: string; value: string }>).length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
                {(t.raw('statsBar.items') as Array<{ label: string; value: string }>).map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                    <p className="text-2xl font-bold text-sky-200">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-center gap-4 text-sm">
              <Link href={`/${locale}/football-trivia/privacy`} className="text-sky-300 hover:text-slate-200 underline transition-colors">
                {tCommon('privacyPolicy')}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={`/${locale}/football-trivia/terms`} className="text-sky-300 hover:text-slate-200 underline transition-colors">
                {tCommon('termsOfService')}
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 px-4 relative z-10 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              {t('features.title')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(t.raw('features.items') as Array<{ title: string; description: string }>).map((item, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-sky-600/30 hover:border-sky-500/50 transition-all"
                >
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-slate-500/35 rounded-xl p-8 backdrop-blur-sm bg-opacity-90 ring-1 ring-blue-500/15">
              <h2 className="text-3xl font-bold mb-4 text-white">{t('status.title')}</h2>
              <p className="text-lg text-gray-300 mb-6">{t('status.description')}</p>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
                <div>
                  <p className="font-semibold text-white">{t('status.version')}</p>
                  <p>{t('status.versionValue')}</p>
                </div>
                <div>
                  <p className="font-semibold text-white">{t('status.status')}</p>
                  <p>{t('status.statusValue')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductMarketingSections namespace="footballTrivia" slug="football-trivia" accent="sky" hasSupportPage />

        <section id="download" className="py-12 px-4 relative z-10 scroll-mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">{t('download.title')}</h2>
            <p className="text-lg text-gray-300 mb-8">{t('download.description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {t('download.appStoreUrl') && (
                <a
                  href={t('download.appStoreUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg"
                  aria-label={t('download.appStoreAlt')}
                >
                  <Image
                    src="/images/app-store-badge.svg"
                    alt={t('download.appStoreAlt')}
                    width={160}
                    height={48}
                    className="object-contain hover:opacity-90 transition-opacity"
                  />
                </a>
              )}
              {t('download.googlePlayUrl') && (
                <a
                  href={t('download.googlePlayUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg"
                  aria-label={t('download.googlePlayAlt')}
                >
                  <Image
                    src="/images/google-play-badge.svg"
                    alt={t('download.googlePlayAlt')}
                    width={160}
                    height={48}
                    className="object-contain hover:opacity-90 transition-opacity"
                  />
                </a>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-6 max-w-2xl mx-auto">{t('hero.trustLine')}</p>
          </div>
        </section>

        <footer className="twilight-footer-bar text-white py-8 px-4 mt-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 flex justify-center">
              <Logo size="md" />
            </div>
            <p className="text-gray-400 mb-2">{t('footer.copyright')}</p>
            <p className="text-sm text-gray-400">{t('footer.tagline')}</p>
            <div className="flex justify-center gap-4 mt-4 text-sm">
              <Link href={`/${locale}/football-trivia/support`} className="text-gray-400 hover:text-sky-300 transition-colors">{tCommon('support')}</Link>
              <span className="text-gray-400">|</span>
              <Link href={`/${locale}/football-trivia/privacy`} className="text-gray-400 hover:text-sky-300 transition-colors">{tCommon('privacyPolicy')}</Link>
              <span className="text-gray-400">|</span>
              <Link href={`/${locale}/football-trivia/terms`} className="text-gray-400 hover:text-sky-300 transition-colors">{tCommon('termsOfService')}</Link>
            </div>
            <div className="mt-4 flex justify-center">
              <a href="https://buymeacoffee.com/sivzuk" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity" aria-label={tHome('footer.support')}>
                <Image src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt={tHome('footer.support')} width={145} height={40} className="h-auto" unoptimized />
              </a>
            </div>
          </div>
        </footer>

        <DownloadStoreFab
          accent="blue"
          appStoreUrl={t('download.appStoreUrl')}
          googlePlayUrl={t('download.googlePlayUrl')}
          appStoreAlt={t('download.appStoreAlt')}
          googlePlayAlt={t('download.googlePlayAlt')}
        utmContent="football-trivia"
        />
      </div>
    </>
  );
}
