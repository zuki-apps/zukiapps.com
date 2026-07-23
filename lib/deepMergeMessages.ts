/**
 * Deep-merge locale JSON over English so missing nested keys never 500 in prod.
 * Empty / whitespace-only strings in the overlay do not override the English base
 * (prevents blank store URLs from wiping live App Store links).
 */
export function deepMergeMessages(
  base: unknown,
  override: unknown
): unknown {
  if (typeof override === 'string' && override.trim() === '') {
    return base !== undefined && base !== null ? base : override;
  }
  if (override === null || override === undefined) return base;
  if (base === null || base === undefined) return override;
  if (
    typeof base !== 'object' ||
    typeof override !== 'object' ||
    Array.isArray(base) ||
    Array.isArray(override)
  ) {
    return override;
  }
  const baseObj = base as Record<string, unknown>;
  const overrideObj = override as Record<string, unknown>;
  const result: Record<string, unknown> = { ...baseObj };
  for (const key of Object.keys(overrideObj)) {
    result[key] = deepMergeMessages(baseObj[key], overrideObj[key]);
  }
  return result;
}
