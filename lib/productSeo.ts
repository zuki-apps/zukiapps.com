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
  if (t.has?.('hero.seoTitle')) return t('hero.seoTitle');
  const title = t('hero.title');
  const subtitle = t.has?.('hero.subtitle') ? t('hero.subtitle') : '';
  const combined = subtitle
    ? `${title} — ${subtitle}${BRAND_SUFFIX}`
    : `${title}${BRAND_SUFFIX}`;
  return truncateSeoText(combined, MAX_TITLE);
}

export function resolveProductMetaDescription(t: TranslateFn): string {
  if (t.has?.('hero.metaDescription')) return t('hero.metaDescription');
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
};

export function buildProductPageMetadata({
  locale,
  appPath,
  t,
  keywords = [],
}: BuildProductMetadataOptions): Metadata {
  const title = resolveProductSeoTitle(t);
  const description = resolveProductMetaDescription(t);

  return {
    title,
    description,
    ...(keywords.length > 0 ? { keywords } : {}),
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
    },
    twitter: {
      card: 'summary_large_image',
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
