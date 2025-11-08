'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function PrivacyPolicyPage() {
  const t = useTranslations('zulist.privacy');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Language Switcher */}
        <div className="mb-6">
          <LanguageSwitcher />
        </div>

        <div className="bg-blue-50 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-blue-600">
            <h1 className="text-4xl font-bold text-blue-600">ZuList</h1>
            <div className="flex gap-2">
              <Link
                href={`/${locale}/zulist`}
                className="px-4 py-2 border-2 border-blue-600 bg-white text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm"
              >
                {locale === 'he' ? 'חזרה' : 'Back'}
              </Link>
            </div>
          </div>

          <div className={`${locale === 'he' ? 'text-right' : 'text-left'}`}>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-gray-600 mb-8">
              {t('lastUpdated')}
            </p>

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section1.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section1.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section2.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section2.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section3.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section3.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section4.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section4.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section5.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section5.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section6.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section6.content')}
                </p>
              </section>

              <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-blue-600 mt-8">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section7.title')}
                </h2>
                <p className="text-gray-700 mb-4">
                  {t('section7.content')}
                </p>
                <p>
                  <a
                    href="mailto:zuki.apps.dev@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    zuki.apps.dev@gmail.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

