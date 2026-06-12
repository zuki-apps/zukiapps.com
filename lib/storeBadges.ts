/** App Store SVG native ratio ≈ 120×40. Google Play PNG cropped to badge artwork only. */
export const STORE_BADGE_HEIGHT = 48;
export const STORE_BADGE_APP_STORE_WIDTH = 144;
export const STORE_BADGE_GOOGLE_PLAY_WIDTH = 201;

export const APP_STORE_BADGE_SRC = '/images/app-store-badge.svg';
export const GOOGLE_PLAY_BADGE_SRC = '/images/google-play-badge.png?v=2';

export const storeBadgeFrameClass =
  'inline-flex shrink-0 items-center justify-center hover:opacity-90 transition-opacity';
export const storeBadgeAppStoreImageClass = 'block h-12 w-auto max-h-12';
export const storeBadgeGooglePlayImageClass = 'block h-12 w-auto max-h-12';

/** FAB uses the same badge height as the download section. */
export const storeBadgeFabFrameClass =
  'inline-flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 rounded-xl shadow-2xl transition-all duration-300 hover:scale-110 group border-2 overflow-hidden h-12 min-h-12 px-0.5';

export const storeBadgeFabAppStoreImageClass =
  'block h-12 w-auto max-h-12 group-hover:scale-105 transition-transform';
export const storeBadgeFabGooglePlayImageClass =
  'block h-12 w-auto max-h-12 group-hover:scale-105 transition-transform';

export const storeBadgeImageStyle = { height: STORE_BADGE_HEIGHT, width: 'auto' } as const;
