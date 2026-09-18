import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import {
  BLOCKIVA_PILOT,
  BLOCKIVA_PUBLISHED,
  BLOCKIVA_UNDER_CONSTRUCTION,
} from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const BLOCKIVA_INDEXABLE = BLOCKIVA_PUBLISHED || BLOCKIVA_PILOT;
const BLOCKIVA_ROBOTS = BLOCKIVA_INDEXABLE
  ? undefined
  : BLOCKIVA_UNDER_CONSTRUCTION
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

  const t = await getTranslations({ locale, namespace: 'blockiva' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/blockiva',
    t,
    keywords: [
      'Blockiva – Block Puzzle',
      'Blockiva',
      'block puzzle',
      'block puzzle game',
      'shifting rules',
      'casual puzzle',
      'iOS Android puzzle',
      'remove ads',
      'com.zuki.apps.blockiva',
    ],
  });

  return {
    ...meta,
    robots: BLOCKIVA_ROBOTS ?? meta.robots,
  };
}

export default async function BlockivaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="blockiva" />
      <AppClientMessages locale={locale} appFolder="blockiva">
        {children}
      </AppClientMessages>
    </>
  );
}
