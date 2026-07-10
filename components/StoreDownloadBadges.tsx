'use client';

import Image from 'next/image';
import { withStoreUtm } from '@/lib/withStoreUtm';

type Props = {
  appStoreUrl?: string;
  googlePlayUrl?: string;
  appStoreAlt?: string;
  googlePlayAlt?: string;
  soonLabel?: string;
  /** Shown when `googlePlayUrl` is empty but Android is planned (e.g. iOS live, Play pending). */
  googlePlaySoonLabel?: string;
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
  googlePlaySoonLabel = '',
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
          className="inline-block"
          aria-label={appStoreAlt}
        >
          <Image
            src="/images/app-store-badge.svg"
            alt={appStoreAlt}
            width={160}
            height={48}
            className="object-contain hover:opacity-90 transition-opacity"
          />
        </a>
      )}
      {hasPlay && (
        <a
          href={playHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
          aria-label={googlePlayAlt}
        >
          <Image
            src="/images/google-play-badge.svg"
            alt={googlePlayAlt}
            width={160}
            height={48}
            className="object-contain hover:opacity-90 transition-opacity"
          />
        </a>
      )}
      {!hasPlay && googlePlaySoonLabel && (
        <div className="flex flex-col items-center gap-2 opacity-60" aria-label={googlePlaySoonLabel}>
          <Image
            src="/images/google-play-badge.svg"
            alt=""
            width={160}
            height={48}
            className="object-contain grayscale"
            aria-hidden
          />
          <p className="text-xs text-gray-400 text-center max-w-[10rem]">{googlePlaySoonLabel}</p>
        </div>
      )}
    </div>
  );
}
