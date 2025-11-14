import { ReactNode } from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'vptLaNoDGkQvPt_cWG3D-SYIa253GayWGOhN'
  }
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <Script id="set-locale-attributes" strategy="beforeInteractive">
          {`
            (function() {
              const path = window.location.pathname;
              const localeMatch = path.match(/^\/([^/]+)/);
              const locale = localeMatch ? localeMatch[1] : 'en';
              const validLocales = ['en', 'he', 'de', 'es', 'it', 'pt'];
              if (validLocales.includes(locale)) {
                document.documentElement.lang = locale;
                document.documentElement.dir = locale === 'he' ? 'rtl' : 'ltr';
              }
            })();
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
