import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';
import { HUSH_GALLERY_ICON } from '@/lib/appIcons';
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
  const t = await getTranslations({ locale, namespace: 'hushGallery' });
  
  const title = `${t('hero.title')} — ${t('hero.subtitle')} | Zuki Apps`;
  const description = t('hero.structuredDataDescription');
  const logoUrl = `${baseUrl}${HUSH_GALLERY_ICON}`;
  
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
      'photo security app',
      'com.zuki.apps.hushGallery',
      '6756169045',
      'private photo vault',
      'hide photos WhatsApp',
      'zuki',
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
      images: [{ url: logoUrl, width: 512, height: 512, alt: 'Hush Gallery app icon' }],
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

export default async function HushGalleryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="hush-gallery" />
      {children}
    </>
  );
}

