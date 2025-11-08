'use client';
/* eslint-disable react/no-unescaped-entities */

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  const t = useTranslations('zulist');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Content variables to avoid ESLint issues
  const infoCollectionContent = t('privacy.sections.infoCollection.content');
  const infoUseContent = t('privacy.sections.infoUse.content');
  const infoSharingContent = t('privacy.sections.infoSharing.content');
  const dataSecurityContent = t('privacy.sections.dataSecurity.content');
  const yourRightsContent = t('privacy.sections.yourRights.content');
  const contactUsContent = t('privacy.sections.contactUs.content');

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
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              {t('links.privacy')}
            </h1>
          </div>

          <p className="text-gray-600 mb-8">
            {t('privacy.lastUpdated')}: {currentDate}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('privacy.sections.infoCollection.title')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {infoCollectionContent}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('privacy.sections.infoUse.title')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {infoUseContent}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('privacy.sections.infoSharing.title')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {infoSharingContent}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('privacy.sections.dataSecurity.title')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {dataSecurityContent}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('privacy.sections.yourRights.title')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {yourRightsContent}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">{t('privacy.sections.contactUs.title')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {contactUsContent}{' '}
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

