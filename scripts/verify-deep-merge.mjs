#!/usr/bin/env node
/**
 * Unit checks for deepMergeMessages empty-string safeguard.
 * Uses Node's type stripping to import the TypeScript source (Node >=20).
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = process.cwd();
const TS_PATH = join(ROOT, 'lib', 'deepMergeMessages.ts');

function fail(msg) {
  console.error(`deep-merge: FAIL — ${msg}`);
  process.exit(1);
}

function assert(cond, msg) {
  if (!cond) fail(msg);
}

// Source guard: empty-string branch must remain in the TS file.
const src = readFileSync(TS_PATH, 'utf8');
assert(
  /override\.trim\(\)\s*===\s*''/.test(src) || /trim\(\)\s*===\s*["']{2}/.test(src),
  'lib/deepMergeMessages.ts missing empty/whitespace string guard',
);

const runner = `
import { deepMergeMessages } from ${JSON.stringify(pathToFileURL(TS_PATH).href)};

function assert(cond, msg) {
  if (!cond) {
    console.error('deep-merge: FAIL — ' + msg);
    process.exit(1);
  }
}

const base = {
  download: {
    appStoreUrl: 'https://apps.apple.com/app/id1',
    googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.example',
    title: 'Download',
  },
  nested: { a: 1, b: 'keep' },
};

const emptyOverlay = {
  download: {
    appStoreUrl: '',
    googlePlayUrl: '   ',
    title: 'Get it',
  },
  nested: { a: 2 },
};

const merged = deepMergeMessages(base, emptyOverlay);

assert(merged.download.appStoreUrl === base.download.appStoreUrl, 'empty appStoreUrl must not wipe EN');
assert(merged.download.googlePlayUrl === base.download.googlePlayUrl, 'whitespace googlePlayUrl must not wipe EN');
assert(merged.download.title === 'Get it', 'non-empty string should override');
assert(merged.nested.a === 2, 'nested number override');
assert(merged.nested.b === 'keep', 'missing nested key should keep base');

const nullish = deepMergeMessages({ x: 'a' }, { x: null });
assert(nullish.x === 'a' || nullish.x === null, 'null handling should be defined');

console.log('deep-merge: OK');
`;

const result = spawnSync(
  process.execPath,
  ['--experimental-strip-types', '--input-type=module', '-e', runner],
  { encoding: 'utf8', cwd: ROOT },
);

if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) {
  const err = result.stderr
    .split('\n')
    .filter(
      (line) =>
        !/ExperimentalWarning|MODULE_TYPELESS|Reparsing as ES module|trace-warnings|To eliminate this warning/i.test(
          line,
        ),
    )
    .join('\n')
    .trim();
  if (err) process.stderr.write(`${err}\n`);
}

if ((result.status ?? 1) !== 0) {
  process.exit(result.status ?? 1);
}
