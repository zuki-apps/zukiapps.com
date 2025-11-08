'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const locale = useLocale();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">404 - Page Not Found</h2>
        <Link
          href={`/${locale}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
