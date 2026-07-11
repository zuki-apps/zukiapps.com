#!/usr/bin/env node
/**
 * Validate legal/support i18n keys in messages/apps/{app}/en.json before build.
 * Catches MISSING_MESSAGE-class gaps without running a full static export.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const MESSAGES_APPS = join(ROOT, 'messages', 'apps');
const APP_ROUTES = join(ROOT, 'app', '[locale]');

const PRIVACY = {
  top: ['title', 'lastUpdated', 'intro'],
  sections: ['section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8'],
  listSections: new Set(['section2', 'section3']),
  content2Sections: new Set(['section1', 'section3', 'section4', 'section5', 'section6', 'section7']),
  contact: ['title', 'content', 'email', 'address'],
};

const TERMS = {
  top: ['title', 'lastUpdated', 'intro'],
  sections: ['section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8'],
  listSections: new Set(['section2', 'section5']),
  content2Sections: new Set(['section1', 'section3', 'section4', 'section6']),
  contact: ['title', 'content', 'email', 'address'],
};

const SUPPORT = {
  top: ['title', 'subtitle', 'metaTitle', 'metaDescription'],
  contact: ['title', 'description', 'email'],
  quickLinks: ['title', 'privacy.title', 'privacy.description', 'terms.title', 'terms.description'],
  faq: ['title'],
  additionalHelp: ['title', 'description'],
  minNumberedFaq: 1,
};

function fail(msg) {
  console.error(`i18n-legal: FAIL — ${msg}`);
  process.exit(1);
}

function hasPath(obj, path) {
  const parts = path.split('.');
  let cur = obj;
  for (const part of parts) {
    if (cur == null || typeof cur !== 'object' || !(part in cur)) return false;
    cur = cur[part];
  }
  return typeof cur === 'string' && cur.trim().length > 0;
}

function hasArray(obj, path) {
  const parts = path.split('.');
  let cur = obj;
  for (const part of parts) {
    if (cur == null || typeof cur !== 'object' || !(part in cur)) return false;
    cur = cur[part];
  }
  return Array.isArray(cur) && cur.length > 0 && cur.every((v) => typeof v === 'string' && v.trim());
}

function routePageSource(appSlug, page) {
  const path = join(APP_ROUTES, appSlug, page, 'page.tsx');
  if (!existsSync(path)) return null;
  return readFileSync(path, 'utf8');
}

function parseStringArray(source, constName) {
  const re = new RegExp(`const\\s+${constName}\\s*=\\s*\\[([^\\]]+)\\]`, 's');
  const match = source.match(re);
  if (!match) return null;
  return [...match[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
}

function parseLegalSectionsConfig(source) {
  if (!source.includes('LegalSections')) return null;

  const listSectionKeys =
    parseStringArray(source, 'listSectionKeys') ??
    (source.match(/listSectionKeys=\{(\[[^\]]+\])\}/)?.[1]
      ? [...source.match(/listSectionKeys=\{(\[[^\]]+\])\}/)[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1])
      : null);

  const withContent2Match = source.match(/withContent2=\{(\[[\s\S]*?\])\}/);
  const withContent2 = withContent2Match
    ? [...withContent2Match[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1])
    : parseStringArray(source, 'withContent2');

  const bodySections =
    parseStringArray(source, 'BODY_SECTIONS') ?? PRIVACY.sections;

  const contactSectionKey =
    source.match(/contactSectionKey="([^"]+)"/)?.[1] ?? 'sectionContact';

  if (!listSectionKeys || !withContent2) return null;

  return {
    sections: bodySections,
    listSections: new Set(listSectionKeys),
    content2Sections: new Set(withContent2),
    contactSectionKey,
  };
}

function checkLegalBlock(appSlug, namespace, blockName, block, template, overrides = null) {
  const errors = [];
  const prefix = `${namespace}.${blockName}`;
  const sections = overrides?.sections ?? template.sections;
  const listSections = overrides?.listSections ?? template.listSections;
  const content2Sections = overrides?.content2Sections ?? template.content2Sections;
  const contactSectionKey = overrides?.contactSectionKey ?? 'sectionContact';

  if (!block || typeof block !== 'object') {
    return [`${prefix} is missing`];
  }

  for (const key of template.top) {
    if (!hasPath(block, key)) errors.push(`${prefix}.${key}`);
  }

  for (const section of sections) {
    if (!hasPath(block, `${section}.title`)) errors.push(`${prefix}.${section}.title`);
    if (!hasPath(block, `${section}.content`)) errors.push(`${prefix}.${section}.content`);
    if (listSections.has(section) && !hasArray(block, `${section}.items`)) {
      errors.push(`${prefix}.${section}.items`);
    }
    if (content2Sections.has(section) && !hasPath(block, `${section}.content2`)) {
      errors.push(`${prefix}.${section}.content2`);
    }
  }

  for (const key of template.contact) {
    if (!hasPath(block, `${contactSectionKey}.${key}`)) {
      errors.push(`${prefix}.${contactSectionKey}.${key}`);
    }
  }

  return errors;
}

function checkSupportBlock(appSlug, namespace, block) {
  const errors = [];
  const prefix = `${namespace}.support`;

  if (!block || typeof block !== 'object') {
    return [`${prefix} is missing`];
  }

  for (const key of SUPPORT.top) {
    if (!hasPath(block, key)) errors.push(`${prefix}.${key}`);
  }
  for (const key of SUPPORT.contact) {
    if (!hasPath(block, `contact.${key}`)) errors.push(`${prefix}.contact.${key}`);
  }
  for (const key of SUPPORT.quickLinks) {
    if (!hasPath(block, `quickLinks.${key}`)) errors.push(`${prefix}.quickLinks.${key}`);
  }
  for (const key of SUPPORT.faq) {
    if (!hasPath(block, `faq.${key}`)) errors.push(`${prefix}.faq.${key}`);
  }
  for (const key of SUPPORT.additionalHelp) {
    if (!hasPath(block, `additionalHelp.${key}`)) errors.push(`${prefix}.additionalHelp.${key}`);
  }

  let faqCount = 0;
  for (let n = 1; n <= 24; n++) {
    const q = `faq.q${n}.question`;
    const a = `faq.q${n}.answer`;
    const hasQ = hasPath(block, q);
    const hasA = hasPath(block, a);
    if (!hasQ && !hasA) break;
    if (!hasQ || !hasA) {
      errors.push(`${prefix}.${hasQ ? a : q}`);
      break;
    }
    faqCount++;
  }
  if (faqCount < SUPPORT.minNumberedFaq) {
    errors.push(`${prefix}.faq.q1 (need ≥${SUPPORT.minNumberedFaq} numbered FAQ entries)`);
  }

  return errors;
}

function routeExists(appSlug, page) {
  return existsSync(join(APP_ROUTES, appSlug, page, 'page.tsx'));
}

function usesNumberedSupportFaq(source) {
  return source.includes('collectNumberedSupportFaq') || source.includes('faq.q1');
}

function loadAppMessages(appSlug) {
  const path = join(MESSAGES_APPS, appSlug, 'en.json');
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf8'));
}

function main() {
  const appFolders = readdirSync(MESSAGES_APPS, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const allErrors = [];

  for (const appSlug of appFolders) {
    const messages = loadAppMessages(appSlug);
    if (!messages) continue;

    const namespace = Object.keys(messages)[0];
    if (!namespace) {
      allErrors.push(`${appSlug}/en.json: empty namespace root`);
      continue;
    }

    const app = messages[namespace];

    const privacySource = routePageSource(appSlug, 'privacy');
    if (privacySource) {
      const privacyConfig = parseLegalSectionsConfig(privacySource);
      if (privacyConfig) {
        allErrors.push(
          ...checkLegalBlock(appSlug, namespace, 'privacy', app.privacy, PRIVACY, privacyConfig),
        );
      }
    }

    const termsSource = routePageSource(appSlug, 'terms');
    if (termsSource) {
      const termsConfig = parseLegalSectionsConfig(termsSource);
      if (termsConfig) {
        allErrors.push(
          ...checkLegalBlock(appSlug, namespace, 'terms', app.terms, TERMS, termsConfig),
        );
      }
    }

    const supportSource = routePageSource(appSlug, 'support');
    if (supportSource && usesNumberedSupportFaq(supportSource)) {
      allErrors.push(...checkSupportBlock(appSlug, namespace, app.support));
    }
  }

  if (allErrors.length) {
    const sample = allErrors.slice(0, 30).map((e) => `  - ${e}`).join('\n');
    const more = allErrors.length > 30 ? `\n  … and ${allErrors.length - 30} more` : '';
    fail(`${allErrors.length} missing i18n keys:\n${sample}${more}`);
  }

  console.log(`i18n-legal: OK (${appFolders.length} app folders checked)`);
}

main();
