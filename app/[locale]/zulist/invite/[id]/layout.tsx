import { Metadata } from 'next';
import { routing } from '@/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return {};
  }
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  const path = `/zulist/invite/${id}`;
  const canonicalUrl =
    locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
      ? `${baseUrl}${path}`
      : `${baseUrl}/${locale}${path}`;
  return {
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          loc === routing.defaultLocale && routing.localePrefix === 'as-needed'
            ? `${baseUrl}${path}`
            : `${baseUrl}/${loc}${path}`,
        ])
      ),
    },
    robots: { index: false, follow: true },
  };
}

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
