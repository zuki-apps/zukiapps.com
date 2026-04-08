import { ReactNode } from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/hreflang';

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingSiteAuth = process.env.NEXT_PUBLIC_BING_SITE_AUTH;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: [
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/logo.png',
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
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-ZQS2LWYD18';
  
  return (
    <html lang="en" dir="ltr" className="dark">
      <body className="bg-twilight-canvas min-h-screen text-white antialiased">
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Script id="set-locale-attributes" strategy="beforeInteractive">
          {`
            (function() {
              const path = window.location.pathname;
              const localeMatch = path.match(/^\/([^/]+)/);
              const locale = localeMatch ? localeMatch[1] : 'en';
              const validLocales = ['en', 'he', 'de', 'es', 'it', 'pt', 'ru', 'fr', 'ja', 'ko', 'ar', 'zh'];
              const rtlLocales = ['he', 'ar'];
              if (validLocales.includes(locale)) {
                document.documentElement.lang = locale;
                document.documentElement.dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr';
              } else {
                document.documentElement.lang = 'en';
                document.documentElement.dir = 'ltr';
              }
            })();
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
