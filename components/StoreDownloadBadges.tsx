'use client';

import Image from 'next/image';
import { withStoreUtm } from '@/lib/withStoreUtm';
import {
  APP_STORE_BADGE_SRC,
  GOOGLE_PLAY_BADGE_SRC,
  STORE_BADGE_APP_STORE_WIDTH,
  STORE_BADGE_GOOGLE_PLAY_WIDTH,
  STORE_BADGE_HEIGHT,
  storeBadgeAppStoreImageClass,
  storeBadgeFrameClass,
  storeBadgeGooglePlayImageClass,
  storeBadgeImageStyle,
} from '@/lib/storeBadges';

type Props = {
  appStoreUrl?: string;
  googlePlayUrl?: string;
  appStoreAlt?: string;
  googlePlayAlt?: string;
  soonLabel?: string;
  /** Tailwind border class for the empty-state box (e.g. border-cyan-600/30) */
  fallbackBorderClass?: string;
  utmContent?: string;
};

export default function StoreDownloadBadges({
  appStoreUrl = '',
  googlePlayUrl = '',
  appStoreAlt = 'Download on the App Store',
  googlePlayAlt = 'Get it on Google Play',
  soonLabel = '',
  fallbackBorderClass = 'border-amber-600/30',
  utmContent,
}: Props) {
  const appHref = withStoreUtm(appStoreUrl, { campaign: 'download-section', content: utmContent });
  const playHref = withStoreUtm(googlePlayUrl, { campaign: 'download-section', content: utmContent });
  const hasApp = Boolean(appHref);
  const hasPlay = Boolean(playHref);

  if (!hasApp && !hasPlay) {
    return (
      <div
        className={`bg-gradient-to-br from-gray-900 to-gray-800 border-2 ${fallbackBorderClass} rounded-xl p-6 shadow-lg backdrop-blur-sm bg-opacity-90 opacity-60`}
      >
        {soonLabel ? <p className="text-sm text-gray-400">{soonLabel}</p> : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      {hasApp && (
        <a
          href={appHref}
          target="_blank"
          rel="noopener noreferrer"
          className={storeBadgeFrameClass}
          aria-label={appStoreAlt}
        >
          <Image
            src={APP_STORE_BADGE_SRC}
            alt={appStoreAlt}
            width={STORE_BADGE_APP_STORE_WIDTH}
            height={STORE_BADGE_HEIGHT}
            className={storeBadgeAppStoreImageClass}
            style={storeBadgeImageStyle}
          />
        </a>
      )}
      {hasPlay && (
        <a
          href={playHref}
          target="_blank"
          rel="noopener noreferrer"
          className={storeBadgeFrameClass}
          aria-label={googlePlayAlt}
        >
          <Image
            src={GOOGLE_PLAY_BADGE_SRC}
            alt={googlePlayAlt}
            width={STORE_BADGE_GOOGLE_PLAY_WIDTH}
            height={STORE_BADGE_HEIGHT}
            className={storeBadgeGooglePlayImageClass}
            style={storeBadgeImageStyle}
            unoptimized
          />
        </a>
      )}
    </div>
  );
}
