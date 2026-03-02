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
  const t = await getTranslations({ locale, namespace: 'bitScope' });
  
  const title = `${t('hero.title')} - Bit & Number Calculator | Zuki Apps`;
  const description = `${t('hero.description')} Download Bit Scope for iOS and Android. Interactive bit editor, number format conversions, IEEE 754 floating-point support, and bitwise operations.`;
  const logoUrl = `${baseUrl}/images/bit-scope-icon.png`;
  
  return {
    title,
    description,
    keywords: [
      'Bit Scope',
      'Bit & Number Calculator',
      'bit calculator',
      'number converter',
      'binary calculator',
      'hexadecimal converter',
      'bitwise operations',
      'IEEE 754',
      'floating point calculator',
      'bit editor',
      'endianness converter',
      'number base converter',
      'developer tools',
      'programming calculator',
      'bit manipulation',
      'binary editor',
      'hex calculator',
      'octal converter',
      'decimal converter',
      'bit inspector',
      'number system converter'
    ],
    alternates: {
      canonical: locale === routing.defaultLocale && routing.localePrefix === 'as-needed' 
        ? `${baseUrl}/bit-scope` 
        : `${baseUrl}/${locale}/bit-scope`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          loc === routing.defaultLocale && routing.localePrefix === 'as-needed'
            ? `${baseUrl}/bit-scope`
            : `${baseUrl}/${loc}/bit-scope`
        ])
      )
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'he' ? 'he_IL' : locale,
      url: locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
        ? `${baseUrl}/bit-scope`
        : `${baseUrl}/${locale}/bit-scope`,
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{
        url: logoUrl,
        width: 1200,
        height: 630,
        alt: `${t('hero.title')} - Zuki Apps`,
      }],
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
  };
}

export default function BitScopeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
