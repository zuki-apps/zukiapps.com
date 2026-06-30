import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'powerIntervalTimer' });

  return buildProductPageMetadata({
    locale,
    appPath: '/power-interval-timer',
    t,
  });
}

export default async function PowerIntervalTimerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="power-interval-timer" />
      <AppClientMessages locale={locale} appFolder="power-interval-timer">{children}</AppClientMessages>
    </>
  );
}