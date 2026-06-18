import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const baseUrl = getSiteUrl();
  const t = await getTranslations({ locale, namespace: 'paratrooperBlitz' });

  const title = `${t('hero.title')} — ${t('hero.subtitle')} | Zuki Apps`;
  const description = t('hero.structuredDataDescription');
  const logoUrl = `${baseUrl}/images/paratrooper-blitz-icon.png`;

  return {
    title,
    description,
    keywords: [
      'Paratrooper Blitz',
      'arcade game',
      'classic DOS game',
      'mobile game',
      'leaderboards',
      'achievements',
      'Flutter',
      'iOS',
      'Android',
      'com.zuki.apps.paratrooperblitz',
      'Zuki Apps',
      'zuki',
    ],
    alternates: {
      canonical: buildCanonical(locale, '/paratrooper-blitz'),
      languages: buildLanguageAlternates('/paratrooper-blitz'),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/paratrooper-blitz'),
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{ url: logoUrl, width: 329, height: 329, alt: 'Paratrooper Blitz app icon' }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      creator: '@zuki_apps',
      site: '@zuki_apps',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function ParatrooperBlitzLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="paratrooper-blitz" />
      {children}
    </>
  );
}
