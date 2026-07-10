'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import AppIconFrame from '@/components/AppIconFrame';
import StoreDownloadBadges from '@/components/StoreDownloadBadges';
import StarBackground from '@/components/StarBackground';
import { ProductMarketingSections, ProductPageNav, DownloadStoreFab } from '@/lib/lazyProductComponents';
import { TIMESINCE_ICON } from '@/lib/appIcons';

export default function TimeSincePage() {
  const t = useTranslations('timeSince');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const rtl = locale === 'he' || locale === 'ar';

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground />

      <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end relative z-50">
        <LanguageSwitcher />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-4 flex items-center justify-between relative z-10">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('back')}
        </Link>
        <Link href={`/${locale}`} className="flex items-center">
          <Logo size="sm" />
        </Link>
      </div>

      <section className={`py-12 px-4 relative z-10 ${rtl ? 'text-right' : 'text-center'}`} id="download">
        <div className={`max-w-7xl mx-auto ${rtl ? '' : 'text-center'}`}>
          <AppIconFrame
            src={TIMESINCE_ICON}
            alt={t('download.appIconAlt')}
            sizes="(max-width: 768px) 96px, 128px"
            priority
            edgeToEdge
            className="mx-auto mb-6"
            boxClassName="w-24 h-24 md:w-32 md:h-32"
            frameClassName="rounded-[22%] overflow-hidden shadow-2xl ring-2 ring-orange-400/40"
          />

          <div className="inline-flex items-center gap-2 bg-orange-950/60 border border-orange-500/40 text-orange-200 px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4" aria-hidden />
            {t('hero.badge')}
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-orange-300/90 mb-2">{t('hero.subtitle')}</p>
          <p className="text-lg text-gray-400 mb-4 max-w-3xl mx-auto">{t('hero.description')}</p>
          <p className="text-sm text-gray-500 mb-8 max-w-2xl mx-auto">{t('hero.socialProof')}</p>

          <ProductPageNav namespace="timeSince" accent="orange" />

          <div className="mb-10">
            <StoreDownloadBadges
              appStoreUrl={t('download.appStoreUrl')}
              googlePlayUrl={t('download.googlePlayUrl')}
              appStoreAlt={t('download.appStoreAlt')}
              googlePlayAlt={t('download.googlePlayAlt')}
              soonLabel={t('download.soon')}
              fallbackBorderClass="border-orange-600/30"
              utmContent="timesince"
            />
          </div>

          <div className="flex justify-center gap-4 text-sm flex-wrap mb-4">
            <Link href={`/${locale}/timesince/privacy`} className="text-orange-400 hover:text-orange-300 underline">
              {tCommon('privacyPolicy')}
            </Link>
            <span className="text-gray-500">|</span>
            <Link href={`/${locale}/timesince/terms`} className="text-orange-400 hover:text-orange-300 underline">
              {tCommon('termsOfService')}
            </Link>
            <span className="text-gray-500">|</span>
            <Link href={`/${locale}/timesince/support`} className="text-orange-400 hover:text-orange-300 underline">
              {tCommon('support')}
            </Link>
          </div>
        </div>
      </section>

      <ProductMarketingSections namespace="timeSince" slug="timesince" accent="orange" hasSupportPage />

      <section className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-orange-500/30 rounded-xl p-8 backdrop-blur-sm bg-opacity-90">
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

      <section className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">{t('download.title')}</h2>
          <p className="text-lg text-gray-300 mb-8">{t('download.description')}</p>
          <StoreDownloadBadges
            appStoreUrl={t('download.appStoreUrl')}
            googlePlayUrl={t('download.googlePlayUrl')}
            appStoreAlt={t('download.appStoreAlt')}
            googlePlayAlt={t('download.googlePlayAlt')}
            soonLabel={t('download.soon')}
            fallbackBorderClass="border-orange-600/30"
            utmContent="timesince"
          />
        </div>
      </section>

      <footer className="twilight-footer-bar text-white py-8 px-4 mt-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 flex justify-center">
            <Logo size="md" />
          </div>
          <p className="text-gray-400 mb-2">{t('footer.copyright')}</p>
          <p className="text-sm text-gray-400">{t('footer.tagline')}</p>
          <div className="flex justify-center gap-4 mt-4 text-sm flex-wrap">
            <Link href={`/${locale}/timesince/support`} className="text-gray-400 hover:text-orange-400 transition-colors">
              {tCommon('support')}
            </Link>
            <span className="text-gray-500">|</span>
            <Link href={`/${locale}/timesince/privacy`} className="text-gray-400 hover:text-orange-400 transition-colors">
              {tCommon('privacyPolicy')}
            </Link>
            <span className="text-gray-500">|</span>
            <Link href={`/${locale}/timesince/terms`} className="text-gray-400 hover:text-orange-400 transition-colors">
              {tCommon('termsOfService')}
            </Link>
          </div>
        </div>
      </footer>

      <DownloadStoreFab
        accent="orange"
        appStoreUrl={t('download.appStoreUrl')}
        googlePlayUrl={t('download.googlePlayUrl')}
        appStoreAlt={t('download.appStoreAlt')}
        googlePlayAlt={t('download.googlePlayAlt')}
        utmContent="timesince"
      />
    </div>
  );
}
