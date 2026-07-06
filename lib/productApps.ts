/** Product page config for JSON-LD and layout metadata. */
export type ProductAppSlug =
  | 'bit-scope'
  | 'fun-facts-trivia'
  | 'noise-meter-shusher'
  | 'paratrooper-blitz'
  | 'power-interval-timer'
  | 'sudoku-puzzle'
  | 'tempo-lab-pro'
  | 'track-ledger'
  | 'zulist'
  | 'hush-gallery'
  | 'whistle-camera'
  | 'zuli-collage'
  | 'football-trivia'
  | 'timesince'
  | 'geo-calc';

export type ProductAppNamespace =
  | 'bitScope'
  | 'funFactsTrivia'
  | 'noiseMeterShusher'
  | 'paratrooperBlitz'
  | 'powerIntervalTimer'
  | 'sudokuPuzzle'
  | 'tempoLabPro'
  | 'trackLedger'
  | 'zulist'
  | 'hushGallery'
  | 'whistleCamera'
  | 'zuliCollage'
  | 'footballTrivia'
  | 'timeSince'
  | 'geoCalc';

export type ProductAppConfig = {
  slug: ProductAppSlug;
  namespace: ProductAppNamespace;
  appPath: `/${ProductAppSlug}`;
  applicationCategory: string;
  faqId: string;
  howToId: string;
  /** Tailwind accent token for marketing sections (e.g. violet, cyan) */
  accent: string;
  hasSupportPage?: boolean;
};

export const PRODUCT_APPS: Record<ProductAppSlug, ProductAppConfig> = {
  'hush-gallery': {
    slug: 'hush-gallery',
    namespace: 'hushGallery',
    appPath: '/hush-gallery',
    applicationCategory: 'PhotoApplication',
    faqId: 'hush-gallery-faq-ld',
    howToId: 'hush-gallery-howto-ld',
    accent: 'purple',
    hasSupportPage: true,
  },
  'whistle-camera': {
    slug: 'whistle-camera',
    namespace: 'whistleCamera',
    appPath: '/whistle-camera',
    applicationCategory: 'PhotographyApplication',
    faqId: 'whistle-camera-faq-ld',
    howToId: 'whistle-camera-howto-ld',
    accent: 'amber',
    hasSupportPage: true,
  },
  'zuli-collage': {
    slug: 'zuli-collage',
    namespace: 'zuliCollage',
    appPath: '/zuli-collage',
    applicationCategory: 'PhotographyApplication',
    faqId: 'zuli-collage-faq-ld',
    howToId: 'zuli-collage-howto-ld',
    accent: 'rose',
    hasSupportPage: true,
  },
  'football-trivia': {
    slug: 'football-trivia',
    namespace: 'footballTrivia',
    appPath: '/football-trivia',
    applicationCategory: 'GameApplication',
    faqId: 'football-trivia-faq-ld',
    howToId: 'football-trivia-howto-ld',
    accent: 'sky',
    hasSupportPage: true,
  },
  timesince: {
    slug: 'timesince',
    namespace: 'timeSince',
    appPath: '/timesince',
    applicationCategory: 'HealthApplication',
    faqId: 'timesince-faq-ld',
    howToId: 'timesince-howto-ld',
    accent: 'orange',
    hasSupportPage: true,
  },
  'geo-calc': {
    slug: 'geo-calc',
    namespace: 'geoCalc',
    appPath: '/geo-calc',
    applicationCategory: 'NavigationApplication',
    faqId: 'geo-calc-faq-ld',
    howToId: 'geo-calc-howto-ld',
    accent: 'amber',
    hasSupportPage: true,
  },
  'bit-scope': {
    slug: 'bit-scope',
    namespace: 'bitScope',
    appPath: '/bit-scope',
    applicationCategory: 'DeveloperApplication',
    faqId: 'bit-scope-faq-ld',
    howToId: 'bit-scope-howto-ld',
    accent: 'cyan',
    hasSupportPage: true,
  },
  'fun-facts-trivia': {
    slug: 'fun-facts-trivia',
    namespace: 'funFactsTrivia',
    appPath: '/fun-facts-trivia',
    applicationCategory: 'GameApplication',
    faqId: 'fun-facts-trivia-faq-ld',
    howToId: 'fun-facts-trivia-howto-ld',
    accent: 'emerald',
    hasSupportPage: true,
  },
  'noise-meter-shusher': {
    slug: 'noise-meter-shusher',
    namespace: 'noiseMeterShusher',
    appPath: '/noise-meter-shusher',
    applicationCategory: 'UtilitiesApplication',
    faqId: 'noise-meter-shusher-faq-ld',
    howToId: 'noise-meter-shusher-howto-ld',
    accent: 'violet',
  },
  'paratrooper-blitz': {
    slug: 'paratrooper-blitz',
    namespace: 'paratrooperBlitz',
    appPath: '/paratrooper-blitz',
    applicationCategory: 'GameApplication',
    faqId: 'paratrooper-blitz-faq-ld',
    howToId: 'paratrooper-blitz-howto-ld',
    accent: 'green',
  },
  'power-interval-timer': {
    slug: 'power-interval-timer',
    namespace: 'powerIntervalTimer',
    appPath: '/power-interval-timer',
    applicationCategory: 'HealthApplication',
    faqId: 'power-interval-timer-faq-ld',
    howToId: 'power-interval-timer-howto-ld',
    accent: 'orange',
    hasSupportPage: true,
  },
  'sudoku-puzzle': {
    slug: 'sudoku-puzzle',
    namespace: 'sudokuPuzzle',
    appPath: '/sudoku-puzzle',
    applicationCategory: 'GameApplication',
    faqId: 'sudoku-puzzle-faq-ld',
    howToId: 'sudoku-puzzle-howto-ld',
    accent: 'blue',
    hasSupportPage: true,
  },
  'tempo-lab-pro': {
    slug: 'tempo-lab-pro',
    namespace: 'tempoLabPro',
    appPath: '/tempo-lab-pro',
    applicationCategory: 'MusicApplication',
    faqId: 'tempo-lab-pro-faq-ld',
    howToId: 'tempo-lab-pro-howto-ld',
    accent: 'rose',
    hasSupportPage: true,
  },
  'track-ledger': {
    slug: 'track-ledger',
    namespace: 'trackLedger',
    appPath: '/track-ledger',
    applicationCategory: 'NavigationApplication',
    faqId: 'track-ledger-faq-ld',
    howToId: 'track-ledger-howto-ld',
    accent: 'teal',
  },
  zulist: {
    slug: 'zulist',
    namespace: 'zulist',
    appPath: '/zulist',
    applicationCategory: 'ProductivityApplication',
    faqId: 'zulist-faq-ld',
    howToId: 'zulist-howto-ld',
    accent: 'blue',
    hasSupportPage: true,
  },
};

export function getProductApp(slug: ProductAppSlug): ProductAppConfig {
  return PRODUCT_APPS[slug];
}
