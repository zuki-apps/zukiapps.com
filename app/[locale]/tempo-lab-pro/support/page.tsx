import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates, getSiteUrl } from '@/lib/hreflang';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Mail, HelpCircle, MessageCircle, FileText, Shield } from 'lucide-react';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'tempoLabPro.support' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    robots: 'index, follow',
    alternates: {
      canonical: buildCanonical(locale, '/tempo-lab-pro/support'),
      languages: buildLanguageAlternates('/tempo-lab-pro/support')
    },
  };
}

export default async function TempoLabProSupportPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'tempoLabPro.support' });
  const tHero = await getTranslations({ locale, namespace: 'tempoLabPro.hero' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [1, 2, 3, 4].map((num) => ({
      '@type': 'Question' as const,
      name: t(`faq.q${num}.question`),
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: t(`faq.q${num}.answer`)
      }
    }))
  };

  return (
    <>
      <Script
        id="faq-structured-data-tempolabpro"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tHero('title'), path: '/tempo-lab-pro' },
          { name: tCommon('support'), path: '/tempo-lab-pro/support' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-violet-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-violet-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-violet-600">
              <h1 className="text-4xl font-bold text-violet-600">{tHero('title')}</h1>
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
              <p className="text-gray-400 mb-8">
                {t('subtitle')}
              </p>

              <section className="bg-white rounded-lg p-6 mb-8 border-l-4 border-violet-600">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-violet-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-violet-600 mb-3">
                      {t('contact.title')}
                    </h2>
                    <p className="text-gray-700 mb-4">
                      {t('contact.description')}
                    </p>
                    <a
                      href={`mailto:${t('contact.email')}`}
                      className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-semibold"
                    >
                      <Mail className="w-5 h-5" />
                      {t('contact.email')}
                    </a>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-violet-600 mb-4">
                  {t('quickLinks.title')}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link
                    href={`/${locale}/tempo-lab-pro/privacy`}
                    className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-200"
                  >
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-violet-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {t('quickLinks.privacy.title')}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {t('quickLinks.privacy.description')}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    href={`/${locale}/tempo-lab-pro/terms`}
                    className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-200"
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-violet-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {t('quickLinks.terms.title')}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {t('quickLinks.terms.description')}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-violet-600 mb-6">
                  {t('faq.title')}
                </h2>
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-violet-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {t(`faq.q${num}.question`)}
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {t(`faq.q${num}.answer`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-violet-600 mt-8">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-6 h-6 text-violet-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-violet-600 mb-3">
                      {t('additionalHelp.title')}
                    </h2>
                    <p className="text-gray-700 mb-4">
                      {t('additionalHelp.description')}
                    </p>
                    <p className="text-gray-700">
                      <strong>{tCommon('email')}:</strong>{' '}
                      <a
                        href={`mailto:${t('contact.email')}`}
                        className="text-violet-600 hover:underline"
                      >
                        {t('contact.email')}
                      </a>
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
