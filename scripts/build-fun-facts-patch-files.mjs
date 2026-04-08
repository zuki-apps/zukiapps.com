#!/usr/bin/env node
/**
 * Generates scripts/patches/fun-facts/{locale}.json from embedded UI strings.
 * Run: node scripts/build-fun-facts-patch-files.mjs
 * Then: node scripts/apply-fun-facts-translations.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'patches', 'fun-facts');

const itemsEn = [
  'Science & Nature',
  'History & Culture',
  'Geography & World',
  'Odd Facts & Records',
  'Movies & Film',
  'Amazing Facts',
  'Sports & Games',
  'World Records',
];

/** @type {Record<string, { home: Record<string,string>, ui: Record<string, unknown> }>} */
const L = {
  he: {
    home: {
      title: 'Fun Facts Trivia',
      subtitle: 'טריוויה מתוזמנת במדע, היסטוריה ועוד',
      description:
        'סבבי שאלות טריוויה בקטגוריות, שלוש רמות קושי, רצפים וסטטיסטיקות. בקרוב ב-App Store וב-Google Play.',
      features: { categories: 'שמונה קטגוריות', gameplay: 'סבבים מתוזמנים ורמות קושי', extras: 'סטטיסטיקות ולוחות מובילים' },
      learnMore: 'למידע נוסף על Fun Facts Trivia →',
    },
    ui: {
      back: 'חזרה לדף הבית',
      hero: {
        badge: 'בקרוב ב-App Store וב-Google Play',
        title: 'Fun Facts Trivia',
        subtitle: 'שמונה קטגוריות · קל, בינוני וקשה · רצפים וסטטיסטיקות',
        description:
          'משחק טריוויה ב-Flutter ל-iOS ול-Android: שאלות מתוזמנות במדע, היסטוריה, גיאוגרפיה, בידור ועוד. משחק אופליין, לוחות מובילים ב-Game Center וב-Play Games, הישגים, ובחירה להסרת פרסומות ברכישה חד-פעמית.',
      },
      features: {
        title: 'יכולות עיקריות',
        categories: {
          title: 'שמונה קטגוריות בנושאים שונים',
          description: 'נושאי טריוויה מהטבע ועד תרבות ועובדות מוזרות.',
          items: [
            'מדע וטבע',
            'היסטוריה ותרבות',
            'גיאוגרפיה ועולם',
            'עובדות מוזרות ושיאים',
            'סרטים וקולנוע',
            'עובדות מדהימות',
            'ספורט ומשחקים',
            'שיאי עולם',
          ],
        },
        gameplay: {
          title: 'משחק',
          description: 'בחרו קצב ורמת אתגר.',
          items: [
            'סבבים מתוזמנים עם תשובות ברירת מחדל',
            'רמות קל, בינוני וקשה',
            'משחק מלא אופליין',
            'יותר מ-12 שפות לממשק ווריאנטים אזוריים',
          ],
        },
        progress: {
          title: 'התקדמות ותחרות',
          description: 'עקבו אחרי השיפור והשוו מול חברים.',
          items: [
            'רצפים וסטטיסטיקות סשן',
            'Game Center (iOS) ו-Play Games (Android)',
            'לוחות מובילים והישגים',
            'רכישה בתוך האפליקציה להסרת פרסומות (אופציונלי)',
          ],
        },
      },
      status: {
        title: 'זמינות',
        description:
          'Fun Facts Trivia עדיין לא בחנויות. קישורים ל-App Store ול-Google Play יתווספו כאן עם פרסום האפליקציה.',
        version: 'גרסה',
        status: 'סטטוס',
        versionValue: '1.0.0',
        statusValue: 'בקרוב — App Store ו-Google Play',
      },
      download: {
        title: 'הורדה',
        description: 'Fun Facts Trivia מגיע בקרוב ל-App Store ול-Google Play.',
        soon: 'תגי החנויות יופיעו כאן כשהאפליקציה יוצאת לאור.',
        appStoreAlt: 'הורדה מה-App Store',
        googlePlayAlt: 'קבלו ב-Google Play',
      },
      links: {
        title: 'קישורים חשובים',
        support: { title: 'תמיכה טכנית', email: 'zuki.apps.dev@gmail.com' },
      },
      footer: {
        copyright: '© 2026 Fun Facts Trivia — כל הזכויות שמורות',
        tagline: 'חלק מ-Zuki Apps • מפתח מישראל • נעשה באהבה ❤️',
      },
      support: {
        title: 'תמיכה ועזרה',
        subtitle: 'אנחנו כאן לעזור! תשובות לשאלות נפוצות או צרו קשר ישירות.',
        contact: {
          title: 'צרו קשר',
          description: 'שאלה או בעיה? שלחו מייל ונחזור אליכם בהקדם.',
          email: 'zuki.apps.dev@gmail.com',
        },
        quickLinks: {
          title: 'קישורים מהירים',
          privacy: { title: 'מדיניות פרטיות', description: 'איך אנחנו מגנים על הנתונים שלכם' },
          terms: { title: 'תנאי שימוש', description: 'קראו את התנאים' },
        },
        faq: {
          title: 'שאלות נפוצות',
          q1: {
            question: 'מה זה Fun Facts Trivia?',
            answer:
              'משחק חידון לנייד עם שאלות ברירת מחדל בשמונה קטגוריות. בוחרים קושי, משחקים סבבים מתוזמנים, בונים רצפים ורואים סטטיסטיקות. נבנה ב-Flutter ל-iOS ול-Android.',
          },
          q2: {
            question: 'האפליקציה עובדת אופליין?',
            answer:
              'כן. השאלות מגיעות עם האפליקציה. ייתכן שתצטרכו אינטרנט לפרסומות, רכישות, התחברות ל-Game Center או Play Games, או עדכונים.',
          },
          q3: {
            question: 'איך מסירים פרסומות?',
            answer: 'רכישה חד-פעמית בתוך האפליקציה מסירה פרסומות. הרכישה דרך Apple או Google; שחזור דרך החנות או ההגדרות אם התקנתם מחדש.',
          },
          q4: {
            question: 'יש לוחות מובילים?',
            answer: 'במכשירים נתמכים ניתן להשתמש ב-Game Center וב-Play Games ללוחות מובילים והישגים כשאתם מחוברים.',
          },
          q5: {
            question: 'אילו שפות נתמכות?',
            answer: 'ממשק האפליקציה מתורגם לשפות ווריאנטים רבים. ניתן לשנות שפה בהגדרות.',
          },
          q6: {
            question: 'איפה מקבלים עזרה?',
            answer: 'שלחו מייל ל-zuki.apps.dev@gmail.com. באתר מופיעים מדיניות הפרטיות ותנאי השימוש.',
          },
        },
        additionalHelp: {
          title: 'צריכים עוד עזרה?',
          description: 'אם לא מצאתם תשובה או שיש תקלה טכנית, כתבו לנו. בדרך כלל חוזרים תוך 24–48 שעות.',
        },
      },
      terms: { title: 'תנאי שימוש', lastUpdated: 'עודכן לאחרונה: אפריל 2026' },
      privacy: { title: 'מדיניות פרטיות', lastUpdated: 'עודכן לאחרונה: אפריל 2026' },
    },
  },
  de: {
    home: {
      title: 'Fun Facts Trivia',
      subtitle: 'Zeitgesteuertes Quiz zu Wissenschaft, Geschichte und mehr',
      description:
        'Runden mit Wissensfragen in acht Kategorien, drei Schwierigkeiten, Serien und Statistiken. Demnächst im App Store und bei Google Play.',
      features: {
        categories: 'Acht Kategorien',
        gameplay: 'Zeitgesteuerte Runden & Schwierigkeiten',
        extras: 'Statistiken & Bestenlisten',
      },
      learnMore: 'Mehr über Fun Facts Trivia →',
    },
    ui: {
      back: 'Zur Startseite',
      hero: {
        badge: 'Demnächst im App Store und bei Google Play',
        title: 'Fun Facts Trivia',
        subtitle: 'Acht Kategorien · Leicht, Mittel & Schwer · Serien & Statistiken',
        description:
          'Ein Flutter-Trivia-Spiel für iOS und Android: zeitgesteuerte Fragen zu Wissenschaft, Geschichte, Geografie, Unterhaltung und mehr. Offline spielen, Game Center- und Play-Games-Bestenlisten, Erfolge und optionaler einmaliger Kauf zur Werbeentfernung.',
      },
      features: {
        title: 'Funktionen',
        categories: {
          title: 'Acht Themenkategorien',
          description: 'Themen von Natur und Wissenschaft bis Kultur und kuriose Fakten.',
          items: [
            'Natur & Wissenschaft',
            'Geschichte & Kultur',
            'Geografie & Welt',
            'Kuriose Fakten & Rekorde',
            'Filme & Kino',
            'Erstaunliche Fakten',
            'Sport & Spiele',
            'Weltrekorde',
          ],
        },
        gameplay: {
          title: 'Spielablauf',
          description: 'Tempo und Schwierigkeit wählen.',
          items: [
            'Zeitgesteuerte Runden mit Multiple Choice',
            'Schwierigkeiten Leicht, Mittel und Schwer',
            'Vollständig offline spielbar',
            '12+ UI-Sprachen und regionale Varianten',
          ],
        },
        progress: {
          title: 'Fortschritt & Wettbewerb',
          description: 'Verbesserung verfolgen und mit Freunden vergleichen.',
          items: [
            'Serien und Sitzungsstatistiken',
            'Game Center (iOS) und Play Games (Android)',
            'Bestenlisten und Erfolge',
            'Optionaler In-App-Kauf zur Werbeentfernung',
          ],
        },
      },
      status: {
        title: 'Verfügbarkeit',
        description:
          'Fun Facts Trivia ist noch nicht in den Stores. Links zum App Store und Google Play erscheinen hier nach der Veröffentlichung.',
        version: 'Version',
        status: 'Status',
        versionValue: '1.0.0',
        statusValue: 'Demnächst — App Store & Google Play',
      },
      download: {
        title: 'Download',
        description: 'Fun Facts Trivia erscheint demnächst im App Store und bei Google Play.',
        soon: 'Store-Badges erscheinen hier, sobald die App live ist.',
        appStoreAlt: 'Im App Store laden',
        googlePlayAlt: 'Bei Google Play laden',
      },
      links: {
        title: 'Wichtige Links',
        support: { title: 'Technischer Support', email: 'zuki.apps.dev@gmail.com' },
      },
      footer: {
        copyright: '© 2026 Fun Facts Trivia — Alle Rechte vorbehalten',
        tagline: 'Teil von Zuki Apps • Entwickelt in Israel • Mit ❤️ gemacht',
      },
      support: {
        title: 'Support & Hilfe',
        subtitle: 'Wir helfen gern! Antworten auf häufige Fragen oder direkter Kontakt.',
        contact: {
          title: 'Kontakt',
          description: 'Frage oder Problem? Schreiben Sie uns — wir melden uns schnellstmöglich.',
          email: 'zuki.apps.dev@gmail.com',
        },
        quickLinks: {
          title: 'Schnellzugriff',
          privacy: { title: 'Datenschutz', description: 'Wie wir Ihre Daten schützen' },
          terms: { title: 'Nutzungsbedingungen', description: 'Unsere Bedingungen lesen' },
        },
        faq: {
          title: 'FAQ',
          q1: {
            question: 'Was ist Fun Facts Trivia?',
            answer:
              'Ein mobiles Quiz mit Multiple-Choice in acht Kategorien. Schwierigkeit wählen, zeitgesteuert spielen, Serien und Statistiken. Gebaut mit Flutter für iOS und Android.',
          },
          q2: {
            question: 'Funktioniert die App offline?',
            answer:
              'Ja. Fragen sind in der App enthalten. Internet kann für Werbung, Käufe, Game Center/Play Games oder Updates nötig sein.',
          },
          q3: {
            question: 'Wie entferne ich Werbung?',
            answer:
              'Ein optionaler einmaliger In-App-Kauf entfernt Werbung. Käufe laufen über Apple oder Google; Wiederherstellung über Store oder App-Einstellungen.',
          },
          q4: {
            question: 'Gibt es Bestenlisten?',
            answer:
              'Auf unterstützten Geräten können Apple Game Center und Google Play Games für Bestenlisten und Erfolge genutzt werden, wenn Sie angemeldet sind.',
          },
          q5: {
            question: 'Welche Sprachen?',
            answer:
              'Die App-Oberfläche ist in vielen Sprachen und Varianten lokalisiert. Sprache in den Einstellungen ändern.',
          },
          q6: {
            question: 'Wo bekomme ich Hilfe?',
            answer: 'E-Mail an zuki.apps.dev@gmail.com. Auf der Website finden Sie Datenschutz und AGB.',
          },
        },
        additionalHelp: {
          title: 'Noch Hilfe nötig?',
          description:
            'Wenn Sie keine Antwort finden oder ein technisches Problem haben, schreiben Sie uns. In der Regel antworten wir innerhalb von 24–48 Stunden.',
        },
      },
      terms: { title: 'Nutzungsbedingungen', lastUpdated: 'Zuletzt aktualisiert: April 2026' },
      privacy: { title: 'Datenschutzerklärung', lastUpdated: 'Zuletzt aktualisiert: April 2026' },
    },
  },
};

// Default: English UI strings for locales not yet hand-translated (structure from en; copy items)
function buildPatch(loc) {
  const spec = L[loc];
  if (!spec) return null;
  return {
    homeFunFacts: spec.home,
    funFactsTrivia: spec.ui,
  };
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

for (const loc of Object.keys(L)) {
  const patch = buildPatch(loc);
  fs.writeFileSync(path.join(outDir, `${loc}.json`), JSON.stringify(patch, null, 2) + '\n', 'utf8');
  console.log('Wrote', loc + '.json');
}
