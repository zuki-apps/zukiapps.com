import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import {
  ZTL_GUARD_PILOT,
  ZTL_GUARD_PUBLISHED,
  ZTL_GUARD_UNDER_CONSTRUCTION,
} from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const ZTL_GUARD_INDEXABLE = ZTL_GUARD_PUBLISHED || ZTL_GUARD_PILOT;
const ZTL_GUARD_ROBOTS = ZTL_GUARD_INDEXABLE
  ? undefined
  : ZTL_GUARD_UNDER_CONSTRUCTION
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

  const t = await getTranslations({ locale, namespace: 'ztlGuard' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/ztl-guard',
    t,
    keywords: [
      'ZTLGuard',
      'Italy ZTL',
      'ZTL alerts',
      'zona a traffico limitato',
      'com.zuki.apps.ztlguard',
    ],
  });

  return {
    ...meta,
    robots: ZTL_GUARD_ROBOTS ?? meta.robots,
  };
}

export default async function ZTLGuardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="ztl-guard" />
      <AppClientMessages locale={locale} appFolder="ztl-guard">
        {children}
      </AppClientMessages>
    </>
  );
}
