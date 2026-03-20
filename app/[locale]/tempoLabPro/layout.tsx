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
  const t = await getTranslations({ locale, namespace: 'tempoLabPro' });
  
  const title = `${t('hero.title')} | Zuki Apps`;
  const description = `${t('hero.description')} TempoLab Pro - tempo, pitch, and audio practice for musicians.`;
  const logoUrl = `${baseUrl}/images/tempo-lab-pro-icon.png`;
  
  return {
    title,
    description,
    keywords: [
      'TempoLab Pro',
      'tempo app',
      'BPM',
      'tap tempo',
      'pitch shift',
      'audio practice',
      'music practice',
      'tempo trainer',
      'metronome',
      'audio export',
      'music app',
      'Zuki Apps'
    ],
    alternates: {
      canonical: buildCanonical(locale, '/tempoLabPro'),
      languages: buildLanguageAlternates('/tempoLabPro'),
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'he' ? 'he_IL' : locale,
      url: buildCanonical(locale, '/tempoLabPro'),
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

export default function TempoLabProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
