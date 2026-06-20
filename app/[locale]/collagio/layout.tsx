import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { COLLAGIO_PILOT, COLLAGIO_PUBLISHED } from '@/lib/appPublishState';
import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';
import { COLLAGIO_ICON } from '@/lib/appIcons';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';

const COLLAGIO_INDEXABLE = COLLAGIO_PUBLISHED || COLLAGIO_PILOT;

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
  const t = await getTranslations({ locale, namespace: 'collagio' });
  const title = `${t('hero.title')} — ${t('hero.subtitle')} | Zuki Apps`;
  const description = t('hero.structuredDataDescription');
  const logoUrl = `${baseUrl}${COLLAGIO_ICON}`;

  return {
    title,
    description,
    keywords: [
      'Collagio',
      'photo collage maker',
      'collage app',
      'photo grid',
      'layout editor',
      'Instagram collage',
      'WhatsApp stickers',
      'Zuli Monsters',
      'Zuki Apps',
      'Flutter',
      'iOS',
      'Android',
      'com.zuki.apps.collagio',
    ],
    alternates: {
      canonical: buildCanonical(locale, '/collagio'),
      languages: buildLanguageAlternates('/collagio'),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/collagio'),
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{ url: logoUrl, width: 512, height: 512, alt: 'Collagio app icon' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@zuki_apps',
      site: '@zuki_apps',
    },
    robots: COLLAGIO_INDEXABLE
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : {
          index: false,
          follow: true,
        },
  };
}

export default async function CollagioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="collagio" />
      {children}
    </>
  );
}
