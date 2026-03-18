import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  return {
    title: 'Privacy Policy - Football Trivia Master | Zuki Apps',
    description: 'Privacy Policy for Football Trivia Master. Learn how we collect, use, and protect your data.',
    robots: 'index, follow',
    alternates: {
      canonical: locale === routing.defaultLocale && routing.localePrefix === 'as-needed' ? `${baseUrl}/football-trivia/privacy` : `${baseUrl}/${locale}/football-trivia/privacy`,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, loc === routing.defaultLocale && routing.localePrefix === 'as-needed' ? `${baseUrl}/football-trivia/privacy` : `${baseUrl}/${loc}/football-trivia/privacy`]))
    }
  };
}

export default async function FootballTriviaPrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  const t = await getTranslations({ locale, namespace: 'footballTrivia.privacy' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tApp = await getTranslations({ locale, namespace: 'footballTrivia' });

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tApp('hero.title'), path: '/football-trivia' },
          { name: tCommon('privacyPolicy'), path: '/football-trivia/privacy' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>
          <div className="bg-emerald-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-emerald-600">
              <h1 className="text-4xl font-bold text-emerald-600">{tApp('hero.title')}</h1>
              <Link href={`/${locale}/football-trivia`} className="px-4 py-2 border-2 border-emerald-600 bg-white text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors text-sm">
                {tCommon('back')}
              </Link>
            </div>
            <div className={locale === 'he' ? 'text-right' : 'text-left'}>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h1>
              <p className="text-gray-600 mb-8">{t('lastUpdated')}</p>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <section key={n}>
                    <h2 className="text-2xl font-bold text-emerald-600 mb-4">{t(`section${n}.title`)}</h2>
                    <p className="text-gray-700 leading-relaxed">{t(`section${n}.content`)}</p>
                  </section>
                ))}
                <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-emerald-600 mt-8">
                  <h2 className="text-2xl font-bold text-emerald-600 mb-4">{t('section8.title')}</h2>
                  <p className="text-gray-700 mb-4">{t('section8.content')}</p>
                  <p className="text-gray-700 mb-2"><strong>{tCommon('email')}:</strong> <a href={`mailto:${t('section8.email')}`} className="text-emerald-600 hover:underline">{t('section8.email')}</a></p>
                  <p className="text-gray-700 mb-4"><strong>{tCommon('address')}:</strong> {t('section8.address')}</p>
                  <p className="text-gray-700 text-sm">
                    <Link href={`/${locale}/football-trivia/terms`} className="text-emerald-600 hover:underline">
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
