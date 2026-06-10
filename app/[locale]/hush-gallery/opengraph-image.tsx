import { OG_CONTENT_TYPE, OG_SIZE, renderAppOgBanner } from '@/lib/og/app-banner';
import { HUSH_GALLERY_ICON } from '@/lib/appIcons';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return renderAppOgBanner({ locale, namespace: 'hushGallery', iconPath: HUSH_GALLERY_ICON });
}
