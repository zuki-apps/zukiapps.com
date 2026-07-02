import { Suspense } from 'react';
import { localeStaticParams } from '@/lib/locale-static-params';
import InvitePageClient from './InvitePageClient';

export function generateStaticParams() {
  return localeStaticParams().flatMap(({ locale }) => [{ locale, id: '_' }]);
}

export default function InvitePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">טוען...</p>
          </div>
        </div>
      }
    >
      <InvitePageClient />
    </Suspense>
  );
}
