import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { COLLAGIO_PILOT, COLLAGIO_PUBLISHED } from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';

const COLLAGIO_INDEXABLE = COLLAGIO_PUBLISHED || COLLAGIO_PILOT;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'collagio' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/collagio',
    t,
    keywords: [
      'Collagio',
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
    robots: COLLAGIO_INDEXABLE
      ? meta.robots
      : {
          index: false,
          follow: true,
        },
  };
}

export default async function CollagioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="collagio" />
      {children}
    </>
  );
}
