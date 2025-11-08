'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  const t = useTranslations('zulist');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const currentDate = new Date().toLocaleDateString(locale === 'he' ? 'he-IL' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/${locale}/zulist`}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          {tCommon('home')}
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary-100 p-3 rounded-full">
              <FileText className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              {t('links.terms')}
            </h1>
          </div>

          <p className="text-gray-600 mb-8">
            {t('terms.lastUpdated')}: {currentDate}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.sections.acceptance.title')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('terms.sections.acceptance.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.sections.useLicense.title')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('terms.sections.useLicense.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.sections.disclaimer.title')}</h2>
              <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('terms.sections.disclaimer.content') }} />
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.sections.limitations.title')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('terms.sections.limitations.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.sections.accuracy.title')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('terms.sections.accuracy.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.sections.links.title')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('terms.sections.links.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.sections.modifications.title')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('terms.sections.modifications.content')}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('terms.sections.contactInfo.title')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {t('terms.sections.contactInfo.content')}{' '}
                <a href={`mailto:${t('contact.legal')}`} className="text-primary-600 hover:underline">
                  {t('contact.legal')}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

