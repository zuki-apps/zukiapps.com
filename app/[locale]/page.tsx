'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingCart, Mail, Sparkles, Users, Wifi, Code, Heart } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-purple-50">
      {/* Language Switcher */}
      <div className="max-w-4xl mx-auto px-4 pt-4 flex justify-end">
        <LanguageSwitcher />
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              {t('subtitle')}
            </p>
            <p className="text-lg text-gray-600">
              {t('tagline')}
            </p>
          </div>

          {/* Story Section */}
          <div className="bg-blue-50 rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-left">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">{t('story.title')}</h2>
            </div>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>{t('story.p1')}</p>
              <p>{t('story.p2')}</p>
              <p>{t('story.p3')}</p>
            </div>
          </div>

          {/* Zuli Monsters Section */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">{t('zuliMonsters.title')}</h2>
            <p className="text-lg text-gray-700 mb-4">
              {t('zuliMonsters.description')}
            </p>
            <p className="text-gray-600 italic">
              {t('zuliMonsters.more')}
            </p>
          </div>

          {/* ZuList App Section */}
          <div className="bg-blue-50 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <div className="flex items-center justify-center mb-6">
              <ShoppingCart className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">{t('zulist.title')}</h2>
            <p className="text-xl text-gray-700 mb-4">
              {t('zulist.subtitle')}
            </p>
            <p className="text-lg text-gray-600 mb-8">
              {t('zulist.description')}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl">
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-sm font-semibold text-gray-700">{t('zulist.features.realtime')}</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-xl">
                <Wifi className="w-8 h-8 text-green-600 mb-2" />
                <p className="text-sm font-semibold text-gray-700">{t('zulist.features.offline')}</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-purple-50 rounded-xl">
                <Sparkles className="w-8 h-8 text-purple-600 mb-2" />
                <p className="text-sm font-semibold text-gray-700">{t('zulist.features.smart')}</p>
              </div>
            </div>

            <Link
              href={`/${locale}/zulist`}
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              {t('zulist.learnMore')}
            </Link>
          </div>

          {/* Contact Section */}
          <div className="bg-blue-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              <Mail className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">{t('contact.title')}</h2>
            <p className="text-lg text-gray-700 mb-6">
              {t('contact.description')}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="mailto:zuki.apps@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
                {t('contact.sendEmail')}
              </a>
            </div>
            <p className="mt-6 text-gray-600">
              {t('contact.email')}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-2">{t('footer.copyright')}</p>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            {t('footer.tagline')}
          </p>
        </div>
      </footer>
    </div>
  );
}
