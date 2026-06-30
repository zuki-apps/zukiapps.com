'use client';

import dynamic from 'next/dynamic';

const sectionFallback = (
  <div className="min-h-24 w-full" aria-hidden="true" />
);

export const ProductMarketingSections = dynamic(
  () => import('@/components/ProductMarketingSections'),
  { loading: () => sectionFallback }
);

export const ProductPageNav = dynamic(
  () =>
    import('@/components/ProductMarketingSections').then((mod) => ({
      default: mod.ProductPageNav,
    })),
  { loading: () => sectionFallback }
);

export const DownloadStoreFab = dynamic(() => import('@/components/DownloadStoreFab'));
