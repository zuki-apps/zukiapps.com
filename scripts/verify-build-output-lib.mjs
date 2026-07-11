/** Shared build log scanners for CI. */

export const FAIL_PATTERNS = [
  {
    name: 'MISSING_MESSAGE',
    re: /MISSING_MESSAGE:\s*([^\s(]+)/g,
    maxUnique: 25,
    hint: 'Add the key to messages/apps/{app}/en.json or use t.has() for optional keys.',
  },
  {
    name: 'prerender error',
    re: /Error occurred prerendering page/g,
    maxUnique: 5,
    hint: 'Fix the prerender error before deploying.',
  },
];

export function scanBuildOutput(text) {
  const failures = [];

  for (const { name, re, maxUnique, hint } of FAIL_PATTERNS) {
    const matches = [...text.matchAll(re)];
    if (!matches.length) continue;

    const unique =
      name === 'MISSING_MESSAGE'
        ? [...new Set(matches.map((m) => m[1]))]
        : matches.map(() => name);

    failures.push({
      name,
      unique: unique.slice(0, maxUnique),
      total: matches.length,
      hint,
    });
  }

  return failures;
}
