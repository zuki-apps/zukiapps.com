import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
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
  const t = await getTranslations({ locale, namespace: 'noiseMeterShusher' });

  const title = `${t('hero.title')} — ${t('hero.subtitle')} | Zuki Apps`;
  const description = `${t('hero.subtitle')}. ${t('hero.description')}`;
  const logoUrl = `${baseUrl}/images/noise-meter-shusher-icon.png`;

  return {
    title,
    description,
    keywords: [
      'Noise Meter — Shusher',
      'decibel meter',
      'noise meter app',
      'sound level',
      'dB meter',
      'noise scoring',
      'microphone',
      'CSV export',
      'Flutter',
      'iOS',
      'Android',
      'com.noisemeter.shusher.noise_meter_shusher',
      'Zuki Apps',
    ],
    alternates: {
      canonical: buildCanonical(locale, '/noise-meter-shusher'),
      languages: buildLanguageAlternates('/noise-meter-shusher'),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/noise-meter-shusher'),
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{ url: logoUrl, width: 387, height: 387, alt: 'Noise Meter — Shusher app icon' }],
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

export default function NoiseMeterShusherLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
