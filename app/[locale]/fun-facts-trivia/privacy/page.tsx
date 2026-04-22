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

  const tHero = await getTranslations({ locale, namespace: 'funFactsTrivia.hero' });
  return {
    title: `Privacy Policy - ${tHero('title')} | Zuki Apps`,
    description: `Privacy Policy for ${tHero('title')} — trivia game by Zuki Apps. Learn how we collect, use, and protect your data.`,
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
      canonical: buildCanonical(locale, '/fun-facts-trivia/privacy'),
      languages: buildLanguageAlternates('/fun-facts-trivia/privacy'),
    },
  };
}

export default async function FunFactsTriviaPrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'funFactsTrivia.privacy' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tApp = await getTranslations({ locale, namespace: 'funFactsTrivia.hero' });

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tApp('title'), path: '/fun-facts-trivia' },
          { name: tCommon('privacyPolicy'), path: '/fun-facts-trivia/privacy' },
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

            <div className={`${locale === 'he' ? 'text-right' : 'text-left'}`}>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h1>
              <p className="text-gray-600 mb-8">{t('lastUpdated')}</p>

              <div className="space-y-6">
                {(['section1', 'section2', 'section3', 'section4', 'section5', 'section6'] as const).map((key) => (
                  <section key={key}>
                    <h2 className="text-2xl font-bold text-amber-700 mb-4">{t(`${key}.title`)}</h2>
                    <p className="text-gray-700 leading-relaxed">{t(`${key}.content`)}</p>
                  </section>
                ))}

                <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-amber-600 mt-8">
                  <h2 className="text-2xl font-bold text-amber-700 mb-4">{t('section7.title')}</h2>
                  <p className="text-gray-700 mb-4">{t('section7.content')}</p>
                  <p className="text-gray-700 mb-2">
                    <strong>{tCommon('email')}:</strong>{' '}
                    <a href={`mailto:${t('section7.email')}`} className="text-amber-700 hover:underline">
                      {t('section7.email')}
                    </a>
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>{tCommon('address')}:</strong> {t('section7.address')}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <Link href={`/${locale}/fun-facts-trivia/terms`} className="text-amber-700 hover:underline">
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
