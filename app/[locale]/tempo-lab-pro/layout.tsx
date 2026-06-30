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

  const t = await getTranslations({ locale, namespace: 'tempoLabPro' });

  return buildProductPageMetadata({
    locale,
    appPath: '/tempo-lab-pro',
    t,
  });
}

export default async function TempoLabProLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="tempo-lab-pro" />
      <AppClientMessages locale={locale} appFolder="tempo-lab-pro">{children}</AppClientMessages>
    </>
  );
}