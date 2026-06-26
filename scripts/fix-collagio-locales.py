#!/usr/bin/env python3
"""Remove stale Collagio locale overrides; apply Hebrew marketing translations."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MESSAGES = ROOT / "messages"

# Locales that should inherit full English marketing copy from en.json
INHERIT_EN = ["de", "ar", "fr", "es", "it", "pt", "ru", "ja", "ko", "zh"]

HEBREW = {
    "back": "חזרה לדף הבית",
    "hero": {
        "badge": "חינם באנדרואיד · iOS בקרוב",
        "title": "הפכו 2–10 תמונות לקולאז' בשניות",
        "productName": "Collagio — יוצר קולאז' תמונות",
        "subtitle": "Collagio — יוצר קולאז' תמונות",
        "description": "בוחרים תמונות, לייאאוט, פילטרים ומדבקות Zuli Monsters, ואז שומרים או משתפים. בלי חשבון — הכל נשאר במכשיר שלכם.",
        "socialProof": "2–10 תמונות · לייאאוטים חכמים · פילטרים · 48 Zuli Monsters · עברית ואנגלית",
        "structuredDataDescription": "יוצר קולאז' תמונות מ-2–10 תמונות בשניות. לייאאוטים, פילטרים, טקסט ו-48 מדבקות Zuli Monsters. חינם ל-iOS ואנדרואיד. בלי חשבון.",
        "phoneAlt": "מסך הבית של Collagio בטלפון",
    },
    "legalNav": {
        "privacy": "מדיניות פרטיות",
        "terms": "תנאי שימוש",
        "contact": "צור קשר",
    },
    "pageNav": {
        "features": "תכונות",
        "screenshots": "צילומי מסך",
        "howTo": "איך משתמשים",
        "faq": "שאלות נפוצות",
        "zuliMonsters": "Zuli Monsters",
        "premium": "פרימיום",
        "download": "הורדה",
    },
    "screenshots": {
        "title": "Collagio בפעולה",
        "subtitle": "צילומי מכשיר אמיתיים — בית, בחירת תמונות, עורך, מדבקות, ייצוא ו-Layout Studio.",
        "featuresTitle": "מסכי האפליקציה",
        "items": [
            {
                "id": "home",
                "title": "קולאז'ים יפים בשניות",
                "description": "יצירת קולאז', היסטוריה, Layout Studio ו-Zuli Monsters — מהמסך הראשי.",
                "image": "/images/collagio/screenshot-home.png?v=2",
                "alt": "מסך הבית של Collagio עם יצירת קולאז' וקולאז'ים אחרונים",
                "category": "features",
            },
            {
                "id": "picker",
                "title": "בחירת תמונות ולייאאוט",
                "description": "2–10 תמונות, סידור מחדש בלחיצה ארוכה וגרירה, ולייאאוטים לפי כמות התמונות.",
                "image": "/images/collagio/screenshot-picker.png?v=2",
                "alt": "מסך בחירת תמונות עם פס לייאאוטים",
                "category": "features",
            },
            {
                "id": "stickers",
                "title": "עיצוב הקולאז' ומדבקות Zuli Monsters",
                "description": "פילטרים, מסגרות, ריווח ו-48 דמויות מקוריות — בכל מקום על הקנבס.",
                "image": "/images/collagio/screenshot-stickers.png?v=2",
                "alt": "עורך Collagio עם פילטרים ומדבקות Zuli Monsters",
                "category": "features",
            },
            {
                "id": "stickersShare",
                "title": "48 דמויות מדבקה מקוריות",
                "description": "חבילות WhatsApp או תוסף iMessage — אותן דמויות כמו בעורך.",
                "image": "/images/collagio/screenshot-stickers-share.png?v=2",
                "alt": "מסך Zuli Monsters עם התקנה ל-WhatsApp ו-iMessage",
                "category": "features",
            },
            {
                "id": "export",
                "title": "שמירה, שיתוף או שליחה כמדבקה",
                "description": "ייצוא לגלריה, Instagram, WhatsApp או PNG שקוף כמדבקה.",
                "image": "/images/collagio/screenshot-export.png?v=2",
                "alt": "מסך ייצוא Collagio עם אפשרויות שמירה ושיתוף",
                "category": "features",
            },
            {
                "id": "layoutStudio",
                "title": "עיצוב לייאאוטים משלכם",
                "description": "גרירה, שינוי גודל וצורת תאים ממוספרים — שמירה לשימוש חוזר.",
                "image": "/images/collagio/screenshot-layout-studio.png?v=2",
                "alt": "Layout Studio עם סידור תאים מותאם",
                "category": "features",
            },
            {
                "id": "collageResult",
                "title": "תוצאת קולאז' מוגמרת",
                "description": "רשתות, פורמט סטורי, פילטרים ומסגרות — מוכן לשיתוף.",
                "image": "/images/collagio/screenshot-collage-result.png?v=2",
                "alt": "דוגמה לקולאז' מרובע שיוצא מ-Collagio",
                "category": "features",
            },
        ],
    },
    "features": {
        "title": "כל מה שצריך, בלי עודף",
        "layouts": {
            "title": "לייאאוטים חכמים",
            "description": "רשתות, תאים מיוחדים וסגנונות אלבום — מסוננים אוטומטית לפי מספר התמונות.",
            "items": [
                "2–10 תמונות לקולאז'",
                "סידור מחדש בלחיצה ארוכה וגרירה",
                "זום וגרירה לכל תמונה",
                "ביטול ושחזור טיוטה",
            ],
        },
        "canvas": {
            "title": "צורות קנבס",
            "description": "ריבוע, סטורי, לאורך, לרוחב, עיגול, מעוגל, לב ו-4:3 קלאסי.",
            "items": [
                "סטורי 9:16 לרשתות",
                "רקע גרדיאנט או תמונה",
                "ריווח ופינות מעוגלות",
                "מסגרות Polaroid וזהב",
            ],
        },
        "filters": {
            "title": "פילטרים וטקסט",
            "description": "חם, קר, שחור-לבן, דהוי, בולט, חי ועמום — וטקסט עם תמיכה מלאה ב-RTL.",
            "items": [
                "פילטרים בלחיצה אחת",
                "שכבות טקסט מרובות",
                "בחירת גופן וצבע",
                "ייצוא מדבקה שקופה (פרימיום)",
            ],
        },
        "stickers": {
            "title": "Zuli Monsters",
            "description": "48 דמויות מקוריות של Zuki Apps — בקולאז', ב-WhatsApp וב-iMessage.",
            "items": [
                "מגירת מדבקות מובנית",
                "התקנה ל-WhatsApp בלחיצה",
                "תוסף iMessage",
                "שימוש אישי בתוך Collagio בלבד",
            ],
        },
        "layoutStudio": {
            "title": "Layout Studio",
            "description": "ציור, שינוי גודל וצורת תאים ממוספרים — שמירת לייאאוטים מותאמים.",
            "items": [
                "גרירה ושינוי גודל תאים",
                "עיגול, לב, מעוין",
                "התחלה מתבנית",
                "לייאאוטים שמורים בבוחר",
            ],
        },
        "privacy": {
            "title": "פרטיות כברירת מחדל",
            "description": "בלי התחברות, בלי העלאה לענן. הקולאז'ים נשארים במכשיר עד הייצוא.",
            "items": [
                "עיבוד במכשיר",
                "היסטוריה מקומית (30 קולאז'ים)",
                "ממשק עברית ואנגלית עם RTL",
                "פרימיום חד-פעמי אופציונלי",
            ],
        },
    },
    "zuliMonsters": {
        "title": "Zuli Monsters",
        "subtitle": "דמויות מקוריות של Zuki Apps",
        "description": "48 דמויות מדבקה לקולאז'ים או להתקנה ב-WhatsApp ו-iMessage.",
        "rightsNotice": "Zuli Monsters™, כולל עיצובי הדמויות, השמות, הדמיון, אמנות המדבקות, האייקונים ונכסים קשורים, הם קניין בלעדי של Zuki Apps. כל הזכויות שמורות.",
        "usageNotice": "ניתן להשתמש ב-Zuli Monsters רק דרך Collagio לקולאז'ים אישיים והודעות. אסור להעתיק, להפיץ, למכור, לתת רישיון משנה או ליצור יצירות נגזרות מחוץ לאפליקציה ללא אישור בכתב מ-Zuki Apps.",
    },
    "premium": {
        "title": "Collagio Premium",
        "subtitle": "רכישה חד-פעמית — בלי מנוי",
        "freeTitle": "חינם",
        "premiumTitle": "פרימיום",
        "freeItems": [
            "עורך קולאז' מלא",
            "כל הלייאאוטים וצורות הקנבס",
            "פילטרים, טקסט, מדבקות ו-Layout Studio",
            "פרסומות וסימן מים בייצוא",
        ],
        "premiumItems": [
            "בלי פרסומות",
            "בלי סימן מים בייצוא",
            "ייצוא ברזולוציה גבוהה (6×)",
            "ייצוא PNG שקוף כמדבקה",
            "שמירה מרוכזת מההיסטוריה",
        ],
    },
    "download": {
        "title": "הורידו את Collagio",
        "description": "חינם להורדה. הקולאז' הראשון תוך פחות מ-30 שניות.",
        "appStoreUrl": "",
        "googlePlayUrl": "https://play.google.com/store/apps/details?id=com.zuki.apps.collagio",
        "appStoreAlt": "הורדה ב-App Store",
        "googlePlayAlt": "קבלו ב-Google Play",
        "appIconAlt": "אייקון אפליקציית Collagio",
        "soon": "קישור App Store בקרוב — זמין עכשיו ב-Google Play.",
    },
    "status": {
        "title": "זמין ב-Google Play",
        "description": "Collagio פעיל באנדרואיד. גרסת iOS בדרך.",
        "version": "גרסה",
        "status": "חנויות",
        "versionValue": "1.0 (אנדרואיד)",
        "statusValue": "Google Play פעיל · App Store בקרוב",
    },
    "links": {
        "title": "עזרה ומשפטי",
        "support": {"title": "תמיכה", "email": "zuki.apps.dev@gmail.com"},
        "googlePlay": {"title": "Google Play", "description": "הורידו את Collagio לאנדרואיד"},
    },
    "footer": {
        "copyright": "© 2026 Zuki Apps. Collagio ו-Zuli Monsters הם יצירות וסימנים מסחריים של Zuki Apps. כל הזכויות שמורות.",
        "tagline": "קולאז'ים יפים בשניות · נוצר בישראל",
    },
    "howToUse": {
        "title": "איך יוצרים קולאז'",
        "subtitle": "בלי מדריכים ארוכים. פותחים, בוחרים תמונות — וזהו.",
        "steps": [
            {"number": "1", "title": "בוחרים תמונות", "description": "2–10 תמונות. לחיצה ארוכה וגרירה לסידור — המספרים עוקבים אחרי הסדר."},
            {"number": "2", "title": "מעצבים", "description": "מחליפים לייאאוט, בוחרים צורת קנבס, פילטרים, טקסט ו-Zuli Monsters."},
            {"number": "3", "title": "שומרים או משתפים", "description": "ייצוא לגלריה, Instagram, WhatsApp או מדבקה שקופה."},
        ],
    },
    "faq": {
        "title": "שאלות נפוצות",
        "subtitle": "תשובות מהירות על Collagio, פרטיות ופרימיום.",
        "viewAllSupport": "לכל השאלות והתמיכה",
        "items": [
            {"question": "מה זה Collagio?", "answer": "יוצר קולאז' תמונות ל-iOS ואנדרואיד. 2–10 תמונות, לייאאוט, עיצוב ושיתוף — בדרך כלל תוך פחות מ-30 שניות."},
            {"question": "צריך חשבון?", "answer": "לא. Collagio עובד במלואו במכשיר. אין הרשמה, התחברות או אחסון ענן לתמונות."},
            {"question": "כמה תמונות אפשר?", "answer": "בין 2 ל-10 תמונות לקולאז'. הלייאאוטים מותאמים אוטומטית לכמות."},
            {"question": "מה זה Zuli Monsters?", "answer": "48 דמויות מדבקה מקוריות של Zuki Apps. בקולאז' או בחבילות ל-WhatsApp ו-iMessage. Zuli Monsters™ וכל העיצובים הם קניין Zuki Apps."},
            {"question": "מה זה Layout Studio?", "answer": "כלי לעיצוב לייאאוטים מותאמים: תאים ממוספרים, גרירה, שינוי גודל וצורה, שמירה לשימוש חוזר."},
            {"question": "האם התמונות עולות לשרת?", "answer": "לא. כל העיבוד במכשיר. התמונות לא מועלות לשרתי Zuki Apps."},
            {"question": "מה כולל Collagio Premium?", "answer": "רכישה חד-פעמית: בלי פרסומות, בלי סימן מים, ייצוא ברזולוציה גבוהה, PNG שקוף ושמירה מרוכזת מההיסטוריה."},
            {"question": "אילו שפות נתמכות?", "answer": "עברית ואנגלית, כולל ממשק RTL מלא בעברית."},
            {"question": "איך מסדרים תמונות מחדש?", "answer": "במסך הבחירה, לחיצה ארוכה וגרירה על תמונות ממוזערות. המספרים בלייאאוט תואמים לסדר."},
            {"question": "למה יש סימן מים בייצוא?", "answer": "בגרסה החינמית יש סימן מים קטן. Collagio Premium מסיר אותו ברכישה חד-פעמית."},
            {"question": "איך מוסיפים Zuli Monsters ל-WhatsApp?", "answer": "מהבית: Zuli Monsters → הוספה ל-WhatsApp → אישור ב-WhatsApp."},
        ],
    },
    "support": {
        "title": "תמיכה ועזרה",
        "subtitle": "מצאו תשובות או צרו קשר עם Zuki Apps לגבי Collagio.",
        "metaTitle": "תמיכה ועזרה — Collagio | Zuki Apps",
        "metaDescription": "עזרה ב-Collagio: שאלות נפוצות, יצירת קשר, מדיניות פרטיות ותנאי שימוש.",
        "contact": {
            "title": "צור קשר",
            "description": "שלחו אימייל ונחזור אליכם בהקדם.",
            "email": "zuki.apps.dev@gmail.com",
        },
        "quickLinks": {
            "title": "קישורים מהירים",
            "privacy": {"title": "מדיניות פרטיות", "description": "איך Collagio מטפל בנתונים שלכם"},
            "terms": {"title": "תנאי שימוש", "description": "תנאים לשימוש ב-Collagio"},
        },
        "faq": {
            "title": "שאלות נפוצות",
            "q1": {"question": "איך מסדרים תמונות מחדש?", "answer": "במסך הבחירה, לחיצה ארוכה וגרירה. מספרי התאים עוקבים אחרי סדר התמונות."},
            "q2": {"question": "איך מגדילים תמונה בתוך תא?", "answer": "בעורך, לחצו על תא ואז צביטה לזום או גרירה להזזה."},
            "q3": {"question": "למה יש סימן מים בייצוא?", "answer": "בגרסה החינמית יש סימן מים קטן. Premium מסיר אותו ברכישה חד-פעמית."},
            "q4": {"question": "Premium לא הופעל אחרי רכישה", "answer": "הגדרות → שחזור רכישות. אותו Apple ID או חשבון Google שבו רכשתם."},
            "q5": {"question": "איך מוסיפים Zuli Monsters ל-WhatsApp?", "answer": "מהבית: Zuli Monsters → הוספה ל-WhatsApp → אישור ב-WhatsApp."},
            "q6": {"question": "איפה כל השאלות?", "answer": "בדף המוצר של Collagio או ב-public/collagio/faq.md ב-zukiapps.com."},
        },
        "additionalHelp": {
            "title": "צריכים עזרה נוספת?",
            "description": "אם לא מצאתם תשובה, כתבו ל-zuki.apps.dev@gmail.com. בדרך כלל נענה תוך 24–48 שעות.",
        },
    },
}


def main() -> None:
    for loc in INHERIT_EN:
        path = MESSAGES / f"{loc}.json"
        data = json.loads(path.read_text(encoding="utf-8"))
        if "collagio" in data:
            del data["collagio"]
            path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            print(f"Removed stale collagio from {loc}.json")

    he_path = MESSAGES / "he.json"
    he_data = json.loads(he_path.read_text(encoding="utf-8"))
    he_data["collagio"] = HEBREW
    he_path.write_text(json.dumps(he_data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Applied Hebrew collagio marketing translations to he.json")


if __name__ == "__main__":
    main()
