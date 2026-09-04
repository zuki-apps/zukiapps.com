'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  loadGoogleAnalytics,
  readAnalyticsConsent,
  writeAnalyticsConsent,
} from '@/lib/analyticsConsent';

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function CookieConsent() {
  const t = useTranslations('common.cookies');
  const locale = useLocale();
  const isRtl = locale === 'he' || locale === 'ar';
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!measurementId) return;
    const consent = readAnalyticsConsent();
    if (consent === 'accepted') {
      loadGoogleAnalytics(measurementId);
      return;
    }
    if (consent === null) setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    acceptRef.current?.focus();

    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        writeAnalyticsConsent('rejected');
        setVisible(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = Array.from(focusables());
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible]);

  if (!measurementId || !visible) return null;

  const accept = () => {
    writeAnalyticsConsent('accepted');
    loadGoogleAnalytics(measurementId);
    setVisible(false);
  };

  const reject = () => {
    writeAnalyticsConsent('rejected');
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6 pointer-events-none"
    >
      <div
        ref={panelRef}
        className={`pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-indigo-400/30 bg-indigo-950/95 backdrop-blur-md shadow-2xl shadow-black/40 px-4 py-4 sm:px-6 sm:py-5 ${
          isRtl ? 'text-right' : 'text-left'
        }`}
      >
        <h2 id="cookie-consent-title" className="text-base sm:text-lg font-bold text-white mb-1">
          {t('title')}
        </h2>
        <p id="cookie-consent-desc" className="text-sm text-indigo-100 mb-4 leading-relaxed">
          {t('body')}{' '}
          <Link
            href={`/${locale}/privacy`}
            prefetch={false}
            className="text-sky-200 underline underline-offset-2 hover:text-sky-100"
          >
            {t('learnMorePrivacy')}
          </Link>
          {' · '}
          <Link
            href={`/${locale}/dsa-compliance`}
            prefetch={false}
            className="text-amber-200 underline underline-offset-2 hover:text-amber-100"
          >
            {t('learnMore')}
          </Link>
          {' · '}
          <Link
            href={`/${locale}/accessibility`}
            prefetch={false}
            className="text-emerald-200 underline underline-offset-2 hover:text-emerald-100"
          >
            {t('learnMoreA11y')}
          </Link>
        </p>
        <div className={`flex flex-wrap gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <button
            ref={acceptRef}
            type="button"
            onClick={accept}
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2.5 text-sm font-bold text-white border border-blue-400 hover:from-blue-400 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-indigo-950"
          >
            {t('accept')}
          </button>
          <button
            type="button"
            onClick={reject}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-900/80 px-4 py-2.5 text-sm font-semibold text-indigo-100 border border-indigo-500/40 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-indigo-950"
          >
            {t('reject')}
          </button>
        </div>
      </div>
    </div>
  );
}
