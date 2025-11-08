import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              {t('links.privacy')}
            </h1>
          </div>

          <p className="text-gray-600 mb-8">
            Last updated: {currentDate}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, profile image, and shopping list data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you. Your shopping lists are synced across your devices and shared with people you invite.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. Your shopping lists are only shared with people you explicitly invite.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit and at rest using industry-standard protocols.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed">
                You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us. You can manage your data directly through the app settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{' '}
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

