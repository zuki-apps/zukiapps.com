'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, Trophy, BarChart3, Zap, Mail, ExternalLink } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import SoftwareApplicationStructuredData from '@/components/SoftwareApplicationStructuredData';
import DownloadStoreFab from '@/components/DownloadStoreFab';

export default function FootballTriviaPage() {
  const t = useTranslations('footballTrivia');
  const tCommon = useTranslations('common');
  const tHome = useTranslations('home');
  const locale = useLocale();

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: t('hero.title'), path: '/football-trivia' }
        ]}
      />
      <SoftwareApplicationStructuredData
        locale={locale}
        appName={t('hero.title')}
        appDescription={t('hero.description')}
        operatingSystem="iOS,Android"
        applicationCategory="GameApplication"
        offers={{ price: '0', priceCurrency: 'USD' }}
        aggregateRating={{ ratingValue: 0, ratingCount: 0 }}
        appStoreUrl="https://apps.apple.com/il/app/football-trivia-master/id6760652362"
      />
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 twilight-sky-overlay"></div>
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                opacity: Math.random() * 0.8 + 0.2,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end relative z-50">
          <LanguageSwitcher />
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-4 flex items-center justify-between relative z-0">
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

        <section className="py-12 px-4 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-emerald-400/30 bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center">
                <Image
                  src="/images/football-trivia-icon.png"
                  alt={t('hero.title')}
                  fill
                  sizes="(max-width: 768px) 96px, 128px"
                  className="object-contain p-2"
                  priority
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.6))' }}>
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-gray-300 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <Link href={`/${locale}/football-trivia/privacy`} className="text-emerald-400 hover:text-emerald-300 underline transition-colors">
                {tCommon('privacyPolicy')}
              </Link>
              <span className="text-gray-500">|</span>
              <Link href={`/${locale}/football-trivia/terms`} className="text-emerald-400 hover:text-emerald-300 underline transition-colors">
                {tCommon('termsOfService')}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              {t('features.title')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-emerald-500/50 border-2 border-emerald-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-emerald-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-emerald-500/50">
                  <Trophy className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{t('features.categories.title')}</h3>
                <p className="text-gray-300 mb-4">{t('features.categories.description')}</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.categories.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-emerald-500/50 border-2 border-emerald-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-green-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-green-500/50">
                  <Zap className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{t('features.difficulty.title')}</h3>
                <p className="text-gray-300 mb-4">{t('features.difficulty.description')}</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.difficulty.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-emerald-500/50 border-2 border-emerald-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-emerald-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-emerald-500/50">
                  <BarChart3 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{t('features.stats.title')}</h3>
                <p className="text-gray-300 mb-4">{t('features.stats.description')}</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.stats.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-amber-500/30 rounded-xl p-8 backdrop-blur-sm bg-opacity-90">
              <h2 className="text-3xl font-bold mb-4 text-white">{t('status.title')}</h2>
              <p className="text-lg text-gray-300 mb-6">{t('status.description')}</p>
              <p className="text-sm text-gray-400">{t('status.statusValue')}</p>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">{t('download.title')}</h2>
            <p className="text-lg text-gray-300 mb-8">{t('download.description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {t('download.appStoreUrl') && (
                <a
                  href={t('download.appStoreUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                  aria-label={t('download.appStoreAlt') || 'Download on App Store'}
                >
                  <Image
                    src="/images/app-store-badge.svg"
                    alt={t('download.appStoreAlt') || 'Download on App Store'}
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
                  className="inline-block"
                  aria-label={t('download.googlePlayAlt') || 'Get it on Google Play'}
                >
                  <Image
                    src="/images/google-play-badge.png"
                    alt={t('download.googlePlayAlt') || 'Get it on Google Play'}
                    width={160}
                    height={48}
                    className="object-contain hover:opacity-90 transition-opacity"
                  />
                </a>
              )}
            </div>
            {!t('download.appStoreUrl') && !t('download.googlePlayUrl') && (
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-emerald-600/30 rounded-xl p-6 shadow-lg backdrop-blur-sm bg-opacity-90 opacity-80">
                <p className="text-sm text-gray-400">{t('download.soon')}</p>
              </div>
            )}
          </div>
        </section>

        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">{t('links.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href={`/${locale}/football-trivia/support`}
                className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-emerald-500/50 transition-all flex items-center gap-4 group border-2 border-emerald-600/30 backdrop-blur-sm bg-opacity-90 ${locale === 'he' ? 'flex-row-reverse' : ''}`}
              >
                <div className="bg-emerald-600/30 p-3 rounded-lg group-hover:bg-emerald-600/50 border border-emerald-500/50 transition-colors">
                  <Mail className="w-6 h-6 text-emerald-400" />
                </div>
                <div className={`flex-grow ${locale === 'he' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-semibold text-white mb-1">{t('links.support.title')}</h3>
                  <p className="text-gray-300 text-sm">{t('links.support.email')}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
              </Link>
            </div>
          </div>
        </section>

        <footer className="twilight-footer-bar text-white py-8 px-4 mt-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 flex justify-center">
              <Logo size="md" />
            </div>
            <p className="text-gray-400 mb-2">{t('footer.copyright')}</p>
            <p className="text-sm text-gray-500">{t('footer.tagline')}</p>
            <div className="flex justify-center gap-4 mt-4 text-sm">
              <Link href={`/${locale}/football-trivia/support`} className="text-gray-400 hover:text-emerald-400 transition-colors">{tCommon('support')}</Link>
              <span className="text-gray-600">|</span>
              <Link href={`/${locale}/football-trivia/privacy`} className="text-gray-400 hover:text-emerald-400 transition-colors">{tCommon('privacyPolicy')}</Link>
              <span className="text-gray-600">|</span>
              <Link href={`/${locale}/football-trivia/terms`} className="text-gray-400 hover:text-emerald-400 transition-colors">{tCommon('termsOfService')}</Link>
            </div>
            <div className="mt-4 flex justify-center">
              <a href="https://buymeacoffee.com/sivzuk" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity" aria-label={tHome('footer.support')}>
                <Image src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt={tHome('footer.support')} width={145} height={40} className="h-auto" unoptimized />
              </a>
            </div>
          </div>
        </footer>

        <DownloadStoreFab
          accent="emerald"
          appStoreUrl={t('download.appStoreUrl')}
          googlePlayUrl={t('download.googlePlayUrl')}
          appStoreAlt={t('download.appStoreAlt')}
          googlePlayAlt={t('download.googlePlayAlt')}
        />
      </div>
    </>
  );
}
