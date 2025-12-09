# מדריך להגדרת Environment Variables ב-Netlify

**תאריך**: 2025  
**מטרה**: להגדיר את כל ה-Environment Variables הנדרשים לאתר zukiapps.com

---

## 📋 רשימת Environment Variables הנדרשים

### 1. `NEXT_PUBLIC_SITE_URL` - ✅ חובה

**ערך:** `https://zukiapps.com`

**שימוש:**

- משמש בכל הקבצים ל-base URL
- Metadata, Sitemap, Structured Data
- כל ה-layouts משתמשים בו

**איך להוסיף:**

1. לך ל-Netlify Dashboard
2. בחר את האתר `zukiapps.com`
3. Site settings → Environment variables
4. לחץ "Add a variable"
5. **Key:** `NEXT_PUBLIC_SITE_URL`
6. **Value:** `https://zukiapps.com`
7. לחץ "Save"

---

### 2. `NEXT_PUBLIC_BASE_URL` - ⚠️ אופציונלי (אבל מומלץ)

**ערך:** `https://zukiapps.com`

**שימוש:**

- משמש ב-API route: `app/api/zulist/invite/[id]/route.ts`
- ליצירת קישורי הזמנות

**הערה:**

- אם לא מוגדר, יש fallback ל-`https://zukiapps.com` בקוד
- אבל מומלץ להגדיר אותו כדי להיות עקבי

**איך להוסיף:**

1. באותו מקום (Environment variables)
2. לחץ "Add a variable"
3. **Key:** `NEXT_PUBLIC_BASE_URL`
4. **Value:** `https://zukiapps.com`
5. לחץ "Save"

---

### 3. `FIREBASE_SERVICE_ACCOUNT_KEY` - ✅ חובה (להזמנות)

**ערך:** JSON של Service Account Key (כל הקובץ כ-string אחד)

**שימוש:**

- נדרש ל-API route של הזמנות: `app/api/zulist/invite/[id]/route.ts`
- מאפשר גישה ל-Firestore לבדיקת הזמנות

**איך להשיג את ה-Key:**

#### שלב 1: הורד Service Account Key

1. לך ל-[Firebase Console](https://console.firebase.google.com/)
2. בחר את הפרויקט: `zulist-26` (או הפרויקט שלך)
3. Project Settings (⚙️) → Service Accounts
4. לחץ "Generate new private key"
5. הורד את ה-JSON file

#### שלב 2: העתק את התוכן

1. פתח את ה-JSON file שהורדת
2. העתק את **כל התוכן** (כולל כל ה-`\n` וכו')
3. זה צריך להיות JSON שלם, למשל:

```json
{
  "type": "service_account",
  "project_id": "zulist-26",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@zulist-26.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

#### שלב 3: הוסף ל-Netlify

1. לך ל-Netlify Dashboard → Site settings → Environment variables
2. לחץ "Add a variable"
3. **Key:** `FIREBASE_SERVICE_ACCOUNT_KEY`
4. **Value:** הדבק את כל ה-JSON (כ-string אחד)
5. ⚠️ **חשוב:** העתק את כל ה-JSON כולל כל ה-`\n` בתוך ה-private_key
6. לחץ "Save"

**⚠️ אזהרות:**

- זה מידע רגיש - אל תשתף אותו
- ודא שהקובץ לא נשמר ב-git (אמור להיות ב-.gitignore)
- אם ה-Key נחשף, צור אחד חדש מיד

---

### 4. `NEXT_PUBLIC_GA_MEASUREMENT_ID` - ⚠️ אופציונלי

**ערך:** `G-ZQS2LWYD18`

**שימוש:**

- Google Analytics Measurement ID
- אם לא מוגדר, יש fallback ל-`G-ZQS2LWYD18` בקוד

**איך להוסיף:**

1. באותו מקום (Environment variables)
2. לחץ "Add a variable"
3. **Key:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. **Value:** `G-ZQS2LWYD18`
5. לחץ "Save"

**הערה:** זה אופציונלי כי יש fallback בקוד, אבל מומלץ להגדיר אותו

---

## 🔍 איך לבדוק שהכל מוגדר נכון

### שלב 1: בדיקה ב-Netlify Dashboard

1. לך ל-Netlify Dashboard
2. בחר את האתר `zukiapps.com`
3. Site settings → Environment variables
4. ודא שאתה רואה את כל המשתנים:

```
✅ NEXT_PUBLIC_SITE_URL = https://zukiapps.com
✅ NEXT_PUBLIC_BASE_URL = https://zukiapps.com (אופציונלי)
✅ FIREBASE_SERVICE_ACCOUNT_KEY = {...} (JSON)
✅ NEXT_PUBLIC_GA_MEASUREMENT_ID = G-ZQS2LWYD18 (אופציונלי)
```

### שלב 2: בדיקה אחרי Deploy

1. אחרי שהוספת/עדכנת משתנים, צריך לעשות **Redeploy**
2. לך ל-Deploys → Trigger deploy → Deploy site
3. או פשוט תעשה push ל-git (אם יש Continuous Deployment)

### שלב 3: בדיקה בקוד

אפשר לבדוק שהמשתנים עובדים:

1. פתח את האתר ב-production
2. פתח את ה-Console בדפדפן (F12)
3. בדוק שהאתר נטען נכון
4. בדוק ש-Google Analytics עובד (Network tab → חפש `gtag`)

---

## 🚨 בעיות נפוצות ופתרונות

### בעיה 1: המשתנה לא עובד אחרי Deploy

**פתרון:**

- ודא שעשית Redeploy אחרי הוספת המשתנה
- בדוק שהמשתנה מוגדר ב-Production (לא רק ב-Branch Deploys)
- ודא שהשם נכון (case-sensitive)

### בעיה 2: FIREBASE_SERVICE_ACCOUNT_KEY לא עובד

**פתרון:**

- ודא שהעתקת את כל ה-JSON (כולל כל ה-`\n`)
- ודא שאין רווחים מיותרים בהתחלה/סוף
- ודא שה-JSON תקין (אפשר לבדוק ב-JSON validator)
- ודא שה-Service Account יש לו הרשאות ל-Firestore

### בעיה 3: NEXT*PUBLIC*\* לא עובד

**פתרון:**

- ודא שהמשתנה מתחיל ב-`NEXT_PUBLIC_` (חובה ב-Next.js)
- ודא שעשית Redeploy
- בדוק ב-Netlify Logs אם יש שגיאות

---

## 📝 סיכום - מה צריך לעשות

### ✅ חובה:

1. [ ] `NEXT_PUBLIC_SITE_URL` = `https://zukiapps.com`
2. [ ] `FIREBASE_SERVICE_ACCOUNT_KEY` = JSON של Service Account

### ⚠️ מומלץ:

3. [ ] `NEXT_PUBLIC_BASE_URL` = `https://zukiapps.com`
4. [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-ZQS2LWYD18`

### אחרי הגדרה:

5. [ ] לעשות Redeploy
6. [ ] לבדוק שהאתר עובד
7. [ ] לבדוק שקישורי הזמנות עובדים

---

## 🔗 קישורים שימושיים

- [Netlify Environment Variables Docs](https://docs.netlify.com/environment-variables/overview/)
- [Firebase Console](https://console.firebase.google.com/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

**עדכון אחרון**: 2025  
**גרסה**: 1.0
