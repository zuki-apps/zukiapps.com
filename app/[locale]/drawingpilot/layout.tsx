import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import {
  DRAWINGPILOT_PILOT,
  DRAWINGPILOT_PUBLISHED,
  DRAWINGPILOT_UNDER_CONSTRUCTION,
} from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const DRAWINGPILOT_INDEXABLE = DRAWINGPILOT_PUBLISHED || DRAWINGPILOT_PILOT;
const DRAWINGPILOT_ROBOTS = DRAWINGPILOT_INDEXABLE
  ? undefined
  : DRAWINGPILOT_UNDER_CONSTRUCTION
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

  const t = await getTranslations({ locale, namespace: 'drawingPilot' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/drawingpilot',
    t,
    keywords: [
      'DrawingPilot',
      'event timer',
      'millisecond stopwatch',
      'reaction time test',
      'lap timer',
      'com.zuki.apps.drawingpilot',
    ],
  });

  return {
    ...meta,
    robots: DRAWINGPILOT_ROBOTS ?? meta.robots,
  };
}

export default async function DrawingPilotLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="drawingpilot" />
      <AppClientMessages locale={locale} appFolder="drawingpilot">
        {children}
      </AppClientMessages>
    </>
  );
}
