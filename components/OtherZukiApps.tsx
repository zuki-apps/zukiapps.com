'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import AppIconFrame from '@/components/AppIconFrame';
import { HOME_APP_ICON_WEBP } from '@/lib/homeAppIcons';
import { HOME_APP_IDS, type HomeAppId } from '@/lib/homeApps';

const TITLE_KEY: Record<HomeAppId, string> = {
  zulist: 'zulist.title',
  'hush-gallery': 'hushGallery.title',
  'whistle-camera': 'whistleCamera.title',
  'power-interval-timer': 'powerIntervalTimer.title',
  'bit-scope': 'bitScope.title',
  'track-ledger': 'trackLedger.title',
  'noise-meter-shusher': 'noiseMeterShusher.title',
  'paratrooper-blitz': 'paratrooperBlitz.title',
  'sudoku-puzzle': 'sudokuPuzzle.title',
  'tempo-lab-pro': 'tempoLabPro.title',
  'football-trivia': 'footballTrivia.title',
  'fun-facts-trivia': 'funFactsTrivia.title',
  'zuli-collage': 'zuliCollage.title',
};

type OtherZukiAppsProps = {
  currentAppId: HomeAppId | string;
  limit?: number;
};

export default function OtherZukiApps({ currentAppId, limit = 4 }: OtherZukiAppsProps) {
  const locale = useLocale();
  const tHome = useTranslations('home');
  const tCommon = useTranslations('common');

  const others = HOME_APP_IDS.filter((id) => id !== currentAppId).slice(0, limit);
  if (others.length === 0) return null;

  return (
    <section className="py-12 px-4 relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">
          {tCommon('otherZukiApps.title')}
        </h2>
        <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
          {tCommon('otherZukiApps.subtitle')}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {others.map((id) => (
            <Link
              key={id}
              href={`/${locale}/${id}`}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-colors"
            >
              <AppIconFrame
                src={HOME_APP_ICON_WEBP[id]}
                alt={tHome(TITLE_KEY[id])}
                sizes="64px"
                edgeToEdge={id === 'hush-gallery' || id === 'whistle-camera' || id === 'zuli-collage'}
                boxClassName="w-16 h-16"
                frameClassName="rounded-xl overflow-hidden"
              />
              <span className="text-sm font-semibold text-center text-gray-200 line-clamp-2">
                {tHome(TITLE_KEY[id])}
              </span>
            </Link>
          ))}
        </div>
        <p className="text-center mt-6">
          <Link href={`/${locale}`} className="text-indigo-300 hover:text-indigo-200 underline text-sm">
            {tCommon('otherZukiApps.viewAll')}
          </Link>
        </p>
      </div>
    </section>
  );
}
