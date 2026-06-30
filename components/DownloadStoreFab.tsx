'use client';

import Image from 'next/image';
import { withStoreUtm } from '@/lib/withStoreUtm';

const ACCENT: Record<string, string> = {
  teal: 'border-teal-500/50 hover:shadow-teal-500/50',
  violet: 'border-violet-500/50 hover:shadow-violet-500/50',
  blue: 'border-blue-500/50 hover:shadow-blue-500/50',
  purple: 'border-purple-500/50 hover:shadow-purple-500/50',
  orange: 'border-orange-500/50 hover:shadow-orange-500/50',
  cyan: 'border-cyan-500/50 hover:shadow-cyan-500/50',
  amber: 'border-amber-500/50 hover:shadow-amber-500/50',
  emerald: 'border-emerald-500/50 hover:shadow-emerald-500/50',
  rose: 'border-rose-500/50 hover:shadow-rose-500/50',
};

export type DownloadStoreFabAccent = keyof typeof ACCENT;

type Props = {
  appStoreUrl?: string;
  googlePlayUrl?: string;
  appStoreAlt?: string;
  googlePlayAlt?: string;
  accent: DownloadStoreFabAccent;
  /** App segment for `utm_content` (e.g. `zulist`, `track-ledger`). Omit if unknown. */
  utmContent?: string;
};

/** Fixed bottom-right App Store + Google Play badges when at least one URL is set */
export default function DownloadStoreFab({
  appStoreUrl = '',
  googlePlayUrl = '',
  appStoreAlt = 'Download on the App Store',
  googlePlayAlt = 'Get it on Google Play',
  accent,
  utmContent,
}: Props) {
  const appHref = withStoreUtm(appStoreUrl, { campaign: 'store-fab', content: utmContent });
  const playHref = withStoreUtm(googlePlayUrl, { campaign: 'store-fab', content: utmContent });
  const hasApp = Boolean(appHref);
  const hasPlay = Boolean(playHref);
  if (!hasApp && !hasPlay) return null;

  const ring = ACCENT[accent] ?? ACCENT.blue;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pr-[max(0px,env(safe-area-inset-right))]"
      role="navigation"
      aria-label="App store downloads"
    >
      {hasApp && (
        <a
          href={appHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 rounded-xl p-1.5 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group border-2 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${ring}`}
          aria-label={appStoreAlt}
        >
          <Image
            src="/images/app-store-badge.svg"
            alt={appStoreAlt}
            width={120}
            height={40}
            className="object-contain object-center h-10 w-[120px] max-h-10 group-hover:scale-105 transition-transform"
          />
        </a>
      )}
      {hasPlay && (
        <a
          href={playHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 rounded-xl p-1.5 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group border-2 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${ring}`}
          aria-label={googlePlayAlt}
        >
          <Image
            src="/images/google-play-badge.svg"
            alt={googlePlayAlt}
            width={120}
            height={40}
            className="object-contain object-center h-10 w-[120px] max-h-10 group-hover:scale-105 transition-transform"
          />
        </a>
      )}
    </div>
  );
}
