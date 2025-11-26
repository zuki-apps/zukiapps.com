'use client';

import Script from 'next/script';
import { routing } from '@/routing';

interface BreadcrumbsStructuredDataProps {
  locale: string;
  items: Array<{ name: string; path: string }>;
}

export default function BreadcrumbsStructuredData({ locale, items }: BreadcrumbsStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const itemUrl = item.path.startsWith('/') 
        ? (locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
            ? `${baseUrl}${item.path}` 
            : `${baseUrl}/${locale}${item.path}`)
        : item.path;
      
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: itemUrl
      };
    })
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
    />
  );
}

