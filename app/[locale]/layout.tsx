import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { Metadata } from 'next';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  const siteName = 'Zuki Apps';
  const title = 'Zuki Apps - Mobile App Developer from Israel';
  const description = 'Zuki Apps - Mobile App Developer from Israel. Creating smart and intuitive mobile applications. ZuList - Smart shopping list app.';
  const logoUrl = `${baseUrl}/logo.png`;
  
  return {
    title,
    description,
    keywords: ['mobile app developer', 'Israel', 'Flutter', 'ZuList', 'shopping list app', 'mobile applications'],
    authors: [{ name: 'Zuki Apps' }],
    creator: 'Zuki Apps',
    publisher: 'Zuki Apps',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'he': '/he',
        'de': '/de',
        'es': '/es',
        'it': '/it',
        'pt': '/pt',
        'ru': '/ru',
        'fr': '/fr',
        'ja': '/ja',
        'ko': '/ko',
        'ar': '/ar',
        'zh': '/zh',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}`,
      siteName,
      title,
      description,
      images: [
        {
          url: logoUrl,
          width: 1200,
          height: 630,
          alt: 'Zuki Apps Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [logoUrl],
      creator: '@zuki_apps',
      site: '@zuki_apps',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'vptLaNoDGkQvPt_cWG3D-SYIa253GayWGOhN'
    },
    icons: {
      icon: '/logo.png',
      apple: '/logo.png',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

