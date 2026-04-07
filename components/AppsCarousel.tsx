'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingCart, ImageIcon, Camera, Timer, ChevronLeft, ChevronRight, Users, Wifi, Sparkles, Shield, Lock, FolderTree, Grid3X3, Binary, Music, Trophy, Wand2, Palette } from 'lucide-react';

interface AppData {
  id: string;
  icon: React.ReactNode;
  iconImage?: string;
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  featuresKey: string;
  learnMoreKey: string;
  link?: string;
  isComingSoon: boolean;
  monsters?: string[];
  showFeatures?: boolean;
}

export default function AppsCarousel() {
  const t = useTranslations('home');
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const isScrollingRef = useRef(false);
  const hasRandomizedRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Initialize slide width on mount
    if (containerRef.current) {
      setSlideWidth(containerRef.current.clientWidth);
    }
  }, []);

  // Define apps array - using useMemo to ensure it's stable
  const apps: AppData[] = useMemo(() => [
    {
      id: 'zulist',
      icon: <ShoppingCart className="w-16 h-16 text-blue-400" aria-hidden="true" />,
      iconImage: '/images/zulist-icon.png',
      titleKey: 'zulist.title',
      subtitleKey: 'zulist.subtitle',
      descriptionKey: 'zulist.description',
      featuresKey: 'zulist.features',
      learnMoreKey: 'zulist.learnMore',
      link: `/${locale}/zulist`,
      isComingSoon: false,
      monsters: ['zuli-04.png', 'zuli-15.png'],
    },
    {
      id: 'hush-gallery',
      icon: <ImageIcon className="w-16 h-16 text-purple-400" aria-hidden="true" />,
      iconImage: '/images/hush-gallery-icon.png',
      titleKey: 'hushGallery.title',
      subtitleKey: 'hushGallery.subtitle',
      descriptionKey: 'hushGallery.description',
      featuresKey: 'hushGallery.features',
      learnMoreKey: 'hushGallery.learnMore',
      link: `/${locale}/hush-gallery`,
      isComingSoon: false,
      showFeatures: true,
    },
    {
      id: 'whistle-camera',
      icon: <Camera className="w-16 h-16 text-amber-400" aria-hidden="true" />,
      iconImage: '/images/whistle-camera-icon.png',
      titleKey: 'whistleCamera.title',
      subtitleKey: 'whistleCamera.subtitle',
      descriptionKey: 'whistleCamera.description',
      featuresKey: 'whistleCamera.features',
      learnMoreKey: 'whistleCamera.learnMore',
      link: `/${locale}/whistle-camera`,
      isComingSoon: false,
      showFeatures: true,
    },
    {
      id: 'power-interval-timer',
      icon: <Timer className="w-16 h-16 text-orange-400" aria-hidden="true" />,
      iconImage: '/images/power-interval-timer-icon.png',
      titleKey: 'powerIntervalTimer.title',
      subtitleKey: 'powerIntervalTimer.subtitle',
      descriptionKey: 'powerIntervalTimer.description',
      featuresKey: 'powerIntervalTimer.features',
      learnMoreKey: 'powerIntervalTimer.learnMore',
      link: `/${locale}/power-interval-timer`,
      isComingSoon: false,
      showFeatures: true,
    },
    {
      id: 'bit-scope',
      icon: <Binary className="w-16 h-16 text-cyan-400" aria-hidden="true" />,
      iconImage: '/images/bit-scope-icon.png',
      titleKey: 'bitScope.title',
      subtitleKey: 'bitScope.subtitle',
      descriptionKey: 'bitScope.description',
      featuresKey: 'bitScope.features',
      learnMoreKey: 'bitScope.learnMore',
      link: `/${locale}/bit-scope`,
      isComingSoon: false,
      showFeatures: true,
    },
    {
      id: 'sudoku-puzzle',
      icon: <Grid3X3 className="w-16 h-16 text-teal-400" aria-hidden="true" />,
      iconImage: '/images/sudoku-puzzle-icon.png',
      titleKey: 'sudokuPuzzle.title',
      subtitleKey: 'sudokuPuzzle.subtitle',
      descriptionKey: 'sudokuPuzzle.description',
      featuresKey: 'sudokuPuzzle.features',
      learnMoreKey: 'sudokuPuzzle.learnMore',
      link: `/${locale}/sudoku-puzzle`,
      isComingSoon: false,
      showFeatures: true,
    },
    {
      id: 'tempoLabPro',
      icon: <Music className="w-16 h-16 text-violet-400" aria-hidden="true" />,
      iconImage: '/images/tempo-lab-pro-icon.png',
      titleKey: 'tempoLabPro.title',
      subtitleKey: 'tempoLabPro.subtitle',
      descriptionKey: 'tempoLabPro.description',
      featuresKey: 'tempoLabPro.features',
      learnMoreKey: 'tempoLabPro.learnMore',
      link: `/${locale}/tempoLabPro`,
      isComingSoon: false,
      showFeatures: true,
    },
    {
      id: 'football-trivia',
      icon: <Trophy className="w-16 h-16 text-sky-400" aria-hidden="true" />,
      iconImage: '/images/football-trivia-icon.png',
      titleKey: 'footballTrivia.title',
      subtitleKey: 'footballTrivia.subtitle',
      descriptionKey: 'footballTrivia.description',
      featuresKey: 'footballTrivia.features',
      learnMoreKey: 'footballTrivia.learnMore',
      link: `/${locale}/football-trivia`,
      isComingSoon: false,
      showFeatures: true,
    },
  ], [locale]);

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

  const goToSlide = useCallback((index: number) => {
    if (carouselRef.current && containerRef.current) {
      isScrollingRef.current = true;
      const container = carouselRef.current;
      // Use the container's clientWidth which matches the visible area
      const width = containerRef.current.clientWidth;
      setCurrentIndex(index);
      container.scrollTo({
        left: width * index,
        behavior: 'smooth',
      });
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    }
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? apps.length - 1 : prevIndex - 1;
      goToSlide(newIndex);
      return newIndex;
    });
  }, [apps.length, goToSlide]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === apps.length - 1 ? 0 : prevIndex + 1;
      goToSlide(newIndex);
      return newIndex;
    });
  }, [apps.length, goToSlide]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const newIndex = currentIndex === 0 ? apps.length - 1 : currentIndex - 1;
        goToSlide(newIndex);
      }
      if (e.key === 'ArrowRight') {
        const newIndex = currentIndex === apps.length - 1 ? 0 : currentIndex + 1;
        goToSlide(newIndex);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, apps.length, goToSlide]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setSlideWidth(containerRef.current.clientWidth);
        // Re-center current slide after resize
        if (carouselRef.current) {
          goToSlide(currentIndex);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, goToSlide]);

  // Update current index on scroll
  useEffect(() => {
    const container = carouselRef.current;
    const containerWrapper = containerRef.current;
    if (!container || !containerWrapper) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;
      
      const scrollLeft = container.scrollLeft;
      // Use the wrapper's clientWidth to match the visible area
      const slideWidth = containerWrapper.clientWidth;
      const newIndex = Math.round(scrollLeft / slideWidth);
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
                <div className="flex items-center justify-center mb-6">
                  {app.iconImage && isMounted ? (
                    <div className="relative w-24 h-24 md:w-32 md:h-32">
                      <Image
                        src={app.iconImage}
                        alt={t(app.titleKey)}
                        fill
                        sizes="(max-width: 768px) 96px, 128px"
                        className="object-contain drop-shadow-lg"
                        priority={index === 0}
                      />
                    </div>
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
                {app.monsters && isMounted && (
                  <div className="flex justify-center items-center gap-6 mb-6 flex-wrap">
                    {app.monsters.map((monster, i) => (
                      <div
                        key={monster}
                        className="relative w-32 h-32 md:w-40 md:h-40 animate-bounce"
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
                          className="object-contain drop-shadow-lg"
                          priority={index === 0}
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
                {app.showFeatures && app.id === 'hush-gallery' && (
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-purple-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-purple-500/50 transition-all duration-300" role="article" aria-label={t('hushGallery.features.privacy')}>
                      <Shield className="w-8 h-8 text-purple-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('hushGallery.features.privacy')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-purple-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-purple-500/50 transition-all duration-300" role="article" aria-label={t('hushGallery.features.secure')}>
                      <Lock className="w-8 h-8 text-purple-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('hushGallery.features.secure')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-purple-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-purple-500/50 transition-all duration-300" role="article" aria-label={t('hushGallery.features.organized')}>
                      <FolderTree className="w-8 h-8 text-purple-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('hushGallery.features.organized')}</p>
                    </div>
                  </div>
                )}
                {app.showFeatures && app.id === 'whistle-camera' && (
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-amber-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-amber-500/50 transition-all duration-300" role="article" aria-label={t('whistleCamera.features.smart')}>
                      <Sparkles className="w-8 h-8 text-amber-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('whistleCamera.features.smart')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-amber-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-amber-500/50 transition-all duration-300" role="article" aria-label={t('whistleCamera.features.editing')}>
                      <Wand2 className="w-8 h-8 text-amber-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('whistleCamera.features.editing')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-amber-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-amber-500/50 transition-all duration-300" role="article" aria-label={t('whistleCamera.features.filters')}>
                      <Palette className="w-8 h-8 text-amber-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('whistleCamera.features.filters')}</p>
                    </div>
                  </div>
                )}
                {app.showFeatures && app.id === 'power-interval-timer' && (
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-orange-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-orange-500/50 transition-all duration-300" role="article" aria-label={t('powerIntervalTimer.features.configurable')}>
                      <Timer className="w-8 h-8 text-orange-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('powerIntervalTimer.features.configurable')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-orange-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-orange-500/50 transition-all duration-300" role="article" aria-label={t('powerIntervalTimer.features.display')}>
                      <Timer className="w-8 h-8 text-orange-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('powerIntervalTimer.features.display')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-orange-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-orange-500/50 transition-all duration-300" role="article" aria-label={t('powerIntervalTimer.features.offline')}>
                      <Timer className="w-8 h-8 text-orange-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('powerIntervalTimer.features.offline')}</p>
                    </div>
                  </div>
                )}
                {app.showFeatures && app.id === 'bit-scope' && (
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-cyan-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-cyan-500/50 transition-all duration-300" role="article" aria-label={t('bitScope.features.bitEditor')}>
                      <Binary className="w-8 h-8 text-cyan-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('bitScope.features.bitEditor')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-cyan-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-cyan-500/50 transition-all duration-300" role="article" aria-label={t('bitScope.features.formats')}>
                      <Binary className="w-8 h-8 text-cyan-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('bitScope.features.formats')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-cyan-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-cyan-500/50 transition-all duration-300" role="article" aria-label={t('bitScope.features.bases')}>
                      <Binary className="w-8 h-8 text-cyan-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('bitScope.features.bases')}</p>
                    </div>
                  </div>
                )}
                {app.showFeatures && app.id === 'sudoku-puzzle' && (
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-teal-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-teal-500/50 transition-all duration-300" role="article" aria-label={t('sudokuPuzzle.features.difficulty')}>
                      <Grid3X3 className="w-8 h-8 text-teal-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('sudokuPuzzle.features.difficulty')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-teal-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-teal-500/50 transition-all duration-300" role="article" aria-label={t('sudokuPuzzle.features.gameplay')}>
                      <Grid3X3 className="w-8 h-8 text-teal-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('sudokuPuzzle.features.gameplay')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-teal-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-teal-500/50 transition-all duration-300" role="article" aria-label={t('sudokuPuzzle.features.offline')}>
                      <Grid3X3 className="w-8 h-8 text-teal-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('sudokuPuzzle.features.offline')}</p>
                    </div>
                  </div>
                )}
                {app.showFeatures && app.id === 'tempoLabPro' && (
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-violet-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-violet-500/50 transition-all duration-300" role="article" aria-label={t('tempoLabPro.features.tempoPitch')}>
                      <Music className="w-8 h-8 text-violet-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('tempoLabPro.features.tempoPitch')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-violet-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-violet-500/50 transition-all duration-300" role="article" aria-label={t('tempoLabPro.features.tapTempo')}>
                      <Music className="w-8 h-8 text-violet-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('tempoLabPro.features.tapTempo')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-violet-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-violet-500/50 transition-all duration-300" role="article" aria-label={t('tempoLabPro.features.export')}>
                      <Music className="w-8 h-8 text-violet-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('tempoLabPro.features.export')}</p>
                    </div>
                  </div>
                )}
                {app.showFeatures && app.id === 'football-trivia' && (
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-blue-600/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-sky-500/45 transition-all duration-300" role="article" aria-label={t('footballTrivia.features.categories')}>
                      <Trophy className="w-8 h-8 text-sky-300 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('footballTrivia.features.categories')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-slate-500/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-slate-400/50 transition-all duration-300" role="article" aria-label={t('footballTrivia.features.difficulty')}>
                      <Trophy className="w-8 h-8 text-slate-200 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('footballTrivia.features.difficulty')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-blue-600/35 shadow-lg hover:shadow-xl hover:scale-105 hover:border-sky-500/45 transition-all duration-300" role="article" aria-label={t('footballTrivia.features.stats')}>
                      <Trophy className="w-8 h-8 text-sky-300 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('footballTrivia.features.stats')}</p>
                    </div>
                  </div>
                )}
                
                {!app.showFeatures && !app.isComingSoon && (
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-blue-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-blue-500/50 transition-all duration-300" role="article" aria-label={t('zulist.features.realtime')}>
                      <Users className="w-8 h-8 text-blue-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('zulist.features.realtime')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-blue-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-blue-500/50 transition-all duration-300" role="article" aria-label={t('zulist.features.offline')}>
                      <Wifi className="w-8 h-8 text-blue-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('zulist.features.offline')}</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-950/65 to-slate-950/85 rounded-xl border-2 border-blue-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-blue-500/50 transition-all duration-300" role="article" aria-label={t('zulist.features.smart')}>
                      <Sparkles className="w-8 h-8 text-blue-400 mb-2" aria-hidden="true" />
                      <p className="text-sm font-black text-white">{t('zulist.features.smart')}</p>
                    </div>
                  </div>
                )}

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
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-indigo-950/90 hover:bg-violet-950/80 border-2 border-indigo-400/45 hover:border-amber-400/50 rounded-full p-3 transition-all shadow-lg hover:shadow-xl"
        aria-label="Previous app"
        type="button"
      >
        <ChevronLeft className="w-6 h-6 text-blue-400" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-indigo-950/90 hover:bg-violet-950/80 border-2 border-indigo-400/45 hover:border-amber-400/50 rounded-full p-3 transition-all shadow-lg hover:shadow-xl"
        aria-label="Next app"
        type="button"
      >
        <ChevronRight className="w-6 h-6 text-blue-400" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {apps.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-blue-500'
                : 'w-3 bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

