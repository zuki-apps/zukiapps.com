/** Persist analytics (GA) consent across visits (cookie + localStorage). */
export const ANALYTICS_CONSENT_KEY = 'zuki-analytics-consent';

/** ~1 year — “always allow / reject” until the user clears site data. */
const CONSENT_MAX_AGE_SEC = 60 * 60 * 24 * 365;

export type AnalyticsConsent = 'accepted' | 'rejected';

function cookieDomain(): string {
  if (typeof window === 'undefined') return '';
  const host = window.location.hostname;
  // Share consent between apex and www (not pages.dev / localhost).
  if (host === 'zukiapps.com' || host.endsWith('.zukiapps.com')) {
    return '; Domain=.zukiapps.com';
  }
  return '';
}

function readConsentCookie(): AnalyticsConsent | null {
  if (typeof document === 'undefined') return null;
  try {
    const match = document.cookie.match(
      new RegExp(`(?:^|;\\s*)${ANALYTICS_CONSENT_KEY}=(accepted|rejected)(?:;|$)`)
    );
    if (match?.[1] === 'accepted' || match?.[1] === 'rejected') return match[1];
  } catch {
    /* ignore */
  }
  return null;
}

function writeConsentCookie(value: AnalyticsConsent): void {
  if (typeof document === 'undefined') return;
  try {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${ANALYTICS_CONSENT_KEY}=${value}; Path=/; Max-Age=${CONSENT_MAX_AGE_SEC}; SameSite=Lax${secure}${cookieDomain()}`;
  } catch {
    /* ignore */
  }
}

export function readAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === 'undefined') return null;
  const fromCookie = readConsentCookie();
  if (fromCookie) return fromCookie;
  try {
    const v = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    if (v === 'accepted' || v === 'rejected') {
      // Migrate older localStorage-only choices to a durable cookie.
      writeConsentCookie(v);
      return v;
    }
  } catch {
    /* private mode / blocked storage */
  }
  return null;
}

export function writeAnalyticsConsent(value: AnalyticsConsent): void {
  writeConsentCookie(value);
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

const CONSENT_DENIED = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
} as const;

/** Inline in <head> so Consent Mode is set before any Google tag. */
export const GTAG_CONSENT_DEFAULT_SCRIPT =
  'window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("consent","default",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",wait_for_update:500});';

function ensureGtagStub(): void {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as IArguments);
    };
  }
}

/** Consent Mode v2 update after the user chooses. Ads stay denied (no ads cookies). */
export function updateGoogleConsent(analyticsGranted: boolean): void {
  if (typeof window === 'undefined') return;
  ensureGtagStub();
  window.gtag!('consent', 'update', {
    ...CONSENT_DENIED,
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
  });
}

/** Load Google Analytics only after explicit Accept. Idempotent. */
export function loadGoogleAnalytics(measurementId: string): void {
  if (typeof window === 'undefined' || !measurementId) return;
  if (window.__zukiGaLoaded) return;
  window.__zukiGaLoaded = true;

  ensureGtagStub();
  updateGoogleConsent(true);
  window.gtag!('js', new Date());
  window.gtag!('config', measurementId, { anonymize_ip: true, allow_google_signals: false });

  const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;
  if (googleTagId && googleTagId !== measurementId) {
    window.gtag!('config', googleTagId, { allow_google_signals: false });
  }

  const s = document.createElement('script');
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  s.async = true;
  document.head.appendChild(s);
}
