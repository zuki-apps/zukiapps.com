import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { buildCanonical, buildLanguageAlternates } from '@/lib/hreflang';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'toldya.deleteAccount' });

  return {
    title: `${t('title')} — ToldYa! | Zuki Apps`,
    description:
      'How to permanently delete your ToldYa! account and associated data — in-app steps and email request.',
    robots: { index: true, follow: true },
    alternates: {
      canonical: buildCanonical(locale, '/toldya/delete-account'),
      languages: buildLanguageAlternates('/toldya/delete-account'),
    },
  };
}

export default function ToldyaDeleteAccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
