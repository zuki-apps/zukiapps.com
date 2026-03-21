import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates } from '@/lib/hreflang';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import type { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  const t = await getTranslations({ locale, namespace: 'dreambitLegacy.privacy' });
  return {
    title: `${t('metaTitle')} | Zuki Apps`,
    description: t('description'),
    robots: 'index, follow',
    alternates: {
      canonical: buildCanonical(locale, '/dreambit-legacy/privacy'),
      languages: buildLanguageAlternates('/dreambit-legacy/privacy')
    }
  };
}

export default async function DreambitLegacyPrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  const t = await getTranslations({ locale, namespace: 'dreambitLegacy.privacy' });
  const tRoot = await getTranslations({ locale, namespace: 'dreambitLegacy' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const sections = [
    { title: t('s1t'), body: t('s1b') },
    { title: t('s2t'), body: t('s2b') },
    { title: t('s3t'), body: t('s3b') },
    { title: t('s4t'), body: t('s4b') },
    { title: t('s5t'), body: `${t('s5b')} ${tRoot('email')}` }
  ];

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: tRoot('hero.title'), path: '/dreambit-legacy' },
          { name: tRoot('nav.privacy'), path: '/dreambit-legacy/privacy' }
        ]}
      />
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 twilight-sky-overlay" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
          <div className="flex justify-end mb-4">
            <LanguageSwitcher />
          </div>
          <div className="card-twilight !mb-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-indigo-400/25">
              <h1 className="text-2xl md:text-3xl font-black text-white">{t('title')}</h1>
              <Link
                href={`/${locale}/dreambit-legacy`}
                className="text-violet-300 hover:text-violet-200 text-sm font-semibold whitespace-nowrap"
              >
                ← {tRoot('nav.backHome')}
              </Link>
            </div>
            <p className="text-slate-400 text-sm mb-6">{t('lastUpdated')}</p>
            <p className="text-slate-300 leading-relaxed mb-8">{t('intro')}</p>
            <div className="space-y-8">
              {sections.map((s, i) => (
                <section key={i}>
                  <h2 className="text-lg font-black text-amber-200/90 mb-3">{s.title}</h2>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{s.body}</p>
                </section>
              ))}
            </div>
            <p className="mt-10 text-sm">
              <a href={`mailto:${tRoot('email')}`} className="text-violet-300 hover:underline">
                {tRoot('email')}
              </a>
            </p>
            <p className="mt-6 text-sm text-slate-400">
              <Link href={`/${locale}/dreambit-legacy/terms`} className="text-violet-300 hover:underline">
                {tRoot('nav.terms')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
