/**
 * Canonical list of public product URLs and labels for JSON-LD (ItemList) and docs.
 * Paths are locale-agnostic; default locale uses unprefixed URLs per routing.
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
  { path: '/whistle-camera', name: 'Whistle Camera', description: 'Camera app with whistle-triggered capture.' },
  { path: '/power-interval-timer', name: 'Power Interval Timer', description: 'Tabata and HIIT interval workout timer.' },
  { path: '/sudoku-puzzle', name: 'Sudoku Fun Go', description: 'Classic 9×9 Sudoku puzzle game.' },
  { path: '/football-trivia', name: 'Football Trivia Master', description: 'Football trivia quiz game.' },
  { path: '/fun-facts-trivia', name: 'Fun Facts Trivia', description: 'Timed trivia across multiple categories.' },
  { path: '/bit-scope', name: 'Bit Scope', description: 'Bit-level number inspector and base converter for developers.' },
  { path: '/track-ledger', name: 'Track Ledger', description: 'Offline-first GPS / GNSS track logger; CSV, GPX, GeoJSON export; OpenStreetMap map.' },
  { path: '/tempoLabPro', name: 'TempoLab Pro', description: 'Tempo, pitch, and audio practice tools.' },
  { path: '/dreambit-legacy', name: 'DreamBit legacy archive', description: 'Legacy DreamBit Apps listings and history.' },
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
