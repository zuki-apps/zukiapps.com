'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { AlertTriangle } from 'lucide-react';

export default function DeleteAccountPage() {
  const t = useTranslations('zulist.deleteAccount');
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
            <Link
              href={`/${locale}/zulist`}
              className="px-4 py-2 border-2 border-blue-600 bg-white text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm"
            >
              {locale === 'he' ? 'חזרה' : 'Back'}
            </Link>
          </div>

          <div className={`${locale === 'he' ? 'text-right' : 'text-left'}`}>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h1>

            <p className="text-gray-700 mb-8 leading-relaxed">
              {t('intro')}
            </p>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-yellow-800 block mb-2">{t('warning.title')}</strong>
                  <p className="text-yellow-800">{t('warning.content')}</p>
                </div>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                {t('steps.title')}
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <ol className={`space-y-4 ${locale === 'he' ? 'list-decimal list-inside' : 'list-decimal list-inside'}`}>
                  <li className="text-gray-700">{t('steps.step1')}</li>
                  <li className="text-gray-700">{t('steps.step2')}</li>
                  <li className="text-gray-700">{t('steps.step3')}</li>
                  <li className="text-gray-700">{t('steps.step4')}</li>
                  <li className="text-gray-700">{t('steps.step5')}</li>
                  <li className="text-gray-700">{t('steps.step6')}</li>
                </ol>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                {t('data.title')}
              </h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">{t('data.intro')}</p>
                <ul className={`space-y-2 ${locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
                  <li className="text-gray-700">{t('data.item1')}</li>
                  <li className="text-gray-700">{t('data.item2')}</li>
                  <li className="text-gray-700">{t('data.item3')}</li>
                  <li className="text-gray-700">{t('data.item4')}</li>
                  <li className="text-gray-700">{t('data.item5')}</li>
                  <li className="text-gray-700">{t('data.item6')}</li>
                  <li className="text-gray-700">{t('data.item7')}</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                {t('sharedLists.title')}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">{t('sharedLists.owner.title')}</p>
                  <ul className={`space-y-2 text-gray-700 ${locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
                    <li>{t('sharedLists.owner.item1')}</li>
                    <li>{t('sharedLists.owner.item2')}</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">{t('sharedLists.member.title')}</p>
                  <ul className={`space-y-2 text-gray-700 ${locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
                    <li>{t('sharedLists.member.item1')}</li>
                    <li>{t('sharedLists.member.item2')}</li>
                    <li>{t('sharedLists.member.item3')}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                {t('partialDelete.title')}
              </h2>
              <p className="text-gray-700 mb-4">{t('partialDelete.intro')}</p>
              <ul className={`space-y-2 text-gray-700 ${locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
                <li>{t('partialDelete.item1')}</li>
                <li>{t('partialDelete.item2')}</li>
                <li>{t('partialDelete.item3')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                {t('retention.title')}
              </h2>
              <p className="text-gray-700">{t('retention.content')}</p>
            </section>

            <section className="bg-gray-100 p-6 rounded-lg border-t border-gray-300 mt-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-gray-700 mb-4">{t('contact.content')}</p>
              <p className="text-gray-700 mb-2">
                📧 {t('contact.email')}: <a href="mailto:zuki.apps.dev@gmail.com" className="text-blue-600 hover:underline">zuki.apps.dev@gmail.com</a>
              </p>
              <p className="text-gray-700">
                🌐 {t('contact.privacy')}: <Link href={`/${locale}/zulist/privacy`} className="text-blue-600 hover:underline">{t('contact.privacyLink')}</Link>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

