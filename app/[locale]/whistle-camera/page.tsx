'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import {
  ArrowLeft,
  Camera,
  Volume2,
  Sliders,
  Image as ImageIcon,
  Smartphone,
  Mail,
  ExternalLink,
  CheckCircle2,
  Globe,
  Sparkles,
  PawPrint,
  Users,
  ChefHat,
  Mountain,
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import AppIconFrame from '@/components/AppIconFrame';
import StoreDownloadBadges from '@/components/StoreDownloadBadges';
import { WHISTLE_CAMERA_ICON } from '@/lib/appIcons';
import StarBackground from '@/components/StarBackground';
import OtherZukiApps from '@/components/OtherZukiApps';
import ScreenshotLightbox from '@/components/ScreenshotLightbox';
import { DownloadStoreFab } from '@/lib/lazyProductComponents';

type ScreenshotItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  category: string;
};

const FEATURE_ICONS = {
  whistle: Volume2,
  calibration: Sliders,
  photoVideo: Camera,
  gallery: ImageIcon,
  shortcuts: Smartphone,
} as const;

const USE_CASE_ICONS = [PawPrint, Users, ChefHat, Mountain] as const;

export default function WhistleCameraPage() {
  const t = useTranslations('whistleCamera');
  const tCommon = useTranslations('common');
  const tHome = useTranslations('home');
  const locale = useLocale();

  const faqItems = (t.raw('faq.items') as Array<{ question: string; answer: string }> | undefined) ?? [];
  const howToSteps =
    (t.raw('howToUse.steps') as Array<{ number: string; title: string; description: string }> | undefined) ?? [];
  const screenshotItems = (t.raw('screenshots.items') as ScreenshotItem[] | undefined) ?? [];
  const featureKeys = Object.keys(FEATURE_ICONS) as Array<keyof typeof FEATURE_ICONS>;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages = screenshotItems.map((item) => ({
    src: item.image,
    alt: item.alt,
    title: item.title,
    description: item.description,
  }));

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <StarBackground />

        <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end relative z-50">
          <LanguageSwitcher />
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-4 flex items-center justify-between relative z-0">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('back')}
          </Link>
          <Link href={`/${locale}`} className="flex items-center">
            <Logo size="sm" />
          </Link>
        </div>

        <section className="py-12 px-4 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <AppIconFrame
                src={WHISTLE_CAMERA_ICON}
                alt={t('download.appIconAlt')}
                sizes="(max-width: 768px) 96px, 128px"
                priority
                edgeToEdge
                className="mx-auto mb-6"
                boxClassName="w-24 h-24 md:w-32 md:h-32"
                frameClassName="rounded-[22%] overflow-hidden shadow-2xl"
              />
            </div>
            <div className="inline-flex items-center gap-2 bg-yellow-900/50 border border-yellow-500/30 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4" />
              {t('hero.badge')}
            </div>
            <h1
              className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))' }}
            >
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-gray-300 max-w-3xl mx-auto">{t('hero.subtitle')}</p>
            <p className="text-lg text-gray-400 mb-4 max-w-3xl mx-auto">{t('hero.description')}</p>
            <p className="text-sm text-amber-400/90 mb-8">{t('hero.socialProof')}</p>
            <div className="flex justify-center gap-4 text-sm flex-wrap mb-8">
              <Link href={`/${locale}/whistle-camera/privacy`} className="text-amber-400 hover:text-amber-300 underline">
                {tCommon('privacyPolicy')}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={`/${locale}/whistle-camera/terms`} className="text-amber-400 hover:text-amber-300 underline">
                {tCommon('termsOfService')}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={`/${locale}/whistle-camera/support`} className="text-amber-400 hover:text-amber-300 underline">
                {tCommon('support')}
              </Link>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-400" aria-label="Page sections">
              <a href="#features" className="hover:text-amber-300">{t('pageNav.features')}</a>
              <span className="text-gray-400" aria-hidden>|</span>
              <a href="#screenshots" className="hover:text-amber-300">{t('pageNav.screenshots')}</a>
              <span className="text-gray-400" aria-hidden>|</span>
              <a href="#how-to" className="hover:text-amber-300">{t('pageNav.howTo')}</a>
              <span className="text-gray-400" aria-hidden>|</span>
              <a href="#use-cases" className="hover:text-amber-300">{t('pageNav.useCases')}</a>
              <span className="text-gray-400" aria-hidden>|</span>
              <a href="#manual" className="hover:text-amber-300">{t('pageNav.manual')}</a>
              <span className="text-gray-400" aria-hidden>|</span>
              <a href="#tips" className="hover:text-amber-300">{t('pageNav.tips')}</a>
              <span className="text-gray-400" aria-hidden>|</span>
              <a href="#faq" className="hover:text-amber-300">{t('pageNav.faq')}</a>
              <span className="text-gray-400" aria-hidden>|</span>
              <a href="#download" className="hover:text-amber-300">{t('pageNav.download')}</a>
            </nav>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10" id="features">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">{t('features.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureKeys.map((key) => {
                const Icon = FEATURE_ICONS[key];
                return (
                  <div
                    key={key}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 border-2 border-amber-600/30 hover:border-amber-500/50 transition-all backdrop-blur-sm bg-opacity-90"
                  >
                    <div className="bg-amber-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-amber-500/50">
                      <Icon className="w-8 h-8 text-amber-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{t(`features.${key}.title`)}</h3>
                    <p className="text-gray-300 mb-4">{t(`features.${key}.description`)}</p>
                    <ul className="text-sm text-gray-400 space-y-2">
                      {(t.raw(`features.${key}.items`) as string[]).map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10" id="screenshots">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">{t('screenshots.title')}</h2>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">{t('screenshots.subtitle')}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {screenshotItems
                .filter((item) => item.category === 'features')
                .map((item) => {
                  const idx = screenshotItems.findIndex((s) => s.id === item.id);
                  return (
                    <figure
                      key={item.id}
                      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border-2 border-amber-600/30 hover:border-amber-500/50 transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(idx)}
                        className="w-full max-w-[220px] mx-auto block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-t-xl"
                        aria-label={`View larger: ${item.title}`}
                      >
                        <Image
                          src={item.image}
                          alt={item.alt}
                          width={640}
                          height={1280}
                          unoptimized
                          sizes="220px"
                          className="w-full h-auto block"
                        />
                      </button>
                      <figcaption className="p-4">
                        <h4 className="font-bold text-white mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </figcaption>
                    </figure>
                  );
                })}
            </div>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10" id="how-to">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">{t('howToUse.title')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {howToSteps.map((step, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 border-amber-600/30 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-600/30 border-2 border-amber-500/50 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-amber-400">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10" id="use-cases">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">{t('useCases.title')}</h2>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">{t('useCases.subtitle')}</p>
            <div className="grid md:grid-cols-2 gap-6">
              {(t.raw('useCases.items') as Array<{ title: string; description: string }>).map((item, i) => {
                const Icon = USE_CASE_ICONS[i] ?? Sparkles;
                return (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 border-amber-600/30 flex gap-4"
                  >
                    <div className="bg-amber-600/20 p-3 rounded-lg h-fit border border-amber-500/30">
                      <Icon className="w-8 h-8 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10" id="manual">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">{t('manual.title')}</h2>
            <p className="text-center text-gray-400 mb-12">{t('manual.subtitle')}</p>
            <div className="grid md:grid-cols-2 gap-6">
              {(t.raw('manual.sections') as Array<{ title: string; steps: string[] }>).map((section, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 border-amber-600/30">
                  <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
                    {section.steps.map((step, j) => (
                      <li key={j}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10" id="tips">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">{t('tips.title')}</h2>
            <p className="text-center text-gray-400 mb-12">{t('tips.subtitle')}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(t.raw('tips.items') as Array<{ title: string; description: string }>).map((tip, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 border-amber-600/30">
                  <h3 className="text-lg font-bold text-amber-300 mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-amber-600/30 rounded-xl p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-amber-400" />
                <h2 className="text-3xl font-bold text-white">{t('premium.title')}</h2>
              </div>
              <p className="text-gray-300 text-center mb-6">{t('premium.description')}</p>
              <ul className="space-y-2 text-gray-300 text-sm max-w-lg mx-auto">
                {(t.raw('premium.items') as string[]).map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-amber-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10" id="faq">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">{t('faq.title')}</h2>
            <p className="text-center text-gray-400 mb-8">{t('faq.subtitle')}</p>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details key={i} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-amber-600/30 group">
                  <summary className="cursor-pointer p-5 font-semibold text-white list-none flex justify-between items-center">
                    {item.question}
                    <span className="text-amber-400 ml-2 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href={`/${locale}/whistle-camera/support`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-colors"
              >
                {t('faq.viewAllSupport')}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-amber-600/30 rounded-xl p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Globe className="w-8 h-8 text-amber-400" />
                <h2 className="text-3xl font-bold text-white">{t('languages.title')}</h2>
              </div>
              <p className="text-lg text-gray-300">{t('languages.description')}</p>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 relative z-10" id="download">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">{t('download.title')}</h2>
            <p className="text-lg text-gray-300 mb-8">{t('download.description')}</p>
            <StoreDownloadBadges
              appStoreUrl={t('download.appStoreUrl')}
              googlePlayUrl={t('download.googlePlayUrl')}
              appStoreAlt={t('download.appStoreAlt')}
              googlePlayAlt={t('download.googlePlayAlt')}
              fallbackBorderClass="border-amber-600/30"
              utmContent="whistle-camera"
            />
          </div>
        </section>

        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-1 gap-6 max-w-md mx-auto">
              <Link
                href={`/${locale}/whistle-camera/support`}
                className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 border-amber-600/30 flex items-center gap-4 group ${locale === 'he' ? 'flex-row-reverse' : ''}`}
              >
                <div className="bg-amber-600/30 p-3 rounded-lg border border-amber-500/50">
                  <Mail className="w-6 h-6 text-amber-400" />
                </div>
                <div className={`flex-grow ${locale === 'he' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-semibold text-white mb-1">{t('links.support.title')}</h3>
                  <p className="text-gray-300 text-sm">{t('links.support.email')}</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-amber-400" />
              </Link>
            </div>
          </div>
        </section>

        <OtherZukiApps currentAppId="whistle-camera" />

        <footer className="twilight-footer-bar text-white py-8 px-4 mt-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 flex justify-center">
              <Logo size="md" />
            </div>
            <p className="text-gray-400 mb-2">{t('footer.copyright')}</p>
            <p className="text-sm text-gray-400">{t('footer.tagline')}</p>
            <div className="flex justify-center gap-4 mt-4 text-sm">
              <Link href={`/${locale}/whistle-camera/support`} className="text-gray-400 hover:text-amber-400">
                {tCommon('support')}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={`/${locale}/whistle-camera/privacy`} className="text-gray-400 hover:text-amber-400">
                {tCommon('privacyPolicy')}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={`/${locale}/whistle-camera/terms`} className="text-gray-400 hover:text-amber-400">
                {tCommon('termsOfService')}
              </Link>
            </div>
            <div className="mt-4 flex justify-center">
              <a
                href="https://buymeacoffee.com/sivzuk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
                aria-label={tHome('footer.support')}
              >
                <Image
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt={tHome('footer.support')}
                  width={145}
                  height={40}
                  className="h-auto"
                  unoptimized
                />
              </a>
            </div>
          </div>
        </footer>

        <DownloadStoreFab
          accent="amber"
          appStoreUrl={t('download.appStoreUrl')}
          googlePlayUrl={t('download.googlePlayUrl')}
          appStoreAlt={t('download.appStoreAlt')}
          googlePlayAlt={t('download.googlePlayAlt')}
          utmContent="whistle-camera"
        />

        <ScreenshotLightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      </div>
    </>
  );
}
