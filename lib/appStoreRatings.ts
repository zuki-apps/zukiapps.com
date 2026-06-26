/**
 * Play Store / App Store aggregate ratings for JSON-LD and on-page social proof.
 * Update from Play Console and App Store Connect — omit paths with no public ratings.
 * Last reviewed: 2026-06-26
 */
export type AppStoreRating = {
  ratingValue: number;
  ratingCount: number;
  /** Where the numbers came from (for maintainers). */
  source: 'google-play' | 'app-store' | 'combined';
};

export const APP_STORE_RATINGS: Partial<Record<string, AppStoreRating>> = {
  // Add entries when you have verified store ratings (ratingCount > 0).
  // Example:
  // '/hush-gallery': { ratingValue: 4.6, ratingCount: 24, source: 'google-play' },
};

export function getAppStoreRating(appPath: string): AppStoreRating | undefined {
  const normalized = appPath.startsWith('/') ? appPath : `/${appPath}`;
  const rating = APP_STORE_RATINGS[normalized];
  if (!rating || rating.ratingCount <= 0 || rating.ratingValue <= 0 || rating.ratingValue > 5) {
    return undefined;
  }
  return rating;
}
