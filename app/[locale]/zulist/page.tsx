'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingCart, ArrowLeft, Users, Wifi, Sparkles, Globe, Database, FolderTree, Mail, ExternalLink, Bell, Layout, Crown, Image as ImageIcon, BarChart3, Smartphone, Lock, CheckCircle2, Video, Instagram, Facebook } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function ZuListPage() {
  const t = useTranslations('zulist');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-purple-50">
      {/* Language Switcher */}
      <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end">
        <LanguageSwitcher />
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('back')}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-blue-600" />
          </div>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <CheckCircle2 className="w-4 h-4" />
            {t('hero.badge')}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-700 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('hero.description')}
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <Link
              href={`/${locale}/zulist/privacy`}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              {locale === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              href={`/${locale}/zulist/terms`}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              {locale === 'he' ? 'תנאי שימוש' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('features.title')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real-time Collaboration */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.realtime.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.realtime.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                {t.raw('features.realtime.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Offline Support */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Wifi className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.offline.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.offline.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                {t.raw('features.offline.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Smart Suggestions */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.smart.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.smart.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                {t.raw('features.smart.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Smart Templates */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Layout className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.templates.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.templates.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                {t.raw('features.templates.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Smart Notifications */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Bell className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.notifications.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.notifications.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                {t.raw('features.notifications.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Multi-language */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.multilang.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.multilang.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                {t.raw('features.multilang.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Category Management */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FolderTree className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.categories.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.categories.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                {t.raw('features.categories.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Custom Photos */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <ImageIcon className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.photos.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.photos.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                {t.raw('features.photos.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Purchase History */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.history.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.history.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                {t.raw('features.history.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Firebase Integration */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Database className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.firebase.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.firebase.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                {t.raw('features.firebase.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Security */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.security.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.security.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                {t.raw('features.security.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Beautiful UI */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Smartphone className="w-8 h-8 text-violet-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.ui.title')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('features.ui.description')}
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                {t.raw('features.ui.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <div className="flex items-center justify-center mb-6">
              <Crown className="w-16 h-16 text-yellow-500" />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              {t('premium.title')}
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              {t('premium.description')}
            </p>
            
            <div className={`grid md:grid-cols-2 gap-6 mb-8 ${locale === 'he' ? 'text-right' : 'text-left'}`}>
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{t('premium.free.title')}</h3>
                <ul className="space-y-2 text-gray-700">
                  {t.raw('premium.free.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-purple-300">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{t('premium.premium.title')}</h3>
                <ul className="space-y-2 text-gray-700">
                  {t.raw('premium.premium.items').map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-6 mb-6">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                💰 {t('premium.pricing.monthly')} | {t('premium.pricing.yearly')}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                {t('premium.pricing.savings')}
              </p>
              <p className="text-xs text-gray-500">
                {t('premium.pricing.other')}
              </p>
            </div>

            {/* Rewarded Ads */}
            <div className={`bg-yellow-50 rounded-xl p-6 mt-6 ${locale === 'he' ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Video className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-bold text-gray-900">{t('premium.rewarded.title')}</h3>
              </div>
              <p className="text-gray-700 mb-3">
                {t('premium.rewarded.description')}
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                {t.raw('premium.rewarded.items').map((item: string, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {t('status.title')}
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              {t('status.description')}
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-semibold text-gray-900">{t('status.version')}</p>
                <p>{t('status.versionValue')}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t('status.tests')}</p>
                <p>{t('status.testsValue')}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t('status.status')}</p>
                <p>{t('status.statusValue')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            {t('download.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {t('download.description')}
          </p>
          <div className="flex gap-8 justify-center flex-wrap">
            <a
              href="https://apps.apple.com/app/zulist/id6753878439"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <span className="text-4xl mb-2 block">📱</span>
              <p className="font-semibold text-gray-700">{t('download.appStore')}</p>
              <p className="text-sm text-blue-600 mt-2">{t('download.download')}</p>
            </a>
            <div className="bg-blue-50 rounded-xl p-6 shadow-lg">
              <span className="text-4xl mb-2 block">📱</span>
              <p className="font-semibold text-gray-700">{t('download.googlePlay')}</p>
              <p className="text-sm text-gray-500">{t('download.soon')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('perfectFor.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('perfectFor.families.title')}</h3>
              <p className="text-gray-600">{t('perfectFor.families.description')}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('perfectFor.roommates.title')}</h3>
              <p className="text-gray-600">{t('perfectFor.roommates.description')}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('perfectFor.events.title')}</h3>
              <p className="text-gray-600">{t('perfectFor.events.description')}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t('perfectFor.everyone.title')}</h3>
              <p className="text-gray-600">{t('perfectFor.everyone.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('links.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="mailto:zuki.apps.dev@gmail.com"
              className={`bg-blue-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center gap-4 group border-2 border-gray-200 ${locale === 'he' ? 'flex-row-reverse' : ''}`}
            >
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className={`flex-grow ${locale === 'he' ? 'text-right' : 'text-left'}`}>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {t('links.support.title')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('links.support.email')}
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </a>
            <a
              href="mailto:zuki.apps.dev@gmail.com"
              className={`bg-blue-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center gap-4 group border-2 border-gray-200 ${locale === 'he' ? 'flex-row-reverse' : ''}`}
            >
              <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div className={`flex-grow ${locale === 'he' ? 'text-right' : 'text-left'}`}>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {t('links.contact.title')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('links.contact.email')}
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </a>
            <a
              href="https://zulist.app"
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-blue-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center gap-4 group border-2 border-gray-200 ${locale === 'he' ? 'flex-row-reverse' : ''}`}
            >
              <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <div className={`flex-grow ${locale === 'he' ? 'text-right' : 'text-left'}`}>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {t('links.website.title')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('links.website.url')}
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
            </a>
            <div className={`bg-blue-50 rounded-xl p-6 shadow-lg border-2 border-gray-200 ${locale === 'he' ? 'text-right' : 'text-left'}`}>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('links.social.title')}
              </h3>
              <div className={`flex gap-4 ${locale === 'he' ? 'justify-end' : 'justify-start'}`}>
                <a
                  href="https://instagram.com/zuki.apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-100 p-3 rounded-lg hover:bg-pink-200 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 text-pink-600" />
                </a>
                <a
                  href="https://facebook.com/zuki.apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6 text-blue-600" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-2">{t('footer.copyright')}</p>
          <p className="text-sm text-gray-500">
            {t('footer.tagline')}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            {t('footer.bundle')}
          </p>
          <div className="flex justify-center gap-4 mt-4 text-sm">
            <Link
              href={`/${locale}/zulist/privacy`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {locale === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              href={`/${locale}/zulist/terms`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {locale === 'he' ? 'תנאי שימוש' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
