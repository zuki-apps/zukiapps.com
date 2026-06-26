import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates } from '@/lib/hreflang';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'trackLedger.privacy' });

  return {
    title: `${t('title')} - Track Ledger | Zuki Apps`,
    description: t('metaDescription'),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: buildCanonical(locale, '/track-ledger/privacy'),
      languages: buildLanguageAlternates('/track-ledger/privacy'),
    },
  };
}

export default async function TrackLedgerPrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'trackLedger.privacy' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tApp = await getTranslations({ locale, namespace: 'trackLedger.hero' });

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tApp('title'), path: '/track-ledger' },
          { name: tCommon('privacyPolicy'), path: '/track-ledger/privacy' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-cyan-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-cyan-600">
              <h1 className="text-4xl font-bold text-cyan-600">{tApp('title')}</h1>
              <div className="flex gap-2">
                <Link
                  href={`/${locale}/track-ledger`}
                  className="px-4 py-2 border-2 border-cyan-600 bg-white text-cyan-600 rounded-lg hover:bg-cyan-600 hover:text-white transition-colors text-sm"
                >
                  {tCommon('back')}
                </Link>
              </div>
            </div>

            <div className={`${locale === 'he' || locale === 'ar' ? 'text-right' : 'text-left'}`}>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h1>
              <p className="text-gray-600 mb-8">{t('lastUpdated')}</p>

              <div className="space-y-6">
                <section>
                  <h3 className="text-2xl font-bold text-cyan-600 mb-4">{t('section1.title')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('section1.content')}</p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-cyan-600 mb-4">{t('section2.title')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('section2.content')}</p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-cyan-600 mb-4">{t('section3.title')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('section3.content')}</p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-cyan-600 mb-4">{t('section4.title')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('section4.content')}</p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-cyan-600 mb-4">{t('section5.title')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('section5.content')}</p>
                </section>

                <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-cyan-600 mt-8">
                  <h3 className="text-2xl font-bold text-cyan-600 mb-4">{t('section8.title')}</h3>
                  <p className="text-gray-700 mb-4">{t('section8.content')}</p>
                  <p className="text-gray-700 mb-2">
                    <strong>{tCommon('email')}:</strong>{' '}
                    <a href={`mailto:${t('section8.email')}`} className="text-cyan-600 hover:underline">
                      {t('section8.email')}
                    </a>
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>{tCommon('address')}:</strong> {t('section8.address')}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <Link href={`/${locale}/track-ledger/terms`} className="text-cyan-600 hover:underline">
                      {tCommon('termsOfService')}
                    </Link>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
