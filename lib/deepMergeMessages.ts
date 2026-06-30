/** Deep-merge locale JSON over English so missing nested keys never 500 in prod. */
export function deepMergeMessages(
  base: Record<string, unknown>,
  override: Record<string, unknown>
): Record<string, unknown> {
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
  const result: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    result[key] = deepMergeMessages(
      base[key] as Record<string, unknown>,
      override[key] as Record<string, unknown>
    );
  }
  return result;
}
