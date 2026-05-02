import { getTranslations } from 'next-intl/server';
import { OG_CONTENT_TYPE, OG_SIZE, renderLegalOgBanner } from '@/lib/og/app-banner';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hushGallery.deleteAccount' });
  return renderLegalOgBanner({
    title: t('title'),
    subtitle: 'Hush Gallery · Zuki Apps',
    iconPath: '/images/hush-gallery-icon.png',
  });
}
