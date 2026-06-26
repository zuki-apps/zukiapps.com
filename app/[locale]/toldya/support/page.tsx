import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates } from '@/lib/hreflang';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Mail, HelpCircle, MessageCircle, FileText, Shield, UserX, Baby } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'toldya.support' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    robots: 'index, follow',
    alternates: {
      canonical: buildCanonical(locale, '/toldya/support'),
      languages: buildLanguageAlternates('/toldya/support'),
    },
  };
}

export default async function ToldyaSupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'toldya.support' });
  const tHero = await getTranslations({ locale, namespace: 'toldya.hero' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const rtl = locale === 'he' || locale === 'ar';

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [1, 2, 3, 4, 5, 6].map((num) => ({
      '@type': 'Question',
      name: t(`faq.q${num}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`faq.q${num}.answer`),
      },
    })),
  };

  const quickLinks = [
    {
      href: `/${locale}/toldya/privacy`,
      icon: Shield,
      title: t('quickLinks.privacy.title'),
      description: t('quickLinks.privacy.description'),
    },
    {
      href: `/${locale}/toldya/terms`,
      icon: FileText,
      title: t('quickLinks.terms.title'),
      description: t('quickLinks.terms.description'),
    },
    {
      href: `/${locale}/toldya/delete-account`,
      icon: UserX,
      title: t('quickLinks.deleteAccount.title'),
      description: t('quickLinks.deleteAccount.description'),
    },
    {
      href: `/${locale}/toldya/child-safety`,
      icon: Baby,
      title: t('quickLinks.childSafety.title'),
      description: t('quickLinks.childSafety.description'),
    },
  ] as const;

  return (
    <>
      <Script
        id="toldya-support-faq-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tHero('title'), path: '/toldya' },
          { name: tCommon('support'), path: '/toldya/support' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-emerald-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-emerald-600">
              <h1 className="text-4xl font-bold text-emerald-700">{tHero('title')}</h1>
              <Link
                href={`/${locale}/toldya`}
                className="px-4 py-2 border-2 border-emerald-600 bg-white text-emerald-700 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors text-sm"
              >
                {tCommon('back')}
              </Link>
            </div>

            <div className={rtl ? 'text-right' : 'text-left'}>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h2>
              <p className="text-gray-600 mb-8">{t('subtitle')}</p>

              <section className="bg-white rounded-lg p-6 mb-8 border-l-4 border-emerald-600">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-600 mb-3">{t('contact.title')}</h3>
                    <p className="text-gray-700 mb-4">{t('contact.description')}</p>
                    <a
                      href={`mailto:${t('contact.email')}`}
                      className="inline-flex items-center gap-2 text-emerald-600 hover:opacity-80 font-semibold"
                    >
                      <Mail className="w-5 h-5" />
                      {t('contact.email')}
                    </a>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-bold text-emerald-600 mb-4">{t('quickLinks.title')}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {quickLinks.map(({ href, icon: Icon, title, description }) => (
                    <Link
                      key={href}
                      href={href}
                      className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-200"
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
                          <p className="text-sm text-gray-600">{description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-emerald-600 mb-6">{t('faq.title')}</h3>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <div key={num} className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">
                            {t(`faq.q${num}.question`)}
                          </h4>
                          <p className="text-gray-700 leading-relaxed">{t(`faq.q${num}.answer`)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-emerald-600 mt-8">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-600 mb-3">{t('additionalHelp.title')}</h3>
                    <p className="text-gray-700">{t('additionalHelp.description')}</p>
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
