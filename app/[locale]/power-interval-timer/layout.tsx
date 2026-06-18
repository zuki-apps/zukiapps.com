import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const baseUrl = getSiteUrl();
  const t = await getTranslations({ locale, namespace: 'powerIntervalTimer' });
  
  const title = `${t('hero.title')} | Zuki Apps`;
  const description = t('hero.structuredDataDescription');
  const logoUrl = `${baseUrl}/images/power-interval-timer-icon.png`;
  
  return {
    title,
    description,
    keywords: [
      'Power Interval Timer',
      'Power Interval Timer - Tabata & HIIT',
      'interval timer',
      'Tabata timer',
      'HIIT timer',
      'workout timer',
      'exercise timer',
      'interval workout',
      'Tabata workout',
      'HIIT workout',
      'offline timer',
      'screen casting timer',
      'TV timer',
      'Apple TV timer',
      'Android TV timer',
      'workout app',
      'fitness timer',
      'exercise app',
      'interval training',
      'Tabata training',
      'HIIT training',
      'zuki',
    ],
    alternates: {
      canonical: buildCanonical(locale, '/power-interval-timer'),
      languages: buildLanguageAlternates('/power-interval-timer'),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/power-interval-timer'),
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{ url: logoUrl, width: 535, height: 535, alt: 'Power Interval Timer app icon' }],
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

export default async function PowerIntervalTimerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="power-interval-timer" />
      {children}
    </>
  );
}
