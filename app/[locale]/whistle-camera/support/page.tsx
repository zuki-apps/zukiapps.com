import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  
  return {
    title: 'Support - Whistle Camera | Zuki Apps',
    description: 'Get help and support for Whistle Camera. Find answers to common questions, contact information, and helpful resources.',
    robots: 'index, follow',
    alternates: {
      canonical: locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? `${baseUrl}/whistle-camera/support` 
        : `${baseUrl}/${locale}/whistle-camera/support`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          loc === routing.defaultLocale && routing.localePrefix === 'as-needed' 
            ? `${baseUrl}/whistle-camera/support` 
            : `${baseUrl}/${loc}/whistle-camera/support`
        ])
      )
    }
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

  const t = await getTranslations({ locale, namespace: 'whistleCamera.support' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  
  // Build FAQ Structured Data (JSON-LD)
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: t('faq.q1.question'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.q1.answer')
        }
      },
      {
        '@type': 'Question',
        name: t('faq.q2.question'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.q2.answer')
        }
      },
      {
        '@type': 'Question',
        name: t('faq.q3.question'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.q3.answer')
        }
      },
      {
        '@type': 'Question',
        name: t('faq.q4.question'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.q4.answer')
        }
      },
      {
        '@type': 'Question',
        name: t('faq.q5.question'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.q5.answer')
        }
      },
      {
        '@type': 'Question',
        name: t('faq.q6.question'),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.q6.answer')
        }
      }
    ]
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
          { name: 'Whistle Camera', path: '/whistle-camera' },
          { name: tCommon('support'), path: '/whistle-camera/support' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Language Switcher */}
        <div className="mb-6 flex justify-end">
          <LanguageSwitcher />
        </div>

        <div className="bg-amber-50 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-amber-600">
            <h1 className="text-4xl font-bold text-amber-600">Whistle Camera</h1>
            <div className="flex gap-2">
              <Link
                href={`/${locale}/whistle-camera`}
                className="px-4 py-2 border-2 border-amber-600 bg-white text-amber-600 rounded-lg hover:bg-amber-600 hover:text-white transition-colors text-sm"
              >
                {tCommon('back')}
              </Link>
            </div>
          </div>

          <div className={`${locale === 'he' ? 'text-right' : 'text-left'}`}>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-gray-600 mb-8">
              {t('subtitle')}
            </p>

            {/* Contact Section */}
            <section className="bg-white rounded-lg p-6 mb-8 border-l-4 border-amber-600">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-amber-600 mb-3">
                    {t('contact.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('contact.description')}
                  </p>
                  <a
                    href={`mailto:${t('contact.email')}`}
                    className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
                  >
                    <Mail className="w-5 h-5" />
                    {t('contact.email')}
                  </a>
                </div>
              </div>
            </section>

            {/* Quick Links */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-amber-600 mb-4">
                {t('quickLinks.title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link
                  href={`/${locale}/whistle-camera/privacy`}
                  className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {t('quickLinks.privacy.title')}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {t('quickLinks.privacy.description')}
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  href={`/${locale}/whistle-camera/terms`}
                  className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {t('quickLinks.terms.title')}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {t('quickLinks.terms.description')}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-2xl font-bold text-amber-600 mb-6">
                {t('faq.title')}
              </h2>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
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

            {/* Additional Help */}
            <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-amber-600 mt-8">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-amber-600 mb-3">
                    {t('additionalHelp.title')}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {t('additionalHelp.description')}
                  </p>
                  <p className="text-gray-700">
                    <strong>{tCommon('email')}:</strong>{' '}
                    <a
                      href={`mailto:${t('contact.email')}`}
                      className="text-amber-600 hover:underline"
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
