'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import AppIconFrame from '@/components/AppIconFrame';
import { getCarouselFeatureCells } from '@/lib/carouselFeatures';
import { HOME_APP_ICON_WEBP } from '@/lib/homeAppIcons';
import { HOME_APP_IDS } from '@/lib/homeApps';
import {
  ShoppingCart,
  ImageIcon,
  Camera,
  Timer,
  ChevronLeft,
  ChevronRight,
  Users,
  Wifi,
  Sparkles,
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

interface AppData {
  id: string;
  icon: React.ReactNode;
  iconImage?: string;
  iconEdgeToEdge?: boolean;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  featuresKey: string;
  learnMoreKey: string;
  link?: string;
  isComingSoon: boolean;
  monsters?: string[];
}

export default function AppsCarousel() {
  const t = useTranslations('home');
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const programmaticTargetRef = useRef<number | null>(null);
  const currentIndexRef = useRef(0);
  const hasRandomizedRef = useRef(false);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const appsById = useMemo(
    (): Record<string, AppData> => ({
    zulist: {
      id: 'zulist',
      icon: <ShoppingCart className="w-16 h-16 text-blue-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP.zulist,
      titleKey: 'zulist.title',
      subtitleKey: 'zulist.subtitle',
      descriptionKey: 'zulist.description',
      featuresKey: 'zulist.features',
      learnMoreKey: 'zulist.learnMore',
      link: `/${locale}/zulist`,
      isComingSoon: false,
      monsters: ['zuli-04.png', 'zuli-15.png'],
    },
    'hush-gallery': {
      id: 'hush-gallery',
      icon: <ImageIcon className="w-16 h-16 text-purple-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['hush-gallery'],
      iconEdgeToEdge: true,
      titleKey: 'hushGallery.title',
      subtitleKey: 'hushGallery.subtitle',
      descriptionKey: 'hushGallery.description',
      featuresKey: 'hushGallery.features',
      learnMoreKey: 'hushGallery.learnMore',
      link: `/${locale}/hush-gallery`,
      isComingSoon: false,
    },
    'whistle-camera': {
      id: 'whistle-camera',
      icon: <Camera className="w-16 h-16 text-amber-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['whistle-camera'],
      iconEdgeToEdge: true,
      titleKey: 'whistleCamera.title',
      subtitleKey: 'whistleCamera.subtitle',
      descriptionKey: 'whistleCamera.description',
      featuresKey: 'whistleCamera.features',
      learnMoreKey: 'whistleCamera.learnMore',
      link: `/${locale}/whistle-camera`,
      isComingSoon: false,
    },
    'geo-calc': {
      id: 'geo-calc',
      icon: <Compass className="w-16 h-16 text-amber-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['geo-calc'],
      iconEdgeToEdge: true,
      titleKey: 'geoCalc.title',
      subtitleKey: 'geoCalc.subtitle',
      descriptionKey: 'geoCalc.description',
      featuresKey: 'geoCalc.features',
      learnMoreKey: 'geoCalc.learnMore',
      link: `/${locale}/geo-calc`,
      isComingSoon: false,
    },
    'power-interval-timer': {
      id: 'power-interval-timer',
      icon: <Timer className="w-16 h-16 text-orange-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['power-interval-timer'],
      titleKey: 'powerIntervalTimer.title',
      subtitleKey: 'powerIntervalTimer.subtitle',
      descriptionKey: 'powerIntervalTimer.description',
      featuresKey: 'powerIntervalTimer.features',
      learnMoreKey: 'powerIntervalTimer.learnMore',
      link: `/${locale}/power-interval-timer`,
      isComingSoon: false,
    },
    'bit-scope': {
      id: 'bit-scope',
      icon: <Binary className="w-16 h-16 text-cyan-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['bit-scope'],
      titleKey: 'bitScope.title',
      subtitleKey: 'bitScope.subtitle',
      descriptionKey: 'bitScope.description',
      featuresKey: 'bitScope.features',
      learnMoreKey: 'bitScope.learnMore',
      link: `/${locale}/bit-scope`,
      isComingSoon: false,
    },
    'track-ledger': {
      id: 'track-ledger',
      icon: <MapPinned className="w-16 h-16 text-cyan-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['track-ledger'],
      titleKey: 'trackLedger.title',
      subtitleKey: 'trackLedger.subtitle',
      descriptionKey: 'trackLedger.description',
      featuresKey: 'trackLedger.features',
      learnMoreKey: 'trackLedger.learnMore',
      link: `/${locale}/track-ledger`,
      isComingSoon: false,
    },
    'noise-meter-shusher': {
      id: 'noise-meter-shusher',
      icon: <Volume2 className="w-16 h-16 text-violet-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['noise-meter-shusher'],
      titleKey: 'noiseMeterShusher.title',
      subtitleKey: 'noiseMeterShusher.subtitle',
      descriptionKey: 'noiseMeterShusher.description',
      featuresKey: 'noiseMeterShusher.features',
      learnMoreKey: 'noiseMeterShusher.learnMore',
      link: `/${locale}/noise-meter-shusher`,
      isComingSoon: false,
    },
    'paratrooper-blitz': {
      id: 'paratrooper-blitz',
      icon: <Gamepad2 className="w-16 h-16 text-orange-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['paratrooper-blitz'],
      titleKey: 'paratrooperBlitz.title',
      subtitleKey: 'paratrooperBlitz.subtitle',
      descriptionKey: 'paratrooperBlitz.description',
      featuresKey: 'paratrooperBlitz.features',
      learnMoreKey: 'paratrooperBlitz.learnMore',
      link: `/${locale}/paratrooper-blitz`,
      isComingSoon: false,
    },
    'sudoku-puzzle': {
      id: 'sudoku-puzzle',
      icon: <Grid3X3 className="w-16 h-16 text-teal-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['sudoku-puzzle'],
      titleKey: 'sudokuPuzzle.title',
      subtitleKey: 'sudokuPuzzle.subtitle',
      descriptionKey: 'sudokuPuzzle.description',
      featuresKey: 'sudokuPuzzle.features',
      learnMoreKey: 'sudokuPuzzle.learnMore',
      link: `/${locale}/sudoku-puzzle`,
      isComingSoon: false,
    },
    'tempo-lab-pro': {
      id: 'tempo-lab-pro',
      icon: <Music className="w-16 h-16 text-violet-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['tempo-lab-pro'],
      titleKey: 'tempoLabPro.title',
      subtitleKey: 'tempoLabPro.subtitle',
      descriptionKey: 'tempoLabPro.description',
      featuresKey: 'tempoLabPro.features',
      learnMoreKey: 'tempoLabPro.learnMore',
      link: `/${locale}/tempo-lab-pro`,
      isComingSoon: false,
    },
    'football-trivia': {
      id: 'football-trivia',
      icon: <Trophy className="w-16 h-16 text-sky-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['football-trivia'],
      titleKey: 'footballTrivia.title',
      subtitleKey: 'footballTrivia.subtitle',
      descriptionKey: 'footballTrivia.description',
      featuresKey: 'footballTrivia.features',
      learnMoreKey: 'footballTrivia.learnMore',
      link: `/${locale}/football-trivia`,
      isComingSoon: false,
    },
    'fun-facts-trivia': {
      id: 'fun-facts-trivia',
      icon: <Lightbulb className="w-16 h-16 text-amber-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['fun-facts-trivia'],
      titleKey: 'funFactsTrivia.title',
      subtitleKey: 'funFactsTrivia.subtitle',
      descriptionKey: 'funFactsTrivia.description',
      featuresKey: 'funFactsTrivia.features',
      learnMoreKey: 'funFactsTrivia.learnMore',
      link: `/${locale}/fun-facts-trivia`,
      isComingSoon: false,
    },
    'zuli-collage': {
      id: 'zuli-collage',
      icon: <Layers className="w-16 h-16 text-pink-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP['zuli-collage'],
      titleKey: 'zuliCollage.title',
      subtitleKey: 'zuliCollage.subtitle',
      descriptionKey: 'zuliCollage.description',
      featuresKey: 'zuliCollage.features',
      learnMoreKey: 'zuliCollage.learnMore',
      link: `/${locale}/zuli-collage`,
      isComingSoon: false,
    },
    timesince: {
      id: 'timesince',
      icon: <CalendarClock className="w-16 h-16 text-orange-400" aria-hidden="true" />,
      iconImage: HOME_APP_ICON_WEBP.timesince,
      iconEdgeToEdge: true,
      titleKey: 'timeSince.title',
      subtitleKey: 'timeSince.subtitle',
      descriptionKey: 'timeSince.description',
      featuresKey: 'timeSince.features',
      learnMoreKey: 'timeSince.learnMore',
      link: `/${locale}/timesince`,
      isComingSoon: false,
    },
    }),
    [locale]
  );

  const apps: AppData[] = useMemo(
    () => HOME_APP_IDS.map((id) => appsById[id]),
    [appsById]
  );

  // On each full page load, show a random app first (client-side only, once per mount)
  useEffect(() => {
    if (hasRandomizedRef.current || apps.length === 0) return;
    if (!containerRef.current || !carouselRef.current) return;
    hasRandomizedRef.current = true;
    const randomIndex = Math.floor(Math.random() * apps.length);
    setCurrentIndex(randomIndex);
    const w = containerRef.current.clientWidth;
    carouselRef.current.scrollTo({ left: w * randomIndex, behavior: 'auto' });
  }, [apps.length]);

  const scrollToIndex = useCallback((index: number) => {
    if (!carouselRef.current || !containerRef.current) return;
    isScrollingRef.current = true;
    programmaticTargetRef.current = index;
    const width = containerRef.current.clientWidth;
    carouselRef.current.scrollTo({
      left: width * index,
      behavior: 'smooth',
    });
    setTimeout(() => {
      isScrollingRef.current = false;
      programmaticTargetRef.current = null;
    }, 600);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      scrollToIndex(index);
    },
    [scrollToIndex]
  );

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? apps.length - 1 : prevIndex - 1;
      scrollToIndex(newIndex);
      return newIndex;
    });
  }, [apps.length, scrollToIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === apps.length - 1 ? 0 : prevIndex + 1;
      scrollToIndex(newIndex);
      return newIndex;
    });
  }, [apps.length, scrollToIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const index = currentIndexRef.current;
      if (e.key === 'ArrowLeft') {
        const newIndex = index === 0 ? apps.length - 1 : index - 1;
        goToSlide(newIndex);
      }
      if (e.key === 'ArrowRight') {
        const newIndex = index === apps.length - 1 ? 0 : index + 1;
        goToSlide(newIndex);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [apps.length, goToSlide]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && carouselRef.current) {
        scrollToIndex(currentIndexRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scrollToIndex]);

  // Update current index on scroll
  useEffect(() => {
    const container = carouselRef.current;
    const containerWrapper = containerRef.current;
    if (!container || !containerWrapper) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const slideWidth = containerWrapper.clientWidth;
      const newIndex = Math.round(scrollLeft / slideWidth);

      if (isScrollingRef.current && programmaticTargetRef.current !== null) {
        if (newIndex === programmaticTargetRef.current) return;
        isScrollingRef.current = false;
        programmaticTargetRef.current = null;
      }

      if (newIndex >= 0 && newIndex < apps.length && newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [currentIndex, apps.length]);

  return (
    <div className="relative w-full mb-12 max-w-4xl mx-auto">
      {/* Carousel Container */}
      <div ref={containerRef} className="relative overflow-hidden rounded-2xl w-full">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {apps.map((app, index) => (
            <div
              key={app.id}
              data-slide
              className="flex-shrink-0 snap-center flex items-stretch"
              style={{ 
                width: '100%',
                minWidth: '100%',
                maxWidth: '100%'
              }}
            >
              <div className="bg-gradient-to-br from-indigo-950/95 to-violet-950/75 rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-indigo-400/35 hover:border-amber-400/40 hover:shadow-3xl transition-all duration-300 backdrop-blur-md bg-opacity-95 mx-4 w-full flex flex-col" style={{ minHeight: '600px' }}>
                <div className="flex items-center justify-center mb-6 min-h-24 md:min-h-32">
                  {app.iconImage ? (
                    <AppIconFrame
                      src={app.iconImage}
                      alt={t(app.titleKey)}
                      sizes="(max-width: 768px) 96px, 128px"
                      boxClassName="w-24 h-24 md:w-32 md:h-32"
                      frameClassName={
                        app.iconEdgeToEdge
                          ? 'rounded-[22%] overflow-hidden shadow-2xl'
                          : 'rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
                      }
                      edgeToEdge={app.iconEdgeToEdge}
                    />
                  ) : (
                    app.icon
                  )}
                </div>
                
                {app.isComingSoon && (
                  <div className="text-center mb-4">
                    <span className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-black animate-pulse">
                      {t('comingSoon')}
                    </span>
                  </div>
                )}

                <h2 className="text-3xl font-black mb-6 text-white text-center">{t(app.titleKey)}</h2>
                
                {/* Zuli Monsters Images (only for ZuList) */}
                {app.monsters && (
                  <div className="flex justify-center items-center gap-6 mb-6 flex-wrap min-h-32 md:min-h-40">
                    {app.monsters.map((monster, i) => (
                      <div
                        key={monster}
                        className="relative w-32 h-32 md:w-40 md:h-40 animate-bounce rounded-2xl overflow-hidden bg-slate-950/70 ring-1 ring-white/10 shadow-lg"
                        style={{
                          animationDuration: `${2 + i * 0.5}s`,
                          animationDelay: `${i * 0.5}s`,
                        }}
                      >
                        <Image
                          src={`/images/monsters/${monster}`}
                          alt="Zuli Monster"
                          fill
                          sizes="(max-width: 768px) 128px, 160px"
                          className="object-contain p-1 drop-shadow-lg"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Show subtitle and description for all apps */}
                <p className="text-xl text-gray-300 mb-4 text-center">
                  {t(app.subtitleKey)}
                </p>
                <p className="text-lg text-gray-400 mb-8 text-center">
                  {t(app.descriptionKey)}
                </p>
                
                {/* Features Grid */}
                {(() => {
                  const featureCells = getCarouselFeatureCells(app.id);
                  if (!featureCells?.length || app.isComingSoon) return null;
                  return (
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      {featureCells.map((cell, fi) => {
                        const CellIcon = cell.Icon;
                        return (
                          <div
                            key={`${app.id}-feat-${fi}`}
                            className={cell.cellClass}
                            role="article"
                            aria-label={t(cell.labelKey)}
                          >
                            <CellIcon className={cell.iconClassName} aria-hidden="true" />
                            <p className="text-sm font-black text-white">{t(cell.labelKey)}</p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                {app.link ? (
                  <div className="text-center">
                    <Link
                      href={app.link}
                      className="inline-block bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-black text-lg hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-indigo-950 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 active:scale-95 border-2 border-blue-400"
                      aria-label={`${t(app.learnMoreKey)} - ${t(app.titleKey)}`}
                    >
                      {t(app.learnMoreKey)}
                    </Link>
                  </div>
                ) : (
                  <div className="text-center">
                    <Link
                      href={app.link || `/${locale}/${app.id}`}
                      className="inline-block bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-black text-lg hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-indigo-950 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 active:scale-95 border-2 border-blue-400"
                      aria-label={`${t(app.learnMoreKey)} - ${t(app.titleKey)}`}
                    >
                      {t(app.learnMoreKey)}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-indigo-950/90 hover:bg-violet-950/80 border-2 border-indigo-400/45 hover:border-amber-400/50 rounded-full min-h-[44px] min-w-[44px] p-3 transition-all shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        aria-label="Previous app"
        type="button"
      >
        <ChevronLeft className="w-6 h-6 text-blue-400" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-indigo-950/90 hover:bg-violet-950/80 border-2 border-indigo-400/45 hover:border-amber-400/50 rounded-full min-h-[44px] min-w-[44px] p-3 transition-all shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        aria-label="Next app"
        type="button"
      >
        <ChevronRight className="w-6 h-6 text-blue-400" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center gap-3 mt-6">
        {apps.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="inline-flex h-6 w-6 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label={`Go to slide ${index + 1}`}
            type="button"
          >
            <span
              aria-hidden="true"
              className={`block h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-6 bg-blue-500' : 'w-2 bg-gray-400'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

