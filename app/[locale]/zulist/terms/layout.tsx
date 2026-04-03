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

  const baseUrl = getSiteUrl();
  const t = await getTranslations({ locale, namespace: 'zulist.terms' });
  
  const title = `${t('title')} - ZuList | Zuki Apps`;
  const description = locale === 'he' 
    ? 'תנאי השימוש של ZuList - אפליקציית רשימת קניות חכמה. קרא את התנאים וההגבלות לשימוש באפליקציה.'
    : 'Terms of Service for ZuList - Smart shopping list application. Read the terms and conditions for using the app.';
  
  return {
    title,
    description,
    keywords: [
      'ZuList terms',
      'terms of service',
      'shopping list app terms',
      'app terms and conditions',
      'ZuList legal',
      'user agreement'
    ],
    alternates: {
      canonical: buildCanonical(locale, '/zulist/terms'),
      languages: buildLanguageAlternates('/zulist/terms'),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/zulist/terms'),
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{
        url: `${baseUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'ZuList Terms of Service - Zuki Apps',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

