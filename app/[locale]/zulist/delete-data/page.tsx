'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BreadcrumbsStructuredData from '@/components/BreadcrumbsStructuredData';
import { Info } from 'lucide-react';

export default function DeleteDataPage() {
  const t = useTranslations('zulist.deleteData');
  const locale = useLocale();

  return (
    <>
      <BreadcrumbsStructuredData
        locale={locale}
        items={[
          { name: 'Home', path: '/' },
          { name: 'ZuList', path: '/zulist' },
          { name: 'Delete Data', path: '/zulist/delete-data' }
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Language Switcher */}
        <div className="mb-6 flex justify-end">
          <LanguageSwitcher />
        </div>

        <div className="bg-blue-50 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-blue-600">
            <h1 className="text-4xl font-bold text-blue-600">ZuList</h1>
            <Link
              href={`/${locale}/zulist`}
              className="px-4 py-2 border-2 border-blue-600 bg-white text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm"
            >
              {locale === 'he' ? 'חזרה' : 'Back'}
            </Link>
          </div>

          <div className={`${locale === 'he' ? 'text-right' : 'text-left'}`}>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h1>

            <div className="bg-blue-50 rounded-lg p-6 mb-8 border-r-4 border-blue-600">
              <p className="font-semibold text-gray-900 mb-2">{t('intro.title')}</p>
              <p className="text-gray-700">{t('intro.content')}</p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-6">
                {t('types.title')}
              </h2>

              {/* Profile Photos */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-blue-600 mb-4">{t('types.profilePhotos.title')}</h3>
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 mb-2">{t('types.profilePhotos.deleted')}</p>
                  <ul className={`space-y-1 text-gray-700 ${locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
                    <li>{t('types.profilePhotos.deletedItem1')}</li>
                    <li>{t('types.profilePhotos.deletedItem2')}</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 mb-2">{t('types.profilePhotos.kept')}</p>
                  <ul className={`space-y-1 text-gray-700 ${locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
                    <li>{t('types.profilePhotos.keptItem1')}</li>
                    <li>{t('types.profilePhotos.keptItem2')}</li>
                    <li>{t('types.profilePhotos.keptItem3')}</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border-r-3 border-blue-600">
                  <p className="font-semibold text-gray-900 mb-2">{t('types.profilePhotos.howTo')}</p>
                  <ol className={`space-y-2 text-gray-700 ${locale === 'he' ? 'list-decimal list-inside' : 'list-decimal list-inside'}`}>
                    <li>{t('types.profilePhotos.step1')}</li>
                    <li>{t('types.profilePhotos.step2')}</li>
                    <li>{t('types.profilePhotos.step3')}</li>
                    <li>{t('types.profilePhotos.step4')}</li>
                    <li>{t('types.profilePhotos.step5')}</li>
                  </ol>
                </div>
              </div>

              {/* Shopping Lists */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-blue-600 mb-4">{t('types.shoppingLists.title')}</h3>
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 mb-2">{t('types.shoppingLists.deleted')}</p>
                  <ul className={`space-y-1 text-gray-700 ${locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
                    <li>{t('types.shoppingLists.deletedItem1')}</li>
                    <li>{t('types.shoppingLists.deletedItem2')}</li>
                    <li>{t('types.shoppingLists.deletedItem3')}</li>
                    <li>{t('types.shoppingLists.deletedItem4')}</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 mb-2">{t('types.shoppingLists.kept')}</p>
                  <ul className={`space-y-1 text-gray-700 ${locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
                    <li>{t('types.shoppingLists.keptItem1')}</li>
                    <li>{t('types.shoppingLists.keptItem2')}</li>
                    <li>{t('types.shoppingLists.keptItem3')}</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border-r-3 border-blue-600">
                  <p className="font-semibold text-gray-900 mb-2">{t('types.shoppingLists.howTo')}</p>
                  <ol className={`space-y-2 text-gray-700 ${locale === 'he' ? 'list-decimal list-inside' : 'list-decimal list-inside'}`}>
                    <li>{t('types.shoppingLists.step1')}</li>
                    <li>{t('types.shoppingLists.step2')}</li>
                    <li>{t('types.shoppingLists.step3')}</li>
                    <li>{t('types.shoppingLists.step4')}</li>
                    <li>{t('types.shoppingLists.step5')}</li>
                  </ol>
                </div>
              </div>

              {/* Items */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-blue-600 mb-4">{t('types.items.title')}</h3>
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 mb-2">{t('types.items.deleted')}</p>
                  <ul className={`space-y-1 text-gray-700 ${locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
                    <li>{t('types.items.deletedItem1')}</li>
                    <li>{t('types.items.deletedItem2')}</li>
                    <li>{t('types.items.deletedItem3')}</li>
                    <li>{t('types.items.deletedItem4')}</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 mb-2">{t('types.items.kept')}</p>
                  <ul className={`space-y-1 text-gray-700 ${locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
                    <li>{t('types.items.keptItem1')}</li>
                    <li>{t('types.items.keptItem2')}</li>
                    <li>{t('types.items.keptItem3')}</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border-r-3 border-blue-600">
                  <p className="font-semibold text-gray-900 mb-2">{t('types.items.howTo')}</p>
                  <ol className={`space-y-2 text-gray-700 ${locale === 'he' ? 'list-decimal list-inside' : 'list-decimal list-inside'}`}>
                    <li>{t('types.items.step1')}</li>
                    <li>{t('types.items.step2')}</li>
                    <li>{t('types.items.step3')}</li>
                    <li>{t('types.items.step4')}</li>
                    <li>{t('types.items.step5')}</li>
                  </ol>
                </div>
              </div>

              {/* Images */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-blue-600 mb-4">{t('types.images.title')}</h3>
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 mb-2">{t('types.images.deleted')}</p>
                  <ul className={`space-y-1 text-gray-700 ${locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
                    <li>{t('types.images.deletedItem1')}</li>
                    <li>{t('types.images.deletedItem2')}</li>
                    <li>{t('types.images.deletedItem3')}</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 mb-2">{t('types.images.kept')}</p>
                  <ul className={`space-y-1 text-gray-700 ${locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
                    <li>{t('types.images.keptItem1')}</li>
                    <li>{t('types.images.keptItem2')}</li>
                    <li>{t('types.images.keptItem3')}</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border-r-3 border-blue-600">
                  <p className="font-semibold text-gray-900 mb-2">{t('types.images.howTo')}</p>
                  <ol className={`space-y-2 text-gray-700 ${locale === 'he' ? 'list-decimal list-inside' : 'list-decimal list-inside'}`}>
                    <li>{t('types.images.step1')}</li>
                    <li>{t('types.images.step2')}</li>
                    <li>{t('types.images.step3')}</li>
                    <li>{t('types.images.step4')}</li>
                  </ol>
                </div>
              </div>

              {/* Purchase History */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-blue-600 mb-4">{t('types.purchaseHistory.title')}</h3>
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 mb-2">{t('types.purchaseHistory.deleted')}</p>
                  <ul className={`space-y-1 text-gray-700 ${locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
                    <li>{t('types.purchaseHistory.deletedItem1')}</li>
                    <li>{t('types.purchaseHistory.deletedItem2')}</li>
                    <li>{t('types.purchaseHistory.deletedItem3')}</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 mb-2">{t('types.purchaseHistory.kept')}</p>
                  <ul className={`space-y-1 text-gray-700 ${locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
                    <li>{t('types.purchaseHistory.keptItem1')}</li>
                    <li>{t('types.purchaseHistory.keptItem2')}</li>
                    <li>{t('types.purchaseHistory.keptItem3')}</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-4">
                  <p className="text-yellow-800">
                    <strong>{t('types.purchaseHistory.note.title')}</strong> {t('types.purchaseHistory.note.content')}
                  </p>
                </div>
              </div>
            </section>

            <div className="bg-blue-50 border border-blue-400 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-blue-800 block mb-2">{t('info.title')}</strong>
                  <ul className={`space-y-1 text-blue-800 ${locale === 'he' ? 'list-disc list-inside' : 'list-disc list-inside'}`}>
                    <li>{t('info.item1')}</li>
                    <li>{t('info.item2')}</li>
                    <li>{t('info.item3')}</li>
                    <li>{t('info.item4')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                {t('retention.title')}
              </h2>
              <p className="text-gray-700">{t('retention.content')}</p>
            </section>

            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <p className="font-semibold text-gray-900 mb-2">{t('fullDelete.title')}</p>
              <p className="text-gray-700">
                {t('fullDelete.content')} <Link href={`/${locale}/zulist/delete-account`} className="text-blue-600 hover:underline">{t('fullDelete.link')}</Link>.
              </p>
            </div>

            <section className="bg-gray-100 p-6 rounded-lg border-t border-gray-300">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-gray-700 mb-4">{t('contact.content')}</p>
              <p className="text-gray-700 mb-2">
                📧 {t('contact.email')}: <a href="mailto:zuki.apps.dev@gmail.com" className="text-blue-600 hover:underline">zuki.apps.dev@gmail.com</a>
              </p>
              <p className="text-gray-700 mb-2">
                🌐 {t('contact.privacy')}: <Link href={`/${locale}/zulist/privacy`} className="text-blue-600 hover:underline">{t('contact.privacyLink')}</Link>
              </p>
              <p className="text-gray-700">
                📄 {t('contact.terms')}: <Link href={`/${locale}/zulist/terms`} className="text-blue-600 hover:underline">{t('contact.termsLink')}</Link>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

