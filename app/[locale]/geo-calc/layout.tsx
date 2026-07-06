import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import {
  GEO_CALC_PILOT,
  GEO_CALC_PUBLISHED,
  GEO_CALC_UNDER_CONSTRUCTION,
} from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const GEO_CALC_INDEXABLE = GEO_CALC_PUBLISHED || GEO_CALC_PILOT;
const GEO_CALC_ROBOTS = GEO_CALC_INDEXABLE
  ? undefined
  : GEO_CALC_UNDER_CONSTRUCTION
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

  const t = await getTranslations({ locale, namespace: 'geoCalc' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/geo-calc',
    t,
    keywords: [
      'GEO Calc',
      'coordinate converter',
      'UTM',
      'MGRS',
      'WGS84',
      'geodesy',
      'Vincenty',
      'survey',
      'GPX',
      'waypoint',
      'offline map',
      'com.zuki.apps.geocalc',
    ],
  });

  return {
    ...meta,
    robots: GEO_CALC_ROBOTS ?? meta.robots,
  };
}

export default async function GeoCalcLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="geo-calc" />
      <AppClientMessages locale={locale} appFolder="geo-calc">
        {children}
      </AppClientMessages>
    </>
  );
}
