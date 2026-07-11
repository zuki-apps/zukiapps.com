/**
 * Feature flags for apps that exist on the site but are not yet public on the home page / catalog.
 * Set `TOLDYA_PUBLISHED` to true when the product page should appear on home, sitemap `/toldya`, and JSON-LD.
 * `TOLDYA_PILOT` — live on stores with a pilot landing page (indexed, not on home grid).
 * Legal/support sitemap URLs (privacy, terms, child-safety, delete-account, support) are included only when
 * `TOLDYA_PUBLISHED || TOLDYA_PILOT` — required for Play Store compliance while the pilot is live.
 */
export const TOLDYA_PILOT = true;
export const TOLDYA_PUBLISHED = false;

export const TOLDYA_APP_PATH = '/toldya' as const;

/** Google Play “Child safety standards” URL (public HTML, not a PDF). */
export const TOLDYA_CHILD_SAFETY_PATH = '/toldya/child-safety' as const;

/**
 * Zuli Collage is on the home grid when `ZULI_COLLAGE_PUBLISHED` is true.
 * `ZULI_COLLAGE_PILOT` — indexed landing page without home grid when not published.
 * Privacy/terms/support sitemap entries follow the same pilot/published gate in `app/sitemap.ts`.
 */
export const ZULI_COLLAGE_PILOT = true;
export const ZULI_COLLAGE_PUBLISHED = false;

export const ZULI_COLLAGE_APP_PATH = '/zuli-collage' as const;

/**
 * Time Since is on the home grid when `TIMESINCE_PUBLISHED` is true.
 * `TIMESINCE_PILOT` — indexed full landing when live on stores (not on home grid until published).
 * `TIMESINCE_UNDER_CONSTRUCTION` — minimal landing + privacy/terms/support in sitemap only.
 */
export const TIMESINCE_UNDER_CONSTRUCTION = false;
export const TIMESINCE_PILOT = true;
export const TIMESINCE_PUBLISHED = false;

export const TIMESINCE_APP_PATH = '/timesince' as const;

/**
 * GEO Calc is on the home grid when `GEO_CALC_PUBLISHED` is true.
 * `GEO_CALC_PILOT` — indexed full landing when live on stores.
 * `GEO_CALC_UNDER_CONSTRUCTION` — minimal landing + privacy/terms/support in sitemap only.
 */
export const GEO_CALC_UNDER_CONSTRUCTION = false;
export const GEO_CALC_PILOT = true;
export const GEO_CALC_PUBLISHED = false;

export const GEO_CALC_APP_PATH = '/geo-calc' as const;

/** Roam Guard — hidden until published; legal pages for Play Store compliance. */
export const ROAMGUARD_UNDER_CONSTRUCTION = true;
export const ROAMGUARD_PILOT = false;
export const ROAMGUARD_PUBLISHED = false;
export const ROAMGUARD_APP_PATH = '/roamguard' as const;

/** Questivo — hidden until published; legal pages for store compliance. */
export const QUESTIVO_UNDER_CONSTRUCTION = true;
export const QUESTIVO_PILOT = false;
export const QUESTIVO_PUBLISHED = false;
export const QUESTIVO_APP_PATH = '/questivo' as const;

/** Coloring My Photo — hidden until published; legal pages for store compliance. */
export const COLORING_MY_PHOTO_UNDER_CONSTRUCTION = true;
export const COLORING_MY_PHOTO_PILOT = false;
export const COLORING_MY_PHOTO_PUBLISHED = false;
export const COLORING_MY_PHOTO_APP_PATH = '/coloring-my-photo' as const;
