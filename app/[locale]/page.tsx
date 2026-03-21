'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Sparkles, Code, Heart, Instagram, Facebook } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import AppsCarousel from '@/components/AppsCarousel';
import AppsGrid from '@/components/AppsGrid';
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
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [stars, setStars] = useState<Star[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Generate stars only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const generatedStars: Star[] = Array.from({ length: 48 }).map(() => ({
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
          { name: tCommon('home'), path: '/' }
        ]}
      />
    <div className="min-h-screen relative overflow-hidden">
        {/* Twilight sky + soft lights */}
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 twilight-sky-overlay" />
          {/* Early stars / city lights — warm + cool specks */}
          {isMounted && stars.map((star, i) => (
            <div
              key={i}
              className={`absolute rounded-full animate-pulse ${i % 3 === 0 ? 'bg-amber-100/90' : i % 3 === 1 ? 'bg-violet-200/80' : 'bg-sky-100/70'}`}
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

          {/* Apps Grid Section */}
          <AppsGrid />

          {/* Apps Carousel Section */}
          <AppsCarousel />

          {/* Story Section */}
          <div className="card-twilight text-left">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-8 h-8 text-blue-400" aria-hidden="true" />
              <h2 className="text-3xl font-black text-white">{t('story.title')}</h2>
            </div>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>{t('story.p1')}</p>
              <p>
                <Link
                  href={`/${locale}/dreambit-legacy`}
                  className="font-semibold text-amber-300 hover:text-amber-200 underline decoration-amber-400/60 underline-offset-4 transition-colors"
                >
                  {t('story.dreambitLegacyLink')}
                </Link>
              </p>
              <p>{t('story.p2')}</p>
              <p>{t('story.p3')}</p>
            </div>
          </div>

          {/* Zuli Monsters Section */}
          <div className="card-twilight">
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
          <div className="card-twilight !mb-0">
            <div className="flex items-center justify-center mb-6">
              <Mail className="w-12 h-12 text-blue-400" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-black mb-6 text-white">{t('contact.title')}</h2>
            <p className="text-lg text-gray-300 mb-6">
              {t('contact.description')}
            </p>
            <div className="flex justify-center mb-6">
              <a
                href="mailto:zuki.apps.dev@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg font-black hover:from-blue-400 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 active:scale-95 border-2 border-blue-400"
                aria-label={`${t('contact.sendEmail')} - zuki.apps.dev@gmail.com`}
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                {t('contact.sendEmail')}
              </a>
            </div>
            <div className="flex justify-center mb-6">
              <a
                href="https://buymeacoffee.com/sivzuk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:scale-105 active:scale-95 transition-transform duration-200"
                aria-label={t('contact.support')}
              >
                <Image
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt={t('contact.support')}
                  width={145}
                  height={40}
                  className="h-auto"
                  unoptimized
                />
              </a>
            </div>
            <p className="text-gray-400">
              {t('contact.email')}
            </p>
          </div>

          {/* Social Media Section */}
          <div className="card-twilight mt-12 !mb-0">
            <h2 className="text-3xl font-black mb-6 text-white text-center">{t('social.title')}</h2>
            <div className="flex justify-center gap-6 items-center">
              <a
                href="https://instagram.com/zuki.apps"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all hover:scale-110 shadow-lg hover:shadow-xl"
                aria-label={t('social.instagram')}
              >
                <Instagram className="w-7 h-7 text-white" />
              </a>
              <a
                href="https://facebook.com/zuki.apps"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all hover:scale-110 shadow-lg hover:shadow-xl"
                aria-label={t('social.facebook')}
              >
                <Facebook className="w-7 h-7 text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="twilight-footer-bar text-white py-8 px-4 mt-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 flex justify-center">
            <Logo size="md" />
          </div>
          <p className="text-gray-400 mb-2">{t('footer.copyright')}</p>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            {t('footer.tagline')}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            <Link
              href={`/${locale}/dreambit-legacy`}
              className="text-gray-400 hover:text-amber-300 transition-colors"
            >
              Legacy Dreambit apps (Android)
            </Link>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <Link
              href={`/${locale}/dsa-compliance`}
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              {locale === 'he' ? 'ציות DSA' : 'DSA Compliance'}
            </Link>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
