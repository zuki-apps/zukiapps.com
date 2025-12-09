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
  const t = await getTranslations({ locale, namespace: 'zulist.deleteData' });
  
  const title = locale === 'he' 
    ? 'מחיקת נתונים - ZuList | Zuki Apps'
    : 'Delete Data - ZuList | Zuki Apps';
  const description = locale === 'he' 
    ? 'למד כיצד למחוק את הנתונים שלך ב-ZuList. הוראות מפורטות למחיקת נתונים וכל המידע הרלוונטי.'
    : 'Learn how to delete your data in ZuList. Detailed instructions for data deletion and all relevant information.';
  
  return {
    title,
    description,
    keywords: [
      'delete ZuList data',
      'data deletion',
      'remove data',
      'delete user data',
      'ZuList data management',
      'GDPR data deletion'
    ],
    alternates: {
      canonical: locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? `${baseUrl}/zulist/delete-data` 
        : `${baseUrl}/${locale}/zulist/delete-data`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          loc === routing.defaultLocale && routing.localePrefix === 'as-needed'
            ? `${baseUrl}/zulist/delete-data`
            : `${baseUrl}/${loc}/zulist/delete-data`
        ])
      )
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'he' ? 'he_IL' : locale,
      url: locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
        ? `${baseUrl}/zulist/delete-data`
        : `${baseUrl}/${locale}/zulist/delete-data`,
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{
        url: `${baseUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Delete Data - ZuList | Zuki Apps',
      }],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function DeleteDataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

