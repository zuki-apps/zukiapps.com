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
  const t = await getTranslations({ locale, namespace: 'funFactsTrivia' });

  const title = `${t('hero.title')} — ${t('hero.subtitle')} | Zuki Apps`;
  const description = `${t('hero.subtitle')}. ${t('hero.description')}`;
  const logoUrl = `${baseUrl}/images/fun-facts-trivia-icon.png`;

  return {
    title,
    description,
    keywords: [
      'Fun Facts! Trivia',
      'fun facts quiz',
      'general knowledge trivia',
      'science trivia',
      'history trivia',
      'geography quiz',
      'offline trivia',
      'trivia game',
      'quiz app',
      'multiple choice quiz',
      'timed trivia',
      'trivia categories',
      'Flutter game',
      'iOS trivia',
      'Android trivia',
      'Zuki Apps',
      'Game Center',
      'Play Games',
      'Google Play Games',
    ],
    alternates: {
      canonical: buildCanonical(locale, '/fun-facts-trivia'),
      languages: buildLanguageAlternates('/fun-facts-trivia'),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/fun-facts-trivia'),
      siteName: 'Zuki Apps',
      title,
      description,
      images: [
        {
          url: logoUrl,
          width: 1200,
          height: 630,
          alt: `${t('hero.title')} — Zuki Apps`,
        },
      ],
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

export default function FunFactsTriviaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
