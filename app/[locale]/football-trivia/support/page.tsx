import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates, getSiteUrl } from '@/lib/hreflang';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import type { Metadata } from 'next';
import { Mail, FileText, Shield } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  const baseUrl = getSiteUrl();
  return {
    title: 'Support - Football Trivia Master | Zuki Apps',
    description: 'Get help and support for Football Trivia Master. Contact information and resources.',
    robots: 'index, follow',
    alternates: {
      canonical: buildCanonical(locale, '/football-trivia/support'),
      languages: buildLanguageAlternates('/football-trivia/support')
    },
  };
}

export default async function FootballTriviaSupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  const t = await getTranslations({ locale, namespace: 'footballTrivia.support' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tApp = await getTranslations({ locale, namespace: 'footballTrivia' });

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tApp('hero.title'), path: '/football-trivia' },
          { name: tCommon('support'), path: '/football-trivia/support' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>
          <div className="bg-slate-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-blue-700">
              <h1 className="text-4xl font-bold text-blue-700">{tApp('hero.title')}</h1>
              <Link href={`/${locale}/football-trivia`} className="px-4 py-2 border-2 border-blue-700 bg-white text-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition-colors text-sm">
                {tCommon('back')}
              </Link>
            </div>
            <div className={locale === 'he' ? 'text-right' : 'text-left'}>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h1>
              <p className="text-gray-600 mb-8">{t('subtitle')}</p>
              <section className="bg-white rounded-lg p-6 mb-8 border-l-4 border-blue-700">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-700 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-blue-700 mb-3">{t('contact.title')}</h2>
                    <p className="text-gray-700 mb-4">{t('contact.description')}</p>
                    <a href={`mailto:${t('contact.email')}`} className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-semibold">
                      <Mail className="w-5 h-5" />
                      {t('contact.email')}
                    </a>
                  </div>
                </div>
              </section>
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-blue-700 mb-4">{t('quickLinks.title')}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href={`/${locale}/football-trivia/privacy`} className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-200">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-700 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{t('quickLinks.privacy.title')}</h3>
                        <p className="text-sm text-gray-600">{t('quickLinks.privacy.description')}</p>
                      </div>
                    </div>
                  </Link>
                  <Link href={`/${locale}/football-trivia/terms`} className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-200">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-blue-700 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{t('quickLinks.terms.title')}</h3>
                        <p className="text-sm text-gray-600">{t('quickLinks.terms.description')}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </section>
              <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-blue-700">
                <div className="flex items-start gap-3">
                  <Mail className="w-6 h-6 text-blue-700 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-blue-700 mb-3">{t('additionalHelp.title')}</h2>
                    <p className="text-gray-700 mb-4">{t('additionalHelp.description')}</p>
                    <p className="text-gray-700">
                      <strong>{tCommon('email')}:</strong> <a href={`mailto:${t('contact.email')}`} className="text-blue-700 hover:underline">{t('contact.email')}</a>
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
