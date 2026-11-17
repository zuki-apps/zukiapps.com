import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import {
  TRIGGERLAB_PILOT,
  TRIGGERLAB_PUBLISHED,
  TRIGGERLAB_UNDER_CONSTRUCTION,
} from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const TRIGGERLAB_INDEXABLE = TRIGGERLAB_PUBLISHED || TRIGGERLAB_PILOT;
const TRIGGERLAB_ROBOTS = TRIGGERLAB_INDEXABLE
  ? undefined
  : TRIGGERLAB_UNDER_CONSTRUCTION
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

  const t = await getTranslations({ locale, namespace: 'triggerLab' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/triggerlab',
    t,
    keywords: [
      'TriggerLab',
      'event timer',
      'millisecond stopwatch',
      'reaction time test',
      'lap timer',
      'com.zuki.apps.triggerlab',
    ],
  });

  return {
    ...meta,
    robots: TRIGGERLAB_ROBOTS ?? meta.robots,
  };
}

export default async function TriggerLabLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="triggerlab" />
      <AppClientMessages locale={locale} appFolder="triggerlab">
        {children}
      </AppClientMessages>
    </>
  );
}
