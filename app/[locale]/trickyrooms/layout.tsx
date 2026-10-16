import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import {
  TRICKYROOMS_PILOT,
  TRICKYROOMS_PUBLISHED,
  TRICKYROOMS_UNDER_CONSTRUCTION,
} from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const TRICKYROOMS_INDEXABLE = TRICKYROOMS_PUBLISHED || TRICKYROOMS_PILOT;
const TRICKYROOMS_ROBOTS = TRICKYROOMS_INDEXABLE
  ? undefined
  : TRICKYROOMS_UNDER_CONSTRUCTION
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

  const t = await getTranslations({ locale, namespace: 'trickyRooms' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/trickyrooms',
    t,
    keywords: [
      'Tricky Rooms',
      'spot the mistake',
      "what's wrong puzzle",
      'find the mistake game',
      'com.zuki.apps.trickyrooms',
    ],
  });

  return {
    ...meta,
    robots: TRICKYROOMS_ROBOTS ?? meta.robots,
  };
}

export default async function TrickyRoomsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="trickyrooms" />
      <AppClientMessages locale={locale} appFolder="trickyrooms">
        {children}
      </AppClientMessages>
    </>
  );
}
