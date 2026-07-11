import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import {
  QUESTIVO_PILOT,
  QUESTIVO_PUBLISHED,
  QUESTIVO_UNDER_CONSTRUCTION,
} from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const QUESTIVO_INDEXABLE = QUESTIVO_PUBLISHED || QUESTIVO_PILOT;
const QUESTIVO_ROBOTS = QUESTIVO_INDEXABLE
  ? undefined
  : QUESTIVO_UNDER_CONSTRUCTION
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

  const t = await getTranslations({ locale, namespace: 'questivo' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/questivo',
    t,
    keywords: [
      'Questivo',
      'scavenger hunt app',
      'quiz missions',
      'GPS checkpoint',
      'game code',
      'team building',
      'family quest',
      'com.zuki.apps.questivo',
    ],
  });

  return {
    ...meta,
    robots: QUESTIVO_ROBOTS ?? meta.robots,
  };
}

export default async function QuestivoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="questivo" />
      <AppClientMessages locale={locale} appFolder="questivo">
        {children}
      </AppClientMessages>
    </>
  );
}
