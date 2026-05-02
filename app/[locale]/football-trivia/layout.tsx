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
  const t = await getTranslations({ locale, namespace: 'footballTrivia' });

  const title = `${t('hero.title')} | Zuki Apps`;
  const description = t('hero.description');
  const logoUrl = `${baseUrl}/images/football-trivia-icon.png`;

  return {
    title,
    description,
    keywords: [
      'Football Trivia Master',
      '210+ questions',
      'football quiz',
      'World Cup trivia',
      'soccer trivia',
      'trivia game',
      'Zuki Apps',
      'zuki',
    ],
    alternates: {
      canonical: buildCanonical(locale, '/football-trivia'),
      languages: buildLanguageAlternates('/football-trivia'),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/football-trivia'),
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{ url: logoUrl, width: 370, height: 370, alt: 'Football Trivia Master app icon' }],
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

export default function FootballTriviaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
