import type { HomeAppId } from '@/lib/homeApps';

/** WebP grid/carousel icons (256px) — bump ?v= after re-running scripts/optimize-home-images.mjs */
const v = '1';

export const HOME_APP_ICON_WEBP: Record<HomeAppId, string> = {
  zulist: `/images/zulist-icon.webp?v=${v}`,
  'hush-gallery': `/images/hush-gallery-icon.webp?v=${v}`,
  'whistle-camera': `/images/whistle-camera-icon.webp?v=${v}`,
  'power-interval-timer': `/images/power-interval-timer-icon.webp?v=${v}`,
  'bit-scope': `/images/bit-scope-icon.webp?v=${v}`,
  'track-ledger': `/images/track-ledger-icon.webp?v=${v}`,
  'noise-meter-shusher': `/images/noise-meter-shusher-icon.webp?v=${v}`,
  'paratrooper-blitz': `/images/paratrooper-blitz-icon.webp?v=${v}`,
  'sudoku-puzzle': `/images/sudoku-puzzle-icon.webp?v=${v}`,
  'tempo-lab-pro': `/images/tempo-lab-pro-icon.webp?v=${v}`,
  'football-trivia': `/images/football-trivia-icon.webp?v=${v}`,
  'fun-facts-trivia': `/images/fun-facts-trivia-icon.webp?v=${v}`,
  collagio: `/images/collagio-icon.webp?v=${v}`,
};
