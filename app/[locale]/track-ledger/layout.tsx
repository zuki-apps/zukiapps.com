import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';

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
  const description = `${t('hero.subtitle')}. ${t('hero.description')}`;
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
      images: [
        {
          url: logoUrl,
          width: 1024,
          height: 1024,
          alt: `${t('hero.title')} — Zuki Apps`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [logoUrl],
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

export default function TrackLedgerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
