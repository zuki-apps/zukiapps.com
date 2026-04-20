/**
 * Append standard marketing UTM params to App Store / Play Store URLs so installs
 * can be attributed to zukiapps.com in analytics (where supported).
 * Skips if `utm_source` is already present (e.g. hand-crafted campaign in messages).
 */
export function withStoreUtm(
  url: string | undefined,
  options: { campaign?: string; content?: string }
): string {
  const { campaign = 'website', content } = options;
  if (!url?.trim()) return '';

  try {
    const u = new URL(url.trim());
    if (u.searchParams.has('utm_source')) {
      return u.toString();
    }
    u.searchParams.set('utm_source', 'zukiapps');
    u.searchParams.set('utm_medium', 'website');
    u.searchParams.set('utm_campaign', campaign);
    if (content) {
      u.searchParams.set('utm_content', content);
    }
    return u.toString();
  } catch {
    return url.trim();
  }
}
