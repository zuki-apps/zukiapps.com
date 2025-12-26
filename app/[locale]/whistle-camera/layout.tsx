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
  const t = await getTranslations({ locale, namespace: 'whistleCamera' });
  
  const title = `${t('hero.title')} - Smart Camera App | Zuki Apps`;
  const description = `${t('hero.description')} Download Whistle Camera - Selfie & More for iOS. Whistle detection, incognito mode, and advanced camera controls.`;
  const logoUrl = `${baseUrl}/logo.png`;
  
  return {
    title,
    description,
    keywords: [
      'Whistle Camera',
      'Whistle Camera - Selfie & More',
      'smart camera app',
      'whistle detection camera',
      'incognito camera mode',
      'advanced camera controls',
      'mobile photography app',
      'camera app iOS',
      'smart photo capture',
      'whistle activated camera',
      'incognito photo capture',
      'private camera app',
      'selfie camera app',
      'innovative camera app',
      'photography app iOS',
      'camera with whistle detection',
      'discreet camera app',
      'smart camera features',
      'advanced photography app',
      'iOS camera app',
      'camera app with incognito',
      'whistle trigger camera'
    ],
    alternates: {
      canonical: locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? `${baseUrl}/whistle-camera` 
        : `${baseUrl}/${locale}/whistle-camera`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          loc === routing.defaultLocale && routing.localePrefix === 'as-needed'
            ? `${baseUrl}/whistle-camera`
            : `${baseUrl}/${loc}/whistle-camera`
        ])
      )
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'he' ? 'he_IL' : locale,
      url: locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
        ? `${baseUrl}/whistle-camera`
        : `${baseUrl}/${locale}/whistle-camera`,
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{
        url: logoUrl,
        width: 1200,
        height: 630,
        alt: `${t('title')} - Zuki Apps`,
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

export default function WhistleCameraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

