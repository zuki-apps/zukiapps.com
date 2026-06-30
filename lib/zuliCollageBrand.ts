/** Short app brand for legal/support headers (not the marketing headline). */
export function zuliCollageBrandName(
  tHero: { has: (key: string) => boolean; (key: string): string }
): string {
  if (tHero.has('productName')) {
    const parts = tHero('productName').split('—');
    return parts[0]?.trim() || tHero('productName');
  }
  if (tHero.has('hero.productName')) {
    const parts = tHero('hero.productName').split('—');
    return parts[0]?.trim() || tHero('hero.productName');
  }
  if (tHero.has('hero.title')) return tHero('hero.title');
  if (tHero.has('title')) return tHero('title');
  return 'Zuli Collage';
}
