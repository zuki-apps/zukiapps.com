import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates } from '@/lib/hreflang';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import type { Metadata } from 'next';

const STEPS = ['step1', 'step2', 'step3', 'step4', 'step5'] as const;
const DELETED = ['deleted1', 'deleted2', 'deleted3'] as const;
const KEPT = ['kept1', 'kept2', 'kept3', 'kept4'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'ztlGuard.deleteAccount' });
  const tHero = await getTranslations({ locale, namespace: 'ztlGuard.hero' });

  return {
    title: `${t('title')} — ${tHero('subtitle')} | Zuki Apps`,
    description: t('metaDescription'),
    robots: { index: true, follow: true },
    alternates: {
      canonical: buildCanonical(locale, '/ztl-guard/delete-account'),
      languages: buildLanguageAlternates('/ztl-guard/delete-account'),
    },
  };
}

export default async function ZtlGuardDeleteAccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'ztlGuard.deleteAccount' });
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
          { name: t('linkLabel'), path: '/ztl-guard/delete-account' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>

          <div className="bg-orange-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-orange-600">
              <h1 className="text-4xl font-bold text-orange-800">ZTLGuard</h1>
              <Link
                href={`/${locale}/ztl-guard`}
                className="px-4 py-2 border-2 border-orange-600 bg-white text-orange-800 rounded-lg hover:bg-orange-600 hover:text-white transition-colors text-sm"
              >
                {tCommon('back')}
              </Link>
            </div>

            <div className={rtl ? 'text-right' : 'text-left'}>
              <p className="text-sm font-semibold text-orange-800 mb-2">Zuki Apps</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('title')}</h1>
              <p className="text-gray-700 leading-relaxed mb-8">{t('intro')}</p>

              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8">
                <strong className="text-yellow-900 block mb-2">{t('warningTitle')}</strong>
                <p className="text-yellow-900">{t('warningBody')}</p>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-orange-800 mb-4">{t('stepsTitle')}</h2>
                <ol className="list-decimal list-inside space-y-3 bg-white rounded-lg p-6 text-gray-800">
                  {STEPS.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-orange-800 mb-4">{t('deletedTitle')}</h2>
                <p className="text-gray-700 mb-3">{t('deletedIntro')}</p>
                <ul className="list-disc list-inside space-y-2 text-gray-800">
                  {DELETED.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-orange-800 mb-4">{t('keptTitle')}</h2>
                <p className="text-gray-700 mb-3">{t('keptIntro')}</p>
                <ul className="list-disc list-inside space-y-2 text-gray-800">
                  {KEPT.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-orange-800 mb-4">{t('retentionTitle')}</h2>
                <p className="text-gray-700 leading-relaxed">{t('retentionBody')}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-orange-800 mb-4">{t('guestTitle')}</h2>
                <p className="text-gray-700 leading-relaxed">{t('guestBody')}</p>
              </section>

              <section className="bg-gray-100 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-orange-800 mb-4">{t('contactTitle')}</h2>
                <p className="text-gray-700 mb-2">
                  <a href="mailto:zuki.apps.dev@gmail.com" className="text-orange-800 underline">
                    zuki.apps.dev@gmail.com
                  </a>
                </p>
                <p className="text-gray-700">
                  <Link href={`/${locale}/ztl-guard/privacy`} className="text-orange-800 underline">
                    {tCommon('privacyPolicy')}
                  </Link>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
