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
  } else if (appName.includes('Bit Scope')) {
    appPath = '/bit-scope';
  }
  
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

  if (offers) {
    softwareApplicationData.offers = {
      '@type': 'Offer',
      price: offers.price || '0',
      priceCurrency: offers.priceCurrency || 'USD',
    };
  }

  if (aggregateRating) {
    softwareApplicationData.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      ratingCount: aggregateRating.ratingCount,
    };
  }

  if (appStoreUrl || googlePlayUrl) {
    softwareApplicationData.downloadUrl = [];
    if (appStoreUrl) {
      softwareApplicationData.downloadUrl.push({
        '@type': 'SoftwareApplication',
        applicationCategory: 'MobileApplication',
        operatingSystem: 'iOS',
        url: appStoreUrl,
      });
    }
    if (googlePlayUrl) {
      softwareApplicationData.downloadUrl.push({
        '@type': 'SoftwareApplication',
        applicationCategory: 'MobileApplication',
        operatingSystem: 'Android',
        url: googlePlayUrl,
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

