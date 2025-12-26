import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
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
      canonical: locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? `${baseUrl}/hush-gallery/delete-account` 
        : `${baseUrl}/${locale}/hush-gallery/delete-account`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          loc === routing.defaultLocale && routing.localePrefix === 'as-needed'
            ? `${baseUrl}/hush-gallery/delete-account`
            : `${baseUrl}/${loc}/hush-gallery/delete-account`
        ])
      )
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'he' ? 'he_IL' : locale,
      url: locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
        ? `${baseUrl}/hush-gallery/delete-account`
        : `${baseUrl}/${locale}/hush-gallery/delete-account`,
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{
        url: `${baseUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Delete Account - Hush Gallery | Zuki Apps',
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

