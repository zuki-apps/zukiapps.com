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
    return {};
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  const t = await getTranslations({ locale, namespace: 'dsa' });
  
  const title = `${t('title')} - Zuki Apps`;
  const description = locale === 'he' 
    ? 'ציות לחוק שירותים דיגיטליים (DSA) - Zuki Apps. מידע על זיהוי סוחר, זכויות צרכן וציות לחוקי האיחוד האירופי.'
    : 'Digital Services Act (DSA) Compliance - Zuki Apps. Information about trader identification, consumer rights, and EU compliance.';
  
  return {
    title,
    description,
    alternates: {
      canonical: locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? `${baseUrl}/dsa-compliance` 
        : `${baseUrl}/${locale}/dsa-compliance`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          loc === routing.defaultLocale && routing.localePrefix === 'as-needed'
            ? `${baseUrl}/dsa-compliance`
            : `${baseUrl}/${loc}/dsa-compliance`
        ])
      )
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function DSACompliancePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'dsa' });

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: 'Home', path: '/' },
          { name: 'DSA Compliance', path: '/dsa-compliance' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-blue-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-blue-600">
              <h1 className="text-4xl font-bold text-blue-600">Zuki Apps</h1>
              <div className="flex gap-2">
                <Link
                  href={`/${locale}`}
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

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">
                    {t('traderIdentification.title')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t('traderIdentification.content')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">
                    {t('businessInfo.title')}
                  </h2>
                  <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-4 space-y-2`}>
                    <li className="text-gray-700">
                      <strong>{t('businessInfo.company')}:</strong> {t('businessInfo.companyValue')}
                    </li>
                    <li className="text-gray-700">
                      <strong>{t('businessInfo.address')}:</strong> {t('businessInfo.addressValue')}
                    </li>
                    <li className="text-gray-700">
                      <strong>{t('businessInfo.contactEmail')}:</strong>{' '}
                      <a
                        href={`mailto:${t('businessInfo.contactEmailValue')}`}
                        className="text-blue-600 hover:underline"
                      >
                        {t('businessInfo.contactEmailValue')}
                      </a>
                    </li>
                    <li className="text-gray-700">
                      <strong>{t('businessInfo.supportEmail')}:</strong>{' '}
                      <a
                        href={`mailto:${t('businessInfo.supportEmailValue')}`}
                        className="text-blue-600 hover:underline"
                      >
                        {t('businessInfo.supportEmailValue')}
                      </a>
                    </li>
                    <li className="text-gray-700">
                      <strong>{t('businessInfo.website')}:</strong>{' '}
                      <a
                        href={t('businessInfo.websiteValue')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {t('businessInfo.websiteValue')}
                      </a>
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">
                    {t('consumerRights.title')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t('consumerRights.content')}
                  </p>
                  <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-4 space-y-2`}>
                    {t.raw('consumerRights.items').map((item: string, i: number) => (
                      <li key={i} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">
                    {t('contact.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('contact.content')}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>{locale === 'he' ? 'אימייל:' : 'Email:'}</strong>{' '}
                    <a
                      href={`mailto:${t('contact.email')}`}
                      className="text-blue-600 hover:underline"
                    >
                      {t('contact.email')}
                    </a>
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>{locale === 'he' ? 'כתובת:' : 'Address:'}</strong>{' '}
                    {t('contact.address')}
                  </p>
                </section>

                <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>{locale === 'he' ? 'אפליקציות:' : 'Applications:'}</strong>
                  </p>
                  <p className="text-gray-700 text-sm">
                    <Link
                      href={`/${locale}/zulist`}
                      className="text-blue-600 hover:underline"
                    >
                      ZuList
                    </Link>
                    {' | '}
                    <Link
                      href={`/${locale}/hush-gallery`}
                      className="text-blue-600 hover:underline"
                    >
                      Hush Gallery
                    </Link>
                    {' | '}
                    <Link
                      href={`/${locale}/whistle-camera`}
                      className="text-blue-600 hover:underline"
                    >
                      Whistle Camera
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

