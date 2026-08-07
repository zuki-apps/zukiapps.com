/**
 * Play Store / App Store aggregate ratings for JSON-LD and on-page social proof.
 * Update from Play Console and App Store Connect — omit paths with no public ratings.
 *
 * Important: use ratings for the *current* listing (com.zuki.apps.*) only.
 * Legacy DreamBit packages (com.dreambit.*) can still have high counts; do not attribute
 * those numbers to the new package IDs in schema.org.
 *
 * Last reviewed: 2026-08-07 — current Zuki packages had no public AggregateRating on Play;
 * App Store listings for ZuList / Hush / Whistle showed insufficient ratings. Add entries
 * here as soon as Console shows ratingCount > 0.
 */
export type AppStoreRating = {
  ratingValue: number;
  ratingCount: number;
  /** Where the numbers came from (for maintainers). */
  source: 'google-play' | 'app-store' | 'combined';
};

export const APP_STORE_RATINGS: Partial<Record<string, AppStoreRating>> = {
  // Example when verified:
  // '/whistle-camera': { ratingValue: 4.5, ratingCount: 120, source: 'google-play' },
};

export function getAppStoreRating(appPath: string): AppStoreRating | undefined {
  const normalized = appPath.startsWith('/') ? appPath : `/${appPath}`;
  const rating = APP_STORE_RATINGS[normalized];
  if (!rating || rating.ratingCount <= 0 || rating.ratingValue <= 0 || rating.ratingValue > 5) {
    return undefined;
  }
  return rating;
}
