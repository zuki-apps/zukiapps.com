import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates } from '@/lib/hreflang';
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

  const t = await getTranslations({ locale, namespace: 'funFactsTrivia.terms' });
  const tHero = await getTranslations({ locale, namespace: 'funFactsTrivia.hero' });

  return {
    title: `${t('title')} - ${tHero('title')} | Zuki Apps`,
    description: `Terms of Service for ${tHero('title')}. Read the terms and conditions for using the app.`,
    alternates: {
      canonical: buildCanonical(locale, '/fun-facts-trivia/terms'),
      languages: buildLanguageAlternates('/fun-facts-trivia/terms'),
    },
    robots: { index: true, follow: true },
  };
}

export default async function FunFactsTriviaTermsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'funFactsTrivia.terms' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tApp = await getTranslations({ locale, namespace: 'funFactsTrivia.hero' });

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tApp('title'), path: '/fun-facts-trivia' },
          { name: tCommon('termsOfService'), path: '/fun-facts-trivia/terms' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-amber-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-amber-600">
              <h1 className="text-4xl font-bold text-amber-700">{tApp('title')}</h1>
              <div className="flex gap-2">
                <Link
                  href={`/${locale}/fun-facts-trivia`}
                  className="px-4 py-2 border-2 border-amber-600 bg-white text-amber-700 rounded-lg hover:bg-amber-600 hover:text-white transition-colors text-sm"
                >
                  {tCommon('back')}
                </Link>
              </div>
            </div>

            <div className={`${locale === 'he' || locale === 'ar' ? 'text-right' : 'text-left'}`}>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h1>
              <p className="text-gray-600 mb-6">{t('lastUpdated')}</p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
                <p className="text-gray-700 font-semibold">{t('intro')}</p>
              </div>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-amber-700 mb-4">{t('section1.title')}</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">{t('section1.content')}</p>
                  <p className="text-gray-700 leading-relaxed">{t('section1.content2')}</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-amber-700 mb-4">{t('section2.title')}</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">{t('section2.content')}</p>
                  <ul className={`list-disc ${locale === 'he' || locale === 'ar' ? 'mr-6' : 'ml-6'} mb-4 space-y-2`}>
                    {t.raw('section2.items').map((item: string, i: number) => (
                      <li key={i} className="text-gray-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-amber-700 mb-4">{t('section19.title')}</h2>
                  <p className="text-gray-700 mb-4">{t('section19.content')}</p>
                  <p className="text-gray-700 mb-2">
                    <strong>{tCommon('email')}:</strong>{' '}
                    <a href={`mailto:${t('section19.email')}`} className="text-amber-700 hover:underline">
                      {t('section19.email')}
                    </a>
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>{tCommon('address')}:</strong> {t('section19.address')}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <Link href={`/${locale}/fun-facts-trivia/privacy`} className="text-amber-700 hover:underline">
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
