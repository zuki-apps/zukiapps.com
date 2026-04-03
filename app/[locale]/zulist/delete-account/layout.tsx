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
  const t = await getTranslations({ locale, namespace: 'zulist.deleteAccount' });
  
  const title = locale === 'he' 
    ? 'מחיקת חשבון - ZuList | Zuki Apps'
    : 'Delete Account - ZuList | Zuki Apps';
  const description = locale === 'he' 
    ? 'למד כיצד למחוק את חשבון ZuList שלך. הוראות מפורטות למחיקת חשבון וכל המידע הרלוונטי.'
    : 'Learn how to delete your ZuList account. Detailed instructions for account deletion and all relevant information.';
  
  return {
    title,
    description,
    keywords: [
      'delete ZuList account',
      'account deletion',
      'remove account',
      'delete user account',
      'ZuList account management'
    ],
    alternates: {
      canonical: buildCanonical(locale, '/zulist/delete-account'),
      languages: buildLanguageAlternates('/zulist/delete-account'),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/zulist/delete-account'),
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{
        url: `${baseUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Delete Account - ZuList | Zuki Apps',
      }],
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

