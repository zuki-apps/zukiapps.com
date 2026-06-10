import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates } from '@/lib/hreflang';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Mail, HelpCircle, MessageCircle, FileText, Shield, Settings } from 'lucide-react';

type FaqItem = { question: string; answer: string };

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return {
    title: 'Support & FAQ - Hush Gallery | Zuki Apps',
    description:
      'Hush Gallery FAQ: import, share extension, tags, App Lock, cloud backup, Premium, privacy, and troubleshooting. Contact zuki.apps.dev@gmail.com.',
    robots: 'index, follow',
    alternates: {
      canonical: buildCanonical(locale, '/hush-gallery/support'),
      languages: buildLanguageAlternates('/hush-gallery/support')
    },
  };
}

export default async function SupportPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'hushGallery.support' });
  const tFaq = await getTranslations({ locale, namespace: 'hushGallery.faq' });
  const tHero = await getTranslations({ locale, namespace: 'hushGallery.hero' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const faqItems = tFaq.raw('items') as FaqItem[];

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question' as const,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: item.answer
      }
    }))
  };

  return (
    <>
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tHero('title'), path: '/hush-gallery' },
          { name: tCommon('support'), path: '/hush-gallery/support' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-50 to-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-purple-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-purple-600">
              <h1 className="text-4xl font-bold text-purple-600">Hush Gallery</h1>
              <Link
                href={`/${locale}/hush-gallery`}
                className="px-4 py-2 border-2 border-purple-600 bg-white text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-colors text-sm"
              >
                {tCommon('back')}
              </Link>
            </div>

            <div className={locale === 'he' || locale === 'ar' ? 'text-right' : 'text-left'}>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h1>
              <p className="text-gray-600 mb-2">{t('subtitle')}</p>
              <p className="text-gray-500 text-sm mb-8">{tFaq('subtitle')}</p>

              <section className="mb-8">
                <Link
                  href={`/${locale}/hush-gallery#manual`}
                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold text-sm"
                >
                  {locale === 'he' ? 'מדריך משתמש מלא בעמוד האפליקציה' : 'Full user manual on the app page'}
                </Link>
              </section>

              <section className="bg-white rounded-lg p-6 mb-8 border-l-4 border-purple-600">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-3">{t('contact.title')}</h2>
                    <p className="text-gray-700 mb-4">{t('contact.description')}</p>
                    <a
                      href={`mailto:${t('contact.email')}`}
                      className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
                    >
                      <Mail className="w-5 h-5" />
                      {t('contact.email')}
                    </a>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-purple-600 mb-4">{t('quickLinks.title')}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link
                    href={`/${locale}/hush-gallery/privacy`}
                    className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-200"
                  >
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{t('quickLinks.privacy.title')}</h3>
                        <p className="text-sm text-gray-600">{t('quickLinks.privacy.description')}</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    href={`/${locale}/hush-gallery/terms`}
                    className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-200"
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{t('quickLinks.terms.title')}</h3>
                        <p className="text-sm text-gray-600">{t('quickLinks.terms.description')}</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    href={`/${locale}/hush-gallery/delete-account`}
                    className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-200"
                  >
                    <div className="flex items-start gap-3">
                      <Settings className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{t('quickLinks.deleteAccount.title')}</h3>
                        <p className="text-sm text-gray-600">{t('quickLinks.deleteAccount.description')}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-purple-600 mb-6">{tFaq('title')}</h2>
                <div className="space-y-6">
                  {faqItems.map((item, index) => (
                    <article
                      key={index}
                      className="bg-white rounded-lg p-6 border border-gray-200"
                      itemScope
                      itemProp="mainEntity"
                      itemType="https://schema.org/Question"
                    >
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2" itemProp="name">
                            {item.question}
                          </h3>
                          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                            <p className="text-gray-700 leading-relaxed" itemProp="text">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-purple-600 mt-8">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-purple-600 mb-3">{t('additionalHelp.title')}</h2>
                    <p className="text-gray-700 mb-4">{t('additionalHelp.description')}</p>
                    <p className="text-gray-700">
                      <strong>{tCommon('email')}:</strong>{' '}
                      <a href={`mailto:${t('contact.email')}`} className="text-purple-600 hover:underline">
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
