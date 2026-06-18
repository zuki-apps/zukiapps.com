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
  const t = await getTranslations({ locale, namespace: 'trackLedger' });

  const title = `${t('hero.title')} — ${t('hero.subtitle')} | Zuki Apps`;
  const description = t('hero.structuredDataDescription');
  const logoUrl = `${baseUrl}/images/track-ledger-icon.png`;

  return {
    title,
    description,
    keywords: [
      'Track Ledger',
      'GPS logger',
      'GNSS',
      'GPX export',
      'GeoJSON',
      'CSV export',
      'OpenStreetMap',
      'offline GPS',
      'track recording',
      'Flutter',
      'iOS',
      'Android',
      'com.zuki.apps.trackledger',
      'Zuki Apps',
      'zuki',
    ],
    alternates: {
      canonical: buildCanonical(locale, '/track-ledger'),
      languages: buildLanguageAlternates('/track-ledger'),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/track-ledger'),
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{ url: logoUrl, width: 1024, height: 1024, alt: 'Track Ledger app icon' }],
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

export default async function TrackLedgerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="track-ledger" />
      {children}
    </>
  );
}
