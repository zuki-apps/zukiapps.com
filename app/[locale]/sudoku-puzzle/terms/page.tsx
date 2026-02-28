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
  const t = await getTranslations({ locale, namespace: 'sudokuPuzzle.terms' });
  
  return {
    title: `${t('title')} - Sudoku Fun Go | Zuki Apps`,
    description: 'Terms of Service for Sudoku Fun Go - Classic Sudoku game. Read the terms and conditions for using the app.',
    alternates: {
      canonical: locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? `${baseUrl}/sudoku-puzzle/terms` 
        : `${baseUrl}/${locale}/sudoku-puzzle/terms`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          loc === routing.defaultLocale && routing.localePrefix === 'as-needed'
            ? `${baseUrl}/sudoku-puzzle/terms`
            : `${baseUrl}/${loc}/sudoku-puzzle/terms`
        ])
      )
    },
    robots: { index: true, follow: true },
  };
}

export default async function SudokuPuzzleTermsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'sudokuPuzzle.terms' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: 'Sudoku Fun Go', path: '/sudoku-puzzle' },
          { name: tCommon('termsOfService'), path: '/sudoku-puzzle/terms' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-teal-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-teal-600">
              <h1 className="text-4xl font-bold text-teal-600">Sudoku Fun Go</h1>
              <div className="flex gap-2">
                <Link
                  href={`/${locale}/sudoku-puzzle`}
                  className="px-4 py-2 border-2 border-teal-600 bg-white text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition-colors text-sm"
                >
                  {tCommon('back')}
                </Link>
              </div>
            </div>

            <div className={`${locale === 'he' ? 'text-right' : 'text-left'}`}>
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
                  <h2 className="text-2xl font-bold text-teal-600 mb-4">
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
                  <h2 className="text-2xl font-bold text-teal-600 mb-4">
                    {t('section2.title')}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t('section2.content')}
                  </p>
                  <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-4 space-y-2`}>
                    {t.raw('section2.items').map((item: string, i: number) => (
                      <li key={i} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-teal-600 mb-4">
                    {t('section19.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('section19.content')}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>{tCommon('email')}:</strong>{' '}
                    <a
                      href={`mailto:${t('section19.email')}`}
                      className="text-teal-600 hover:underline"
                    >
                      {t('section19.email')}
                    </a>
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>{tCommon('address')}:</strong>{' '}
                    {t('section19.address')}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <Link
                      href={`/${locale}/sudoku-puzzle/privacy`}
                      className="text-teal-600 hover:underline"
                    >
                      {locale === 'he' ? 'קרא את מדיניות הפרטיות' : 'Read the Privacy Policy'}
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
