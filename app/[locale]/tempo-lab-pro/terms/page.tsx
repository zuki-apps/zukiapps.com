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

  const baseUrl = getSiteUrl();
  const t = await getTranslations({ locale, namespace: 'tempoLabPro.terms' });
  
  return {
    title: `${t('title')} - TempoLab Pro | Zuki Apps`,
    description: 'Terms of Service for TempoLab Pro - Tempo and pitch audio practice app. Read the terms and conditions for using the app.',
    alternates: {
      canonical: buildCanonical(locale, '/tempo-lab-pro/terms'),
      languages: buildLanguageAlternates('/tempo-lab-pro/terms'),
    },
    robots: { index: true, follow: true },
  };
}

export default async function TempoLabProTermsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'tempoLabPro.terms' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tApp = await getTranslations({ locale, namespace: 'tempoLabPro.hero' });

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tApp('title'), path: '/tempo-lab-pro' },
          { name: tCommon('termsOfService'), path: '/tempo-lab-pro/terms' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-violet-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-violet-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-violet-600">
              <h1 className="text-4xl font-bold text-violet-600">TempoLab Pro</h1>
              <div className="flex gap-2">
                <Link
                  href={`/${locale}/tempo-lab-pro`}
                  className="px-4 py-2 border-2 border-violet-600 bg-white text-violet-600 rounded-lg hover:bg-violet-600 hover:text-white transition-colors text-sm"
                >
                  {tCommon('back')}
                </Link>
              </div>
            </div>

            <div className={`${locale === 'he' || locale === 'ar' ? 'text-right' : 'text-left'}`}>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {t('title')}
              </h1>
              <p className="text-gray-600 mb-6">
                {t('lastUpdated')}
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
                <p className="text-gray-700 font-semibold">
                  {t('intro')}
                </p>
              </div>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-violet-600 mb-4">
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
                  <h2 className="text-2xl font-bold text-violet-600 mb-4">
                    {t('section2.title')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t('section2.content')}
                  </p>
                  <ul className={`list-disc ${locale === 'he' || locale === 'ar' ? 'mr-6' : 'ml-6'} space-y-2 text-gray-700`}>
                    {t.raw('section2.items').map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-violet-600 mt-8">
                  <h2 className="text-2xl font-bold text-violet-600 mb-4">
                    {t('section19.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('section19.content')}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>{tCommon('email')}:</strong>{' '}
                    <a href={`mailto:${t('section19.email')}`} className="text-violet-600 hover:underline">
                      {t('section19.email')}
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <strong>{tCommon('address')}:</strong>{' '}
                    {t('section19.address')}
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
