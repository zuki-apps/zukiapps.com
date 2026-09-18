import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates } from '@/lib/hreflang';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import LegalSections from '@/components/LegalSections';
import type { Metadata } from 'next';

const BODY_SECTIONS = [
  'section1',
  'section2',
  'section3',
  'section4',
  'section5',
  'section6',
  'section7',
  'section8',
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'ztlGuard.terms' });
  const tHero = await getTranslations({ locale, namespace: 'ztlGuard' });

  return {
    title: `${t('title')} — ${tHero('hero.subtitle')} | Zuki Apps`,
    description: t('metaDescription'),
    robots: { index: true, follow: true },
    alternates: {
      canonical: buildCanonical(locale, '/ztl-guard/terms'),
      languages: buildLanguageAlternates('/ztl-guard/terms'),
    },
  };
}

export default async function GeoCalcTermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'ztlGuard.terms' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tApp = await getTranslations({ locale, namespace: 'ztlGuard.hero' });
  const rtl = locale === 'he' || locale === 'ar';
  const brandName = tApp('subtitle');

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: brandName, path: '/ztl-guard' },
          { name: tCommon('termsOfService'), path: '/ztl-guard/terms' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-orange-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-orange-600">
              <h1 className="text-4xl font-bold text-orange-800">{brandName}</h1>
              <Link
                href={`/${locale}/ztl-guard`}
                className="px-4 py-2 border-2 border-orange-600 bg-white text-orange-800 rounded-lg hover:bg-orange-600 hover:text-white transition-colors text-sm"
              >
                {tCommon('back')}
              </Link>
            </div>

            <div className={rtl ? 'text-right' : 'text-left'}>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h1>
              <p className="text-gray-400 mb-4">{t('lastUpdated')}</p>
              <p className="text-gray-700 leading-relaxed mb-8">{t('intro')}</p>

              <LegalSections
                sections={BODY_SECTIONS}
                listSectionKeys={['section2', 'section5']}
                withContent2={['section1', 'section3', 'section4', 'section6']}
                t={t}
                tRaw={t.raw}
                rtl={rtl}
                contactSectionKey="sectionContact"
                emailLabel={tCommon('email')}
                addressLabel={tCommon('address')}
                contactExtraLinks={[
                  {
                    href: `/${locale}/ztl-guard/privacy`,
                    label: tCommon('privacyPolicy'),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
