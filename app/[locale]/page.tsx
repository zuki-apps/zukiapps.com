'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Sparkles, Code, Heart } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import AppsCarousel from '@/components/AppsCarousel';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';

interface Star {
  left: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
  animationDelay: number;
  animationDuration: number;
}

export default function Home() {
  const t = useTranslations('home');
  const locale = useLocale();
  const [stars, setStars] = useState<Star[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Generate stars only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const generatedStars: Star[] = Array.from({ length: 100 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      animationDelay: Math.random() * 3,
      animationDuration: Math.random() * 2 + 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: 'Home', path: '/' }
        ]}
      />
    <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Starry background effect */}
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
          {/* Stars - only render on client to avoid hydration mismatch */}
          {isMounted && stars.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.width}px`,
                height: `${star.height}px`,
                opacity: star.opacity,
                animationDelay: `${star.animationDelay}s`,
                animationDuration: `${star.animationDuration}s`,
              }}
            />
          ))}
        </div>

      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>


      {/* Language Switcher */}
      <div className="max-w-4xl mx-auto px-4 pt-4 flex justify-end relative z-[9999]">
        <LanguageSwitcher />
      </div>

      {/* Hero Section */}
      <section id="main-content" className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center animate-fade-in">
            <Logo size="xl" />
          </div>
          
          <div className="mb-8 animate-fade-in-delay">
            <h1 className="text-3xl md:text-4xl font-black mb-4 text-white">
              {t('subtitle')}
            </h1>
            <p className="text-lg md:text-xl font-semibold text-gray-300">
              {t('tagline')}
            </p>
          </div>

          {/* Apps Carousel Section */}
          <AppsCarousel />

          {/* Story Section */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 mb-12 text-left border-2 border-blue-600/30 hover:border-blue-500/50 hover:shadow-3xl transition-all duration-300 backdrop-blur-sm bg-opacity-90">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-8 h-8 text-blue-400" aria-hidden="true" />
              <h2 className="text-3xl font-black text-white">{t('story.title')}</h2>
            </div>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>{t('story.p1')}</p>
              <p>{t('story.p2')}</p>
              <p>{t('story.p3')}</p>
            </div>
          </div>

          {/* Zuli Monsters Section */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 mb-12 border-2 border-blue-600/30 hover:border-blue-500/50 hover:shadow-3xl transition-all duration-300 backdrop-blur-sm bg-opacity-90">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-blue-400" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-black mb-4 text-white">{t('zuliMonsters.title')}</h2>
            <p className="text-lg text-gray-300 mb-4">
              {t('zuliMonsters.description')}
            </p>
            <p className="text-gray-400 italic">
              {t('zuliMonsters.more')}
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-blue-600/30 hover:border-blue-500/50 hover:shadow-3xl transition-all duration-300 backdrop-blur-sm bg-opacity-90">
            <div className="flex items-center justify-center mb-6">
              <Mail className="w-12 h-12 text-blue-400" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-black mb-6 text-white">{t('contact.title')}</h2>
            <p className="text-lg text-gray-300 mb-6">
              {t('contact.description')}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="mailto:zuki.apps.dev@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg font-black hover:from-blue-400 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 active:scale-95 border-2 border-blue-400"
                aria-label={`${t('contact.sendEmail')} - zuki.apps.dev@gmail.com`}
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                {t('contact.sendEmail')}
              </a>
            </div>
            <p className="mt-6 text-gray-400">
              {t('contact.email')}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-black to-gray-900 text-white py-8 px-4 mt-12 relative z-10 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 flex justify-center">
            <Logo size="md" />
          </div>
          <p className="text-gray-400 mb-2">{t('footer.copyright')}</p>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            {t('footer.tagline')}
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}
