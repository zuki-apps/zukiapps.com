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
  'section9',
  'section10',
  'section11',
  'section12',
  'section13',
  'section14',
  'section15',
  'section16',
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

  const t = await getTranslations({ locale, namespace: 'toldya.privacy' });

  return {
    title: `${t('title')} — ToldYa! | Zuki Apps`,
    description: t('metaDescription'),
    robots: { index: true, follow: true },
    alternates: {
      canonical: buildCanonical(locale, '/toldya/privacy'),
      languages: buildLanguageAlternates('/toldya/privacy'),
    },
  };
}

export default async function ToldyaPrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'toldya.privacy' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tApp = await getTranslations({ locale, namespace: 'toldya.hero' });
  const tLegal = await getTranslations({ locale, namespace: 'toldya.legalNav' });
  const rtl = locale === 'he' || locale === 'ar';

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tApp('title'), path: '/toldya' },
          { name: tCommon('privacyPolicy'), path: '/toldya/privacy' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-emerald-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-emerald-600">
              <h1 className="text-4xl font-bold text-emerald-700">{tApp('title')}</h1>
              <Link
                href={`/${locale}/toldya`}
                className="px-4 py-2 border-2 border-emerald-600 bg-white text-emerald-700 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors text-sm"
              >
                {tCommon('back')}
              </Link>
            </div>

            <div className={rtl ? 'text-right' : 'text-left'}>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h1>
              <p className="text-gray-400 mb-4">{t('lastUpdated')}</p>
              <p className="text-gray-700 leading-relaxed mb-8">{t('intro')}</p>
              <p className="text-gray-700 mb-8">
                <Link href={`/${locale}/toldya/delete-account`} className="text-emerald-600 hover:underline font-semibold">
                  {tCommon('deleteAccount')}
                </Link>
              </p>

              <LegalSections
                sections={BODY_SECTIONS}
                listSectionKeys={['section2', 'section3']}
                withContent2={[
                  'section1',
                  'section3',
                  'section5',
                  'section6',
                  'section8',
                  'section9',
                  'section14',
                  'section15',
                  'section16',
                ]}
                t={t}
                tRaw={t.raw}
                rtl={rtl}
                contactSectionKey="sectionContact"
                emailLabel={tCommon('email')}
                addressLabel={tCommon('address')}
                contactExtraLinks={[
                  {
                    href: `/${locale}/toldya/terms`,
                    label: tCommon('termsOfService'),
                  },
                  {
                    href: `/${locale}/toldya/child-safety`,
                    label: tLegal('childSafety'),
                  },
                  {
                    href: `/${locale}/toldya/delete-account`,
                    label: tCommon('deleteAccount'),
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
