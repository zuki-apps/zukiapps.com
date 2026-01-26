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
  const t = await getTranslations({ locale, namespace: 'powerIntervalTimer' });
  
  const title = `${t('hero.title')} - Interval Workout Timer | Zuki Apps`;
  const description = `${t('hero.description')} Download Power Interval Timer - Tabata & HIIT for iOS and Android. Configurable workouts, multiple display modes, and screen casting support.`;
  const logoUrl = `${baseUrl}/images/power-interval-timer-icon.png`;
  
  return {
    title,
    description,
    keywords: [
      'Power Interval Timer',
      'Power Interval Timer - Tabata & HIIT',
      'interval timer',
      'Tabata timer',
      'HIIT timer',
      'workout timer',
      'exercise timer',
      'interval workout',
      'Tabata workout',
      'HIIT workout',
      'offline timer',
      'screen casting timer',
      'TV timer',
      'Apple TV timer',
      'Android TV timer',
      'workout app',
      'fitness timer',
      'exercise app',
      'interval training',
      'Tabata training',
      'HIIT training'
    ],
    alternates: {
      canonical: locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? `${baseUrl}/power-interval-timer` 
        : `${baseUrl}/${locale}/power-interval-timer`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          loc === routing.defaultLocale && routing.localePrefix === 'as-needed'
            ? `${baseUrl}/power-interval-timer`
            : `${baseUrl}/${loc}/power-interval-timer`
        ])
      )
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'he' ? 'he_IL' : locale,
      url: locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
        ? `${baseUrl}/power-interval-timer`
        : `${baseUrl}/${locale}/power-interval-timer`,
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

export default function PowerIntervalTimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
