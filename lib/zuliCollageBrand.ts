/** Short app brand for legal/support headers (not the marketing headline). */
export function zuliCollageBrandName(
  tHero: { has: (key: string) => boolean; (key: string): string }
): string {
  if (tHero.has('productName')) {
    const parts = tHero('productName').split('—');
    return parts[0]?.trim() || tHero('productName');
  }
  return tHero('title');
}
