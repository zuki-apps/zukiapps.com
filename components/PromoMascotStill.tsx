'use client';

import Image from 'next/image';

const PROMO_SLUGS = new Set([
  'whistle-camera',
  'zulist',
  'hush-gallery',
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
]);

export function hasPromoMascot(slug: string) {
  return PROMO_SLUGS.has(slug);
}

const PROMO_V2_SLUGS = new Set(['track-ledger', 'zulist', 'geo-calc', 'fun-facts-trivia']);

export default function PromoMascotStill({ slug, alt }: { slug: string; alt: string }) {
  if (!PROMO_SLUGS.has(slug)) return null;
  const file = PROMO_V2_SLUGS.has(slug) ? 'promo-mascot-theme-v2.png' : 'promo-mascot-theme.png';
  return (
    <div className="mx-auto mt-10 w-full max-w-md px-2">
      <Image
        src={`/images/${slug}/${file}`}
        alt={alt}
        width={1024}
        height={1024}
        unoptimized
        className="h-auto w-full rounded-2xl shadow-2xl ring-1 ring-white/10"
      />
    </div>
  );
}
