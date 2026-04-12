'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import {
  ArrowLeft,
  Archive,
  Camera,
  ImageIcon,
  MapPinned,
  Trophy,
  ScanSearch,
  Smartphone
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import DreambitArchiveStructuredData from '@/components/DreambitArchiveStructuredData';

const APP_KEYS = [
  'hushGallery',
  'whistleCamera',
  'navigUp',
  'worldCup2014',
  'trickyRooms',
  'flipLight'
] as const;

const LARGE_RASTER_ICON_KEYS = new Set<(typeof APP_KEYS)[number]>([
  'hushGallery',
  'whistleCamera',
  'navigUp',
  'worldCup2014',
  'trickyRooms',
  'flipLight'
]);

const APP_ICONS: Record<(typeof APP_KEYS)[number], ReactNode> = {
  hushGallery: <ImageIcon className="w-8 h-8 text-violet-300" aria-hidden />,
  whistleCamera: <Camera className="w-8 h-8 text-amber-300" aria-hidden />,
  navigUp: <MapPinned className="w-8 h-8 text-sky-300" aria-hidden />,
  worldCup2014: <Trophy className="w-8 h-8 text-emerald-300" aria-hidden />,
  trickyRooms: <ScanSearch className="w-8 h-8 text-rose-300" aria-hidden />,
  flipLight: <Smartphone className="w-8 h-8 text-orange-300" aria-hidden />
};

export default function DreambitLegacyPage() {
  const t = useTranslations('dreambitLegacy');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: t('hero.title'), path: '/dreambit-legacy' }
        ]}
      />
      <DreambitArchiveStructuredData
        locale={locale}
        archiveName={t('hero.title')}
        archiveDescription={t('meta.description')}
        items={APP_KEYS.map((key) => ({
          title: t(`apps.${key}.title`),
          googlePlayUrl: t(`playUrls.${key}`),
        }))}
      />
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 twilight-sky-overlay" />
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end relative z-50">
          <LanguageSwitcher />
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-2 flex items-center justify-between relative z-10">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-amber-300/90 hover:text-amber-200 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('nav.backHome')}
          </Link>
          <Link href={`/${locale}`} className="flex items-center">
            <Logo size="sm" />
          </Link>
        </div>

        <main className="relative z-10 max-w-4xl mx-auto px-4 pb-16 pt-8">
          <header className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/70 border border-amber-400/30 text-amber-200/90 text-sm font-semibold mb-6">
              <Archive className="w-4 h-4" aria-hidden />
              {t('hero.badge')}
            </div>
            <div className="mx-auto mb-8 w-fit max-w-[min(100%,18rem)] rounded-2xl bg-white p-4 md:p-6 shadow-2xl ring-1 ring-cyan-400/30">
              <div className="relative aspect-square w-52 sm:w-56 md:w-64">
                <Image
                  src="/images/dreambit-logo.png"
                  alt={t('hero.logoAlt')}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 208px, 256px"
                  priority
                />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-indigo-100/85 max-w-2xl mx-auto mb-4">{t('hero.subtitle')}</p>
            <p className="text-sm text-amber-200/90 max-w-2xl mx-auto mb-3 rounded-xl border border-amber-500/25 bg-amber-950/20 px-4 py-3">
              {t('hero.unmaintained')}
            </p>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto">{t('hero.brandNote')}</p>
          </header>

          <p className="text-center text-slate-400 text-sm mb-6">{t('legalLinksIntro')}</p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              href={`/${locale}/dreambit-legacy/privacy`}
              className="text-violet-300 hover:text-violet-200 underline text-sm font-semibold"
            >
              {t('nav.privacy')}
            </Link>
            <span className="text-slate-600">|</span>
            <Link
              href={`/${locale}/dreambit-legacy/terms`}
              className="text-violet-300 hover:text-violet-200 underline text-sm font-semibold"
            >
              {t('nav.terms')}
            </Link>
          </div>

          <h2 className="text-2xl font-black text-white mb-6 text-center">{t('appsTitle')}</h2>
          <ul className="space-y-5">
            {APP_KEYS.map((key) => {
              const playUrl = t(`playUrls.${key}`).trim();
              const hasPlay = playUrl.startsWith('http');
              return (
                <li
                  key={key}
                  className="card-twilight !mb-0 flex flex-col sm:flex-row sm:items-stretch gap-4 p-6 md:p-8"
                >
                  <div className="flex-shrink-0 flex items-start justify-center sm:justify-start pt-1">
                    <div
                      className={`relative rounded-2xl overflow-hidden border-2 border-indigo-400/30 bg-indigo-950/80 shadow-lg ring-1 ring-white/10 ${
                        LARGE_RASTER_ICON_KEYS.has(key)
                          ? 'h-28 w-28 sm:h-36 sm:w-36'
                          : 'h-20 w-20 sm:h-24 sm:w-24'
                      }`}
                    >
                      {(() => {
                        const iconSrc = t(`iconImages.${key}`).trim();
                        if (iconSrc.startsWith('/')) {
                          return (
                            <Image
                              src={iconSrc}
                              alt={t(`apps.${key}.title`)}
                              fill
                              className={
                                LARGE_RASTER_ICON_KEYS.has(key)
                                  ? 'object-cover object-center'
                                  : 'object-contain p-1'
                              }
                              sizes={LARGE_RASTER_ICON_KEYS.has(key) ? '144px' : '96px'}
                            />
                          );
                        }
                        return (
                          <div className="flex h-full w-full items-center justify-center p-3">
                            {APP_ICONS[key]}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h3 className="text-xl font-black text-white mb-2">{t(`apps.${key}.title`)}</h3>
                    <p className="text-slate-300 leading-relaxed">{t(`apps.${key}.description`)}</p>
                  </div>
                  <div className="flex sm:flex-col justify-center sm:items-center gap-2 flex-shrink-0">
                    {hasPlay ? (
                      <a
                        href={playUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-lg"
                        aria-label={t('googlePlayAlt')}
                      >
                        <Image
                          src="/images/google-play-badge.png"
                          alt={t('googlePlayAlt')}
                          width={180}
                          height={54}
                          className="h-auto w-[150px] sm:w-[180px] object-contain hover:opacity-90 transition-opacity"
                        />
                      </a>
                    ) : (
                      <span className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-500/50 text-slate-400 text-sm font-semibold cursor-not-allowed bg-slate-900/40">
                        {t('playLinkPending')}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </main>
      </div>
    </>
  );
}
