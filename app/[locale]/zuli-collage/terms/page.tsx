import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates } from '@/lib/hreflang';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import LegalSections from '@/components/LegalSections';
import { zuliCollageBrandName } from '@/lib/zuliCollageBrand';
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
  'section9',
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

  const t = await getTranslations({ locale, namespace: 'zuliCollage.terms' });
  const tHero = await getTranslations({ locale, namespace: 'zuliCollage' });
  const brand = zuliCollageBrandName(tHero);

  return {
    title: `${t('title')} — ${brand} | Zuki Apps`,
    description: t('metaDescription'),
    robots: { index: true, follow: true },
    alternates: {
      canonical: buildCanonical(locale, '/zuli-collage/terms'),
      languages: buildLanguageAlternates('/zuli-collage/terms'),
    },
  };
}

export default async function ZuliCollageTermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'zuliCollage.terms' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tApp = await getTranslations({ locale, namespace: 'zuliCollage.hero' });
  const rtl = locale === 'he' || locale === 'ar';
  const brandName = zuliCollageBrandName(tApp);

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: brandName, path: '/zuli-collage' },
          { name: tCommon('termsOfService'), path: '/zuli-collage/terms' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-rose-50 to-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-rose-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-rose-600">
              <h1 className="text-4xl font-bold text-rose-700">{brandName}</h1>
              <Link
                href={`/${locale}/zuli-collage`}
                className="px-4 py-2 border-2 border-rose-600 bg-white text-rose-700 rounded-lg hover:bg-rose-600 hover:text-white transition-colors text-sm"
              >
                {tCommon('back')}
              </Link>
            </div>

            <div className={rtl ? 'text-right' : 'text-left'}>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h1>
              <p className="text-gray-400 mb-6">{t('lastUpdated')}</p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
                <p className="text-gray-700 font-semibold">{t('intro')}</p>
              </div>

              <LegalSections
                sections={BODY_SECTIONS}
                listSectionKeys={['section2', 'section6']}
                withContent2={['section1', 'section3', 'section4', 'section5', 'section7']}
                t={t}
                tRaw={t.raw}
                rtl={rtl}
                contactSectionKey="sectionContact"
                emailLabel={tCommon('email')}
                addressLabel={tCommon('address')}
                contactExtraLinks={[
                  {
                    href: `/${locale}/zuli-collage/privacy`,
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
