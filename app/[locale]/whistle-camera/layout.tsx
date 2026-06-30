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

  const t = await getTranslations({ locale, namespace: 'whistleCamera' });

  return buildProductPageMetadata({
    locale,
    appPath: '/whistle-camera',
    t,
    keywords: [
      'whistle camera',
      'hands-free camera',
      'hands-free selfie',
      'whistle to take photo',
      'pet photo app',
      'dog camera whistle',
      'selfie without timer',
    ],
  });
}

export default async function WhistleCameraLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="whistle-camera" />
      <AppClientMessages locale={locale} appFolder="whistle-camera">{children}</AppClientMessages>
    </>
  );
}
