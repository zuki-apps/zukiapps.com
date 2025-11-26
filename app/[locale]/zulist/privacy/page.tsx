import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  
  return {
    title: 'Privacy Policy - ZuList | Zuki Apps',
    description: 'Privacy Policy for ZuList - Smart shopping list application. Learn how we collect, use, and protect your data.',
    robots: 'index, follow',
    alternates: {
      canonical: locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? `${baseUrl}/zulist/privacy` 
        : `${baseUrl}/${locale}/zulist/privacy`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          loc === routing.defaultLocale && routing.localePrefix === 'as-needed' 
            ? `${baseUrl}/zulist/privacy` 
            : `${baseUrl}/${loc}/zulist/privacy`
        ])
      )
    }
  };
}

export default async function PrivacyPolicyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'zulist.privacy' });

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: 'Home', path: '/' },
          { name: 'ZuList', path: '/zulist' },
          { name: 'Privacy Policy', path: '/zulist/privacy' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Language Switcher */}
        <div className="mb-6 flex justify-end">
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

              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section7.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('section7.content')}
                </p>
                <p className="text-gray-700 font-semibold mb-2">
                  {t('section7.dataCollected')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-4 text-gray-700 space-y-2`}>
                  {t.raw('section7.dataCollectedItems').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="text-gray-700 font-semibold mb-2">
                  {t('section7.purpose')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-4 text-gray-700 space-y-2`}>
                  {t.raw('section7.purposeItems').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="text-gray-700 font-semibold mb-2">
                  {t('section7.dataSharing')}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('section7.dataSharingContent')}{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {locale === 'he' ? 'מדיניות הפרטיות של Google' : "Google's Privacy Policy"}
                  </a>.
                </p>
                <p className="text-gray-700 font-semibold mb-2">
                  {t('section7.dataRetention')}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('section7.dataRetentionContent')}
                </p>
                <p className="text-gray-700 font-semibold mb-2">
                  {t('section7.yourRights')}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t('section7.yourRightsContent')}
                </p>
              </section>

              <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-blue-600 mt-8">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section8.title')}
                </h2>
                <p className="text-gray-700 mb-4">
                  {t('section8.content')}
                </p>
                <p className="text-gray-700 mb-4">
                  <a
                    href={`mailto:${t('section8.email')}`}
                    className="text-blue-600 hover:underline"
                  >
                    {t('section8.email')}
                  </a>
                </p>
                <p className="text-gray-700 text-sm">
                  {locale === 'he' ? '📄 ' : '📄 '}
                  <Link
                    href={`/${locale}/zulist/terms`}
                    className="text-blue-600 hover:underline"
                  >
                    {locale === 'he' ? 'קרא את תנאי השימוש' : 'Read the Terms of Service'}
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

