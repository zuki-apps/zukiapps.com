import { ReactNode } from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import { getSiteUrl } from '@/lib/hreflang';

const displayFont = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

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
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" dir="ltr" className={`dark ${displayFont.variable}`} suppressHydrationWarning>
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
          <Script id="google-analytics-deferred" strategy="afterInteractive">
            {`
            (function () {
              var id = '${measurementId}';
              var loaded = false;
              function loadGa() {
                if (loaded) return;
                loaded = true;
                var s = document.createElement('script');
                s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
                s.async = true;
                document.head.appendChild(s);
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', id, { page_path: window.location.pathname });
              }
              ['pointerdown','keydown','touchstart','scroll'].forEach(function (evt) {
                window.addEventListener(evt, loadGa, { once: true, passive: true });
              });
              setTimeout(loadGa, 8000);
            })();
          `}
          </Script>
        ) : null}
        {children}
      </body>
    </html>
  );
}
