'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  // Remove locale from pathname to get the base path
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  return (
    <div className="flex items-center gap-2 justify-end">
      <Globe className="w-4 h-4 text-gray-600" />
      <Link
        href={`/en${pathnameWithoutLocale}`}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </Link>
      <Link
        href={`/he${pathnameWithoutLocale}`}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          locale === 'he'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        עברית
      </Link>
    </div>
  );
}

