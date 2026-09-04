import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import AppIconFrame from '@/components/AppIconFrame';
import { HOME_APP_ICON_WEBP } from '@/lib/homeAppIcons';
import { getPublishedHomeAppIds, type HomeAppId } from '@/lib/homeApps';

const TITLE_KEY: Record<HomeAppId, string> = {
  zulist: 'zulist.title',
  'hush-gallery': 'hushGallery.title',
  'whistle-camera': 'whistleCamera.title',
  'geo-calc': 'geoCalc.title',
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
  timesince: 'timeSince.title',
  toldya: 'toldya.title',
};

const EDGE_TO_EDGE = new Set<HomeAppId>([
  'hush-gallery',
  'whistle-camera',
  'geo-calc',
  'zuli-collage',
  'timesince',
]);

export default async function AppsGrid({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const apps = getPublishedHomeAppIds();

  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-8">
        {t('appsGrid.title')}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {apps.map((id) => {
          const edgeToEdge = EDGE_TO_EDGE.has(id);
          return (
            <Link
              key={id}
              href={`/${locale}/${id}`}
              prefetch={false}
              className="group flex flex-col items-center p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 backdrop-blur-md bg-opacity-90 bg-gradient-to-br from-indigo-950/85 to-violet-950/70 border-indigo-500/30 hover:border-amber-400/45"
              aria-label={`${t(TITLE_KEY[id])}`}
            >
              <div className="mb-4">
                <AppIconFrame
                  src={HOME_APP_ICON_WEBP[id]}
                  alt=""
                  sizes="(max-width: 768px) 80px, 96px"
                  boxClassName="w-20 h-20 md:w-24 md:h-24"
                  frameClassName={
                    edgeToEdge
                      ? 'rounded-[22%] overflow-hidden shadow-lg group-hover:ring-pink-400/45 ring-2 ring-white/15 transition-all duration-300'
                      : 'rounded-2xl overflow-hidden shadow-lg ring-2 ring-white/15 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 group-hover:ring-amber-400/45 transition-all duration-300'
                  }
                  edgeToEdge={edgeToEdge}
                  withGroupHover
                />
              </div>
              <h3 className="text-sm md:text-base font-bold text-white text-center group-hover:text-blue-400 transition-colors line-clamp-2">
                {t(TITLE_KEY[id])}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
