'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Zuki Apps</h3>
            <p className="text-gray-400">
              Creating smart, intuitive mobile applications
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/zulist`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ZuList
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact')}</h4>
            <p className="text-gray-400">
              Email: zuki.apps.dev@gmail.com
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Website: zuki.apps.com
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Zuki Apps. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

