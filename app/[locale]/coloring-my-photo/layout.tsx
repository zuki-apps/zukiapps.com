import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import {
  COLORING_MY_PHOTO_PILOT,
  COLORING_MY_PHOTO_PUBLISHED,
  COLORING_MY_PHOTO_UNDER_CONSTRUCTION,
} from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const COLORING_MY_PHOTO_INDEXABLE = COLORING_MY_PHOTO_PUBLISHED || COLORING_MY_PHOTO_PILOT;
const COLORING_MY_PHOTO_ROBOTS = COLORING_MY_PHOTO_INDEXABLE
  ? undefined
  : COLORING_MY_PHOTO_UNDER_CONSTRUCTION
    ? { index: false, follow: true }
    : { index: false, follow: true };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'coloringMyPhoto' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/coloring-my-photo',
    t,
    keywords: [
      'Coloring My Photo',
      'color by number',
      'photo coloring page',
      'paint by number',
      'on-device photo art',
      'coloring book from photos',
      'com.zuki.apps.coloringmyphoto',
    ],
  });

  return {
    ...meta,
    robots: COLORING_MY_PHOTO_ROBOTS ?? meta.robots,
  };
}

export default async function ColoringMyPhotoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="coloring-my-photo" />
      <AppClientMessages locale={locale} appFolder="coloring-my-photo">
        {children}
      </AppClientMessages>
    </>
  );
}
