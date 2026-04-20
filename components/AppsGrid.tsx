'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
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
} from 'lucide-react';

interface AppInfo {
  id: string;
  icon: React.ReactNode;
  iconImage?: string;
  titleKey: string;
  link: string;
}

export default function AppsGrid() {
  const t = useTranslations('home');
  const locale = useLocale();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const apps: AppInfo[] = [
    {
      id: 'zulist',
      icon: <ShoppingCart className="w-12 h-12 text-blue-400" aria-hidden="true" />,
      iconImage: '/images/zulist-icon.png',
      titleKey: 'zulist.title',
      link: `/${locale}/zulist`,
    },
    {
      id: 'hush-gallery',
      icon: <ImageIcon className="w-12 h-12 text-purple-400" aria-hidden="true" />,
      iconImage: '/images/hush-gallery-icon.png',
      titleKey: 'hushGallery.title',
      link: `/${locale}/hush-gallery`,
    },
    {
      id: 'whistle-camera',
      icon: <Camera className="w-12 h-12 text-amber-400" aria-hidden="true" />,
      iconImage: '/images/whistle-camera-icon.png',
      titleKey: 'whistleCamera.title',
      link: `/${locale}/whistle-camera`,
    },
    {
      id: 'power-interval-timer',
      icon: <Timer className="w-12 h-12 text-orange-400" aria-hidden="true" />,
      iconImage: '/images/power-interval-timer-icon.png',
      titleKey: 'powerIntervalTimer.title',
      link: `/${locale}/power-interval-timer`,
    },
    {
      id: 'bit-scope',
      icon: <Binary className="w-12 h-12 text-cyan-400" aria-hidden="true" />,
      iconImage: '/images/bit-scope-icon.png',
      titleKey: 'bitScope.title',
      link: `/${locale}/bit-scope`,
    },
    {
      id: 'track-ledger',
      icon: <MapPinned className="w-12 h-12 text-cyan-400" aria-hidden="true" />,
      iconImage: '/images/track-ledger-icon.png',
      titleKey: 'trackLedger.title',
      link: `/${locale}/track-ledger`,
    },
    {
      id: 'noise-meter-shusher',
      icon: <Volume2 className="w-12 h-12 text-violet-400" aria-hidden="true" />,
      iconImage: '/images/noise-meter-shusher-icon.png',
      titleKey: 'noiseMeterShusher.title',
      link: `/${locale}/noise-meter-shusher`,
    },
    {
      id: 'paratrooper-blitz',
      icon: <Gamepad2 className="w-12 h-12 text-orange-400" aria-hidden="true" />,
      iconImage: '/images/paratrooper-blitz-icon.png',
      titleKey: 'paratrooperBlitz.title',
      link: `/${locale}/paratrooper-blitz`,
    },
    {
      id: 'sudoku-puzzle',
      icon: <Grid3X3 className="w-12 h-12 text-teal-400" aria-hidden="true" />,
      iconImage: '/images/sudoku-puzzle-icon.png',
      titleKey: 'sudokuPuzzle.title',
      link: `/${locale}/sudoku-puzzle`,
    },
    {
      id: 'tempoLabPro',
      icon: <Music className="w-12 h-12 text-violet-400" aria-hidden="true" />,
      iconImage: '/images/tempo-lab-pro-icon.png',
      titleKey: 'tempoLabPro.title',
      link: `/${locale}/tempoLabPro`,
    },
    {
      id: 'football-trivia',
      icon: <Trophy className="w-12 h-12 text-sky-400" aria-hidden="true" />,
      iconImage: '/images/football-trivia-icon.png',
      titleKey: 'footballTrivia.title',
      link: `/${locale}/football-trivia`,
    },
    {
      id: 'fun-facts-trivia',
      icon: <Lightbulb className="w-12 h-12 text-amber-400" aria-hidden="true" />,
      iconImage: '/images/fun-facts-trivia-icon.png',
      titleKey: 'funFactsTrivia.title',
      link: `/${locale}/fun-facts-trivia`,
    },
  ];

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
            aria-label={`${t(app.titleKey)} - ${locale === 'he' ? 'פתח' : 'Open'}`}
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 mb-4 rounded-2xl overflow-hidden ring-2 ring-gray-600 group-hover:ring-blue-500/50 transition-all">
              {app.iconImage && isMounted ? (
                <Image
                  src={app.iconImage}
                  alt={t(app.titleKey)}
                  fill
                  sizes="(max-width: 768px) 80px, 96px"
                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  priority={app.id === 'zulist'}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-950/80 to-slate-950/90">
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
