'use client';

import Script from 'next/script';
import { routing } from '@/routing';

export interface DreambitArchiveItem {
  title: string;
  googlePlayUrl: string;
}

interface DreambitArchiveStructuredDataProps {
  locale: string;
  archiveName: string;
  archiveDescription: string;
  items: DreambitArchiveItem[];
}

/**
 * ItemList JSON-LD for the Dreambit legacy archive (Google Play listings).
 */
export default function DreambitArchiveStructuredData({
  locale,
  archiveName,
  archiveDescription,
  items,
}: DreambitArchiveStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  const path = '/dreambit-legacy';
  const pageUrl =
    locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
      ? `${baseUrl}${path}`
      : `${baseUrl}/${locale}${path}`;

  const withPlay = items.filter((i) => /^https?:\/\//i.test(i.googlePlayUrl.trim()));
  if (withPlay.length === 0) return null;

  const itemListElement = withPlay.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.title,
    item: item.googlePlayUrl.trim(),
  }));

  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: archiveName,
    description: archiveDescription,
    numberOfItems: itemListElement.length,
    url: pageUrl,
    itemListElement,
  };

  return (
    <Script
      id="dreambit-archive-itemlist-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
