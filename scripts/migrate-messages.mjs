/**
 * Migrates monolithic messages/en.json + messages/{locale}.json files into a
 * per-app folder structure under messages/shared/ and messages/apps/.
 *
 * Run once with: node scripts/migrate-messages.mjs
 * After verifying the build works, delete the old files manually.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MSG = path.join(__dirname, '..', 'messages');

const LOCALES = ['he', 'de', 'es', 'it', 'pt', 'ru', 'fr', 'ja', 'ko', 'ar', 'zh'];

// Maps JSON namespace key → new app folder name
const APP_MAP = {
  hushGallery: 'hush-gallery',
  whistleCamera: 'whistle-camera',
  zulist: 'zulist',
  sudokuPuzzle: 'sudoku-puzzle',
  footballTrivia: 'football-trivia',
  funFactsTrivia: 'fun-facts-trivia',
  powerIntervalTimer: 'power-interval-timer',
  tempoLabPro: 'tempo-lab-pro',
  bitScope: 'bit-scope',
  trackLedger: 'track-ledger',
  noiseMeterShusher: 'noise-meter-shusher',
  paratrooperBlitz: 'paratrooper-blitz',
  toldya: 'toldya',
  'zuli-collage': 'zuli-collage',       // source: collagio-locales/ overlay
  dreambitLegacy: 'dreambit-legacy', // source: dreambitLegacy.json + dreambit-legacy/
};

const SHARED_KEYS = ['home', 'common', 'dsa'];

// home.collagio translations for all 11 non-en locales
const HOME_COLLAGIO_TRANSLATIONS = {
  he: {
    title: 'Collagio - יוצר קולאז׳ תמונות',
    subtitle: 'הפוך 2–10 תמונות לקולאז׳ תוך שניות',
    description: 'בחרו תמונות, בחרו פריסה, הוסיפו פילטרים ומדבקות Zuli Monsters, ושמרו או שתפו. לא נדרש חשבון.',
    learnMore: 'למד עוד על Collagio ←',
    features: { layouts: 'פריסות חכמות', filters: 'פילטרים ומדבקות', private: 'ללא התחברות' },
  },
  de: {
    title: 'Collagio - Foto-Collage-Ersteller',
    subtitle: 'Verwandle 2–10 Fotos in Sekunden in eine Collage',
    description: 'Wähle Fotos aus, wähle ein Layout, füge Filter und Zuli Monsters-Sticker hinzu, dann speichern oder teilen. Kein Konto erforderlich.',
    learnMore: 'Mehr über Collagio erfahren →',
    features: { layouts: 'Smarte Layouts', filters: 'Filter & Sticker', private: 'Kein Login' },
  },
  es: {
    title: 'Collagio - Creador de fotomontajes',
    subtitle: 'Convierte 2–10 fotos en un collage en segundos',
    description: 'Elige fotos, selecciona un diseño, añade filtros y pegatinas de Zuli Monsters, luego guarda o comparte. Sin cuenta necesaria.',
    learnMore: 'Más información sobre Collagio →',
    features: { layouts: 'Diseños inteligentes', filters: 'Filtros y pegatinas', private: 'Sin inicio de sesión' },
  },
  it: {
    title: 'Collagio - Creatore di collage fotografici',
    subtitle: 'Trasforma 2–10 foto in un collage in pochi secondi',
    description: 'Scegli le foto, seleziona un layout, aggiungi filtri e adesivi Zuli Monsters, poi salva o condividi. Nessun account necessario.',
    learnMore: 'Scopri di più su Collagio →',
    features: { layouts: 'Layout intelligenti', filters: 'Filtri e adesivi', private: 'Nessun accesso' },
  },
  pt: {
    title: 'Collagio - Criador de colagens fotográficas',
    subtitle: 'Transforme 2–10 fotos em uma colagem em segundos',
    description: 'Escolha fotos, selecione um layout, adicione filtros e adesivos Zuli Monsters, depois salve ou compartilhe. Nenhuma conta necessária.',
    learnMore: 'Saiba mais sobre o Collagio →',
    features: { layouts: 'Layouts inteligentes', filters: 'Filtros e adesivos', private: 'Sem login' },
  },
  ru: {
    title: 'Collagio - Создатель фотоколлажей',
    subtitle: 'Превратите 2–10 фото в коллаж за секунды',
    description: 'Выберите фотографии, выберите макет, добавьте фильтры и стикеры Zuli Monsters, затем сохраните или поделитесь. Регистрация не требуется.',
    learnMore: 'Узнать больше о Collagio →',
    features: { layouts: 'Умные макеты', filters: 'Фильтры и стикеры', private: 'Без входа' },
  },
  fr: {
    title: 'Collagio - Créateur de collages photo',
    subtitle: 'Transformez 2–10 photos en collage en quelques secondes',
    description: 'Choisissez des photos, sélectionnez une mise en page, ajoutez des filtres et des autocollants Zuli Monsters, puis enregistrez ou partagez. Aucun compte requis.',
    learnMore: 'En savoir plus sur Collagio →',
    features: { layouts: 'Mises en page intelligentes', filters: 'Filtres et autocollants', private: 'Sans connexion' },
  },
  ja: {
    title: 'Collagio - フォトコラージュメーカー',
    subtitle: '2〜10枚の写真を数秒でコラージュに',
    description: '写真を選び、レイアウトを選択し、フィルターとZuli Monstersステッカーを追加して、保存または共有。アカウント不要。',
    learnMore: 'Collagioについてもっと詳しく →',
    features: { layouts: 'スマートレイアウト', filters: 'フィルターとステッカー', private: 'ログイン不要' },
  },
  ko: {
    title: 'Collagio - 사진 콜라주 메이커',
    subtitle: '2~10장의 사진을 몇 초 만에 콜라주로',
    description: '사진을 선택하고 레이아웃을 고르고 필터와 Zuli Monsters 스티커를 추가한 다음 저장하거나 공유하세요. 계정이 필요 없습니다.',
    learnMore: 'Collagio에 대해 더 알아보기 →',
    features: { layouts: '스마트 레이아웃', filters: '필터 및 스티커', private: '로그인 불필요' },
  },
  ar: {
    title: 'Collagio - صانع كولاج الصور',
    subtitle: 'حوّل 2–10 صور إلى كولاج في ثوانٍ',
    description: 'اختر الصور، اختر تخطيطاً، أضف فلاتر وملصقات Zuli Monsters، ثم احفظ أو شارك. لا يلزم حساب.',
    learnMore: 'تعرف على المزيد حول Collagio ←',
    features: { layouts: 'تخطيطات ذكية', filters: 'فلاتر وملصقات', private: 'بدون تسجيل دخول' },
  },
  zh: {
    title: 'Collagio - 照片拼贴制作器',
    subtitle: '几秒内将2–10张照片制作成拼贴画',
    description: '选择照片，选择布局，添加滤镜和Zuli Monsters贴纸，然后保存或分享。无需账户。',
    learnMore: '了解更多关于Collagio →',
    features: { layouts: '智能布局', filters: '滤镜和贴纸', private: '无需登录' },
  },
};

function write(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('  wrote', path.relative(path.join(__dirname, '..'), filePath));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// ── 1. Load source files ──────────────────────────────────────────────────────

const enFull = readJson(path.join(MSG, 'en.json'));
const dreambitBase = readJson(path.join(MSG, 'dreambitLegacy.json'));

// ── 2. Write shared/en.json ───────────────────────────────────────────────────

const sharedEn = {};
for (const k of SHARED_KEYS) if (enFull[k]) sharedEn[k] = enFull[k];
write(path.join(MSG, 'shared', 'en.json'), sharedEn);

// ── 3. Write apps/*/en.json ───────────────────────────────────────────────────

for (const [nsKey, dir] of Object.entries(APP_MAP)) {
  let content;
  if (nsKey === 'dreambitLegacy') {
    content = { dreambitLegacy: dreambitBase };
  } else {
    if (!enFull[nsKey]) { console.warn(`  SKIP ${nsKey} — not in en.json`); continue; }
    content = { [nsKey]: enFull[nsKey] };
  }
  write(path.join(MSG, 'apps', dir, 'en.json'), content);
}

// ── 4. Process each non-en locale ─────────────────────────────────────────────

for (const loc of LOCALES) {
  const localeFull = readJson(path.join(MSG, `${loc}.json`));

  // 4a. shared/{loc}.json — extract home/common/dsa, then patch home.collagio
  const sharedLoc = {};
  for (const k of SHARED_KEYS) if (localeFull[k]) sharedLoc[k] = localeFull[k];
  if (HOME_COLLAGIO_TRANSLATIONS[loc]) {
    if (!sharedLoc.home) sharedLoc.home = {};
    sharedLoc.home.collagio = HOME_COLLAGIO_TRANSLATIONS[loc];
  }
  write(path.join(MSG, 'shared', `${loc}.json`), sharedLoc);

  // 4b. apps/*/{loc}.json — extract per-app namespace
  for (const [nsKey, dir] of Object.entries(APP_MAP)) {
    let content;

    if (nsKey === 'zuli-collage') {
      // Source: collagio-locales/{loc}.json (no wrapper in source)
      const overlayPath = path.join(MSG, 'collagio-locales', `${loc}.json`);
      if (!fs.existsSync(overlayPath)) continue;
      content = { collagio: readJson(overlayPath) };

    } else if (nsKey === 'dreambitLegacy') {
      // Source: dreambit-legacy/{loc}.json (partial overlay, no wrapper)
      const overlayPath = path.join(MSG, 'dreambit-legacy', `${loc}.json`);
      if (!fs.existsSync(overlayPath)) continue;
      content = { dreambitLegacy: readJson(overlayPath) };

    } else {
      if (!localeFull[nsKey]) continue; // locale has no translation for this app yet
      content = { [nsKey]: localeFull[nsKey] };
    }

    write(path.join(MSG, 'apps', dir, `${loc}.json`), content);
  }
}

console.log('\nDone. Verify build, then delete old files:');
console.log('  messages/en.json  messages/{he,de,es,it,pt,ru,fr,ja,ko,ar,zh}.json');
console.log('  messages/dreambitLegacy.json');
console.log('  messages/collagio-locales/  messages/collagio-overlays/  messages/dreambit-legacy/');
