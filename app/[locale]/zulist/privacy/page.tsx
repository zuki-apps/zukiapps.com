import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates } from '@/lib/hreflang';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import LegalSections from '@/components/LegalSections';
import type { Metadata } from 'next';

// New keys (not section1–8) so untranslated locales fall back to the current
// English text instead of mixing it with the retired translated sections.
const BODY_SECTIONS = [
  'collect',
  'use',
  'sharing',
  'providers',
  'ads',
  'device',
  'retention',
  'rights',
  'children',
  'security',
  'changes',
] as const;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'zulist.privacy' });

  return {
    title: `${t('title')} — ZuList | Zuki Apps`,
    description: t('metaDescription'),
    robots: 'index, follow',
    alternates: {
      canonical: buildCanonical(locale, '/zulist/privacy'),
      languages: buildLanguageAlternates('/zulist/privacy'),
    },
  };
}

export default async function PrivacyPolicyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'zulist.privacy' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tApp = await getTranslations({ locale, namespace: 'zulist.hero' });
  const rtl = locale === 'he' || locale === 'ar';

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tApp('title'), path: '/zulist' },
          { name: tCommon('privacyPolicy'), path: '/zulist/privacy' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Language Switcher */}
        <div className="mb-6 flex justify-end">
          <LanguageSwitcher />
        </div>

        <div className="bg-blue-50 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-blue-600">
            <h1 className="text-4xl font-bold text-blue-600">{tApp('title')}</h1>
            <div className="flex gap-2">
              <Link
                href={`/${locale}/zulist`}
                className="px-4 py-2 border-2 border-blue-600 bg-white text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm"
              >
                {tCommon('back')}
              </Link>
            </div>
          </div>

          <div className={rtl ? 'text-right' : 'text-left'}>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-gray-400 mb-4">
              {t('lastUpdatedOn')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">{t('intro')}</p>

            <LegalSections
              sections={BODY_SECTIONS}
              listSectionKeys={['collect', 'use', 'providers']}
              withContent2={['use', 'sharing', 'ads', 'device', 'retention']}
              t={t}
              tRaw={t.raw}
              rtl={rtl}
              headingClassName="text-blue-600"
              contactSectionKey="contact"
              emailLabel={tCommon('email')}
              addressLabel={tCommon('address')}
              contactExtraLinks={[
                { href: `/${locale}/zulist/terms`, label: tCommon('termsOfService') },
                { href: `/${locale}/zulist/delete-account`, label: tCommon('deleteAccount') },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

