import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates, getSiteUrl } from '@/lib/hreflang';

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
  const description = `${t('hero.description')} Football Trivia Master: 210+ questions, 4 categories, difficulty levels, and stats. Coming to iOS and Android.`;

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
      'Zuki Apps'
    ],
    alternates: {
      canonical: buildCanonical(locale, '/football-trivia'),
      languages: buildLanguageAlternates('/football-trivia'),
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'he' ? 'he_IL' : locale,
      url: buildCanonical(locale, '/football-trivia'),
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{ url: `${baseUrl}/logo.png`, width: 1200, height: 630, alt: `${t('hero.title')} - Zuki Apps` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/logo.png`],
    },
    robots: { index: true, follow: true },
  };
}

export default function FootballTriviaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
