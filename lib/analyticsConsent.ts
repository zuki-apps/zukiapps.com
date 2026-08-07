/** localStorage key for analytics (GA) consent on zukiapps.com */
export const ANALYTICS_CONSENT_KEY = 'zuki-analytics-consent';

export type AnalyticsConsent = 'accepted' | 'rejected';

export function readAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    if (v === 'accepted' || v === 'rejected') return v;
  } catch {
    /* private mode / blocked storage */
  }
  return null;
}

export function writeAnalyticsConsent(value: AnalyticsConsent): void {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
}

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
    __zukiGaLoaded?: boolean;
  }
}

/** Load Google Analytics only after explicit Accept. Idempotent. */
export function loadGoogleAnalytics(measurementId: string): void {
  if (typeof window === 'undefined' || !measurementId) return;
  if (window.__zukiGaLoaded) return;
  window.__zukiGaLoaded = true;

  window.dataLayer = window.dataLayer || [];
  // GA expects an Arguments-like push (same as official snippet)
  window.gtag = function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments as unknown as IArguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, { anonymize_ip: true });

  const s = document.createElement('script');
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  s.async = true;
  document.head.appendChild(s);
}
