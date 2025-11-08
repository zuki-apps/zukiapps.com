# 🚀 Firebase Hosting Migration - Quick Start

## ✅ מה הושלם

כל הקבצים מ-Firebase Hosting הועברו ל-Next.js תחת `zukiapps.com/zulist`:

- ✅ `/zulist/invite/[id]` - דף הזמנות
- ✅ `/zulist/privacy` - מדיניות פרטיות  
- ✅ `/zulist/delete-account` - מחיקת חשבון
- ✅ `/zulist/delete-data` - מחיקת נתונים
- ✅ `/apple-app-site-association` - Universal Links

## 🔧 הגדרה מהירה

### 1. הוסף Environment Variables ב-Netlify

**Netlify Dashboard → Site settings → Environment variables:**

| Variable | Value | איך להשיג |
|----------|-------|-----------|
| `FIREBASE_SERVICE_ACCOUNT_KEY` | JSON string של Service Account | Firebase Console → Project Settings → Service Accounts → Generate new private key |
| `NEXT_PUBLIC_BASE_URL` | `https://zukiapps.com` | - |

**⚠️ חשוב:** `FIREBASE_SERVICE_ACCOUNT_KEY` צריך להיות JSON שלם כ-string אחד (עם כל ה-`\n`)

### 2. Deploy

```bash
git add .
git commit -m "Complete Firebase Hosting migration"
git push
```

Netlify יעשה deploy אוטומטית!

## 📝 מה עוד צריך לעשות

ראה `FIREBASE_MIGRATION_COMPLETE.md` להוראות מפורטות על:
- עדכון הקוד ב-Flutter App
- עדכון Deep Links
- עדכון Google Play Data Safety

## 🧪 בדיקות

לאחר ה-deploy, בדוק:
- ✅ `https://zukiapps.com/zulist/invite/{testId}` - הזמנות
- ✅ `https://zukiapps.com/zulist/privacy` - Privacy Policy
- ✅ `https://zukiapps.com/zulist/delete-account` - Delete Account
- ✅ `https://zukiapps.com/zulist/delete-data` - Delete Data
- ✅ `https://zukiapps.com/apple-app-site-association` - Universal Links

## 🆘 בעיות?

אם יש שגיאות:
1. בדוק את ה-logs ב-Netlify Dashboard
2. ודא ש-`FIREBASE_SERVICE_ACCOUNT_KEY` מוגדר נכון
3. בדוק שהכתובות נכונות

---

**הכל מוכן! 🎉**

