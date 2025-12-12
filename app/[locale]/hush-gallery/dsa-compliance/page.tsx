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
  const t = await getTranslations({ locale, namespace: 'hushGallery.dsa' });
  
  const title = `${t('title')} - Hush Gallery | Zuki Apps`;
  const description = locale === 'he' 
    ? 'ציות לחוק שירותים דיגיטליים (DSA) - Hush Gallery. מידע על זיהוי סוחר, זכויות צרכן וציות לחוקי האיחוד האירופי.'
    : 'Digital Services Act (DSA) Compliance - Hush Gallery. Information about trader identification, consumer rights, and EU compliance.';
  
  return {
    title,
    description,
    alternates: {
      canonical: locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? `${baseUrl}/hush-gallery/dsa-compliance` 
        : `${baseUrl}/${locale}/hush-gallery/dsa-compliance`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          loc === routing.defaultLocale && routing.localePrefix === 'as-needed'
            ? `${baseUrl}/hush-gallery/dsa-compliance`
            : `${baseUrl}/${loc}/hush-gallery/dsa-compliance`
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

  const t = await getTranslations({ locale, namespace: 'hushGallery.dsa' });

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: 'Home', path: '/' },
          { name: 'Hush Gallery', path: '/hush-gallery' },
          { name: 'DSA Compliance', path: '/hush-gallery/dsa-compliance' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-purple-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-purple-600">
              <h1 className="text-4xl font-bold text-purple-600">Hush Gallery</h1>
              <div className="flex gap-2">
                <Link
                  href={`/${locale}/hush-gallery`}
                  className="px-4 py-2 border-2 border-purple-600 bg-white text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors text-sm"
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
                  <h2 className="text-2xl font-bold text-purple-600 mb-4">
                    {t('traderIdentification.title')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t('traderIdentification.content')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-600 mb-4">
                    {t('businessInfo.title')}
                  </h2>
                  <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-4 space-y-2`}>
                    <li className="text-gray-700">
                      <strong>{t('businessInfo.company')}:</strong> {t('businessInfo.companyValue')}
                    </li>
                    <li className="text-gray-700">
                      <strong>{t('businessInfo.service')}:</strong> {t('businessInfo.serviceValue')}
                    </li>
                    <li className="text-gray-700">
                      <strong>{t('businessInfo.address')}:</strong> {t('businessInfo.addressValue')}
                    </li>
                    <li className="text-gray-700">
                      <strong>{t('businessInfo.contactEmail')}:</strong>{' '}
                      <a
                        href={`mailto:${t('businessInfo.contactEmailValue')}`}
                        className="text-purple-600 hover:underline"
                      >
                        {t('businessInfo.contactEmailValue')}
                      </a>
                    </li>
                    <li className="text-gray-700">
                      <strong>{t('businessInfo.website')}:</strong>{' '}
                      <a
                        href={t('businessInfo.websiteValue')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline"
                      >
                        {t('businessInfo.websiteValue')}
                      </a>
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-600 mb-4">
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
                  <h2 className="text-2xl font-bold text-purple-600 mb-4">
                    {t('contact.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('contact.content')}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>{locale === 'he' ? 'אימייל:' : 'Email:'}</strong>{' '}
                    <a
                      href={`mailto:${t('contact.email')}`}
                      className="text-purple-600 hover:underline"
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
                  <p className="text-gray-700 text-sm">
                    {locale === 'he' ? '🔒 ' : '🔒 '}
                    <Link
                      href={`/${locale}/hush-gallery/privacy`}
                      className="text-purple-600 hover:underline"
                    >
                      {locale === 'he' ? 'קרא את מדיניות הפרטיות' : 'Read the Privacy Policy'}
                    </Link>
                    {' | '}
                    <Link
                      href={`/${locale}/hush-gallery/terms`}
                      className="text-purple-600 hover:underline"
                    >
                      {locale === 'he' ? 'קרא את תנאי השימוש' : 'Read the Terms of Use'}
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

