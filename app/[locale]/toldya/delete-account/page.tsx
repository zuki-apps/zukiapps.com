'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import { AlertTriangle } from 'lucide-react';

export default function ToldyaDeleteAccountPage() {
  const t = useTranslations('toldya.deleteAccount');
  const tCommon = useTranslations('common');
  const tApp = useTranslations('toldya.hero');
  const locale = useLocale();
  const rtl = locale === 'he' || locale === 'ar';
  const supportEmail = 'zuki.apps.dev@gmail.com';

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tApp('title'), path: '/toldya' },
          { name: t('title'), path: '/toldya/delete-account' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-emerald-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-emerald-600">
              <h1 className="text-4xl font-bold text-emerald-700">{tApp('title')}</h1>
              <Link
                href={`/${locale}/toldya`}
                className="px-4 py-2 border-2 border-emerald-600 bg-white text-emerald-700 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors text-sm"
              >
                {tCommon('back')}
              </Link>
            </div>

            <div className={rtl ? 'text-right' : 'text-left'}>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h1>
              <p className="text-gray-700 mb-8 leading-relaxed">{t('intro')}</p>

              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8">
                <div className={`flex items-start gap-3 ${rtl ? 'flex-row-reverse' : ''}`}>
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" aria-hidden />
                  <div>
                    <strong className="text-yellow-800 block mb-2">{t('warning.title')}</strong>
                    <p className="text-yellow-800">{t('warning.content')}</p>
                  </div>
                </div>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-emerald-600 mb-4">{t('steps.title')}</h2>
                <ol className={`space-y-4 list-decimal ${rtl ? 'mr-6' : 'ml-6'}`}>
                  {(['step1', 'step2', 'step3', 'step4', 'step5'] as const).map((key) => (
                    <li key={key} className="text-gray-700">
                      {t(`steps.${key}`)}
                    </li>
                  ))}
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-emerald-600 mb-4">{t('stepsEmail.title')}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('stepsEmail.content')}{' '}
                  <a href={`mailto:${supportEmail}`} className="text-emerald-600 hover:underline">
                    {supportEmail}
                  </a>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-emerald-600 mb-4">{t('data.title')}</h2>
                <p className="text-gray-700 mb-4">{t('data.intro')}</p>
                <ul className={`space-y-2 list-disc ${rtl ? 'mr-6' : 'ml-6'}`}>
                  {(['item1', 'item2', 'item3', 'item4', 'item5'] as const).map((key) => (
                    <li key={key} className="text-gray-700">
                      {t(`data.${key}`)}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-emerald-600 mb-4">{t('retention.title')}</h2>
                <p className="text-gray-700 leading-relaxed">{t('retention.content')}</p>
              </section>

              <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-emerald-600">
                <h2 className="text-2xl font-bold text-emerald-600 mb-4">{t('contact.title')}</h2>
                <p className="text-gray-700 mb-4">{t('contact.content')}</p>
                <p className="text-gray-700 mb-4">
                  <a href={`mailto:${supportEmail}`} className="text-emerald-600 hover:underline">
                    {supportEmail}
                  </a>
                </p>
                <p className="text-sm flex flex-wrap gap-x-4 gap-y-2">
                  <Link href={`/${locale}/toldya/privacy`} className="text-emerald-600 hover:underline">
                    {t('contact.privacyLink')}
                  </Link>
                  <Link href={`/${locale}/toldya/terms`} className="text-emerald-600 hover:underline">
                    {t('contact.termsLink')}
                  </Link>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
