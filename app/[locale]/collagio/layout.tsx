import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { COLLAGIO_PUBLISHED } from '@/lib/appPublishState';
import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';

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
  const description = t('hero.description');
  const logoUrl = `${baseUrl}/images/collagio-icon.png`;

  return {
    title,
    description,
    keywords: [
      'Collagio',
      'photo collage',
      'collage maker',
      'photo grid',
      'layout',
      'Zuli Monsters',
      'stickers',
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
      card: 'summary',
      title,
      description,
      creator: '@zuki_apps',
      site: '@zuki_apps',
    },
    robots: COLLAGIO_PUBLISHED
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

export default function CollagioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
