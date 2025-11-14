'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function TermsOfServicePage() {
  const t = useTranslations('zulist.terms');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Language Switcher */}
        <div className="mb-6 flex justify-end">
          <LanguageSwitcher />
        </div>

        <div className="bg-blue-50 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-blue-600">
            <h1 className="text-4xl font-bold text-blue-600">ZuList</h1>
            <div className="flex gap-2">
              <Link
                href={`/${locale}/zulist`}
                className="px-4 py-2 border-2 border-blue-600 bg-white text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm"
              >
                {locale === 'he' ? 'חזרה' : 'Back'}
              </Link>
            </div>
          </div>

          <div className={`${locale === 'he' ? 'text-right' : 'text-left'}`}>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-gray-600 mb-6">
              {t('lastUpdated')}
            </p>

            {/* Intro */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
              <p className="text-gray-700 font-semibold">
                {t('intro')}
              </p>
            </div>

            <div className="space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section1.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('section1.content')}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t('section1.content2')}
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section2.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('section2.content')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-4 space-y-2`}>
                  <li className="text-gray-700">{t('section2.items.item1')}</li>
                  <li className="text-gray-700">{t('section2.items.item2')}</li>
                  <li className="text-gray-700">{t('section2.items.item3')}</li>
                  <li className="text-gray-700">{t('section2.items.item4')}</li>
                  <li className="text-gray-700">{t('section2.items.item5')}</li>
                  <li className="text-gray-700">{t('section2.items.item6')}</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section3.title')}
                </h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section3.subtitle1')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section3.content1')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-6 space-y-2`}>
                  <li className="text-gray-700">{t('section3.items1.item1')}</li>
                  <li className="text-gray-700">{t('section3.items1.item2')}</li>
                  <li className="text-gray-700">{t('section3.items1.item3')}</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section3.subtitle2')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section3.content2')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-6 space-y-2`}>
                  <li className="text-gray-700">{t('section3.items2.item1')}</li>
                  <li className="text-gray-700">{t('section3.items2.item2')}</li>
                  <li className="text-gray-700">{t('section3.items2.item3')}</li>
                  <li className="text-gray-700">{t('section3.items2.item4')}</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section3.subtitle3')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('section3.content3')}
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section4.title')}
                </h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section4.subtitle1')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section4.content1')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-6 space-y-2`}>
                  <li className="text-gray-700">{t('section4.items1.item1')}</li>
                  <li className="text-gray-700">{t('section4.items1.item2')}</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section4.subtitle2')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section4.content2')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-6 space-y-2`}>
                  <li className="text-gray-700">{t('section4.items2.item1')}</li>
                  <li className="text-gray-700">{t('section4.items2.item2')}</li>
                  <li className="text-gray-700">{t('section4.items2.item3')}</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section4.subtitle3')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section4.content3')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-3 space-y-2`}>
                  <li className="text-gray-700">{t('section4.items3.item1')}</li>
                  <li className="text-gray-700">{t('section4.items3.item2')}</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t('section4.content3b')}
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section4.subtitle4')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t('section4.content4')}
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section4.subtitle5')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('section4.content5')}
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section5.title')}
                </h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section5.subtitle1')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t('section5.content1')}
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section5.subtitle2')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section5.content2')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-6 space-y-2`}>
                  <li className="text-gray-700">{t('section5.items2.item1')}</li>
                  <li className="text-gray-700">{t('section5.items2.item2')}</li>
                  <li className="text-gray-700">{t('section5.items2.item3')}</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section5.subtitle3')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section5.content3')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} space-y-2`}>
                  <li className="text-gray-700">{t('section5.items3.item1')}</li>
                  <li className="text-gray-700">{t('section5.items3.item2')}</li>
                  <li className="text-gray-700">{t('section5.items3.item3')}</li>
                  <li className="text-gray-700">{t('section5.items3.item4')}</li>
                  <li className="text-gray-700">{t('section5.items3.item5')}</li>
                  <li className="text-gray-700">{t('section5.items3.item6')}</li>
                  <li className="text-gray-700">{t('section5.items3.item7')}</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section6.title')}
                </h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section6.subtitle1')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t('section6.content1')}
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section6.subtitle2')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3 font-semibold">
                  {t('section6.content2')}
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section6.content2b')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-3 space-y-2`}>
                  <li className="text-gray-700">{t('section6.items2.item1')}</li>
                  <li className="text-gray-700">{t('section6.items2.item2')}</li>
                  <li className="text-gray-700">{t('section6.items2.item3')}</li>
                  <li className="text-gray-700">{t('section6.items2.item4')}</li>
                  <li className="text-gray-700">{t('section6.items2.item5')}</li>
                  <li className="text-gray-700">{t('section6.items2.item6')}</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-3 font-semibold">
                  {t('section6.content2c')}
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t('section6.content2d')}
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section6.subtitle3')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('section6.content3')}
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section7.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section7.content')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-4 space-y-2`}>
                  <li className="text-gray-700">{t('section7.items.item1')}</li>
                  <li className="text-gray-700">{t('section7.items.item2')}</li>
                  <li className="text-gray-700">{t('section7.items.item3')}</li>
                  <li className="text-gray-700">{t('section7.items.item4')}</li>
                  <li className="text-gray-700">{t('section7.items.item5')}</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  {t('section7.content2')}
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section8.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('section8.content')}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t('section8.content2')}
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section9.title')}
                </h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section9.subtitle1')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section9.content1')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-6 space-y-2`}>
                  <li className="text-gray-700">{t('section9.items1.item1')}</li>
                  <li className="text-gray-700">{t('section9.items1.item2')}</li>
                  <li className="text-gray-700">{t('section9.items1.item3')}</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section9.subtitle2')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section9.content2')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} space-y-2`}>
                  <li className="text-gray-700">{t('section9.items2.item1')}</li>
                  <li className="text-gray-700">{t('section9.items2.item2')}</li>
                  <li className="text-gray-700">{t('section9.items2.item3')}</li>
                </ul>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section10.title')}
                </h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section10.subtitle1')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section10.content1')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-6 space-y-2`}>
                  <li className="text-gray-700">{t('section10.items1.item1')}</li>
                  <li className="text-gray-700">{t('section10.items1.item2')}</li>
                  <li className="text-gray-700">{t('section10.items1.item3')}</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section10.subtitle2')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section10.content2')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-6 space-y-2`}>
                  <li className="text-gray-700">{t('section10.items2.item1')}</li>
                  <li className="text-gray-700">{t('section10.items2.item2')}</li>
                  <li className="text-gray-700">{t('section10.items2.item3')}</li>
                  <li className="text-gray-700">{t('section10.items2.item4')}</li>
                </ul>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section10.subtitle3')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section10.content3')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} space-y-2`}>
                  <li className="text-gray-700">{t('section10.items3.item1')}</li>
                  <li className="text-gray-700">{t('section10.items3.item2')}</li>
                  <li className="text-gray-700">{t('section10.items3.item3')}</li>
                </ul>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section11.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  {t('section11.content')}
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section11.content2')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} space-y-2`}>
                  <li className="text-gray-700">{t('section11.items.item1')}</li>
                  <li className="text-gray-700">{t('section11.items.item2')}</li>
                  <li className="text-gray-700">{t('section11.items.item3')}</li>
                  <li className="text-gray-700">{t('section11.items.item4')}</li>
                </ul>
              </section>

              {/* Section 12 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section12.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  {t('section12.content')}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t('section12.content2')}
                </p>
              </section>

              {/* Section 13 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section13.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section13.content')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} space-y-2`}>
                  <li className="text-gray-700">{t('section13.items.item1')}</li>
                  <li className="text-gray-700">{t('section13.items.item2')}</li>
                  <li className="text-gray-700">{t('section13.items.item3')}</li>
                  <li className="text-gray-700">{t('section13.items.item4')}</li>
                </ul>
              </section>

              {/* Section 14 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section14.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section14.content')}
                </p>
              </section>

              {/* Section 15 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section15.title')}
                </h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section15.subtitle1')}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t('section15.content1')}
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {t('section15.subtitle2')}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('section15.content2')}
                </p>
              </section>

              {/* Section 16 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section16.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {t('section16.content')}
                </p>
                <ul className={`list-disc ${locale === 'he' ? 'mr-6' : 'ml-6'} mb-4 space-y-2`}>
                  <li className="text-gray-700">{t('section16.items.item1')}</li>
                  <li className="text-gray-700">{t('section16.items.item2')}</li>
                  <li className="text-gray-700">{t('section16.items.item3')}</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  {t('section16.content2')}
                </p>
              </section>

              {/* Section 17 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section17.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section17.content')}
                </p>
              </section>

              {/* Section 18 */}
              <section>
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section18.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section18.content')}
                </p>
              </section>

              {/* Section 19 */}
              <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-blue-600 mt-8">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {t('section19.title')}
                </h2>
                <p className="text-gray-700 mb-4">
                  {t('section19.content')}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>{locale === 'he' ? 'אימייל:' : 'Email:'}</strong>{' '}
                  <a
                    href={`mailto:${t('section19.email')}`}
                    className="text-blue-600 hover:underline"
                  >
                    {t('section19.email')}
                  </a>
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>{locale === 'he' ? 'אתר אינטרנט:' : 'Website:'}</strong>{' '}
                  <a
                    href={t('section19.website')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {t('section19.website')}
                  </a>
                </p>
                <p className="text-gray-700 text-sm">
                  {locale === 'he' ? '🔒 ' : '🔒 '}
                  <Link
                    href={`/${locale}/zulist/privacy`}
                    className="text-blue-600 hover:underline"
                  >
                    {locale === 'he' ? 'קרא את מדיניות הפרטיות' : 'Read the Privacy Policy'}
                  </Link>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
