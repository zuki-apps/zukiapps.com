import { Metadata } from 'next';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates } from '@/lib/hreflang';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return {};
  }
  const path = `/zulist/invite/${id}`;
  return {
    alternates: {
      canonical: buildCanonical(locale, path),
      languages: buildLanguageAlternates(path),
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
