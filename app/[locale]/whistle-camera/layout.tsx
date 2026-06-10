import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';
import { WHISTLE_CAMERA_ICON } from '@/lib/appIcons';
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
  const t = await getTranslations({ locale, namespace: 'whistleCamera' });
  
  const title = `${t('hero.title')} — ${t('hero.subtitle')} | Zuki Apps`;
  const description = t('hero.structuredDataDescription');
  const logoUrl = `${baseUrl}${WHISTLE_CAMERA_ICON}`;
  
  return {
    title,
    description,
    keywords: [
      'Whistle Camera',
      'whistle camera app',
      'hands-free selfie',
      'whistle to take photo',
      'whistle detection camera',
      'pet photo app',
      'group photo timer',
      'hands-free video',
      'com.zuki.apps.whistlecamera',
      '1037716421',
      'selfie without touching phone',
      'whistle trigger shutter',
      'camera app iOS Android',
      'zuki apps',
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
      images: [{ url: logoUrl, width: 512, height: 512, alt: 'Whistle Camera app icon' }],
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

export default async function WhistleCameraLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock
        locale={locale}
        namespace="whistleCamera"
        appPath="/whistle-camera"
        applicationCategory="PhotographyApplication"
        faqId="whistle-camera-faq-ld"
        howToId="whistle-camera-howto-ld"
      />
      {children}
    </>
  );
}

