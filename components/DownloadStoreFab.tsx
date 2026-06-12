'use client';

import Image from 'next/image';
import { withStoreUtm } from '@/lib/withStoreUtm';
import {
  APP_STORE_BADGE_SRC,
  GOOGLE_PLAY_BADGE_SRC,
  STORE_BADGE_APP_STORE_WIDTH,
  STORE_BADGE_GOOGLE_PLAY_WIDTH,
  STORE_BADGE_HEIGHT,
  storeBadgeFabAppStoreImageClass,
  storeBadgeFabFrameClass,
  storeBadgeFabGooglePlayImageClass,
  storeBadgeImageStyle,
} from '@/lib/storeBadges';

const ACCENT: Record<string, string> = {
  teal: 'border-teal-500/50 hover:shadow-teal-500/50',
  violet: 'border-violet-500/50 hover:shadow-violet-500/50',
  blue: 'border-blue-500/50 hover:shadow-blue-500/50',
  purple: 'border-purple-500/50 hover:shadow-purple-500/50',
  orange: 'border-orange-500/50 hover:shadow-orange-500/50',
  cyan: 'border-cyan-500/50 hover:shadow-cyan-500/50',
  amber: 'border-amber-500/50 hover:shadow-amber-500/50',
  emerald: 'border-emerald-500/50 hover:shadow-emerald-500/50',
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
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
      role="navigation"
      aria-label="App store downloads"
    >
      {hasApp && (
        <a
          href={appHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${storeBadgeFabFrameClass} ${ring}`}
          aria-label={appStoreAlt}
        >
          <Image
            src={APP_STORE_BADGE_SRC}
            alt={appStoreAlt}
            width={STORE_BADGE_APP_STORE_WIDTH}
            height={STORE_BADGE_HEIGHT}
            className={storeBadgeFabAppStoreImageClass}
            style={storeBadgeImageStyle}
          />
        </a>
      )}
      {hasPlay && (
        <a
          href={playHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${storeBadgeFabFrameClass} ${ring}`}
          aria-label={googlePlayAlt}
        >
          <Image
            src={GOOGLE_PLAY_BADGE_SRC}
            alt={googlePlayAlt}
            width={STORE_BADGE_GOOGLE_PLAY_WIDTH}
            height={STORE_BADGE_HEIGHT}
            className={storeBadgeFabGooglePlayImageClass}
            style={storeBadgeImageStyle}
            unoptimized
          />
        </a>
      )}
    </div>
  );
}
