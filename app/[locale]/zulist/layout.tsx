import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  const t = await getTranslations({ locale, namespace: 'zulist' });
  
  const title = `${t('hero.title')} - Smart Shopping List App | Zuki Apps`;
  const description = t('hero.description');
  const logoUrl = `${baseUrl}/images/zulist-icon.png`;
  
  return {
    title,
    description,
    keywords: [
      'shopping list app',
      'grocery list',
      'collaborative shopping',
      'Flutter app',
      'iOS app',
      'Android app',
      'family shopping',
      'real-time sync',
      'offline shopping list',
      'smart shopping',
      'shared shopping list',
      'ZuList'
    ],
    alternates: {
      canonical: locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? `${baseUrl}/zulist` 
        : `${baseUrl}/${locale}/zulist`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          loc === routing.defaultLocale && routing.localePrefix === 'as-needed'
            ? `${baseUrl}/zulist`
            : `${baseUrl}/${loc}/zulist`
        ])
      )
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'he' ? 'he_IL' : locale,
      url: locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
        ? `${baseUrl}/zulist`
        : `${baseUrl}/${locale}/zulist`,
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{
        url: logoUrl,
        width: 1200,
        height: 630,
        alt: `${t('hero.title')} - Zuki Apps`,
      }],
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

export default function ZuListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

