import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates, getSiteUrl } from '@/lib/hreflang';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import type { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'powerIntervalTimer.privacy' });

  return {
    title: `${t('title')} — Power Interval Timer | Zuki Apps`,
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
      canonical: buildCanonical(locale, '/power-interval-timer/privacy'),
      languages: buildLanguageAlternates('/power-interval-timer/privacy')
    },
  };
}

export default async function PowerIntervalTimerPrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'powerIntervalTimer.privacy' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tApp = await getTranslations({ locale, namespace: 'powerIntervalTimer.hero' });

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tApp('title'), path: '/power-interval-timer' },
          { name: tCommon('privacyPolicy'), path: '/power-interval-timer/privacy' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-orange-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-orange-600">
              <h1 className="text-4xl font-bold text-orange-600">Power Interval Timer</h1>
              <div className="flex gap-2">
                <Link
                  href={`/${locale}/power-interval-timer`}
                  className="px-4 py-2 border-2 border-orange-600 bg-white text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-colors text-sm"
                >
                  {tCommon('back')}
                </Link>
              </div>
            </div>

            <div className={`${locale === 'he' || locale === 'ar' ? 'text-right' : 'text-left'}`}>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {t('title')}
              </h1>
              <p className="text-gray-600 mb-8">
                {t('lastUpdated')}
              </p>

              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-bold text-orange-600 mb-4">
                    {t('section1.title')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t('section1.content')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-orange-600 mb-4">
                    {t('section2.title')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t('section2.content')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-orange-600 mb-4">
                    {t('section3.title')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t('section3.content')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-orange-600 mb-4">
                    {t('section4.title')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t('section4.content')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-orange-600 mb-4">
                    {t('section5.title')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t('section5.content')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-orange-600 mb-4">
                    {t('section6.title')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t('section6.content')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-orange-600 mb-4">
                    {t('section7.title')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t('section7.content')}
                  </p>
                  <p className="text-gray-700 font-semibold mb-2">
                    {t('section7.dataCollected')}
                  </p>
                  <ul className={`list-disc ${locale === 'he' || locale === 'ar' ? 'mr-6' : 'ml-6'} mb-4 space-y-2`}>
                    {t.raw('section7.dataCollectedItems').map((item: string, i: number) => (
                      <li key={i} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                  <p className="text-gray-700 font-semibold mb-2">
                    {t('section7.purpose')}
                  </p>
                  <ul className={`list-disc ${locale === 'he' || locale === 'ar' ? 'mr-6' : 'ml-6'} mb-4 space-y-2`}>
                    {t.raw('section7.purposeItems').map((item: string, i: number) => (
                      <li key={i} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                  <p className="text-gray-700 font-semibold mb-2">
                    {t('section7.dataSharing')}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {t('section7.dataSharingContent')}
                  </p>
                  <p className="text-gray-700 font-semibold mb-2">
                    {t('section7.dataRetention')}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {t('section7.dataRetentionContent')}
                  </p>
                  <p className="text-gray-700 font-semibold mb-2">
                    {t('section7.yourRights')}
                  </p>
                  <p className="text-gray-700">
                    {t('section7.yourRightsContent')}
                  </p>
                </section>

                <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-orange-600 mt-8">
                  <h2 className="text-2xl font-bold text-orange-600 mb-4">
                    {t('section8.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('section8.content')}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>{tCommon('email')}:</strong>{' '}
                    <a
                      href={`mailto:${t('section8.email')}`}
                      className="text-orange-600 hover:underline"
                    >
                      {t('section8.email')}
                    </a>
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>{tCommon('address')}:</strong>{' '}
                    {t('section8.address')}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {locale === 'he' || locale === 'ar' ? '📄 ' : '📄 '}
                    <Link
                      href={`/${locale}/power-interval-timer/terms`}
                      className="text-orange-600 hover:underline"
                    >
                      {locale === 'he' || locale === 'ar' ? 'קרא את תנאי השימוש' : 'Read the Terms of Service'}
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
