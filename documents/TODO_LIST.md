# רשימת משימות - Zuki Apps Website

**תאריך עדכון**: 2025  
**סטטוס כללי**: ✅ כל ההגדרות הבסיסיות עובדות! 🎉 | 🎨 שיפורי SEO אופציונליים

---

## ✅ מה הושלם

1. ✅ **Metadata לכל העמודים** - נוסף metadata מותאם לכל העמודים עם תרגומים
2. ✅ **Google Analytics** - נוסף עם Measurement ID: `G-ZQS2LWYD18`
3. ✅ **קישורי הזמנות** - עובדים עם `zukiapps.com/zulist/invite/{id}`
4. ✅ **URLs** - כל האתר משתמש ב-`https://zukiapps.com`
5. ✅ **עמודי Privacy, Terms, Support** - קיימים ומוגדרים
6. ✅ **Environment Variables** - כל המשתנים החשובים מוגדרים נכון ב-Netlify:
   - ✅ `NEXT_PUBLIC_SITE_URL` = `https://zukiapps.com` (בכל ה-contexts)
   - ✅ `NEXT_PUBLIC_BASE_URL` = `https://zukiapps.com` (בכל ה-contexts)
   - ✅ `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-ZQS2LWYD18` (בכל ה-contexts)
   - ✅ `FIREBASE_SERVICE_ACCOUNT_KEY` - מוגדר (4 values in 4 deploy contexts)

---

## ✅ מה הושלם (עודכן)

### 1. ✅ Environment Variables ב-Netlify - **כל המשתנים מוגדרים נכון!**

**✅ מה מוגדר נכון:**
- [x] ✅ `NEXT_PUBLIC_SITE_URL` = `https://zukiapps.com` - **מוגדר נכון!**
- [x] ✅ `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-ZQS2LWYD18` - **מוגדר נכון!**
- [x] ✅ `FIREBASE_SERVICE_ACCOUNT_KEY` - **מוגדר (4 values in 4 deploy contexts)**

**✅ מה מוגדר נכון:**
- [x] ✅ `NEXT_PUBLIC_BASE_URL` = `https://zukiapps.com` - **מוגדר נכון!**

**✅ סיכום Environment Variables:**
- ✅ כל המשתנים החשובים מוגדרים נכון ב-Netlify!
- ✅ `NEXT_PUBLIC_SITE_URL` = `https://zukiapps.com`
- ✅ `NEXT_PUBLIC_BASE_URL` = `https://zukiapps.com`
- ✅ `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-ZQS2LWYD18`
- ✅ `FIREBASE_SERVICE_ACCOUNT_KEY` - מוגדר

---

### 2. Firebase Admin ב-package.json

**מצב:**
- ✅ `firebase-admin` נמצא ב-`package.json` (גרסה 13.6.0)
- ✅ ה-API route משתמש ב-`firebase-admin`

**צריך לבדוק:**
- [ ] האם `firebase-admin` מותקן ב-production (Netlify)?
- [ ] האם `FIREBASE_SERVICE_ACCOUNT_KEY` מוגדר ב-Netlify?

**אם לא עובד:**
- צריך להריץ `npm install` ב-Netlify או לוודא שהתלויות מותקנות

---

## 🎨 שיפורי SEO (עדיפות בינונית)

### 3. תמונות Open Graph מותאמות

**מה צריך:**
- [ ] ליצור תמונות OG (1200x630px) לכל עמוד:
  - `/public/images/og-home.png` - לעמוד ראשי
  - `/public/images/og-zulist.png` - לעמוד ZuList
  - `/public/images/og-privacy.png` - לעמוד Privacy
  - `/public/images/og-support.png` - לעמוד Support
  - `/public/images/og-terms.png` - לעמוד Terms

**לאחר יצירה:**
- [ ] לעדכן את ה-metadata בכל ה-layouts להשתמש בתמונות החדשות

**כלים מומלצים:**
- Canva (תבניות OG Image)
- Figma
- Photoshop

---

### 4. שיפור Sitemap

**מה צריך:**
- [ ] לבדוק אם יש עמודים נוספים שצריכים להיות ב-sitemap
- [ ] לשפר `lastModified` - להשתמש בתאריך אמיתי של עדכון אחרון
- [ ] לשקול להוסיף עמודים דינמיים (אם רלוונטי)

**קובץ לעדכון:** `app/sitemap.ts`

**הערה:** עמוד `/zulist/invite/[id]` הוא דינמי עם פרמטרים, ייתכן שלא צריך להיות ב-sitemap

---

## 🔍 בדיקות ואופטימיזציה (עדיפות נמוכה)

### 5. אופטימיזציה של תמונות

**מה צריך לבדוק:**
- [ ] שכל התמונות מותאמות (WebP format)
- [ ] lazy loading על תמונות
- [ ] שהתמונות לא גדולות מדי
- [ ] alt text על כל התמונות

---

### 6. Core Web Vitals

**מה צריך לבדוק:**
- [ ] Google PageSpeed Insights
- [ ] LCP (Largest Contentful Paint)
- [ ] FID (First Input Delay)
- [ ] CLS (Cumulative Layout Shift)

**כלים:**
- Google PageSpeed Insights: https://pagespeed.web.dev/
- Google Search Console

---

### 7. Internal Linking

**מה צריך:**
- [ ] לוודא שיש קישורים פנימיים טובים בין עמודים
- [ ] להוסיף breadcrumbs ויזואליים (לא רק structured data)
- [ ] להוסיף "Related Pages" או "You might also like"

---

### 8. Content Optimization

**מה צריך:**
- [ ] לוודא שיש מספיק תוכן בכל עמוד (מינימום 300 מילים)
- [ ] H1, H2, H3 בצורה היררכית
- [ ] keywords טבעיים בתוכן
- [ ] FAQ sections (כבר יש ב-support, אפשר להוסיף לעמודים אחרים)

---

## 📊 ניטור ומעקב (מתמשך)

### 9. Google Search Console

**מה צריך:**
- [ ] לוודא שהאתר רשום ב-Google Search Console
- [ ] לשלוח את ה-sitemap: `https://zukiapps.com/sitemap.xml`
- [ ] לבדוק שגוגל סורק את האתר
- [ ] לבדוק ביצועים ו-keywords

---

### 10. Google Analytics

**מה צריך:**
- [ ] לוודא שהנתונים מתחילים להגיע (יכול לקחת כמה דקות/שעות)
- [ ] לבדוק Events ו-Conversions (אם רלוונטי)
- [ ] לבדוק Traffic Sources

---

## 🚀 Deploy ו-Testing

### 11. בדיקות אחרי Deploy

**מה צריך לבדוק:**
- [ ] שהאתר נטען נכון
- [ ] שכל העמודים עובדים
- [ ] שקישורי הזמנות עובדים
- [ ] ש-Google Analytics עובד
- [ ] שהאתר responsive על mobile
- [ ] שהאתר מהיר (PageSpeed)

---

## 📝 סיכום עדיפויות

### 🔴 עדיפות גבוהה (לעשות עכשיו):
1. ✅ בדיקת Environment Variables ב-Netlify
2. ✅ בדיקת Firebase Admin ב-production

### 🟡 עדיפות בינונית (לעשות השבוע):
3. יצירת תמונות Open Graph
4. שיפור Sitemap

### 🟢 עדיפות נמוכה (לעשות בהמשך):
5. אופטימיזציה של תמונות
6. בדיקת Core Web Vitals
7. שיפור Internal Linking
8. Content Optimization

### 📊 ניטור (מתמשך):
9. Google Search Console
10. Google Analytics

---

**עדכון אחרון**: 2025  
**סטטוס**: ✅ רוב ההגדרות עובדות, יש כמה שיפורים שנותרו

