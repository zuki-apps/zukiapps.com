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
 * Collagio is on the home grid when `COLLAGIO_PUBLISHED` is true.
 * `COLLAGIO_PILOT` — indexed landing page without home grid when not published.
 * Privacy/terms/support sitemap entries follow the same pilot/published gate in `app/sitemap.ts`.
 */
export const COLLAGIO_PILOT = true;
export const COLLAGIO_PUBLISHED = true;

export const COLLAGIO_APP_PATH = '/collagio' as const;
