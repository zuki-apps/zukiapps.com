import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { TOLDYA_PUBLISHED } from '@/lib/appPublishState';
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
  const t = await getTranslations({ locale, namespace: 'toldya' });
  const title = `${t('hero.title')} — ${t('hero.subtitle')} | Zuki Apps`;
  const description = t('hero.description');
  const logoUrl = `${baseUrl}/images/toldya-icon.png`;

  return {
    title,
    description,
    keywords: [
      'ToldYa',
      'Told Ya',
      'predictions',
      'social predictions',
      'voting',
      'forecast',
      'reputation',
      'invite-only',
      'Zuki Apps',
      'Flutter',
      'iOS',
      'Android',
    ],
    alternates: {
      canonical: buildCanonical(locale, '/toldya'),
      languages: buildLanguageAlternates('/toldya'),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/toldya'),
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{ url: logoUrl, width: 512, height: 512, alt: 'ToldYa! app icon' }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      creator: '@zuki_apps',
      site: '@zuki_apps',
    },
    robots: TOLDYA_PUBLISHED
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

export default function ToldyaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
