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

  const t = await getTranslations({ locale, namespace: 'noiseMeterShusher.privacy' });

  return {
    title: `${t('title')} — Noise Meter — Shusher | Zuki Apps`,
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
      canonical: buildCanonical(locale, '/noise-meter-shusher/privacy'),
      languages: buildLanguageAlternates('/noise-meter-shusher/privacy'),
    },
  };
}

export default async function NoiseMeterShusherPrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'noiseMeterShusher.privacy' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tApp = await getTranslations({ locale, namespace: 'noiseMeterShusher.hero' });

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tApp('title'), path: '/noise-meter-shusher' },
          { name: tCommon('privacyPolicy'), path: '/noise-meter-shusher/privacy' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-violet-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-violet-600">
              <h1 className="text-4xl font-bold text-violet-600">{tApp('title')}</h1>
              <div className="flex gap-2">
                <Link
                  href={`/${locale}/noise-meter-shusher`}
                  className="px-4 py-2 border-2 border-violet-600 bg-white text-violet-600 rounded-lg hover:bg-violet-600 hover:text-white transition-colors text-sm"
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
                  <h3 className="text-2xl font-bold text-violet-600 mb-4">{t('section1.title')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('section1.content')}</p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-violet-600 mb-4">{t('section2.title')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('section2.content')}</p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-violet-600 mb-4">{t('section3.title')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('section3.content')}</p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-violet-600 mb-4">{t('section4.title')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('section4.content')}</p>
                </section>

                <section>
                  <h3 className="text-2xl font-bold text-violet-600 mb-4">{t('section5.title')}</h3>
                  <p className="text-gray-700 leading-relaxed">{t('section5.content')}</p>
                </section>

                <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-violet-600 mt-8">
                  <h3 className="text-2xl font-bold text-violet-600 mb-4">{t('section8.title')}</h3>
                  <p className="text-gray-700 mb-4">{t('section8.content')}</p>
                  <p className="text-gray-700 mb-2">
                    <strong>{tCommon('email')}:</strong>{' '}
                    <a href={`mailto:${t('section8.email')}`} className="text-violet-600 hover:underline">
                      {t('section8.email')}
                    </a>
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>{tCommon('address')}:</strong> {t('section8.address')}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <Link href={`/${locale}/noise-meter-shusher/terms`} className="text-violet-600 hover:underline">
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
