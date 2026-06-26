import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates } from '@/lib/hreflang';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import StarField from '@/components/StarField';
import type { Metadata } from 'next';
import { ArrowLeft, Code, Mail, Sparkles } from 'lucide-react';
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

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });
  const tHome = await getTranslations({ locale, namespace: 'home' });
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
      <div className="min-h-screen relative overflow-hidden text-white">
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 twilight-sky-overlay" />
          <StarField />
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8 relative z-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Link
              href={`/${locale}`}
              className={`inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 font-medium transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className="w-5 h-5" />
              {tHome('backToHome')}
            </Link>
            <LanguageSwitcher />
          </div>

          <article className={isRtl ? 'text-right' : 'text-left'}>
            <h1 className="text-4xl md:text-5xl font-black mb-2">{t('title')}</h1>
            <p className="text-indigo-200 mb-8 text-lg">{t('subtitle')}</p>
            <p className="text-gray-300 mb-4 leading-relaxed">{t('p1')}</p>
            <p className="text-gray-300 mb-4 leading-relaxed">{t('p2')}</p>
            <p className="text-gray-300 mb-10 leading-relaxed">{t('p3')}</p>

            <section className="card-twilight mb-8" aria-labelledby="about-story-heading">
              <div className={`flex items-center gap-3 mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <Code className="w-8 h-8 text-blue-400 shrink-0" aria-hidden="true" />
                <h2 id="about-story-heading" className="text-3xl font-black text-white">
                  {tHome('story.title')}
                </h2>
              </div>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>{tHome('story.p1')}</p>
                <p>
                  <Link
                    href={`/${locale}/dreambit-legacy`}
                    className="font-semibold text-amber-300 hover:text-amber-200 underline decoration-amber-400/60 underline-offset-4 transition-colors"
                  >
                    {tHome('story.dreambitLegacyLink')}
                  </Link>
                </p>
                <p>{tHome('story.p2')}</p>
                <p>{tHome('story.p3')}</p>
              </div>
            </section>

            <section className="card-twilight mb-10" aria-labelledby="about-zuli-heading">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-12 h-12 text-blue-400" aria-hidden="true" />
              </div>
              <h2 id="about-zuli-heading" className="text-3xl font-black mb-4 text-white text-center">
                {tHome('zuliMonsters.title')}
              </h2>
              <p className="text-lg text-gray-300 mb-4 text-center">
                {tHome('zuliMonsters.description')}
              </p>
              <p className="text-gray-400 italic text-center">
                {tHome('zuliMonsters.more')}
              </p>
            </section>

            <h2 className="text-2xl font-semibold text-indigo-200 mb-3">{t('catalogTitle')}</h2>
            <p className="text-gray-400 mb-4">{t('catalogBody')}</p>
            <ul className={`list-disc space-y-2 mb-10 text-gray-300 ${isRtl ? 'list-inside' : 'list-inside'}`}>
              {ZUKI_SITE_APPS.map((app) => (
                <li key={app.path}>
                  <Link href={`/${locale}${app.path}`} className="text-indigo-300 hover:underline">
                    {app.name}
                  </Link>
                  <span className="text-gray-400"> — {app.description}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold text-indigo-200 mb-3">{t('contactTitle')}</h2>
            <p className="text-gray-300 mb-2">{t('contactBody')}</p>
            <a
              href={`mailto:${t('email')}`}
              className={`inline-flex items-center gap-2 text-indigo-300 hover:underline ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              <Mail className="w-4 h-4" />
              {t('email')}
            </a>
            <p className="text-gray-400 text-sm mt-4">{t('address')}</p>
          </article>
        </div>
      </div>
    </>
  );
}
