'use client';

import Script from 'next/script';
import { routing } from '@/routing';

interface SoftwareApplicationStructuredDataProps {
  locale: string;
  appName: string;
  appDescription: string;
  operatingSystem: 'iOS' | 'Android' | 'iOS,Android';
  applicationCategory: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
  };
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
  };
  appStoreUrl?: string;
  googlePlayUrl?: string;
}

export default function SoftwareApplicationStructuredData({
  locale,
  appName,
  appDescription,
  operatingSystem,
  applicationCategory,
  offers,
  aggregateRating,
  appStoreUrl,
  googlePlayUrl,
}: SoftwareApplicationStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';

  const isValidListingUrl = (u: string | undefined) =>
    !!u && /^https?:\/\//i.test(u.trim());

  // Determine app URL based on app name
  let appPath = '/zulist';
  if (appName.includes('Hush Gallery')) {
    appPath = '/hush-gallery';
  } else if (appName.includes('Whistle Camera')) {
    appPath = '/whistle-camera';
  } else if (appName.includes('Power Interval Timer')) {
    appPath = '/power-interval-timer';
  } else if (appName.includes('Sudoku Fun Go')) {
    appPath = '/sudoku-puzzle';
  } else if (appName.includes('TempoLab Pro')) {
    appPath = '/tempoLabPro';
  } else if (appName.includes('Football Trivia') || appName.includes('Football Trivia Master')) {
    appPath = '/football-trivia';
  } else if (appName.includes('Fun Facts Trivia')) {
    appPath = '/fun-facts-trivia';
  } else if (appName.includes('Bit Scope')) {
    appPath = '/bit-scope';
  }

  const iconByPath: Record<string, string> = {
    '/zulist': '/images/zulist-icon.png',
    '/hush-gallery': '/images/hush-gallery-icon.png',
    '/whistle-camera': '/images/whistle-camera-icon.png',
    '/power-interval-timer': '/images/power-interval-timer-icon.png',
    '/sudoku-puzzle': '/images/sudoku-puzzle-icon.png',
    '/tempoLabPro': '/images/tempo-lab-pro-icon.png',
    '/football-trivia': '/images/football-trivia-icon.png',
    '/fun-facts-trivia': '/images/fun-facts-trivia-icon.png',
    '/bit-scope': '/images/bit-scope-icon.png',
  };

  const appUrl = locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
    ? `${baseUrl}${appPath}`
    : `${baseUrl}/${locale}${appPath}`;

  const softwareApplicationData: {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    operatingSystem: string;
    applicationCategory: string;
    url: string;
    publisher: {
      '@type': string;
      name: string;
      url: string;
    };
    offers?: {
      '@type': string;
      price: string;
      priceCurrency: string;
    };
    aggregateRating?: {
      '@type': string;
      ratingValue: number;
      ratingCount: number;
    };
    downloadUrl?: Array<{
      '@type': string;
      applicationCategory: string;
      operatingSystem: string;
      url: string;
    }>;
    applicationSubCategory?: string;
    softwareVersion?: string;
    image?: string[];
  } = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: appName,
    description: appDescription,
    operatingSystem,
    applicationCategory,
    url: appUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Zuki Apps',
      url: baseUrl,
    },
  };

  const iconPath = iconByPath[appPath];
  if (iconPath) {
    softwareApplicationData.image = [`${baseUrl}${iconPath}`];
  }

  if (offers) {
    softwareApplicationData.offers = {
      '@type': 'Offer',
      price: offers.price || '0',
      priceCurrency: offers.priceCurrency || 'USD',
    };
  }

  // Omit placeholder ratings (0/0) — Google rich-result guidelines require real user ratings.
  if (
    aggregateRating &&
    aggregateRating.ratingCount > 0 &&
    aggregateRating.ratingValue > 0 &&
    aggregateRating.ratingValue <= 5
  ) {
    softwareApplicationData.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      ratingCount: aggregateRating.ratingCount,
    };
  }

  const storeIos = appStoreUrl?.trim();
  const storeAndroid = googlePlayUrl?.trim();
  if (isValidListingUrl(storeIos) || isValidListingUrl(storeAndroid)) {
    softwareApplicationData.downloadUrl = [];
    if (isValidListingUrl(storeIos)) {
      softwareApplicationData.downloadUrl.push({
        '@type': 'SoftwareApplication',
        applicationCategory: 'MobileApplication',
        operatingSystem: 'iOS',
        url: storeIos!,
      });
    }
    if (isValidListingUrl(storeAndroid)) {
      softwareApplicationData.downloadUrl.push({
        '@type': 'SoftwareApplication',
        applicationCategory: 'MobileApplication',
        operatingSystem: 'Android',
        url: storeAndroid!,
      });
    }
  }

  return (
    <Script
      id="software-application-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationData) }}
    />
  );
}

