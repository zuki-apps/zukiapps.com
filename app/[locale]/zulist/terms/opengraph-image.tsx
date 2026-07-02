import { getTranslations } from 'next-intl/server';
import { localeStaticParams, ogTextLocale } from '@/lib/locale-static-params';
import { OG_CONTENT_TYPE, OG_SIZE, renderLegalOgBanner } from '@/lib/og/app-banner';

export function generateStaticParams() {
  return localeStaticParams();
}

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: ogTextLocale(locale), namespace: 'zulist.terms' });
  return renderLegalOgBanner({
    title: t('title'),
    subtitle: 'ZuList · Zuki Apps',
    iconPath: '/logo.png',
  });
}
