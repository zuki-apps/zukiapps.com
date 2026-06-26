'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, Volume2, History, LineChart, Mail, ExternalLink, CheckCircle2 } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import AppIconFrame from '@/components/AppIconFrame';
import DownloadStoreFab from '@/components/DownloadStoreFab';
import StoreDownloadBadges from '@/components/StoreDownloadBadges';
import StarBackground from '@/components/StarBackground';
import ProductMarketingSections, { ProductPageNav } from '@/components/ProductMarketingSections';

export default function NoiseMeterShusherPage() {
  const t = useTranslations('noiseMeterShusher');
  const tCommon = useTranslations('common');
  const tHome = useTranslations('home');
  const locale = useLocale();
  const supportEmail = t('links.support.email');

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
            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-black transition-colors"
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
                src="/images/noise-meter-shusher-icon.png"
                alt={t('hero.title')}
                sizes="(max-width: 768px) 96px, 128px"
                priority
                className="mx-auto mb-6"
                boxClassName="w-24 h-24 md:w-32 md:h-32"
                frameClassName="rounded-2xl overflow-hidden shadow-2xl ring-2 ring-violet-400/40 bg-gradient-to-br from-violet-950/90 via-slate-950 to-slate-950"
              />
            </div>
            <div className="inline-flex items-center gap-2 bg-violet-950/50 border border-violet-500/30 text-violet-200 px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4" />
              {t('hero.badge')}
            </div>
            <h1
              className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-violet-400 via-fuchsia-300 to-violet-500 bg-clip-text text-transparent"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(167, 139, 250, 0.45))',
              }}
            >
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-gray-300 max-w-3xl mx-auto">{t('hero.subtitle')}</p>
            <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">{t('hero.description')}</p>
            <div className="flex justify-center gap-4 text-sm flex-wrap">
              <Link
                href={`/${locale}/noise-meter-shusher/privacy`}
                className="text-violet-400 hover:text-violet-300 underline transition-colors"
              >
                {tCommon('privacyPolicy')}
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                href={`/${locale}/noise-meter-shusher/terms`}
                className="text-violet-400 hover:text-violet-300 underline transition-colors"
              >
                {tCommon('termsOfService')}
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                href={`/${locale}/noise-meter-shusher/support`}
                className="text-violet-400 hover:text-violet-300 underline transition-colors"
              >
                {tCommon('support')}
              </Link>
            </div>
            <ProductPageNav namespace="noiseMeterShusher" accent="violet" />
          </div>
        </section>

        <section className="py-12 px-4 relative z-10" id="features">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">{t('features.title')}</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-violet-500/50 border-2 border-violet-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-violet-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-violet-500/50">
                  <Volume2 className="w-8 h-8 text-violet-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{t('features.meter.title')}</h3>
                <p className="text-gray-300 mb-4">{t('features.meter.description')}</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.meter.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-violet-500/50 border-2 border-violet-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-fuchsia-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-fuchsia-500/50">
                  <History className="w-8 h-8 text-fuchsia-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{t('features.history.title')}</h3>
                <p className="text-gray-300 mb-4">{t('features.history.description')}</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.history.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-violet-500/50 border-2 border-violet-600/30 transition-all backdrop-blur-sm bg-opacity-90 md:col-span-2 lg:col-span-1">
                <div className="bg-purple-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-purple-500/50">
                  <LineChart className="w-8 h-8 text-purple-200" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{t('features.premium.title')}</h3>
                <p className="text-gray-300 mb-4">{t('features.premium.description')}</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.premium.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ProductMarketingSections namespace="noiseMeterShusher" slug="noise-meter-shusher" accent="violet" hasSupportPage={true} />

        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-violet-500/30 rounded-xl p-8 backdrop-blur-sm bg-opacity-90">
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

        <section className="py-12 px-4 relative z-10" id="download">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">{t('download.title')}</h2>
            <p className="text-lg text-gray-300 mb-8">{t('download.description')}</p>
            <StoreDownloadBadges
              appStoreUrl={t('download.appStoreUrl')}
              googlePlayUrl={t('download.googlePlayUrl')}
              appStoreAlt={t('download.appStoreAlt')}
              googlePlayAlt={t('download.googlePlayAlt')}
              soonLabel={t('download.soon')}
              fallbackBorderClass="border-violet-600/30"
              utmContent="noise-meter-shusher"
            />
          </div>
        </section>

        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">{t('links.title')}</h2>
            <div className="grid md:grid-cols-1 gap-6 max-w-xl mx-auto">
              <Link
                href={`/${locale}/noise-meter-shusher/support`}
                className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-violet-500/50 transition-all flex items-center gap-4 group border-2 border-violet-600/30 backdrop-blur-sm bg-opacity-90 ${locale === 'he' || locale === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <div className="bg-violet-600/30 p-3 rounded-lg group-hover:bg-violet-600/50 border border-violet-500/50 transition-colors">
                  <Mail className="w-6 h-6 text-violet-400" />
                </div>
                <div className={`flex-grow ${locale === 'he' || locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-semibold text-white mb-1">{t('links.support.title')}</h3>
                  <p className="text-gray-300 text-sm">{supportEmail}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-violet-400 transition-colors" />
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
            <div className="flex justify-center gap-4 mt-4 text-sm flex-wrap">
              <Link
                href={`/${locale}/noise-meter-shusher/support`}
                className="text-gray-400 hover:text-violet-400 transition-colors"
              >
                {tCommon('support')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href={`/${locale}/noise-meter-shusher/privacy`}
                className="text-gray-400 hover:text-violet-400 transition-colors"
              >
                {tCommon('privacyPolicy')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href={`/${locale}/noise-meter-shusher/terms`}
                className="text-gray-400 hover:text-violet-400 transition-colors"
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
          accent="violet"
          appStoreUrl={t('download.appStoreUrl')}
          googlePlayUrl={t('download.googlePlayUrl')}
          appStoreAlt={t('download.appStoreAlt')}
          googlePlayAlt={t('download.googlePlayAlt')}
        utmContent="noise-meter-shusher"
        />
      </div>
    </>
  );
}
