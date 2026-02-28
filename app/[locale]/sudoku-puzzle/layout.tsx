import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  const t = await getTranslations({ locale, namespace: 'sudokuPuzzle' });
  
  const title = `${t('hero.title')} - Classic Sudoku Game | Zuki Apps`;
  const description = `${t('hero.description')} Sudoku Fun Go: 9×9 Sudoku with four difficulty levels, hints, notes, timer, and stats. Available on iOS and Android.`;
  const logoUrl = `${baseUrl}/logo.png`;
  
  return {
    title,
    description,
    keywords: [
      'Sudoku Fun Go',
      'Sudoku Puzzle',
      'sudoku game',
      '9x9 sudoku',
      'classic sudoku',
      'sudoku app',
      'sudoku iOS',
      'sudoku Android',
      'puzzle game',
      'number puzzle',
      'brain game',
      'sudoku with hints',
      'sudoku difficulty levels',
      'sudoku timer',
      'sudoku statistics',
      'Game Center sudoku',
      'Play Games sudoku',
      'offline sudoku',
      'free sudoku app',
      'Zuki Apps sudoku'
    ],
    alternates: {
      canonical: locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? `${baseUrl}/sudoku-puzzle` 
        : `${baseUrl}/${locale}/sudoku-puzzle`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          loc === routing.defaultLocale && routing.localePrefix === 'as-needed'
            ? `${baseUrl}/sudoku-puzzle`
            : `${baseUrl}/${loc}/sudoku-puzzle`
        ])
      )
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'he' ? 'he_IL' : locale,
      url: locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
        ? `${baseUrl}/sudoku-puzzle`
        : `${baseUrl}/${locale}/sudoku-puzzle`,
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

export default function SudokuPuzzleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
