/** Canonical home grid / carousel app order — keep AppsGrid and AppsCarousel in sync. */
import { ZULI_COLLAGE_PUBLISHED } from '@/lib/appPublishState';

const HOME_APP_IDS_BASE = [
  'zulist',
  'hush-gallery',
  'whistle-camera',
  'power-interval-timer',
  'bit-scope',
  'track-ledger',
  'noise-meter-shusher',
  'paratrooper-blitz',
  'sudoku-puzzle',
  'tempo-lab-pro',
  'football-trivia',
  'fun-facts-trivia',
] as const;

export const HOME_APP_IDS = [
  ...HOME_APP_IDS_BASE,
  ...(ZULI_COLLAGE_PUBLISHED ? (['zuli-collage'] as const) : []),
] as const;

export type HomeAppId = (typeof HOME_APP_IDS)[number];
