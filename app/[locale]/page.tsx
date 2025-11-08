'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ShoppingCart, Users, Wifi, Sparkles } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            {t('heroSubtitle')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href={`/${locale}/zulist`}
              className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              {tCommon('apps')}
            </Link>
            <Link
              href={`/${locale}/zulist`}
              className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-400 transition-colors border-2 border-white"
            >
              {tCommon('learnMore')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Apps Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('featuredApps')}
          </h2>
          
          <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {/* ZuList Card */}
            <Link href={`/${locale}/zulist`} className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-primary-500 to-primary-700 p-8 flex items-center justify-center">
                    <ShoppingCart className="w-24 h-24 text-white" />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-3xl font-bold mb-4 text-gray-900 group-hover:text-primary-600 transition-colors">
                      {t('zulistCard.title')}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg">
                      {t('zulistCard.description')}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-5 h-5 text-primary-600" />
                        <span>{t('zulistCard.featureRealtime')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Wifi className="w-5 h-5 text-primary-600" />
                        <span>{t('zulistCard.featureOffline')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Sparkles className="w-5 h-5 text-primary-600" />
                        <span>{t('zulistCard.featureSmart')}</span>
                      </div>
                    </div>
                    <span className="text-primary-600 font-semibold group-hover:underline">
                      {tCommon('learnMore')} →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

