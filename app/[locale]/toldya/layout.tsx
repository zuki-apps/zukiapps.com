import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/routing';
import { TOLDYA_PILOT, TOLDYA_PUBLISHED } from '@/lib/appPublishState';
import { buildCanonical, buildLanguageAlternates, getSiteUrl, openGraphLocale } from '@/lib/hreflang';
import { FaqStructuredData } from '@/components/FaqHowToStructuredData';
import { collectNumberedSupportFaq } from '@/lib/supportFaq';
import SoftwareApplicationStructuredData from '@/components/SoftwareApplicationStructuredData';
import AppClientMessages from '@/components/AppClientMessages';

const TOLDYA_INDEXABLE = TOLDYA_PUBLISHED || TOLDYA_PILOT;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const baseUrl = getSiteUrl();
  const t = await getTranslations({ locale, namespace: 'toldya' });
  const title = `${t('hero.title')} — ${t('hero.subtitle')} | Zuki Apps`;
  const description = t('hero.structuredDataDescription');
  const logoUrl = `${baseUrl}/images/toldya-icon.png`;

  return {
    title,
    description,
    keywords: [
      'ToldYa',
      'Told Ya',
      'ToldYa Double or Nothing',
      'predictions',
      'social predictions',
      'voting',
      'forecast',
      'reputation',
      'invite-only',
      'com.zuki.apps.toldya',
      '6756342206',
      'Zuki Apps',
      'Flutter',
      'iOS',
      'Android',
    ],
    alternates: {
      canonical: buildCanonical(locale, '/toldya'),
      languages: buildLanguageAlternates('/toldya'),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale(locale),
      url: buildCanonical(locale, '/toldya'),
      siteName: 'Zuki Apps',
      title,
      description,
      images: [{ url: logoUrl, width: 512, height: 512, alt: 'ToldYa! app icon' }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      creator: '@zuki_apps',
      site: '@zuki_apps',
    },
    robots: TOLDYA_INDEXABLE
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : {
          index: false,
          follow: true,
        },
  };
}

export default async function ToldyaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'toldya' });
  const tSupport = await getTranslations({ locale, namespace: 'toldya.support' });
  const faqItems = collectNumberedSupportFaq(tSupport);

  return (
    <>
      <SoftwareApplicationStructuredData
        locale={locale}
        appPath="/toldya"
        appName={t('hero.title')}
        appDescription={t('hero.structuredDataDescription')}
        operatingSystem="iOS,Android"
        applicationCategory="SocialNetworkingApplication"
        offers={{ price: '0', priceCurrency: 'USD' }}
        appStoreUrl={t('download.appStoreUrl')}
        googlePlayUrl={t('download.googlePlayUrl')}
      />
      {faqItems.length > 0 && <FaqStructuredData id="toldya-faq-ld" items={faqItems} />}
      <AppClientMessages locale={locale} appFolder="toldya">{children}</AppClientMessages>
    </>
  );
}