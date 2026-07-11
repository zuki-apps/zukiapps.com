#!/usr/bin/env node
/**
 * Scan Next.js build output for errors that do not always fail the build.
 * Usage: node scripts/verify-build-output.mjs [logfile]
 *   If no logfile, reads stdin.
 */
import { readFileSync } from 'node:fs';
import { scanBuildOutput } from './verify-build-output-lib.mjs';

function readInput(path) {
  if (path) return readFileSync(path, 'utf8');
  return readFileSync(0, 'utf8');
}

function main() {
  const logPath = process.argv[2];
  const text = readInput(logPath);
  const failures = scanBuildOutput(text);

  if (!failures.length) {
    console.log('build-output: OK (no known error patterns)');
    return;
  }

  console.error('build-output: FAIL');
  for (const f of failures) {
    console.error(`\n${f.name} (${f.total} occurrence(s)):`);
    for (const item of f.unique) console.error(`  - ${item}`);
    if (f.unique.length < f.total) {
      console.error(`  … ${f.total - f.unique.length} more`);
    }
    console.error(`Hint: ${f.hint}`);
  }
  process.exit(1);
}

main();
