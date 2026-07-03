import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { TIMESINCE_PILOT, TIMESINCE_PUBLISHED, TIMESINCE_UNDER_CONSTRUCTION } from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const TIMESINCE_INDEXABLE = TIMESINCE_PUBLISHED || TIMESINCE_PILOT;
const TIMESINCE_ROBOTS =
  TIMESINCE_INDEXABLE
    ? undefined
    : TIMESINCE_UNDER_CONSTRUCTION
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

  const t = await getTranslations({ locale, namespace: 'timeSince' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/timesince',
    t,
    keywords: [
      'Time Since',
      'streak tracker',
      'habit tracker',
      'day counter',
      'quit smoking',
      'sober days',
      "don't break the chain",
      'milestone tracker',
      'habit streak',
      'goal tracker',
      'com.zuki.apps.timesince',
    ],
  });

  return {
    ...meta,
    robots: TIMESINCE_ROBOTS ?? meta.robots,
  };
}

export default async function TimeSinceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="timesince" />
      <AppClientMessages locale={locale} appFolder="timesince">
        {children}
      </AppClientMessages>
    </>
  );
}
