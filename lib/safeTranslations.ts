/** Read optional i18n keys without throwing MISSING_MESSAGE in prod. */
export function safeRaw(t: { raw: (key: string) => unknown }, key: string): unknown {
  try {
    return t.raw(key);
  } catch {
    return undefined;
  }
}

export function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? value : [];
}

export function hasMessage(t: { has?: (key: string) => boolean }, key: string): boolean {
  if (typeof t.has === 'function') {
    return t.has(key);
  }
  return false;
}
