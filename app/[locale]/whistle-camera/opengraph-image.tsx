import { OG_CONTENT_TYPE, OG_SIZE, renderAppOgBanner } from '@/lib/og/app-banner';
import { WHISTLE_CAMERA_ICON } from '@/lib/appIcons';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return renderAppOgBanner({ locale, namespace: 'whistleCamera', iconPath: WHISTLE_CAMERA_ICON });
}
