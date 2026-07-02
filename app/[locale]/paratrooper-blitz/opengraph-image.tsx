import { localeStaticParams } from '@/lib/locale-static-params';
import { OG_CONTENT_TYPE, OG_SIZE, renderAppOgBanner } from '@/lib/og/app-banner';

export function generateStaticParams() {
  return localeStaticParams();
}

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return renderAppOgBanner({ locale, namespace: 'paratrooperBlitz', iconPath: '/images/paratrooper-blitz-icon.png' });
}
