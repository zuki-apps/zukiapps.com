import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  };
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  const siteName = 'Zuki Apps';
  
  // Get translations for metadata
  const t = await getTranslations({ locale, namespace: 'home' });
  
  const title = `${t('subtitle')} | ${siteName}`;
  const description = `${t('subtitle')}. ${t('tagline')} ${t('zulist.description')}`;
  const logoUrl = `${baseUrl}/logo.png`;
  
  return {
    title,
    description,
    keywords: ['mobile app developer', 'Israel', 'Flutter', 'ZuList', 'shopping list app', 'mobile applications'],
    authors: [{ name: 'Zuki Apps' }],
    creator: 'Zuki Apps',
    publisher: 'Zuki Apps',
    metadataBase: new URL(baseUrl),
    other: {
      'format-detection': 'telephone=no',
    },
    alternates: {
      canonical: locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? baseUrl 
        : `${baseUrl}/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          loc === routing.defaultLocale && routing.localePrefix === 'as-needed' 
            ? baseUrl 
            : `${baseUrl}/${loc}`
        ])
      ),
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'he' ? 'he_IL' : locale,
      url: locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? baseUrl 
        : `${baseUrl}/${locale}`,
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
      icon: [
        { url: '/logo.png', sizes: '512x512', type: 'image/png' },
        { url: '/logo.png', sizes: '192x192', type: 'image/png' },
        { url: '/logo.png', sizes: '32x32', type: 'image/png' }
      ],
      apple: [
        { url: '/logo.png', sizes: '180x180', type: 'image/png' }
      ],
      shortcut: '/logo.png',
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';
  const logoUrl = `${baseUrl}/logo.png`;

  // Build structured data (JSON-LD)
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zuki Apps',
    url: baseUrl,
    logo: logoUrl,
    description: 'Mobile App Developer from Israel. Creating smart and intuitive mobile applications.',
    sameAs: [
      'https://www.instagram.com/zuki.apps/',
      'https://www.facebook.com/profile.php?id=61581736876235'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'zuki.apps.dev@gmail.com',
      contactType: 'Customer Service'
    }
  };

  // Build WebSite schema
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Zuki Apps',
    url: baseUrl,
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      {children}
    </NextIntlClientProvider>
  );
}

