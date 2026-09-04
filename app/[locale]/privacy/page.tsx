import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates } from '@/lib/hreflang';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import StarField from '@/components/StarField';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { PUBLISHER_PHONE_E164 } from '@/lib/publisherContact';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  const t = await getTranslations({ locale, namespace: 'sitePrivacy' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: buildCanonical(locale, '/privacy'),
      languages: buildLanguageAlternates('/privacy'),
    },
    robots: { index: true, follow: true },
  };
}

export default async function SitePrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'sitePrivacy' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tHome = await getTranslations({ locale, namespace: 'home' });
  const isRtl = locale === 'he' || locale === 'ar';
  const sections = ['s1', 's2', 's3', 's4', 's5'] as const;

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: t('title'), path: '/privacy' },
        ]}
      />
      <div className="min-h-screen relative overflow-hidden text-white">
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 twilight-sky-overlay" />
          <StarField />
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8 relative z-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Link
              href={`/${locale}`}
              className={`inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className="w-5 h-5" aria-hidden />
              {tHome('backToHome')}
            </Link>
            <LanguageSwitcher />
          </div>

          <article className={isRtl ? 'text-right' : 'text-left'}>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">{t('title')}</h1>
            <p className="text-indigo-200 mb-2 text-lg">{t('subtitle')}</p>
            <p className="text-indigo-200/80 text-sm mb-8">{t('lastUpdated')}</p>

            <div className="space-y-8">
              {sections.map((key) => (
                <section key={key} className="card-twilight" aria-labelledby={`privacy-${key}`}>
                  <h2 id={`privacy-${key}`} className="text-2xl font-extrabold text-white mb-3">
                    {t(`${key}.title`)}
                  </h2>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">{t(`${key}.body`)}</p>
                </section>
              ))}
              <p className="text-sm text-indigo-200">
                <a
                  href={`tel:${PUBLISHER_PHONE_E164}`}
                  className="underline underline-offset-2 hover:text-white"
                  dir="ltr"
                >
                  {PUBLISHER_PHONE_E164}
                </a>
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
