import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';
import { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  };
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = getSiteUrl();
  const siteName = 'Zuki Apps';
  
  // Get translations for metadata
  const t = await getTranslations({ locale, namespace: 'home' });
  
  const title = `${t('subtitle')} | ${siteName}`;
  const description = `${t('subtitle')}. ${t('tagline')} Apps: ZuList, Hush Gallery, Whistle Camera, Power Interval Timer, Sudoku Fun Go, Football Trivia Master, Fun Facts Trivia, Bit Scope, TempoLab Pro. iOS & Android.`;
  const logoUrl = `${baseUrl}/logo.png`;
  
  return {
    title,
    description,
    keywords: [
      'mobile app developer',
      'Israel',
      'Flutter',
      'Zuki Apps',
      'ZuList',
      'ZuList - Manage & Share Lists',
      'Hush Gallery',
      'Hush Gallery - Hide Photos & Videos',
      'Whistle Camera',
      'Whistle Camera - Selfie & More',
      'Power Interval Timer',
      'Power Interval Timer - Tabata & HIIT',
      'Sudoku Fun Go',
      'Sudoku puzzle app',
      'Football Trivia',
      'World Football Trivia 2026',
      'Fun Facts Trivia',
      'trivia game',
      'quiz app',
      'Bit Scope',
      'Bit Scope - Bit calculator',
      'TempoLab Pro',
      'TempoLab Pro - Tempo & Pitch',
      'Tabata timer',
      'HIIT timer',
      'interval workout timer',
      'workout timer app',
      'shopping list app',
      'grocery list app',
      'private photo gallery',
      'secure photo storage',
      'smart camera app',
      'mobile applications',
      'iOS app developer',
      'Android app developer',
      'app store',
      'mobile app development'
    ],
    authors: [{ name: 'Zuki Apps' }],
    creator: 'Zuki Apps',
    publisher: 'Zuki Apps',
    metadataBase: new URL(baseUrl),
    other: {
      'format-detection': 'telephone=no',
    },
    alternates: {
      canonical: buildCanonical(locale, ''),
      languages: buildLanguageAlternates(''),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, ''),
      siteName,
      title,
      description,
      images: [
        {
          url: logoUrl,
          width: 1024,
          height: 1024,
          alt: 'Zuki Apps Logo',
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
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
      : {}),
    icons: {
      icon: [
        { url: '/logo.png', sizes: '512x512', type: 'image/png' },
        { url: '/logo.png', sizes: '192x192', type: 'image/png' },
        { url: '/logo.png', sizes: '32x32', type: 'image/png' }
      ],
      apple: [
        { url: '/logo.png', sizes: '180x180', type: 'image/png' }
      ],
      shortcut: '/logo.png',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  const logoUrl = `${baseUrl}/logo.png`;

  // Build structured data (JSON-LD)
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zuki Apps',
    url: baseUrl,
    logo: logoUrl,
    description: 'Mobile App Developer from Israel. Creating smart and intuitive mobile applications.',
    sameAs: [
      'https://www.instagram.com/zuki.apps/',
      'https://www.facebook.com/profile.php?id=61581736876235'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'zuki.apps.dev@gmail.com',
      contactType: 'Customer Service'
    }
  };

  // Build WebSite schema (for Google Search Console / rich results)
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Zuki Apps',
    url: baseUrl,
    description: 'Mobile App Developer from Israel. Apps: ZuList, Hush Gallery, Whistle Camera, Power Interval Timer, Sudoku Fun Go, Football Trivia Master, Fun Facts Trivia, Bit Scope, TempoLab Pro. iOS & Android.',
    publisher: {
      '@type': 'Organization',
      name: 'Zuki Apps',
      url: baseUrl,
    },
    inLanguage: routing.locales,
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      {children}
    </NextIntlClientProvider>
  );
}

