import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  const t = useTranslations('zulist');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const currentDate = new Date().toLocaleDateString(locale === 'he' ? 'he-IL' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/${locale}/zulist`}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          {tCommon('home')}
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary-100 p-3 rounded-full">
              <FileText className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              {t('links.terms')}
            </h1>
          </div>

          <p className="text-gray-600 mb-8">
            Last updated: {currentDate}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using ZuList, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Use License</h2>
              <p className="text-gray-700 leading-relaxed">
                Permission is granted to download and use ZuList for personal, non-commercial purposes. This license does not include the right to modify, reverse engineer, or redistribute the application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                The materials on ZuList are provided on an 'as is' basis. ZuList makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including implied warranties of merchantability or fitness for a particular purpose.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Limitations</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall ZuList or its suppliers be liable for any damages arising out of the use or inability to use the materials on ZuList, even if ZuList has been notified of the possibility of such damage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Accuracy of Materials</h2>
              <p className="text-gray-700 leading-relaxed">
                The materials appearing on ZuList could include technical, typographical, or photographic errors. ZuList does not warrant that any of the materials on its app are accurate, complete, or current.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Links</h2>
              <p className="text-gray-700 leading-relaxed">
                ZuList has not reviewed all of the sites linked to our app and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by ZuList.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Modifications</h2>
              <p className="text-gray-700 leading-relaxed">
                ZuList may revise these terms of service at any time without notice. By using this app, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">8. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href={`mailto:${t('contact.legal')}`} className="text-primary-600 hover:underline">
                  {t('contact.legal')}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

