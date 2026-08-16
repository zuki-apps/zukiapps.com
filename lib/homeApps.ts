import {
  GEO_CALC_PUBLISHED,
  TIMESINCE_PUBLISHED,
  TOLDYA_PUBLISHED,
  ZULI_COLLAGE_PUBLISHED,
} from '@/lib/appPublishState';

/**
 * Canonical home grid / carousel app order — keep AppsGrid and AppsCarousel maps in sync.
 * Pilots stay listed here for catalog order, but only appear on home when their `*_PUBLISHED` flag is true.
 */
export const HOME_APP_IDS = [
  'zulist',
  'hush-gallery',
  'whistle-camera',
  'geo-calc',
  'power-interval-timer',
  'bit-scope',
  'track-ledger',
  'noise-meter-shusher',
  'paratrooper-blitz',
  'sudoku-puzzle',
  'tempo-lab-pro',
  'football-trivia',
  'fun-facts-trivia',
  'zuli-collage',
  'timesince',
  'toldya',
] as const;

export type HomeAppId = (typeof HOME_APP_IDS)[number];

/** Apps that require an explicit publish flag before appearing on the home grid / carousel / “Other apps”. */
const HOME_PUBLISH_REQUIRED: Partial<Record<HomeAppId, boolean>> = {
  'geo-calc': GEO_CALC_PUBLISHED,
  'zuli-collage': ZULI_COLLAGE_PUBLISHED,
  timesince: TIMESINCE_PUBLISHED,
  toldya: TOLDYA_PUBLISHED,
};

/** Home-visible apps (respects publish flags). */
export function getPublishedHomeAppIds(): HomeAppId[] {
  return HOME_APP_IDS.filter((id) => {
    const published = HOME_PUBLISH_REQUIRED[id];
    return published === undefined ? true : published;
  });
}
