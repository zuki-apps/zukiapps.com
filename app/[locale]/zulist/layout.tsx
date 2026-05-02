import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';

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

  const title = `${t('hero.title')} - Smart Shopping List App | Zuki Apps`;
  const description = `${t('hero.description')} Download ZuList - Manage & Share Lists for iOS and Android. Real-time collaboration, offline support, and smart recommendations.`;
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
      'premium shopping list app'
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

export default function ZuListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

