import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import {
  PHOTO_STAMP_PILOT,
  PHOTO_STAMP_PUBLISHED,
  PHOTO_STAMP_UNDER_CONSTRUCTION,
} from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const PHOTO_STAMP_INDEXABLE = PHOTO_STAMP_PUBLISHED || PHOTO_STAMP_PILOT;
const PHOTO_STAMP_ROBOTS = PHOTO_STAMP_INDEXABLE
  ? undefined
  : PHOTO_STAMP_UNDER_CONSTRUCTION
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

  const t = await getTranslations({ locale, namespace: 'photoStamp' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/photo-stamp',
    t,
    keywords: [
      'Photo Stamp',
      'date stamp',
      'photo timestamp',
      'location stamp',
      'EXIF stamp',
      'gallery photo stamp',
      'com.zuki.apps.photostamp',
    ],
  });

  return {
    ...meta,
    robots: PHOTO_STAMP_ROBOTS ?? meta.robots,
  };
}

export default async function PhotoStampLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="photo-stamp" />
      <AppClientMessages locale={locale} appFolder="photo-stamp">
        {children}
      </AppClientMessages>
    </>
  );
}
