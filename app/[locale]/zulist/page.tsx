'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingCart, ArrowLeft, Users, Wifi, Sparkles, Globe, Database, FolderTree, Mail, ExternalLink, Bell, Layout, Crown, Image as ImageIcon, BarChart3, Smartphone, Lock, CheckCircle2, Video, Instagram, Facebook, Download } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import SoftwareApplicationStructuredData from '@/components/SoftwareApplicationStructuredData';
import DownloadStoreFab from '@/components/DownloadStoreFab';

export default function ZuListPage() {
  const t = useTranslations('zulist');
  const tCommon = useTranslations('common');
  const tHome = useTranslations('home');
  const locale = useLocale();

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: tCommon('home'), path: '/' },
          { name: t('hero.title'), path: '/zulist' }
        ]}
      />
      <SoftwareApplicationStructuredData
        locale={locale}
        appPath="/zulist"
        appName={t('hero.title')}
        appDescription={t('hero.structuredDataDescription')}
        operatingSystem="iOS,Android"
        applicationCategory="ShoppingApplication"
        offers={{
          price: '0',
          priceCurrency: 'USD',
        }}
        aggregateRating={{
          ratingValue: 0,
          ratingCount: 0,
        }}
        appStoreUrl="https://apps.apple.com/app/zulist/id6753878439"
        googlePlayUrl="https://play.google.com/store/apps/details?id=com.zuki.apps.zulist&pcampaignid=web_share"
      />
      <div className="min-h-screen relative overflow-hidden">
      {/* Starry background effect */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 twilight-sky-overlay"></div>
        {/* Stars */}
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Language Switcher */}
      <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end relative z-50">
        <LanguageSwitcher />
      </div>

      {/* Header with Logo and Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-4 flex items-center justify-between relative z-0">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-black transition-colors"
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
            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-blue-400/30">
              <Image
                src="/images/zulist-icon.png"
                alt={t('download.appIconAlt')}
                width={128}
                height={128}
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-green-900/50 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4" />
            {t('hero.badge')}
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent" style={{
            filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 0.6))',
          }}>
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-300 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
            {t('hero.description')}
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <Link
              href={`/${locale}/zulist/privacy`}
              className="text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              {tCommon('privacyPolicy')}
            </Link>
            <span className="text-gray-500">|</span>
            <Link
              href={`/${locale}/zulist/terms`}
              className="text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              {tCommon('termsOfService')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            {t('features.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real-time Collaboration */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-blue-500/50 border-2 border-blue-600/30 transition-all backdrop-blur-sm bg-opacity-90">
              <div className="bg-blue-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-blue-500/50">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t('features.realtime.title')}
              </h3>
              <p className="text-gray-300 mb-4">
                {t('features.realtime.description')}
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                {t.raw('features.realtime.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Offline Support */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-blue-500/50 border-2 border-blue-600/30 transition-all backdrop-blur-sm bg-opacity-90">
              <div className="bg-green-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-green-500/50">
                <Wifi className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t('features.offline.title')}
              </h3>
              <p className="text-gray-300 mb-4">
                {t('features.offline.description')}
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                {t.raw('features.offline.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Smart Suggestions */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-blue-500/50 border-2 border-blue-600/30 transition-all backdrop-blur-sm bg-opacity-90">
              <div className="bg-purple-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-purple-500/50">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t('features.smart.title')}
              </h3>
              <p className="text-gray-300 mb-4">
                {t('features.smart.description')}
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                {t.raw('features.smart.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Smart Templates */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-blue-500/50 border-2 border-blue-600/30 transition-all backdrop-blur-sm bg-opacity-90">
              <div className="bg-indigo-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-indigo-500/50">
                <Layout className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t('features.templates.title')}
              </h3>
              <p className="text-gray-300 mb-4">
                {t('features.templates.description')}
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                {t.raw('features.templates.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Smart Notifications */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-blue-500/50 border-2 border-blue-600/30 transition-all backdrop-blur-sm bg-opacity-90">
              <div className="bg-yellow-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-yellow-500/50">
                <Bell className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t('features.notifications.title')}
              </h3>
              <p className="text-gray-300 mb-4">
                {t('features.notifications.description')}
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                {t.raw('features.notifications.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Multi-language */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-blue-500/50 border-2 border-blue-600/30 transition-all backdrop-blur-sm bg-opacity-90">
              <div className="bg-teal-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-teal-500/50">
                <Globe className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t('features.multilang.title')}
              </h3>
              <p className="text-gray-300 mb-4">
                {t('features.multilang.description')}
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                {t.raw('features.multilang.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Category Management */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-blue-500/50 border-2 border-blue-600/30 transition-all backdrop-blur-sm bg-opacity-90">
              <div className="bg-pink-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-pink-500/50">
                <FolderTree className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t('features.categories.title')}
              </h3>
              <p className="text-gray-300 mb-4">
                {t('features.categories.description')}
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                {t.raw('features.categories.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Custom Photos */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-blue-500/50 border-2 border-blue-600/30 transition-all backdrop-blur-sm bg-opacity-90">
              <div className="bg-rose-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-rose-500/50">
                <ImageIcon className="w-8 h-8 text-rose-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t('features.photos.title')}
              </h3>
              <p className="text-gray-300 mb-4">
                {t('features.photos.description')}
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                {t.raw('features.photos.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Purchase History */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-blue-500/50 border-2 border-blue-600/30 transition-all backdrop-blur-sm bg-opacity-90">
              <div className="bg-cyan-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-cyan-500/50">
                <BarChart3 className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t('features.history.title')}
              </h3>
              <p className="text-gray-300 mb-4">
                {t('features.history.description')}
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                {t.raw('features.history.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Firebase Integration */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-blue-500/50 border-2 border-blue-600/30 transition-all backdrop-blur-sm bg-opacity-90">
              <div className="bg-orange-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-orange-500/50">
                <Database className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t('features.firebase.title')}
              </h3>
              <p className="text-gray-300 mb-4">
                {t('features.firebase.description')}
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                {t.raw('features.firebase.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Security */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-blue-500/50 border-2 border-blue-600/30 transition-all backdrop-blur-sm bg-opacity-90">
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

            {/* Beautiful UI */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl hover:border-blue-500/50 border-2 border-blue-600/30 transition-all backdrop-blur-sm bg-opacity-90">
              <div className="bg-violet-600/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-violet-500/50">
                <Smartphone className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {t('features.ui.title')}
              </h3>
              <p className="text-gray-300 mb-4">
                {t('features.ui.description')}
              </p>
              <ul className="text-sm text-gray-400 space-y-2">
                {t.raw('features.ui.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 md:p-12 text-center border-2 border-blue-600/30 backdrop-blur-sm bg-opacity-90">
            <div className="flex items-center justify-center mb-6">
              <Crown className="w-16 h-16 text-yellow-400" />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white">
              {t('premium.title')}
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              {t('premium.description')}
            </p>
            
            <div className={`grid md:grid-cols-2 gap-6 mb-8 ${locale === 'he' ? 'text-right' : 'text-left'}`}>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border-2 border-blue-600/30">
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
                💰 {t('premium.pricing.monthly')} | {t('premium.pricing.yearly')}
              </p>
              <p className="text-sm text-gray-300">
                {t('premium.pricing.savings')}
              </p>
            </div>

            {/* Rewarded Ads */}
            <div className={`bg-yellow-900/30 border border-yellow-500/30 rounded-xl p-6 mt-6 ${locale === 'he' ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Video className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">{t('premium.rewarded.title')}</h3>
              </div>
              <p className="text-gray-300 mb-3">
                {t('premium.rewarded.description')}
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                {t.raw('premium.rewarded.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
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
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
              <div>
                <p className="font-semibold text-white">{t('status.version')}</p>
                <p>{t('status.versionValue')}</p>
              </div>
              <div>
                <p className="font-semibold text-white">{t('status.tests')}</p>
                <p>{t('status.testsValue')}</p>
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
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">
            {t('download.title')}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {t('download.description')}
          </p>
          <div className="flex gap-8 justify-center flex-wrap">
            <a
              href="https://apps.apple.com/app/zulist/id6753878439"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-blue-600/30 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-blue-500/50 transition-all backdrop-blur-sm bg-opacity-90 group"
            >
              <div className="w-32 h-10 mx-auto relative">
                <Image
                  src="/images/app-store-badge.svg"
                  alt={t('download.appStoreAlt')}
                  width={128}
                  height={40}
                  className="object-contain"
                  onError={(e) => {
                    // Fallback to emoji if image not found
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<span class="text-4xl mb-2 block">📱</span>';
                    }
                  }}
                />
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.zuki.apps.zulist&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-blue-600/30 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-blue-500/50 transition-all backdrop-blur-sm bg-opacity-90 group"
            >
              <div className="w-32 h-10 mx-auto relative">
                <Image
                  src="/images/google-play-badge.png"
                  alt={t('download.googlePlayAlt')}
                  width={128}
                  height={40}
                  className="object-contain"
                  onError={(e) => {
                    // Fallback to emoji if image not found
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<span class="text-4xl mb-2 block">📱</span>';
                    }
                  }}
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            {t('perfectFor.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-blue-600/30 rounded-xl p-6 shadow-lg hover:border-blue-500/50 transition-all backdrop-blur-sm bg-opacity-90">
              <h3 className="text-xl font-bold mb-3 text-white">{t('perfectFor.families.title')}</h3>
              <p className="text-gray-300">{t('perfectFor.families.description')}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-blue-600/30 rounded-xl p-6 shadow-lg hover:border-blue-500/50 transition-all backdrop-blur-sm bg-opacity-90">
              <h3 className="text-xl font-bold mb-3 text-white">{t('perfectFor.roommates.title')}</h3>
              <p className="text-gray-300">{t('perfectFor.roommates.description')}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-blue-600/30 rounded-xl p-6 shadow-lg hover:border-blue-500/50 transition-all backdrop-blur-sm bg-opacity-90">
              <h3 className="text-xl font-bold mb-3 text-white">{t('perfectFor.events.title')}</h3>
              <p className="text-gray-300">{t('perfectFor.events.description')}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-blue-600/30 rounded-xl p-6 shadow-lg hover:border-blue-500/50 transition-all backdrop-blur-sm bg-opacity-90">
              <h3 className="text-xl font-bold mb-3 text-white">{t('perfectFor.everyone.title')}</h3>
              <p className="text-gray-300">{t('perfectFor.everyone.description')}</p>
            </div>
          </div>
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
              href={`/${locale}/zulist/support`}
              className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-blue-500/50 transition-all flex items-center gap-4 group border-2 border-blue-600/30 backdrop-blur-sm bg-opacity-90 ${locale === 'he' ? 'flex-row-reverse' : ''}`}
            >
              <div className="bg-blue-600/30 p-3 rounded-lg group-hover:bg-blue-600/50 border border-blue-500/50 transition-colors">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <div className={`flex-grow ${locale === 'he' ? 'text-right' : 'text-left'}`}>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {t('links.support.title')}
                </h3>
                <p className="text-gray-300 text-sm">
                  {t('links.support.email')}
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </Link>
            <a
              href="https://zulist.app"
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-green-500/50 transition-all flex items-center gap-4 group border-2 border-green-600/30 backdrop-blur-sm bg-opacity-90 ${locale === 'he' ? 'flex-row-reverse' : ''}`}
            >
              <div className="bg-green-600/30 p-3 rounded-lg group-hover:bg-green-600/50 border border-green-500/50 transition-colors">
                <Globe className="w-6 h-6 text-green-400" />
              </div>
              <div className={`flex-grow ${locale === 'he' ? 'text-right' : 'text-left'}`}>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {t('links.website.title')}
                </h3>
                <p className="text-gray-300 text-sm">
                  {t('links.website.url')}
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
            </a>
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
          <p className="text-xs text-gray-600 mt-2">
            {t('footer.bundle')}
          </p>
            <div className="flex justify-center gap-4 mt-4 text-sm">
              <Link
                href={`/${locale}/zulist/support`}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                {tCommon('support')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href={`/${locale}/zulist/privacy`}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                {tCommon('privacyPolicy')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href={`/${locale}/zulist/terms`}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
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
        accent="blue"
        appStoreUrl={t('download.appStoreUrl')}
        googlePlayUrl={t('download.googlePlayUrl')}
        appStoreAlt={t('download.appStoreAlt')}
        googlePlayAlt={t('download.googlePlayAlt')}
        utmContent="zulist"
      />
    </div>
    </>
  );
}
