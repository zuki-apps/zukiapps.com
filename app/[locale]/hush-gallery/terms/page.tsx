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
    return {};
  }

  const baseUrl = getSiteUrl();
  const t = await getTranslations({ locale, namespace: 'hushGallery.terms' });
  
  const title = `${t('title')} - Hush Gallery | Zuki Apps`;
  const description = locale === 'he' || locale === 'ar' 
    ? 'תנאי השימוש של Hush Gallery - אפליקציית גלריית תמונות פרטית. קרא את התנאים וההגבלות לשימוש באפליקציה.'
    : 'Terms of Service for Hush Gallery - Private photo gallery application. Read the terms and conditions for using the app.';
  
  return {
    title,
    description,
    alternates: {
      canonical: buildCanonical(locale, '/hush-gallery/terms'),
      languages: buildLanguageAlternates('/hush-gallery/terms'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function HushGalleryTermsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'hushGallery.terms' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tApp = await getTranslations({ locale, namespace: 'hushGallery.hero' });

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tApp('title'), path: '/hush-gallery' },
          { name: tCommon('termsOfService'), path: '/hush-gallery/terms' }
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
                  {tCommon('back')}
                </Link>
              </div>
            </div>

            <div className={`${locale === 'he' || locale === 'ar' ? 'text-right' : 'text-left'}`}>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {t('title')}
              </h1>
              <p className="text-gray-400 mb-6">
                {t('lastUpdated')}
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
                <p className="text-gray-700 font-semibold">
                  {t('intro')}
                </p>
              </div>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-purple-600 mb-4">
                    {t('section1.title')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t('section1.content')}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {t('section1.content2')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-600 mb-4">
                    {t('section2.title')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t('section2.content')}
                  </p>
                  <ul className={`list-disc ${locale === 'he' || locale === 'ar' ? 'mr-6' : 'ml-6'} mb-4 space-y-2`}>
                    {t.raw('section2.items').map((item: string, i: number) => (
                      <li key={i} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-purple-600 mb-4">
                    {t('section19.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('section19.content')}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>{tCommon('email')}:</strong>{' '}
                    <a
                      href={`mailto:${t('section19.email')}`}
                      className="text-purple-600 hover:underline"
                    >
                      {t('section19.email')}
                    </a>
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>{tCommon('address')}:</strong>{' '}
                    {t('section19.address')}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {locale === 'he' || locale === 'ar' ? '🔒 ' : '🔒 '}
                    <Link
                      href={`/${locale}/hush-gallery/privacy`}
                      className="text-purple-600 hover:underline"
                    >
                      {locale === 'he' || locale === 'ar' ? 'קרא את מדיניות הפרטיות' : 'Read the Privacy Policy'}
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

