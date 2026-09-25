import type { Metadata } from 'next';
import { buildCanonical, buildLanguageAlternates, openGraphLocale } from '@/lib/hreflang';

const BRAND_SUFFIX = ' | Zuki Apps';
const MAX_TITLE = 58;
const MAX_META_DESC = 155;

type TranslateFn = {
  (key: string): string;
  has?: (key: string) => boolean;
};

/** Trim to Google SERP limits without cutting mid-word when possible. */
export function truncateSeoText(text: string, max: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  const slice = trimmed.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice).trim()}…`;
}

export function resolveProductSeoTitle(t: TranslateFn): string {
  if (t.has?.('hero.seoTitle')) return truncateSeoText(t('hero.seoTitle'), MAX_TITLE);
  const title = t('hero.title');
  const subtitle = t.has?.('hero.subtitle') ? t('hero.subtitle') : '';
  const combined = subtitle
    ? `${title} — ${subtitle}${BRAND_SUFFIX}`
    : `${title}${BRAND_SUFFIX}`;
  return truncateSeoText(combined, MAX_TITLE);
}

export function resolveProductMetaDescription(t: TranslateFn): string {
  if (t.has?.('hero.metaDescription')) {
    return truncateSeoText(t('hero.metaDescription'), MAX_META_DESC);
  }
  if (t.has?.('hero.structuredDataDescription')) {
    return truncateSeoText(t('hero.structuredDataDescription'), MAX_META_DESC);
  }
  return truncateSeoText(t('hero.description'), MAX_META_DESC);
}

export type BuildProductMetadataOptions = {
  locale: string;
  appPath: string;
  t: TranslateFn;
  keywords?: string[];
  /** Site-relative path, e.g. /images/eventtick/og.webp */
  ogImage?: string;
  /** Numeric App Store id for iOS Smart App Banner (Safari download prompt). */
  itunesAppId?: string;
};

export function buildProductPageMetadata({
  locale,
  appPath,
  t,
  keywords = [],
  ogImage,
  itunesAppId,
}: BuildProductMetadataOptions): Metadata {
  const title = resolveProductSeoTitle(t);
  const description = resolveProductMetaDescription(t);

  return {
    title,
    description,
    ...(keywords.length > 0 ? { keywords } : {}),
    ...(itunesAppId
      ? {
          other: {
            'apple-itunes-app': `app-id=${itunesAppId}, app-argument=${buildCanonical(locale, appPath)}`,
          },
        }
      : {}),
    alternates: {
      canonical: buildCanonical(locale, appPath),
      languages: buildLanguageAlternates(appPath),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, appPath),
      siteName: 'Zuki Apps',
      title,
      description,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@zuki_apps',
      site: '@zuki_apps',
      ...(ogImage ? { images: [ogImage] } : {}),
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
