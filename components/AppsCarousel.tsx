'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingCart, ImageIcon, Camera, ChevronLeft, ChevronRight, Users, Wifi, Sparkles } from 'lucide-react';

interface AppData {
  id: string;
  icon: React.ReactNode;
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
  const [isMounted, setIsMounted] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const apps: AppData[] = [
    {
      id: 'zulist',
      icon: <ShoppingCart className="w-16 h-16 text-blue-400" aria-hidden="true" />,
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
      titleKey: 'hushGallery.title',
      subtitleKey: 'hushGallery.subtitle',
      descriptionKey: 'hushGallery.description',
      featuresKey: 'hushGallery.features',
      learnMoreKey: 'hushGallery.learnMore',
      link: `/${locale}/hush-gallery`,
      isComingSoon: true,
    },
    {
      id: 'whistle-camera',
      icon: <Camera className="w-16 h-16 text-green-400" aria-hidden="true" />,
      titleKey: 'whistleCamera.title',
      subtitleKey: 'whistleCamera.subtitle',
      descriptionKey: 'whistleCamera.description',
      featuresKey: 'whistleCamera.features',
      learnMoreKey: 'whistleCamera.learnMore',
      link: `/${locale}/whistle-camera`,
      isComingSoon: true,
    },
  ];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (carouselRef.current && containerRef.current) {
      const container = carouselRef.current;
      const width = containerRef.current.clientWidth;
      container.scrollTo({
        left: width * index,
        behavior: 'smooth',
      });
    }
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? apps.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === apps.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Update current index on scroll
  useEffect(() => {
    if (!carouselRef.current) return;

    const handleScroll = () => {
      const container = carouselRef.current;
      if (!container) return;

      const scrollLeft = container.scrollLeft;
      const slideWidth = container.clientWidth;
      const newIndex = Math.round(scrollLeft / slideWidth);
      setCurrentIndex(newIndex);
    };

    carouselRef.current.addEventListener('scroll', handleScroll);
    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

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
              className="flex-shrink-0 snap-center flex items-stretch"
              style={{ 
                width: '100%',
                minWidth: '100%',
                maxWidth: '100%'
              }}
            >
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-blue-600/30 hover:border-blue-500/50 hover:shadow-3xl transition-all duration-300 backdrop-blur-sm bg-opacity-90 mx-4 w-full flex flex-col" style={{ minHeight: '600px' }}>
                <div className="flex items-center justify-center mb-6">
                  {app.icon}
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
                
                {/* Show subtitle and description only for ZuList */}
                {!app.isComingSoon ? (
                  <>
                    <p className="text-xl text-gray-300 mb-4 text-center">
                      {t(app.subtitleKey)}
                    </p>
                    <p className="text-lg text-gray-400 mb-8 text-center">
                      {t(app.descriptionKey)}
                    </p>
                    
                    {/* Features Grid (only for ZuList) */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="flex flex-col items-center p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-blue-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-blue-500/50 transition-all duration-300" role="article" aria-label={t('zulist.features.realtime')}>
                        <Users className="w-8 h-8 text-blue-400 mb-2" aria-hidden="true" />
                        <p className="text-sm font-black text-white">{t('zulist.features.realtime')}</p>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-blue-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-blue-500/50 transition-all duration-300" role="article" aria-label={t('zulist.features.offline')}>
                        <Wifi className="w-8 h-8 text-blue-400 mb-2" aria-hidden="true" />
                        <p className="text-sm font-black text-white">{t('zulist.features.offline')}</p>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border-2 border-blue-600/30 shadow-lg hover:shadow-xl hover:scale-105 hover:border-blue-500/50 transition-all duration-300" role="article" aria-label={t('zulist.features.smart')}>
                        <Sparkles className="w-8 h-8 text-blue-400 mb-2" aria-hidden="true" />
                        <p className="text-sm font-black text-white">{t('zulist.features.smart')}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  // Spacer for Coming Soon apps to match height
                  <div className="flex-grow"></div>
                )}

                {app.link ? (
                  <div className="text-center">
                    <Link
                      href={app.link}
                      className="inline-block bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-black text-lg hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 active:scale-95 border-2 border-blue-400"
                      aria-label={`${t(app.learnMoreKey)} - ${t(app.titleKey)}`}
                    >
                      {t(app.learnMoreKey)}
                    </Link>
                  </div>
                ) : (
                  <div className="text-center">
                    <Link
                      href={app.id === 'hush-gallery' ? `/${locale}/hush-gallery` : `/${locale}/whistle-camera`}
                      className="inline-block bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-black text-lg hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 active:scale-95 border-2 border-blue-400"
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
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-gray-900/80 hover:bg-gray-800 border-2 border-blue-600/50 hover:border-blue-500 rounded-full p-3 transition-all shadow-lg hover:shadow-xl"
        aria-label="Previous app"
        type="button"
      >
        <ChevronLeft className="w-6 h-6 text-blue-400" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-gray-900/80 hover:bg-gray-800 border-2 border-blue-600/50 hover:border-blue-500 rounded-full p-3 transition-all shadow-lg hover:shadow-xl"
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

