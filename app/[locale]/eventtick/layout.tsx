import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import {
  EVENTTICK_PILOT,
  EVENTTICK_PUBLISHED,
  EVENTTICK_UNDER_CONSTRUCTION,
} from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const EVENTTICK_INDEXABLE = EVENTTICK_PUBLISHED || EVENTTICK_PILOT;
const EVENTTICK_ROBOTS = EVENTTICK_INDEXABLE
  ? undefined
  : EVENTTICK_UNDER_CONSTRUCTION
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

  const t = await getTranslations({ locale, namespace: 'eventTick' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/eventtick',
    t,
    keywords: [
      'EventTick',
      'countdown',
      'countdown widgets',
      'event countdown',
      'home screen widgets',
      'com.zuki.apps.eventtick',
    ],
  });

  return {
    ...meta,
    robots: EVENTTICK_ROBOTS ?? meta.robots,
  };
}

export default async function EventTickLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="eventtick" />
      <AppClientMessages locale={locale} appFolder="eventtick">
        {children}
      </AppClientMessages>
    </>
  );
}
