import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import AppIconFrame from '@/components/AppIconFrame';
import { HOME_APP_ICON_WEBP } from '@/lib/homeAppIcons';
import { HOME_APP_IDS } from '@/lib/homeApps';
import {
  ShoppingCart,
  ImageIcon,
  Camera,
  Timer,
  Grid3X3,
  Binary,
  Music,
  Trophy,
  Lightbulb,
  MapPinned,
  Volume2,
  Gamepad2,
  Layers,
  Compass,
  CalendarClock,
} from 'lucide-react';

interface AppInfo {
  id: string;
  icon: React.ReactNode;
  iconImage?: string;
  iconEdgeToEdge?: boolean;
  titleKey: string;
  link: string;
}

export default async function AppsGrid({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const appsById: Record<string, AppInfo> = {
    zulist: {
      id: 'zulist',
      icon: <ShoppingCart className="w-12 h-12 text-blue-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP.zulist,
      titleKey: 'zulist.title',
      link: `/${locale}/zulist`,
    },
    'hush-gallery': {
      id: 'hush-gallery',
      icon: <ImageIcon className="w-12 h-12 text-purple-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['hush-gallery'],
      iconEdgeToEdge: true,
      titleKey: 'hushGallery.title',
      link: `/${locale}/hush-gallery`,
    },
    'whistle-camera': {
      id: 'whistle-camera',
      icon: <Camera className="w-12 h-12 text-amber-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['whistle-camera'],
      iconEdgeToEdge: true,
      titleKey: 'whistleCamera.title',
      link: `/${locale}/whistle-camera`,
    },
    'geo-calc': {
      id: 'geo-calc',
      icon: <Compass className="w-12 h-12 text-amber-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['geo-calc'],
      iconEdgeToEdge: true,
      titleKey: 'geoCalc.title',
      link: `/${locale}/geo-calc`,
    },
    'power-interval-timer': {
      id: 'power-interval-timer',
      icon: <Timer className="w-12 h-12 text-orange-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['power-interval-timer'],
      titleKey: 'powerIntervalTimer.title',
      link: `/${locale}/power-interval-timer`,
    },
    'bit-scope': {
      id: 'bit-scope',
      icon: <Binary className="w-12 h-12 text-cyan-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['bit-scope'],
      titleKey: 'bitScope.title',
      link: `/${locale}/bit-scope`,
    },
    'track-ledger': {
      id: 'track-ledger',
      icon: <MapPinned className="w-12 h-12 text-cyan-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['track-ledger'],
      titleKey: 'trackLedger.title',
      link: `/${locale}/track-ledger`,
    },
    'noise-meter-shusher': {
      id: 'noise-meter-shusher',
      icon: <Volume2 className="w-12 h-12 text-violet-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['noise-meter-shusher'],
      titleKey: 'noiseMeterShusher.title',
      link: `/${locale}/noise-meter-shusher`,
    },
    'paratrooper-blitz': {
      id: 'paratrooper-blitz',
      icon: <Gamepad2 className="w-12 h-12 text-orange-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['paratrooper-blitz'],
      titleKey: 'paratrooperBlitz.title',
      link: `/${locale}/paratrooper-blitz`,
    },
    'sudoku-puzzle': {
      id: 'sudoku-puzzle',
      icon: <Grid3X3 className="w-12 h-12 text-teal-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['sudoku-puzzle'],
      titleKey: 'sudokuPuzzle.title',
      link: `/${locale}/sudoku-puzzle`,
    },
    'tempo-lab-pro': {
      id: 'tempo-lab-pro',
      icon: <Music className="w-12 h-12 text-violet-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['tempo-lab-pro'],
      titleKey: 'tempoLabPro.title',
      link: `/${locale}/tempo-lab-pro`,
    },
    'football-trivia': {
      id: 'football-trivia',
      icon: <Trophy className="w-12 h-12 text-sky-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['football-trivia'],
      titleKey: 'footballTrivia.title',
      link: `/${locale}/football-trivia`,
    },
    'fun-facts-trivia': {
      id: 'fun-facts-trivia',
      icon: <Lightbulb className="w-12 h-12 text-amber-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['fun-facts-trivia'],
      titleKey: 'funFactsTrivia.title',
      link: `/${locale}/fun-facts-trivia`,
    },
    'zuli-collage': {
      id: 'zuli-collage',
      icon: <Layers className="w-12 h-12 text-pink-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['zuli-collage'],
      iconEdgeToEdge: true,
      titleKey: 'zuliCollage.title',
      link: `/${locale}/zuli-collage`,
    },
    timesince: {
      id: 'timesince',
      icon: <CalendarClock className="w-12 h-12 text-orange-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP.timesince,
      iconEdgeToEdge: true,
      titleKey: 'timeSince.title',
      link: `/${locale}/timesince`,
    },
  };

  const apps = HOME_APP_IDS.map((id) => appsById[id]);

  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-8">
        {t('appsGrid.title')}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {apps.map((app) => (
          <Link
            key={app.id}
            href={app.link}
            className="group flex flex-col items-center p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 backdrop-blur-md bg-opacity-90 bg-gradient-to-br from-indigo-950/85 to-violet-950/70 border-indigo-500/30 hover:border-amber-400/45"
            aria-label={`${t(app.titleKey)}`}
          >
            <div className="mb-4">
              {app.iconImage ? (
                <AppIconFrame
                  src={app.iconImage}
                  alt={t(app.titleKey)}
                  sizes="(max-width: 768px) 80px, 96px"
                  boxClassName="w-20 h-20 md:w-24 md:h-24"
                  frameClassName={
                    app.iconEdgeToEdge
                      ? 'rounded-[22%] overflow-hidden shadow-lg group-hover:ring-pink-400/45 ring-2 ring-white/15 transition-all duration-300'
                      : 'rounded-2xl overflow-hidden shadow-lg ring-2 ring-white/15 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 group-hover:ring-amber-400/45 transition-all duration-300'
                  }
                  edgeToEdge={app.iconEdgeToEdge}
                  withGroupHover
                />
              ) : (
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-2xl overflow-hidden ring-2 ring-white/15 bg-gradient-to-br from-indigo-950/80 to-slate-950/90">
                  {app.icon}
                </div>
              )}
            </div>
            <h3 className="text-sm md:text-base font-bold text-white text-center group-hover:text-blue-400 transition-colors line-clamp-2">
              {t(app.titleKey)}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
