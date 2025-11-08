'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ShoppingCart, Users, Wifi, Sparkles, Globe, Download, Shield, FileText, Mail, ExternalLink, Database, UserCircle, FolderTree } from 'lucide-react';

export default function ZuListPage() {
  const t = useTranslations('zulist');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <ShoppingCart className="w-24 h-24 mx-auto mb-6" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-primary-100 max-w-3xl mx-auto">
            {t('description')}
          </p>
          <p className="text-lg mb-8 text-primary-200 max-w-3xl mx-auto">
            {t('fullDescription')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://apps.apple.com/us/app/zulist/idXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              {t('download')}
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            {t('features.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real-time Collaboration */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.realtime')}
              </h3>
              <p className="text-gray-600">
                {t('features.realtimeDesc')}
              </p>
            </div>

            {/* Offline Support */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Wifi className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.offline')}
              </h3>
              <p className="text-gray-600">
                {t('features.offlineDesc')}
              </p>
            </div>

            {/* Smart Suggestions */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.smart')}
              </h3>
              <p className="text-gray-600">
                {t('features.smartDesc')}
              </p>
            </div>

            {/* Multi-language */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.multilang')}
              </h3>
              <p className="text-gray-600">
                {t('features.multilangDesc')}
              </p>
            </div>

            {/* Firebase Integration */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Database className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.firebase')}
              </h3>
              <p className="text-gray-600">
                {t('features.firebaseDesc')}
              </p>
            </div>

            {/* Profile Management */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <UserCircle className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.profile')}
              </h3>
              <p className="text-gray-600">
                {t('features.profileDesc')}
              </p>
            </div>

            {/* Category Management */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FolderTree className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('features.categories')}
              </h3>
              <p className="text-gray-600">
                {t('features.categoriesDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            {t('availableOn')}
          </h2>
          <div className="flex gap-8 justify-center flex-wrap mb-12">
            <a
              href="https://apps.apple.com/us/app/zulist/idXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 text-white px-12 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center gap-3 text-lg"
            >
              <span>📱</span>
              {t('appStore')}
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.zulist.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 text-white px-12 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center gap-3 text-lg"
            >
              <span>📱</span>
              {t('playStore')}
            </a>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {t('links.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href={`/${locale}/zulist/privacy`}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center gap-4 group"
            >
              <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {t('links.privacy')}
                </h3>
                <p className="text-gray-600 text-sm">
                  Read our privacy policy
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </Link>

            <Link
              href={`/${locale}/zulist/terms`}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center gap-4 group"
            >
              <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {t('links.terms')}
                </h3>
                <p className="text-gray-600 text-sm">
                  Terms of service
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </Link>

            <a
              href={`mailto:${t('contact.email')}`}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center gap-4 group"
            >
              <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {t('links.support')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('contact.email')}
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </a>

            <a
              href={t('contact.website')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center gap-4 group"
            >
              <div className="bg-primary-100 p-3 rounded-lg group-hover:bg-primary-200 transition-colors">
                <Globe className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {t('links.contact')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('contact.website')}
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center text-gray-600">
          <p className="mb-2">{t('copyright')}</p>
          <p className="text-sm">
            {t('contact.email')} • {t('contact.legal')}
          </p>
        </div>
      </section>
    </div>
  );
}

