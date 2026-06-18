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
  const t = await getTranslations({ locale, namespace: 'zulist' });

  const title = `${t('hero.title')} | Zuki Apps`;
  const description = t('hero.structuredDataDescription');
  const logoUrl = `${baseUrl}/images/zulist-icon.png`;
  return {
    title,
    description,
    keywords: [
      'ZuList',
      'ZuList - Manage & Share Lists',
      'shopping list app',
      'grocery list app',
      'collaborative shopping',
      'shared shopping list',
      'family shopping app',
      'Flutter app',
      'iOS shopping list',
      'Android shopping list',
      'real-time sync shopping',
      'offline shopping list',
      'smart shopping app',
      'shopping list manager',
      'grocery list manager',
      'family shopping list',
      'roommate shopping list',
      'event shopping list',
      'smart product recommendations',
      'shopping list with photos',
      'shopping list categories',
      'premium shopping list app',
      'zuki',
    ],
    alternates: {
      canonical: buildCanonical(locale, '/zulist'),
      languages: buildLanguageAlternates('/zulist'),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/zulist'),
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{ url: logoUrl, width: 435, height: 435, alt: 'ZuList app icon' }],
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

export default async function ZuListLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="zulist" />
      {children}
    </>
  );
}

