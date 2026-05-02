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
  const t = await getTranslations({ locale, namespace: 'hushGallery.deleteAccount' });
  
  const title = locale === 'he' 
    ? 'מחיקת חשבון - Hush Gallery | Zuki Apps'
    : 'Delete Account - Hush Gallery | Zuki Apps';
  const description = locale === 'he' 
    ? 'למד כיצד למחוק את חשבון Hush Gallery שלך. הוראות מפורטות למחיקת חשבון וכל המידע הרלוונטי.'
    : 'Learn how to delete your Hush Gallery account. Detailed instructions for account deletion and all relevant information.';
  
  return {
    title,
    description,
    keywords: [
      'delete Hush Gallery account',
      'account deletion',
      'remove account',
      'delete user account',
      'Hush Gallery account management'
    ],
    alternates: {
      canonical: buildCanonical(locale, '/hush-gallery/delete-account'),
      languages: buildLanguageAlternates('/hush-gallery/delete-account'),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/hush-gallery/delete-account'),
      siteName: 'Zuki Apps',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function DeleteAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

