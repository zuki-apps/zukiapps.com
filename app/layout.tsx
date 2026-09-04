import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/hreflang';

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingSiteAuth = process.env.NEXT_PUBLIC_BING_SITE_AUTH;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: [
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/icon-192.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/icon-32.png',
  },
  manifest: '/manifest.json',
  ...((googleVerification || bingSiteAuth)
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingSiteAuth ? { other: { 'msvalidate.01': bingSiteAuth } } : {}),
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Google Analytics loads only after CookieConsent Accept (see components/CookieConsent.tsx).
  return (
    <html lang="en" dir="ltr" className="dark" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/logo.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className="bg-twilight-canvas min-h-screen font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
