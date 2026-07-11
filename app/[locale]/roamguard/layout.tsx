import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import {
  ROAMGUARD_PILOT,
  ROAMGUARD_PUBLISHED,
  ROAMGUARD_UNDER_CONSTRUCTION,
} from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const ROAMGUARD_INDEXABLE = ROAMGUARD_PUBLISHED || ROAMGUARD_PILOT;
const ROAMGUARD_ROBOTS = ROAMGUARD_INDEXABLE
  ? undefined
  : ROAMGUARD_UNDER_CONSTRUCTION
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

  const t = await getTranslations({ locale, namespace: 'roamGuard' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/roamguard',
    t,
    keywords: [
      'Roam Guard',
      'travel data monitor',
      'eSIM data usage',
      'roaming alerts',
      'per-app mobile data',
      'Android travel',
      'data saver VPN',
      'com.zuki.apps.roamguard',
    ],
  });

  return {
    ...meta,
    robots: ROAMGUARD_ROBOTS ?? meta.robots,
  };
}

export default async function RoamGuardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="roamguard" />
      <AppClientMessages locale={locale} appFolder="roamguard">
        {children}
      </AppClientMessages>
    </>
  );
}
