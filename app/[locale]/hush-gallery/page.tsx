'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, Lock, FolderTree, Cloud, Shield, Image as ImageIcon, Download, Upload, Mail, ExternalLink, Instagram, Facebook, CheckCircle2 } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import SoftwareApplicationStructuredData from '@/components/SoftwareApplicationStructuredData';

export default function HushGalleryPage() {
  const t = useTranslations('hushGallery');
  const locale = useLocale();

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: 'Home', path: '/' },
          { name: 'Hush Gallery', path: '/hush-gallery' }
        ]}
      />
      <SoftwareApplicationStructuredData
        locale={locale}
        appName="Hush Gallery"
        appDescription="A secure and private photo gallery application that allows you to keep your personal photos safe and organized. With advanced privacy features, local-first storage, optional encrypted cloud backup, and intuitive design."
        operatingSystem="iOS,Android"
        applicationCategory="PhotoApplication"
        offers={{
          price: '0',
          priceCurrency: 'USD',
        }}
        aggregateRating={{
          ratingValue: 0,
          ratingCount: 0,
        }}
      />
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Starry background effect */}
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
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
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-purple-400/30 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <ImageIcon className="w-16 h-16 md:w-20 md:h-20 text-white" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-yellow-900/50 border border-yellow-500/30 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
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
            <div className="flex justify-center gap-4 text-sm">
              <Link
                href={`/${locale}/hush-gallery/privacy`}
                className="text-purple-400 hover:text-purple-300 underline transition-colors"
              >
                {locale === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                href={`/${locale}/hush-gallery/terms`}
                className="text-purple-400 hover:text-purple-300 underline transition-colors"
              >
                {locale === 'he' ? 'תנאי שימוש' : 'Terms of Service'}
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                href={`/${locale}/hush-gallery/dsa-compliance`}
                className="text-purple-400 hover:text-purple-300 underline transition-colors"
              >
                {locale === 'he' ? 'ציות DSA' : 'DSA Compliance'}
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
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-yellow-500/30 rounded-xl p-8 backdrop-blur-sm bg-opacity-90">
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
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">
              {t('download.title')}
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              {t('download.description')}
            </p>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-purple-600/30 rounded-xl p-6 shadow-lg backdrop-blur-sm bg-opacity-90 opacity-60">
              <p className="text-sm text-gray-400">{t('download.soon')}</p>
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
              <a
                href="mailto:zuki.apps.dev@gmail.com"
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
              </a>
              <a
                href="mailto:zuki.apps.dev@gmail.com"
                className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-purple-500/50 transition-all flex items-center gap-4 group border-2 border-purple-600/30 backdrop-blur-sm bg-opacity-90 ${locale === 'he' ? 'flex-row-reverse' : ''}`}
              >
                <div className="bg-purple-600/30 p-3 rounded-lg group-hover:bg-purple-600/50 border border-purple-500/50 transition-colors">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <div className={`flex-grow ${locale === 'he' ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {t('links.contact.title')}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {t('links.contact.email')}
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
              </a>
              <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg border-2 border-purple-600/30 backdrop-blur-sm bg-opacity-90 ${locale === 'he' ? 'text-right' : 'text-left'}`}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t('links.social.title')}
                </h3>
                <div className={`flex gap-4 ${locale === 'he' ? 'justify-end' : 'justify-start'}`}>
                  <a
                    href="https://instagram.com/zuki.apps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-600/30 p-3 rounded-lg hover:bg-pink-600/50 border border-pink-500/50 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6 text-pink-400" />
                  </a>
                  <a
                    href="https://facebook.com/zuki.apps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600/30 p-3 rounded-lg hover:bg-blue-600/50 border border-blue-500/50 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6 text-blue-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-br from-black to-gray-900 text-white py-8 px-4 mt-12 relative z-10 border-t border-gray-800">
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
                href={`/${locale}/hush-gallery/privacy`}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                {locale === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href={`/${locale}/hush-gallery/terms`}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                {locale === 'he' ? 'תנאי שימוש' : 'Terms of Service'}
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href={`/${locale}/hush-gallery/dsa-compliance`}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                {locale === 'he' ? 'ציות DSA' : 'DSA Compliance'}
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
