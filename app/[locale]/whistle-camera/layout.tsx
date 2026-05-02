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
  const t = await getTranslations({ locale, namespace: 'whistleCamera' });
  
  const title = `${t('hero.title')} | Zuki Apps`;
  const description = `${t('hero.description')} Download Whistle Camera - Selfie & More for iOS. Whistle detection, incognito mode, and advanced camera controls.`;
  const logoUrl = `${baseUrl}/images/whistle-camera-icon.png`;
  
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
      'whistle trigger camera',
      'zuki',
    ],
    alternates: {
      canonical: buildCanonical(locale, '/whistle-camera'),
      languages: buildLanguageAlternates('/whistle-camera'),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/whistle-camera'),
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{ url: logoUrl, width: 870, height: 870, alt: 'Whistle Camera app icon' }],
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

export default function WhistleCameraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

