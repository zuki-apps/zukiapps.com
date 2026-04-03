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
  const t = await getTranslations({ locale, namespace: 'hushGallery' });
  
  const title = `${t('hero.title')} - Private Photo Gallery | Zuki Apps`;
  const description = `${t('hero.description')} Download Hush Gallery - Hide Photos & Videos for iOS and Android. Secure, private photo storage with encryption and app lock.`;
  const logoUrl = `${baseUrl}/images/hush-gallery-icon.png`;
  
  return {
    title,
    description,
    keywords: [
      'Hush Gallery',
      'Hush Gallery - Hide Photos & Videos',
      'private photo gallery',
      'secure photo storage',
      'encrypted photo backup',
      'photo privacy app',
      'private gallery app',
      'secure photo app',
      'photo organization app',
      'hide photos app',
      'private video storage',
      'encrypted cloud backup',
      'photo lock app',
      'secure gallery app',
      'private photo vault',
      'photo privacy protection',
      'iOS photo privacy',
      'Android photo privacy',
      'photo encryption app',
      'secure photo gallery',
      'private photo app',
      'photo security app'
    ],
    alternates: {
      canonical: buildCanonical(locale, '/hush-gallery'),
      languages: buildLanguageAlternates('/hush-gallery'),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/hush-gallery'),
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

export default function HushGalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

