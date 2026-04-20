'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, Timer, Settings, Tv, Cast, Palette, Mail, ExternalLink, CheckCircle2, Download, Smartphone } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import SoftwareApplicationStructuredData from '@/components/SoftwareApplicationStructuredData';
import DownloadStoreFab from '@/components/DownloadStoreFab';

export default function PowerIntervalTimerPage() {
  const t = useTranslations('powerIntervalTimer');
  const tCommon = useTranslations('common');
  const tHome = useTranslations('home');
  const locale = useLocale();

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: 'Power Interval Timer', path: '/power-interval-timer' }
        ]}
      />
      <SoftwareApplicationStructuredData
        locale={locale}
        appPath="/power-interval-timer"
        appName="Power Interval Timer"
        appDescription="A minimal, fast, offline interval workout timer for Tabata, HIIT, and short workouts. Features configurable workouts, multiple display modes, sound alerts, and screen casting support."
        operatingSystem="iOS,Android"
        applicationCategory="HealthApplication"
        appStoreUrl="https://apps.apple.com/app/power-interval-timer/id6758246007"
        googlePlayUrl={t('download.googlePlayUrl')}
        offers={{
          price: '0',
          priceCurrency: 'USD',
        }}
        aggregateRating={{
          ratingValue: 0,
          ratingCount: 0,
        }}
      />
      <div className="min-h-screen relative overflow-hidden">
        {/* Starry background effect */}
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

        {/* Language Switcher */}
        <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end relative z-50">
          <LanguageSwitcher />
        </div>

        {/* Header with Logo and Back Button */}
        <div className="max-w-7xl mx-auto px-4 pt-4 flex items-center justify-between relative z-0">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('back')}
          </Link>
          <Link href={`/${locale}`} className="flex items-center">
            <Logo size="sm" />
          </Link>
        </div>

        {/* Hero Section */}
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-orange-400/30 bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
                <Image
                  src="/images/power-interval-timer-icon.png"
                  alt="Power Interval Timer"
                  fill
                  sizes="(max-width: 768px) 96px, 128px"
                  className="object-contain p-2"
                  priority
                />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-yellow-900/50 border border-yellow-500/30 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4" />
              {t('hero.badge')}
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 bg-clip-text text-transparent" style={{
              filter: 'drop-shadow(0 0 8px rgba(251, 146, 60, 0.6))',
            }}>
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-gray-300 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <Link
                href={`/${locale}/power-interval-timer/privacy`}
                className="text-orange-400 hover:text-orange-300 underline transition-colors"
              >
                {tCommon('privacyPolicy')}
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                href={`/${locale}/power-interval-timer/terms`}
                className="text-orange-400 hover:text-orange-300 underline transition-colors"
              >
                {tCommon('termsOfService')}
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              {t('features.title')}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Configurable Workouts */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-orange-500/50 border-2 border-orange-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-orange-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-orange-500/50">
                  <Settings className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t('features.configurable.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t('features.configurable.description')}
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.configurable.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Multiple Display Modes */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-orange-500/50 border-2 border-orange-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-blue-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-blue-500/50">
                  <Timer className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t('features.display.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t('features.display.description')}
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.display.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Works Offline */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-orange-500/50 border-2 border-orange-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-green-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-green-500/50">
                  <Timer className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t('features.offline.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t('features.offline.description')}
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.offline.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Screen Casting */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-orange-500/50 border-2 border-orange-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-purple-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-purple-500/50">
                  <Cast className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t('features.casting.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t('features.casting.description')}
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.casting.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* TV Support */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-orange-500/50 border-2 border-orange-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-cyan-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-cyan-500/50">
                  <Tv className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t('features.tv.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t('features.tv.description')}
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.tv.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Customization */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-orange-500/50 border-2 border-orange-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-pink-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-pink-500/50">
                  <Palette className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t('features.customization.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t('features.customization.description')}
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.customization.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Status Section */}
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-yellow-500/30 rounded-xl p-8 backdrop-blur-sm bg-opacity-90">
              <h2 className="text-3xl font-bold mb-4 text-white">
                {t('status.title')}
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                {t('status.description')}
              </p>
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

        {/* Download Section */}
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">
              {t('download.title')}
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              {t('download.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {t('download.appStoreUrl') && (
                <a
                  href={t('download.appStoreUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-80 transition-opacity"
                  aria-label={t('download.appStoreAlt') || 'Download on App Store'}
                >
                  <Image
                    src="/images/app-store-badge.svg"
                    alt={t('download.appStoreAlt') || 'Download on App Store'}
                    width={180}
                    height={60}
                    className="h-auto"
                  />
                </a>
              )}
              {t('download.googlePlayUrl') && (
                <a
                  href={t('download.googlePlayUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-80 transition-opacity"
                  aria-label={t('download.googlePlayAlt') || 'Get it on Google Play'}
                >
                  <Image
                    src="/images/google-play-badge.png"
                    alt={t('download.googlePlayAlt') || 'Get it on Google Play'}
                    width={180}
                    height={60}
                    className="h-auto"
                  />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              {t('links.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href={`/${locale}/power-interval-timer/support`}
                className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-orange-500/50 transition-all flex items-center gap-4 group border-2 border-orange-600/30 backdrop-blur-sm bg-opacity-90 ${locale === 'he' ? 'flex-row-reverse' : ''}`}
              >
                <div className="bg-orange-600/30 p-3 rounded-lg group-hover:bg-orange-600/50 border border-orange-500/50 transition-colors">
                  <Mail className="w-6 h-6 text-orange-400" />
                </div>
                <div className={`flex-grow ${locale === 'he' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {t('links.support.title')}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {t('links.support.email')}
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="twilight-footer-bar text-white py-8 px-4 mt-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 flex justify-center">
              <Logo size="md" />
            </div>
            <p className="text-gray-400 mb-2">{t('footer.copyright')}</p>
            <p className="text-sm text-gray-500">
              {t('footer.tagline')}
            </p>
            <div className="flex justify-center gap-4 mt-4 text-sm">
              <Link
                href={`/${locale}/power-interval-timer/support`}
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                {tCommon('support')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href={`/${locale}/power-interval-timer/privacy`}
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                {tCommon('privacyPolicy')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href={`/${locale}/power-interval-timer/terms`}
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                {tCommon('termsOfService')}
              </Link>
            </div>
            <div className="mt-4 flex justify-center">
              <a
                href="https://buymeacoffee.com/sivzuk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
                aria-label={tHome('footer.support')}
              >
                <Image
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt={tHome('footer.support')}
                  width={145}
                  height={40}
                  className="h-auto"
                  unoptimized
                />
              </a>
            </div>
          </div>
        </footer>

        <DownloadStoreFab
          accent="orange"
          appStoreUrl={t('download.appStoreUrl')}
          googlePlayUrl={t('download.googlePlayUrl')}
          appStoreAlt={t('download.appStoreAlt')}
          googlePlayAlt={t('download.googlePlayAlt')}
        utmContent="power-interval-timer"
        />
      </div>
    </>
  );
}
