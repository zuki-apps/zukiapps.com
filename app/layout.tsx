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
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/logo.png', sizes: '180x180', type: 'image/png' }],
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
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
      <body className="bg-twilight-canvas min-h-screen text-white antialiased">
        {measurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
