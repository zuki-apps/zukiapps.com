import { routing } from '@/routing';
import { ANDROID_APPLICATION_ID_BY_PATH } from '@/lib/appStructuredData';
import { HUSH_GALLERY_ICON, WHISTLE_CAMERA_ICON, ZULI_COLLAGE_ICON } from '@/lib/appIcons';

interface SoftwareApplicationStructuredDataProps {
  locale: string;
  /** Canonical path segment, e.g. `/zulist` — used for stable URLs and icons. */
  appPath: string;
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
  /** Overrides lookup from appPath when needed. */
  androidApplicationId?: string;
  /** Product screenshot URLs (absolute or site-relative). */
  screenshotUrls?: string[];
}

export default function SoftwareApplicationStructuredData({
  locale,
  appPath,
  appName,
  appDescription,
  operatingSystem,
  applicationCategory,
  offers,
  aggregateRating,
  appStoreUrl,
  googlePlayUrl,
  androidApplicationId: androidApplicationIdProp,
  screenshotUrls = [],
}: SoftwareApplicationStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  const organizationId = `${baseUrl}/#organization`;

  const isValidListingUrl = (u: string | undefined) =>
    !!u && /^https?:\/\//i.test(u.trim());

  const normalizedPath = appPath.startsWith('/') ? appPath : `/${appPath}`;

  const iconByPath: Record<string, string> = {
    '/zulist': '/images/zulist-icon.png',
    '/hush-gallery': HUSH_GALLERY_ICON,
    '/whistle-camera': WHISTLE_CAMERA_ICON,
    '/power-interval-timer': '/images/power-interval-timer-icon.png',
    '/sudoku-puzzle': '/images/sudoku-puzzle-icon.png',
    '/tempo-lab-pro': '/images/tempo-lab-pro-icon.png',
    '/football-trivia': '/images/football-trivia-icon.png',
    '/fun-facts-trivia': '/images/fun-facts-trivia-icon.png',
    '/bit-scope': '/images/bit-scope-icon.png',
    '/track-ledger': '/images/track-ledger-icon.png',
    '/noise-meter-shusher': '/images/noise-meter-shusher-icon.png',
    '/paratrooper-blitz': '/images/paratrooper-blitz-icon.png',
    '/toldya': '/images/toldya-icon.png',
    '/zuli-collage': ZULI_COLLAGE_ICON,
    '/timesince': '/images/timesince-icon.png?v=1',
  };

  const appUrl = locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
    ? `${baseUrl}${normalizedPath}`
    : `${baseUrl}/${locale}${normalizedPath}`;

  const androidApplicationId =
    androidApplicationIdProp ?? ANDROID_APPLICATION_ID_BY_PATH[normalizedPath];

  const softwareApplicationData: {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    operatingSystem: string;
    applicationCategory: string;
    url: string;
    publisher: { '@id': string };
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
    identifier?: {
      '@type': string;
      name: string;
      value: string;
    };
  } = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: appName,
    description: appDescription,
    operatingSystem,
    applicationCategory,
    url: appUrl,
    publisher: {
      '@id': organizationId,
    },
  };

  const iconPath = iconByPath[normalizedPath];
  const images: string[] = [];
  if (iconPath) images.push(`${baseUrl}${iconPath}`);
  for (const shot of screenshotUrls) {
    const url = shot.startsWith('http') ? shot : `${baseUrl}${shot.startsWith('/') ? shot : `/${shot}`}`;
    if (!images.includes(url)) images.push(url);
  }
  if (images.length > 0) {
    softwareApplicationData.image = images;
  }

  if (androidApplicationId && isValidListingUrl(googlePlayUrl)) {
    softwareApplicationData.identifier = {
      '@type': 'PropertyValue',
      name: 'Android application ID',
      value: androidApplicationId,
    };
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
    <script
      id="software-application-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationData) }}
    />
  );
}

