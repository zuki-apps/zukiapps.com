import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { ZULI_COLLAGE_PILOT, ZULI_COLLAGE_PUBLISHED } from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';

const ZULI_COLLAGE_INDEXABLE = ZULI_COLLAGE_PUBLISHED || ZULI_COLLAGE_PILOT;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'zuliCollage' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/zuli-collage',
    t,
    keywords: [
      'Zuli Collage',
      'photo collage maker',
      'collage app',
      'photo grid',
      'layout editor',
      'Instagram collage',
      'WhatsApp stickers',
      'Zuli Monsters',
      'Zuki Apps',
      'com.zuki.apps.collagio',
    ],
  });

  return {
    ...meta,
    robots: ZULI_COLLAGE_INDEXABLE
      ? meta.robots
      : {
          index: false,
          follow: true,
        },
  };
}

export default async function ZuliCollageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="zuli-collage" />
      {children}
    </>
  );
}
