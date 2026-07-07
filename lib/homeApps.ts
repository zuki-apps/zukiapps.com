/** Canonical home grid / carousel app order — keep AppsGrid and AppsCarousel in sync. */
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
] as const;

export type HomeAppId = (typeof HOME_APP_IDS)[number];
