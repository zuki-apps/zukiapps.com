/**
 * Feature flags for apps that exist on the site but are not yet public on the home page / catalog.
 * Set `TOLDYA_PUBLISHED` to true when the product page should appear on home, sitemap `/toldya`, and JSON-LD.
 */
export const TOLDYA_PUBLISHED = false;

export const TOLDYA_APP_PATH = '/toldya' as const;

/** Google Play “Child safety standards” URL (public HTML, not a PDF). */
export const TOLDYA_CHILD_SAFETY_PATH = '/toldya/child-safety' as const;
