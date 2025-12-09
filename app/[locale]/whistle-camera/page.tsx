import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';
import Link from 'next/link';
import { Camera, ArrowLeft, Construction } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import type { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';

  // Determine canonical URL based on localePrefix
  const canonicalUrl = locale === routing.defaultLocale && routing.localePrefix === 'as-needed'
    ? `${baseUrl}/whistle-camera`
    : `${baseUrl}/${locale}/whistle-camera`;

  // Build hreflang alternates
  const alternatesLanguages: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    const altPrefix = loc === routing.defaultLocale && routing.localePrefix === 'as-needed'
      ? ''
      : `/${loc}`;
    alternatesLanguages[loc] = `${baseUrl}${altPrefix}/whistle-camera`;
  });

  return {
    title: 'Whistle Camera - Coming Soon | Zuki Apps',
    description: 'Whistle Camera is an innovative camera application that brings new features and capabilities to mobile photography. Coming soon!',
    keywords: ['camera app', 'mobile photography', 'photo editing', 'camera filters', 'mobile app', 'photography'],
    robots: 'noindex, nofollow', // Noindex for coming soon pages
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesLanguages,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'he' ? 'he_IL' : locale,
      url: canonicalUrl,
      siteName: 'Zuki Apps',
      title: 'Whistle Camera - Coming Soon | Zuki Apps',
      description: 'Whistle Camera is an innovative camera application. Coming soon!',
      images: [
        {
          url: `${baseUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: 'Whistle Camera - Zuki Apps',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Whistle Camera - Coming Soon | Zuki Apps',
      description: 'Whistle Camera is an innovative camera application. Coming soon!',
      images: [`${baseUrl}/logo.png`],
    },
  };
}

export default async function WhistleCameraPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'home' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zukiapps.com';

  return (
    <>
      <BreadcrumbsStructuredData 
        locale={locale}
        items={[
          { name: 'Home', path: '/' },
          { name: 'Whistle Camera', path: '/whistle-camera' }
        ]}
      />
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Starry background effect */}
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        </div>

        {/* Language Switcher */}
        <div className="max-w-4xl mx-auto px-4 pt-4 flex justify-end relative z-[9999]">
          <LanguageSwitcher />
        </div>

        {/* Main Content */}
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center animate-fade-in">
              <Logo size="xl" />
            </div>

            {/* Back Button */}
            <div className="mb-8 flex justify-start">
              <Link
                href={locale === 'en' ? '/' : `/${locale}`}
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                aria-label="Back to home"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{locale === 'he' ? 'חזרה' : 'Back'}</span>
              </Link>
            </div>

            {/* App Icon */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl shadow-2xl flex items-center justify-center">
                  <Camera className="w-16 h-16 md:w-20 md:h-20 text-white" />
                </div>
              </div>
            </div>

            {/* Coming Soon Badge */}
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-full text-lg font-black animate-pulse">
                {t('comingSoon')}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-white">
              {t('whistleCamera.title')}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl font-semibold text-gray-300 mb-8">
              {t('whistleCamera.subtitle')}
            </p>

            {/* Under Construction Message */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 mb-8 border-2 border-green-600/30 hover:border-green-500/50 hover:shadow-3xl transition-all duration-300 backdrop-blur-sm bg-opacity-90">
              <div className="flex items-center justify-center mb-6">
                <Construction className="w-16 h-16 text-green-400" aria-hidden="true" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">
                {t('underConstruction')}
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-6">
                {t('underConstructionMessage')}
              </p>
            </div>

            {/* Back to Home */}
            <Link
              href={locale === 'en' ? '/' : `/${locale}`}
              className="inline-block bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-black text-lg hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 active:scale-95 border-2 border-blue-400"
              aria-label="Back to home"
            >
              {t('backToHome')}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
