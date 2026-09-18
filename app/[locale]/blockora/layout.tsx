import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import {
  BLOCKORA_PILOT,
  BLOCKORA_PUBLISHED,
  BLOCKORA_UNDER_CONSTRUCTION,
} from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const BLOCKORA_INDEXABLE = BLOCKORA_PUBLISHED || BLOCKORA_PILOT;
const BLOCKORA_ROBOTS = BLOCKORA_INDEXABLE
  ? undefined
  : BLOCKORA_UNDER_CONSTRUCTION
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

  const t = await getTranslations({ locale, namespace: 'blockora' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/blockora',
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
    robots: BLOCKORA_ROBOTS ?? meta.robots,
  };
}

export default async function BlockoraLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="blockora" />
      <AppClientMessages locale={locale} appFolder="blockora">
        {children}
      </AppClientMessages>
    </>
  );
}
