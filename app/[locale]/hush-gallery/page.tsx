'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, Lock, FolderTree, Cloud, Shield, Image as ImageIcon, Download, Upload, Mail, ExternalLink, CheckCircle2, Briefcase, Globe, CheckCircle, Smartphone } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import AppIconFrame from '@/components/AppIconFrame';
import DownloadStoreFab from '@/components/DownloadStoreFab';
import StoreDownloadBadges from '@/components/StoreDownloadBadges';
import { HUSH_GALLERY_ICON } from '@/lib/appIcons';
import StarBackground from '@/components/StarBackground';

type ScreenshotItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  category: string;
};

export default function HushGalleryPage() {
  const t = useTranslations('hushGallery');
  const tCommon = useTranslations('common');
  const tHome = useTranslations('home');
  const locale = useLocale();

  const faqItems = (t.raw('faq.items') as Array<{ question: string; answer: string }> | undefined) ?? [];
  const howToSteps =
    (t.raw('howToUse.steps') as Array<{ number: string; title: string; description: string }> | undefined) ?? [];
  const screenshotItems = (t.raw('screenshots.items') as ScreenshotItem[] | undefined) ?? [];

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <StarBackground />

        {/* Language Switcher */}
        <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end relative z-50">
          <LanguageSwitcher />
        </div>

        {/* Header with Logo and Back Button */}
        <div className="max-w-7xl mx-auto px-4 pt-4 flex items-center justify-between relative z-0">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('back')}
          </Link>
          <Link href={`/${locale}`} className="flex items-center">
            <Logo size="sm" />
          </Link>
        </div>

        {/* Hero Section */}
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <AppIconFrame
                src={HUSH_GALLERY_ICON}
                alt={t('download.appIconAlt')}
                sizes="(max-width: 768px) 96px, 128px"
                priority
                edgeToEdge
                className="mx-auto mb-6"
                boxClassName="w-24 h-24 md:w-32 md:h-32"
                frameClassName="rounded-[22%] overflow-hidden shadow-2xl"
              />
            </div>
            <div className="inline-flex items-center gap-2 bg-green-900/50 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              <CheckCircle2 className="w-4 h-4" />
              {t('hero.badge')}
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent" style={{
              filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))',
            }}>
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-gray-300 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex justify-center gap-4 text-sm flex-wrap mb-8">
              <Link
                href={`/${locale}/hush-gallery/privacy`}
                className="text-purple-400 hover:text-purple-300 underline transition-colors"
              >
                {tCommon('privacyPolicy')}
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                href={`/${locale}/hush-gallery/terms`}
                className="text-purple-400 hover:text-purple-300 underline transition-colors"
              >
                {tCommon('termsOfService')}
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                href={`/${locale}/hush-gallery/support`}
                className="text-purple-400 hover:text-purple-300 underline transition-colors"
              >
                {tCommon('support')}
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                href={`/${locale}/hush-gallery/delete-account`}
                className="text-purple-400 hover:text-purple-300 underline transition-colors"
              >
                {locale === 'he' ? 'מחיקת חשבון' : 'Delete Account'}
              </Link>
            </div>
            <nav
              className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-400"
              aria-label="Page sections"
            >
              <a href="#features" className="hover:text-purple-300 transition-colors">{t('pageNav.features')}</a>
              <span className="text-gray-600" aria-hidden>|</span>
              <a href="#screenshots" className="hover:text-purple-300 transition-colors">{t('pageNav.screenshots')}</a>
              <span className="text-gray-600" aria-hidden>|</span>
              <a href="#how-to" className="hover:text-purple-300 transition-colors">{t('pageNav.howTo')}</a>
              <span className="text-gray-600" aria-hidden>|</span>
              <a href="#manual" className="hover:text-purple-300 transition-colors">{t('pageNav.manual')}</a>
              <span className="text-gray-600" aria-hidden>|</span>
              <a href="#tips" className="hover:text-purple-300 transition-colors">{t('pageNav.tips')}</a>
              <span className="text-gray-600" aria-hidden>|</span>
              <a href="#faq" className="hover:text-purple-300 transition-colors">{t('pageNav.faq')}</a>
              <span className="text-gray-600" aria-hidden>|</span>
              <a href="#download" className="hover:text-purple-300 transition-colors">{t('pageNav.download')}</a>
            </nav>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-4 relative z-10" id="features">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              {t('features.title')}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Privacy First */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-purple-500/50 border-2 border-purple-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-purple-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-purple-500/50">
                  <Shield className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t('features.privacy.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t('features.privacy.description')}
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.privacy.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Secure Storage */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-purple-500/50 border-2 border-purple-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-blue-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-blue-500/50">
                  <Lock className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t('features.storage.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t('features.storage.description')}
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.storage.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Organized Collections */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-purple-500/50 border-2 border-purple-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-green-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-green-500/50">
                  <FolderTree className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t('features.organization.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t('features.organization.description')}
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.organization.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* App Lock */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-purple-500/50 border-2 border-purple-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-red-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-red-500/50">
                  <Lock className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t('features.security.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t('features.security.description')}
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.security.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Cloud Backup */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-purple-500/50 border-2 border-purple-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-cyan-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-cyan-500/50">
                  <Cloud className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t('features.backup.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t('features.backup.description')}
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.backup.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Import/Export */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-purple-500/50 border-2 border-purple-600/30 transition-all backdrop-blur-sm bg-opacity-90">
                <div className="bg-orange-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-orange-500/50">
                  <Download className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {t('features.import.title')}
                </h3>
                <p className="text-gray-300 mb-4">
                  {t('features.import.description')}
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  {t.raw('features.import.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots Section */}
        <section className="py-12 px-4 relative z-10" id="screenshots">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">
              {t('screenshots.title')}
            </h2>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
              {t('screenshots.subtitle')}
            </p>

            <h3 className="text-2xl font-bold text-purple-300 mb-6">
              {t('screenshots.featuresTitle')}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 items-start">
              {screenshotItems
                .filter((item) => item.category === 'features')
                .map((item) => (
                  <figure
                    key={item.id}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border-2 border-purple-600/30 hover:border-purple-500/50 transition-all"
                  >
                    <div className="w-full max-w-[220px] mx-auto">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        width={0}
                        height={0}
                        sizes="220px"
                        className="w-full h-auto block"
                      />
                    </div>
                    <figcaption className="p-4">
                      <h4 className="font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </figcaption>
                  </figure>
                ))}
            </div>

            <h3 className="text-2xl font-bold text-purple-300 mb-2">
              {t('screenshots.onboardingTitle')}
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl">{t('screenshots.onboardingSubtitle')}</p>
            <div className="grid md:grid-cols-3 gap-8 mb-16 items-start">
              {screenshotItems
                .filter((item) => item.category === 'onboarding')
                .map((item) => (
                  <figure
                    key={item.id}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border-2 border-purple-600/30 hover:border-purple-500/50 transition-all"
                  >
                    <div className="w-full max-w-[220px] mx-auto">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        width={0}
                        height={0}
                        sizes="220px"
                        className="w-full h-auto block"
                      />
                    </div>
                    <figcaption className="p-4">
                      <h4 className="font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </figcaption>
                  </figure>
                ))}
            </div>

          </div>
        </section>

        {/* User Manual */}
        <section className="py-12 px-4 relative z-10" id="manual">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">{t('manual.title')}</h2>
            <p className="text-center text-gray-400 mb-12">{t('manual.subtitle')}</p>
            <div className="grid md:grid-cols-2 gap-6">
              {(t.raw('manual.sections') as Array<{ title: string; steps: string[] }>).map((section, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 border-purple-600/30"
                >
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

        {/* Tips */}
        <section className="py-12 px-4 relative z-10" id="tips">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">{t('tips.title')}</h2>
            <p className="text-center text-gray-400 mb-12">{t('tips.subtitle')}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(t.raw('tips.items') as Array<{ title: string; description: string }>).map((tip, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 border-purple-600/30 hover:border-purple-500/50 transition-all"
                >
                  <h3 className="text-lg font-bold text-purple-300 mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-12 px-4 relative z-10" id="faq">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-white">{t('faq.title')}</h2>
            <p className="text-center text-gray-400 mb-8">{t('faq.subtitle')}</p>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-purple-600/30 group"
                >
                  <summary className="cursor-pointer p-5 font-semibold text-white list-none flex justify-between items-center">
                    {item.question}
                    <span className="text-purple-400 ml-2 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href={`/${locale}/hush-gallery/support`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors"
              >
                {t('faq.viewAllSupport')}
              </Link>
            </div>
          </div>
        </section>

        {/* Business Use Section */}
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-purple-600/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm bg-opacity-90">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-8 h-8 text-purple-400" />
                <h2 className="text-4xl font-bold text-white">
                  {t('businessUse.title')}
                </h2>
              </div>
              <p className="text-lg text-gray-300 mb-8">
                {t('businessUse.description')}
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {t('businessUse.benefits.title')}
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    {t.raw('businessUse.benefits.items').map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {t('businessUse.example.title')}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {t('businessUse.example.description')}
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    {t.raw('businessUse.example.items').map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold">{i + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-12 px-4 relative z-10" id="how-to">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              {t('howToUse.title')}
            </h2>
            <div className="grid md:grid-cols-5 gap-6">
              {t.raw('howToUse.steps').map((step: any, i: number) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-purple-500/50 border-2 border-purple-600/30 transition-all backdrop-blur-sm bg-opacity-90 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-purple-600/30 border-2 border-purple-500/50 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-400">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Languages Section */}
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-purple-600/30 rounded-xl p-8 backdrop-blur-sm bg-opacity-90">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Globe className="w-8 h-8 text-purple-400" />
                <h2 className="text-3xl font-bold text-white">
                  {t('languages.title')}
                </h2>
              </div>
              <p className="text-lg text-gray-300">
                {t('languages.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Guarantee Section */}
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-green-600/30 rounded-xl p-8 backdrop-blur-sm bg-opacity-90">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-green-400" />
                <h2 className="text-3xl font-bold text-white">
                  {t('privacyGuarantee.title')}
                </h2>
              </div>
              <p className="text-lg text-gray-300">
                {t('privacyGuarantee.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Premium Features Section */}
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 md:p-12 text-center border-2 border-purple-600/30 backdrop-blur-sm bg-opacity-90">
              <h2 className="text-4xl font-bold mb-6 text-white">
                {t('premium.title')}
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                {t('premium.description')}
              </p>
              
              <div className={`grid md:grid-cols-2 gap-6 mb-8 ${locale === 'he' ? 'text-right' : 'text-left'}`}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border-2 border-purple-600/30">
                  <h3 className="text-xl font-bold mb-4 text-white">{t('premium.free.title')}</h3>
                  <ul className="space-y-2 text-gray-300">
                    {t.raw('premium.free.items').map((item: string, i: number) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl p-6 border-2 border-purple-500/50">
                  <h3 className="text-xl font-bold mb-4 text-white">{t('premium.premium.title')}</h3>
                  <ul className="space-y-2 text-gray-300">
                    {t.raw('premium.premium.items').map((item: string, i: number) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
                <p className="text-2xl font-bold text-white mb-2">
                  💰 {t('premium.pricing.oneTime')}
                </p>
                <p className="text-sm text-gray-300">
                  {t('premium.pricing.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Status Section */}
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-green-500/30 rounded-xl p-8 backdrop-blur-sm bg-opacity-90">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-400" />
              <h2 className="text-3xl font-bold mb-4 text-white">
                {t('status.title')}
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                {t('status.description')}
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
                <div>
                  <p className="font-semibold text-white">{t('status.version')}</p>
                  <p>{t('status.versionValue')}</p>
                </div>
                <div>
                  <p className="font-semibold text-white">{t('status.status')}</p>
                  <p>{t('status.statusValue')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="py-12 px-4 relative z-10" id="download">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">
              {t('download.title')}
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              {t('download.description')}
            </p>
            <StoreDownloadBadges
              appStoreUrl={t('download.appStoreUrl')}
              googlePlayUrl={t('download.googlePlayUrl')}
              appStoreAlt={t('download.appStoreAlt')}
              googlePlayAlt={t('download.googlePlayAlt')}
              fallbackBorderClass="border-purple-600/30"
              utmContent="hush-gallery"
            />
          </div>
        </section>

        {/* Links Section */}
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              {t('links.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href={`/${locale}/hush-gallery/support`}
                className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-purple-500/50 transition-all flex items-center gap-4 group border-2 border-purple-600/30 backdrop-blur-sm bg-opacity-90 ${locale === 'he' ? 'flex-row-reverse' : ''}`}
              >
                <div className="bg-purple-600/30 p-3 rounded-lg group-hover:bg-purple-600/50 border border-purple-500/50 transition-colors">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <div className={`flex-grow ${locale === 'he' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {t('links.support.title')}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {t('links.support.email')}
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="twilight-footer-bar text-white py-8 px-4 mt-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 flex justify-center">
              <Logo size="md" />
            </div>
            <p className="text-gray-400 mb-2">{t('footer.copyright')}</p>
            <p className="text-sm text-gray-500">
              {t('footer.tagline')}
            </p>
            <div className="flex justify-center gap-4 mt-4 text-sm">
              <Link
                href={`/${locale}/hush-gallery/support`}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                {tCommon('support')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href={`/${locale}/hush-gallery/privacy`}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                {tCommon('privacyPolicy')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href={`/${locale}/hush-gallery/terms`}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                {tCommon('termsOfService')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href={`/${locale}/hush-gallery/delete-account`}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                {locale === 'he' ? 'מחיקת חשבון' : 'Delete Account'}
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
          accent="purple"
          appStoreUrl={t('download.appStoreUrl')}
          googlePlayUrl={t('download.googlePlayUrl')}
          appStoreAlt={t('download.appStoreAlt')}
          googlePlayAlt={t('download.googlePlayAlt')}
        utmContent="hush-gallery"
        />
      </div>
    </>
  );
}
