import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import {
  TALLY_NUDGE_PILOT,
  TALLY_NUDGE_PUBLISHED,
  TALLY_NUDGE_UNDER_CONSTRUCTION,
} from '@/lib/appPublishState';
import { buildProductPageMetadata } from '@/lib/productSeo';
import ProductStructuredDataBlock from '@/components/ProductStructuredDataBlock';
import AppClientMessages from '@/components/AppClientMessages';

const TALLY_NUDGE_INDEXABLE = TALLY_NUDGE_PUBLISHED || TALLY_NUDGE_PILOT;
const TALLY_NUDGE_ROBOTS = TALLY_NUDGE_INDEXABLE
  ? undefined
  : TALLY_NUDGE_UNDER_CONSTRUCTION
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

  const t = await getTranslations({ locale, namespace: 'tallyNudge' });

  const meta = buildProductPageMetadata({
    locale,
    appPath: '/tally-nudge',
    t,
    keywords: [
      'TallyNudge',
      'tally counter',
      'clicker counter',
      'home screen widgets',
      'com.zuki.apps.tallynudge',
    ],
  });

  return {
    ...meta,
    robots: TALLY_NUDGE_ROBOTS ?? meta.robots,
  };
}

export default async function TallyNudgeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductStructuredDataBlock locale={locale} slug="tally-nudge" />
      <AppClientMessages locale={locale} appFolder="tally-nudge">
        {children}
      </AppClientMessages>
    </>
  );
}
