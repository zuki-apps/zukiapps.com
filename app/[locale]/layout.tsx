import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';
import { buildSoftwareCatalogItemList } from '@/lib/siteCatalog';
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
  const description = `${t('subtitle')}. ${t('tagline')} Apps: ZuList, Hush Gallery, Whistle Camera, Power Interval Timer, Sudoku Fun Go, Football Trivia Master, Fun Facts Trivia, Bit Scope, Track Ledger (GPS logger), Noise Meter — Shusher, Paratrooper Blitz, TempoLab Pro. iOS & Android.`;
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
      'Track Ledger',
      'GPS logger',
      'GNSS tracker',
      'GPX GeoJSON',
      'OpenStreetMap',
      'Noise Meter — Shusher',
      'decibel meter',
      'noise meter',
      'Paratrooper Blitz',
      'arcade game',
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

  const organizationId = `${baseUrl}/#organization`;

  // Build structured data (JSON-LD); @id lets app pages reference the same publisher node.
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId,
    name: 'Zuki Apps',
    url: baseUrl,
    logo: logoUrl,
    description:
      'Independent mobile software publisher (Zuki Apps). Developer based in Israel; consumer apps on iOS and Android (Flutter). Product pages list each app, support contact, and legal policies.',
    areaServed: 'Worldwide',
    knowsAbout: [
      'Mobile applications',
      'iOS',
      'Android',
      'Flutter',
      'GPS logging',
      'Privacy-first apps',
    ],
    sameAs: [
      'https://www.instagram.com/zuki.apps/',
      'https://www.facebook.com/profile.php?id=61581736876235',
      'https://www.tiktok.com/@zukiapps',
      'https://www.youtube.com/@ZukiApps',
      'https://whatsapp.com/channel/0029VbCgjkcDzgTDclgLLR0T'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'zuki.apps.dev@gmail.com',
      contactType: 'Customer Service'
    }
  };

  // Build WebSite schema (for Google Search Console / rich results)
  const websiteId = `${baseUrl}/#website`;
  const catalogId = `${baseUrl}/#software-catalog`;
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    name: 'Zuki Apps',
    url: baseUrl,
    description:
      'Official site for Zuki Apps: ZuList, Hush Gallery, Whistle Camera, Power Interval Timer, Sudoku Fun Go, Football Trivia Master, Fun Facts Trivia, Bit Scope, Track Ledger (GPS/GNSS logger), Noise Meter — Shusher, Paratrooper Blitz, TempoLab Pro; plus DreamBit legacy archive. iOS and Android. Multilingual.',
    publisher: {
      '@id': organizationId,
    },
    inLanguage: routing.locales,
    isAccessibleForFree: true,
    mainEntity: {
      '@id': catalogId,
    },
  };

  const softwareCatalogList = buildSoftwareCatalogItemList(baseUrl);
  /** Single @graph is easier for crawlers to parse than three separate script blocks. */
  const stripCtx = (node: { [k: string]: unknown }) => {
    const { ['@context']: _c, ...rest } = node;
    return rest;
  };
  const schemaGraphLd = {
    '@context': 'https://schema.org',
    '@graph': [
      stripCtx(organizationData as { [k: string]: unknown }),
      stripCtx(websiteData as { [k: string]: unknown }),
      stripCtx(softwareCatalogList as { [k: string]: unknown }),
    ],
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <Script
        id="zuki-schema-org-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraphLd) }}
      />
      {children}
    </NextIntlClientProvider>
  );
}

