import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates } from '@/lib/hreflang';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { ZUKI_SITE_APPS } from '@/lib/siteCatalog';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: buildCanonical(locale, '/about'),
      languages: buildLanguageAlternates('/about'),
    },
    robots: { index: true, follow: true },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  const t = await getTranslations({ locale, namespace: 'about' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const isRtl = locale === 'he' || locale === 'ar';

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zuki Apps',
    url: 'https://zukiapps.com',
    email: t('email'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Nachshol 36',
      addressLocality: 'SAAR',
      postalCode: '22805',
      addressCountry: 'IL',
    },
    sameAs: ['https://twitter.com/zuki_apps', 'https://www.instagram.com/zuki_apps/'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: t('title'), path: '/about' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-950 to-indigo-900 text-white">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-end">
            <LanguageSwitcher />
          </div>
          <article className={isRtl ? 'text-right' : 'text-left'}>
            <h1 className="text-4xl font-bold mb-2">{t('title')}</h1>
            <p className="text-indigo-200 mb-8">{t('subtitle')}</p>
            <p className="text-gray-300 mb-4 leading-relaxed">{t('p1')}</p>
            <p className="text-gray-300 mb-4 leading-relaxed">{t('p2')}</p>
            <p className="text-gray-300 mb-8 leading-relaxed">{t('p3')}</p>

            <h2 className="text-2xl font-semibold text-indigo-200 mb-3">{t('catalogTitle')}</h2>
            <p className="text-gray-400 mb-4">{t('catalogBody')}</p>
            <ul className="list-disc list-inside space-y-2 mb-8 text-gray-300">
              {ZUKI_SITE_APPS.map((app) => (
                <li key={app.path}>
                  <Link href={`/${locale}${app.path}`} className="text-indigo-300 hover:underline">
                    {app.name}
                  </Link>
                  <span className="text-gray-500"> — {app.description}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold text-indigo-200 mb-3">{t('contactTitle')}</h2>
            <p className="text-gray-300 mb-2">{t('contactBody')}</p>
            <a
              href={`mailto:${t('email')}`}
              className="inline-flex items-center gap-2 text-indigo-300 hover:underline"
            >
              <Mail className="w-4 h-4" />
              {t('email')}
            </a>
            <p className="text-gray-500 text-sm mt-4">{t('address')}</p>
          </article>
        </div>
      </div>
    </>
  );
}
