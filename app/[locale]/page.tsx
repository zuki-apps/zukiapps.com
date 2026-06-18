import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Mail, Sparkles, Code, Heart, Instagram, Facebook, Youtube } from 'lucide-react';
import dynamic from 'next/dynamic';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import AppsGrid from '@/components/AppsGrid';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import HomeFaq from '@/components/HomeFaq';
import StarField from '@/components/StarField';

const AppsCarousel = dynamic(() => import('@/components/AppsCarousel'), {
  ssr: false,
  loading: () => (
    <div
      className="relative w-full mb-12 max-w-4xl mx-auto min-h-[660px] rounded-2xl border border-indigo-500/20 bg-indigo-950/30"
      aria-busy="true"
      aria-label="Loading apps carousel"
    />
  ),
});

export const revalidate = 3600;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[{ name: tCommon('home'), path: '/' }]}
      />
      <div className="min-h-screen relative overflow-hidden">
        {/* Twilight sky + soft lights */}
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 twilight-sky-overlay" />
          <StarField />
        </div>

        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>

        {/* Language Switcher */}
        <div className="max-w-4xl mx-auto px-4 pt-4 flex justify-end relative z-[9999]">
          <LanguageSwitcher />
        </div>

        {/* Hero Section */}
        <section id="main-content" className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center animate-fade-in">
              <Logo size="xl" priority />
            </div>

            <div className="mb-8 animate-fade-in-delay">
              <h1 className="text-3xl md:text-4xl font-black mb-4 text-white">
                {t('subtitle')}
              </h1>
              <p className="text-lg md:text-xl font-semibold text-gray-300">
                {t('tagline')}
              </p>
            </div>

            {/* Apps Grid Section */}
            <AppsGrid locale={locale} />

            {/* Apps Carousel Section */}
            <AppsCarousel />

            {/* Story Section */}
            <div className="card-twilight text-left">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-blue-400" aria-hidden="true" />
                <h2 className="text-3xl font-black text-white">{t('story.title')}</h2>
              </div>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>{t('story.p1')}</p>
                <p>
                  <Link
                    href={`/${locale}/dreambit-legacy`}
                    className="font-semibold text-amber-300 hover:text-amber-200 underline decoration-amber-400/60 underline-offset-4 transition-colors"
                  >
                    {t('story.dreambitLegacyLink')}
                  </Link>
                </p>
                <p>{t('story.p2')}</p>
                <p>{t('story.p3')}</p>
              </div>
            </div>

            {/* Zuli Monsters Section */}
            <div className="card-twilight">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-12 h-12 text-blue-400" aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-black mb-4 text-white">{t('zuliMonsters.title')}</h2>
              <p className="text-lg text-gray-300 mb-4">
                {t('zuliMonsters.description')}
              </p>
              <p className="text-gray-400 italic">
                {t('zuliMonsters.more')}
              </p>
            </div>

            {/* Contact Section */}
            <div className="card-twilight !mb-0">
              <div className="flex items-center justify-center mb-6">
                <Mail className="w-12 h-12 text-blue-400" aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-black mb-6 text-white">{t('contact.title')}</h2>
              <p className="text-lg text-gray-300 mb-6">
                {t('contact.description')}
              </p>
              <div className="flex justify-center mb-6">
                <a
                  href="mailto:zuki.apps.dev@gmail.com"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg font-black hover:from-blue-400 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105 active:scale-95 border-2 border-blue-400"
                  aria-label={`${t('contact.sendEmail')} - zuki.apps.dev@gmail.com`}
                >
                  <Mail className="w-5 h-5" aria-hidden="true" />
                  {t('contact.sendEmail')}
                </a>
              </div>
              <div className="flex justify-center mb-6">
                <a
                  href="https://buymeacoffee.com/sivzuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:scale-105 active:scale-95 transition-transform duration-200"
                  aria-label={t('contact.support')}
                >
                  <Image
                    src="/images/buy-me-a-coffee-button.png"
                    alt={t('contact.support')}
                    width={145}
                    height={40}
                    className="h-auto"
                    loading="lazy"
                  />
                </a>
              </div>
              <p className="text-gray-400">
                {t('contact.email')}
              </p>
            </div>

            <HomeFaq locale={locale} />

            {/* Social Media Section */}
            <div className="card-twilight mt-12 !mb-0">
              <h2 className="text-3xl font-black mb-4 text-white text-center">{t('social.title')}</h2>
              <p className="text-lg text-gray-300 mb-8 text-center max-w-2xl mx-auto leading-relaxed">
                {t('social.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-6 items-center">
                <a
                  href="https://instagram.com/zuki.apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label={t('social.instagram')}
                >
                  <Instagram className="w-7 h-7 text-white" />
                </a>
                <a
                  href="https://www.tiktok.com/@zukiapps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 via-rose-500 to-gray-900 hover:from-cyan-400 hover:via-rose-400 hover:to-gray-800 transition-all hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label={t('social.tiktok')}
                >
                  <svg
                    className="w-7 h-7 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com/zuki.apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label={t('social.facebook')}
                >
                  <Facebook className="w-7 h-7 text-white" />
                </a>
                <a
                  href="https://www.youtube.com/@ZukiApps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 transition-all hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label={t('social.youtube')}
                >
                  <Youtube className="w-7 h-7 text-white" />
                </a>
                <a
                  href="https://whatsapp.com/channel/0029VbCgjkcDzgTDclgLLR0T"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-green-700 hover:from-emerald-400 hover:to-green-600 transition-all hover:scale-110 shadow-lg hover:shadow-xl"
                  aria-label={t('social.whatsapp')}
                >
                  <svg
                    className="w-7 h-7 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="twilight-footer-bar text-white py-8 px-4 mt-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 flex justify-center">
              <Logo size="md" />
            </div>
            <p className="text-gray-400 mb-2 max-w-2xl mx-auto leading-relaxed">
              {t.rich('footer.copyright', {
                pulse: (chunks) => (
                  <a
                    href="https://fitness-pulse.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors no-underline"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              {t('footer.tagline')}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
              <Link
                href={`/${locale}/dreambit-legacy`}
                className="text-gray-400 hover:text-amber-300 transition-colors"
              >
                Legacy Dreambit apps (Android)
              </Link>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <a
                href="https://play.google.com/store/apps/dev?id=7972373639235841172"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Google Play
              </a>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <Link
                href={`/${locale}/dsa-compliance`}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                {tCommon('dsaCompliance')}
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
