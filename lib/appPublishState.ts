/**
 * Feature flags for apps that exist on the site but are not yet public on the home page / catalog.
 * Set `TOLDYA_PUBLISHED` to true when the product page should appear on home, sitemap `/toldya`, and JSON-LD.
 * `TOLDYA_PILOT` — live on stores with a pilot landing page (indexed, not on home grid).
 */
export const TOLDYA_PILOT = true;
export const TOLDYA_PUBLISHED = false;

export const TOLDYA_APP_PATH = '/toldya' as const;

/** Google Play “Child safety standards” URL (public HTML, not a PDF). */
export const TOLDYA_CHILD_SAFETY_PATH = '/toldya/child-safety' as const;

/**
 * Collagio exists on the site but is not yet public on the home page / catalog.
 * Set `COLLAGIO_PUBLISHED` to true when the product page should appear on home, sitemap `/collagio`, and JSON-LD.
 * `COLLAGIO_PILOT` — indexed landing page (e.g. Google Play live) without home grid.
 */
export const COLLAGIO_PILOT = true;
export const COLLAGIO_PUBLISHED = true;

export const COLLAGIO_APP_PATH = '/collagio' as const;
