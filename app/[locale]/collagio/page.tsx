'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import {
  ArrowLeft,
  LayoutGrid,
  Ratio,
  Palette,
  Smile,
  Grid2x2,
  Shield,
  Mail,
  ExternalLink,
  CheckCircle2,
  Download,
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import AppIconFrame from '@/components/AppIconFrame';
import DownloadStoreFab from '@/components/DownloadStoreFab';
import StoreDownloadBadges from '@/components/StoreDownloadBadges';
import { COLLAGIO_ICON } from '@/lib/appIcons';
import StarBackground from '@/components/StarBackground';
import ProductMarketingSections, { ProductPageNav } from '@/components/ProductMarketingSections';

const FEATURE_ICONS = {
  layouts: LayoutGrid,
  canvas: Ratio,
  filters: Palette,
  stickers: Smile,
  layoutStudio: Grid2x2,
  privacy: Shield,
} as const;

export default function CollagioPage() {
  const t = useTranslations('collagio');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const rtl = locale === 'he' || locale === 'ar';
  const featureKeys = Object.keys(FEATURE_ICONS) as Array<keyof typeof FEATURE_ICONS>;
  const freeItems = (t.raw('premium.freeItems') as string[] | undefined) ?? [];
  const premiumItems = (t.raw('premium.premiumItems') as string[] | undefined) ?? [];

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
            className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('back')}
          </Link>
          <Link href={`/${locale}`} className="flex items-center">
            <Logo size="sm" />
          </Link>
        </div>

        <section className={`py-12 px-4 relative z-10 ${rtl ? 'text-right' : 'text-center'}`}>
          <div className={`max-w-7xl mx-auto ${rtl ? '' : 'text-center'}`}>
            <div className="mb-8">
              <AppIconFrame
                src={COLLAGIO_ICON}
                alt={t('download.appIconAlt')}
                sizes="(max-width: 768px) 96px, 128px"
                priority
                edgeToEdge
                className="mx-auto mb-6"
                boxClassName="w-24 h-24 md:w-32 md:h-32"
                frameClassName="rounded-[22%] overflow-hidden shadow-2xl"
              />
            </div>
            <div className="inline-flex items-center gap-2 bg-rose-950/60 border border-rose-500/40 text-rose-200 px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4" />
              {t('hero.badge')}
            </div>
            <h1
              className={`text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-rose-400 via-red-300 to-rose-500 bg-clip-text text-transparent ${rtl ? 'text-right' : 'text-center'}`}
              style={{ filter: 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.5))' }}
            >
              {t('hero.title')}
            </h1>
            <p className={`text-lg md:text-xl text-rose-300/90 mb-4 max-w-3xl ${rtl ? 'mr-0 ml-auto' : 'mx-auto'}`}>
              {t.has('hero.productName') ? t('hero.productName') : t('hero.subtitle')}
            </p>
            <p className={`text-lg text-gray-400 mb-4 max-w-3xl ${rtl ? 'mr-0 ml-auto' : 'mx-auto'}`}>{t('hero.description')}</p>
            <p className={`text-sm text-rose-300/90 mb-8 max-w-3xl ${rtl ? 'mr-0 ml-auto' : 'mx-auto'}`}>{t('hero.socialProof')}</p>
            <div className={`flex gap-4 text-sm flex-wrap mb-6 ${rtl ? 'justify-end' : 'justify-center'}`}>
              <Link href={`/${locale}/collagio/privacy`} className="text-rose-400 hover:text-rose-300 underline">
                {tCommon('privacyPolicy')}
              </Link>
              <span className="text-gray-500">|</span>
              <Link href={`/${locale}/collagio/terms`} className="text-rose-400 hover:text-rose-300 underline">
                {tCommon('termsOfService')}
              </Link>
              <span className="text-gray-500">|</span>
              <Link href={`/${locale}/collagio/support`} className="text-rose-400 hover:text-rose-300 underline">
                {tCommon('support')}
              </Link>
            </div>
            <ProductPageNav namespace="collagio" accent="rose" />
            <div className="mb-8">
              <StoreDownloadBadges
                appStoreUrl={t('download.appStoreUrl')}
                googlePlayUrl={t('download.googlePlayUrl')}
                appStoreAlt={t('download.appStoreAlt')}
                googlePlayAlt={t('download.googlePlayAlt')}
                utmContent="collagio"
              />
            </div>
            <div className={`flex justify-center ${rtl ? '' : ''}`}>
              <Image
                src="/images/collagio/hero-phone.png"
                alt={t('hero.phoneAlt')}
                width={900}
                height={1800}
                unoptimized
                sizes="(max-width: 768px) 220px, 280px"
                className="max-w-[220px] md:max-w-[280px] h-auto rounded-2xl shadow-2xl border border-rose-500/20"
                priority
              />
            </div>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10" id="features">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">{t('features.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureKeys.map((key) => {
                const Icon = FEATURE_ICONS[key];
                return (
                  <div
                    key={key}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 border-2 border-rose-600/30 hover:border-rose-500/50 transition-all backdrop-blur-sm bg-opacity-90"
                  >
                    <div className="bg-rose-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-rose-500/50">
                      <Icon className="w-8 h-8 text-rose-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{t(`features.${key}.title`)}</h3>
                    <p className="text-gray-300 mb-4">{t(`features.${key}.description`)}</p>
                    <ul className="text-sm text-gray-400 space-y-2">
                      {(t.raw(`features.${key}.items`) as string[]).map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <ProductMarketingSections namespace="collagio" slug="collagio" accent="rose" hasSupportPage />

        <section className="py-12 px-4 relative z-10" id="zuli-monsters">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-rose-950/50 to-gray-900 rounded-2xl p-8 md:p-10 border-2 border-rose-500/40 shadow-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-3 text-center">
                {t('zuliMonsters.subtitle')}
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-4">
                {t('zuliMonsters.title')}
              </h2>
              <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto leading-relaxed">
                {t('zuliMonsters.description')}
              </p>
              <div
                className="rounded-xl border border-rose-500/30 bg-black/40 p-6 mb-4"
                role="note"
                aria-label="Zuli Monsters intellectual property notice"
              >
                <p className="text-sm md:text-base text-rose-100 font-semibold leading-relaxed text-center">
                  {t('zuliMonsters.rightsNotice')}
                </p>
              </div>
              <p className="text-sm text-gray-400 text-center leading-relaxed max-w-2xl mx-auto">
                {t('zuliMonsters.usageNotice')}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10" id="premium">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">{t('premium.title')}</h2>
            <p className="text-center text-gray-400 mb-10">{t('premium.subtitle')}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 border-2 border-rose-600/20">
                <h3 className="text-xl font-bold text-white mb-4">{t('premium.freeTitle')}</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {freeItems.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-rose-400">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-rose-950/40 to-gray-900 rounded-xl p-8 border-2 border-rose-500/50">
                <h3 className="text-xl font-bold text-rose-300 mb-4">{t('premium.premiumTitle')}</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {premiumItems.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-rose-400">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10" id="status">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-rose-500/30 rounded-xl p-8 backdrop-blur-sm bg-opacity-90">
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
              utmContent="collagio"
            />
            {!t('download.appStoreUrl') && t('download.googlePlayUrl') && (
              <p className="text-sm text-gray-500 mt-6">{t('download.soon')}</p>
            )}
          </div>
        </section>

        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">{t('links.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href={`/${locale}/collagio/support`}
                className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-rose-500/50 transition-all flex items-center gap-4 group border-2 border-rose-600/30 backdrop-blur-sm bg-opacity-90 ${locale === 'he' || locale === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <div className="bg-rose-600/30 p-3 rounded-lg group-hover:bg-rose-600/50 border border-rose-500/50 transition-colors">
                  <Mail className="w-6 h-6 text-rose-400" />
                </div>
                <div className={`flex-grow ${locale === 'he' || locale === 'ar' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-semibold text-white mb-1">{t('links.support.title')}</h3>
                  <p className="text-gray-300 text-sm">{t('links.support.email')}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-rose-400 transition-colors" />
              </Link>
              {t('download.googlePlayUrl') && (
                <a
                  href={t('download.googlePlayUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-rose-500/50 transition-all flex items-center gap-4 group border-2 border-rose-600/30 backdrop-blur-sm bg-opacity-90 ${locale === 'he' || locale === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  <div className="bg-green-600/30 p-3 rounded-lg group-hover:bg-green-600/50 border border-green-500/50 transition-colors">
                    <Download className="w-6 h-6 text-green-400" />
                  </div>
                  <div className={`flex-grow ${locale === 'he' || locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-xl font-semibold text-white mb-1">{t('links.googlePlay.title')}</h3>
                    <p className="text-gray-300 text-sm">{t('links.googlePlay.description')}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-rose-400 transition-colors" />
                </a>
              )}
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
              <Link href={`/${locale}/collagio/support`} className="text-gray-400 hover:text-rose-400 transition-colors">
                {tCommon('support')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link href={`/${locale}/collagio/privacy`} className="text-gray-400 hover:text-rose-400 transition-colors">
                {tCommon('privacyPolicy')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link href={`/${locale}/collagio/terms`} className="text-gray-400 hover:text-rose-400 transition-colors">
                {tCommon('termsOfService')}
              </Link>
            </div>
          </div>
        </footer>

        <DownloadStoreFab
          accent="rose"
          appStoreUrl={t('download.appStoreUrl')}
          googlePlayUrl={t('download.googlePlayUrl')}
          appStoreAlt={t('download.appStoreAlt')}
          googlePlayAlt={t('download.googlePlayAlt')}
          utmContent="collagio"
        />
      </div>
    </>
  );
}
