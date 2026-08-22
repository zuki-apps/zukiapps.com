/**
 * Canonical list of public product URLs and labels for JSON-LD (ItemList) and docs.
 * Paths are locale-agnostic; default locale uses unprefixed URLs per routing.
 *
 * ToldYa! (`/toldya`) is on the home grid when `TOLDYA_PUBLISHED` is true.
 * Crawler JSON: keep `public/site-facts.json` in lockstep (static export has no `/api/*`).
 */
export type SiteCatalogEntry = {
  path: string;
  name: string;
  /** One line for schema.org / machine-readable indexes */
  description: string;
};

export const ZUKI_SITE_APPS: SiteCatalogEntry[] = [
  { path: '/zulist', name: 'ZuList', description: 'Shopping and shared lists — Flutter, iOS and Android.' },
  { path: '/hush-gallery', name: 'Hush Gallery', description: 'Private photo and video gallery with secure storage.' },
  { path: '/whistle-camera', name: 'Whistle Camera', description: 'Hands-free camera app: whistle for selfies, pet photos, and group shots. Practice calibration, offline capture, Pro video. iOS & Android.' },
  { path: '/power-interval-timer', name: 'Power Interval Timer', description: 'Tabata and HIIT interval workout timer.' },
  { path: '/sudoku-puzzle', name: 'Sudoku Fun Go', description: 'Classic 9×9 Sudoku puzzle game.' },
  { path: '/football-trivia', name: 'Football Trivia Master', description: '450+ timed football quiz questions with streaks and global leaderboards.' },
  { path: '/fun-facts-trivia', name: 'Fun Facts! Trivia', description: 'Timed trivia across multiple categories.' },
  { path: '/bit-scope', name: 'Bit Scope', description: 'Bit-level number inspector and base converter for developers.' },
  { path: '/track-ledger', name: 'Track Ledger', description: 'Offline-first GPS / GNSS track logger; CSV, GPX, GeoJSON export; OpenStreetMap map.' },
  {
    path: '/noise-meter-shusher',
    name: 'Noise Meter — Shusher',
    description: 'Real-time decibel meter, noise scoring, local history, CSV export, charts; ads and optional Premium.',
  },
  {
    path: '/paratrooper-blitz',
    name: 'Paratrooper Blitz',
    description: 'Classic arcade action: aircraft and paratroopers; Arcade and Classic DOS modes; scores, ranks, leaderboards.',
  },
  { path: '/tempo-lab-pro', name: 'TempoLab Pro', description: 'Tempo, pitch, and audio practice tools.' },
  {
    path: '/zuli-collage',
    name: 'Zuli Collage',
    description:
      'Photo collage maker: 2–10 photos, layouts, filters, Zuli Monsters stickers, Layout Studio. On-device. Free on the App Store and Google Play (com.zuki.apps.collagio).',
  },
  {
    path: '/timesince',
    name: 'Time Since',
    description:
      'Streak tracker (quit & build modes, goal rings, widgets, share cards). Free on the App Store and Google Play (com.zuki.apps.timesince).',
  },
  {
    path: '/geo-calc',
    name: 'GEO Calc',
    description:
      'Offline WGS84 coordinate tools: DD/DMS/UTM/MGRS, Vincenty distance, map measure, GPX. Free on the App Store and Google Play (com.zuki.apps.geocalc).',
  },
  {
    path: '/toldya',
    name: 'ToldYa!',
    description: 'Social predictions (open beta): Arena voting, reputation, private rooms. Free, no ads. English & Hebrew. iOS & Android.',
  },
  { path: '/dreambit-legacy', name: 'DreamBit legacy archive', description: 'Legacy DreamBit Apps listings and history.' },
];

/** Unpublished / under-construction titles — About portfolio only, not home or JSON-LD ItemList. */
export const ZUKI_IN_DEVELOPMENT_APPS: SiteCatalogEntry[] = [
  {
    path: '/questivo',
    name: 'Questivo',
    description: 'Scavenger hunts and real-world missions. Create a quest, share a code. Coming soon. com.zuki.apps.questivo.',
  },
  {
    path: '/coloring-my-photo',
    name: 'Coloring My Photo',
    description: 'Turn photos into color-by-number pages on your device. Coming soon. com.zuki.apps.coloringmyphoto.',
  },
  {
    path: '/photo-stamp',
    name: 'Photo Stamp: Date & Location',
    description: 'Stamp date, time, and location onto existing photos and videos. On-device. Coming soon. com.zuki.apps.photostamp.',
  },
];

export function buildSoftwareCatalogItemList(baseUrl: string) {
  const origin = baseUrl.replace(/\/+$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${origin}/#software-catalog`,
    name: 'Zuki Apps — mobile software catalog',
    description:
      'Machine-readable index of mobile applications and product pages on zukiapps.com. Each item links to marketing, support, and policy pages where applicable.',
    numberOfItems: ZUKI_SITE_APPS.length,
    itemListElement: ZUKI_SITE_APPS.map((app, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: app.name,
      description: app.description,
      item: `${origin}${app.path}`,
    })),
  };
}
