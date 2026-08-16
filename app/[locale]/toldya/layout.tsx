import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { TOLDYA_PILOT, TOLDYA_PUBLISHED } from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const TOLDYA_INDEXABLE = TOLDYA_PUBLISHED || TOLDYA_PILOT;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'toldya' });
  const meta = buildProductPageMetadata({
    locale,
    appPath: '/toldya',
    t,
    keywords: [
      'ToldYa',
      'social predictions',
      'Arena voting',
      'com.zuki.apps.toldya',
      'Zuki Apps',
    ],
  });

  return {
    ...meta,
    robots: TOLDYA_INDEXABLE
      ? meta.robots
      : { index: false, follow: true },
  };
}

export default async function ToldyaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="toldya" />
      <AppClientMessages locale={locale} appFolder="toldya">
        {children}
      </AppClientMessages>
    </>
  );
}
