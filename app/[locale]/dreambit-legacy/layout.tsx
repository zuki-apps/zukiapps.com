import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'dreambitLegacy' });
  const baseUrl = getSiteUrl();
  const title = `${t('meta.title')} | Zuki Apps`;
  const description = t('meta.description');

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: buildCanonical(locale, '/dreambit-legacy'),
      languages: buildLanguageAlternates('/dreambit-legacy')
    },
    openGraph: {
      title,
      description,
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/dreambit-legacy'),
      siteName: 'Zuki Apps',
      type: 'website',
    },
    robots: { index: true, follow: true }
  };
}

export default function DreambitLegacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
