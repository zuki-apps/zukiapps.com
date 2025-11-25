# 🔧 הגדרת Environment Variables ב-Netlify

## שלב 1: השגת Firebase Service Account Key

### 1.1. לך ל-Firebase Console

1. פתח: **https://console.firebase.google.com/**
2. בחר את הפרויקט: **zulist-26** (או הפרויקט שלך)

### 1.2. פתח את Project Settings

1. לחץ על **⚙️ (Settings)** → **Project settings**
2. או: לחץ על שם הפרויקט → **Project settings**

### 1.3. עבור ל-Service Accounts

1. בתפריט השמאלי, לחץ על **Service accounts**
2. תמצא את זה תחת **Project settings** → **Service accounts**

### 1.4. צור Service Account Key

1. לחץ על **Generate new private key**
2. יופיע חלון אזהרה - לחץ **Generate key**
3. קובץ JSON יורד אוטומטית למחשב שלך

### 1.5. העתק את התוכן

1. פתח את הקובץ שהורד (למשל: `zulist-26-firebase-adminsdk-xxxxx.json`)
2. **העתק את כל התוכן** (Ctrl+A, Ctrl+C)
3. זה צריך להיות JSON שלם, למשל:

```json
{
  "type": "service_account",
  "project_id": "zulist-26",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@zulist-26.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

**⚠️ חשוב:**

- העתק את **כל** הקובץ, כולל כל ה-`\n` בתוך ה-private_key
- זה צריך להיות JSON **שלם** כ-string אחד

---

## שלב 2: הוספת Environment Variables ב-Netlify

### 2.1. לך ל-Netlify Dashboard

1. פתח: **https://app.netlify.com/**
2. התחבר לחשבון שלך

### 2.2. בחר את האתר

1. לחץ על האתר: **zukiapps.com** (או השם של האתר שלך)

### 2.3. פתח את Site Settings

1. בתפריט העליון, לחץ על **Site configuration** (או **⚙️ Settings**)
2. בתפריט השמאלי, לחץ על **Environment variables**

### 2.4. הוסף את המשתנה הראשון: FIREBASE_SERVICE_ACCOUNT_KEY

1. לחץ על **Add a variable** (או **Add variable**)
2. **Key:** `FIREBASE_SERVICE_ACCOUNT_KEY`
3. **Value:** הדבק את כל ה-JSON שהועתק בשלב 1.5
   - זה צריך להיות JSON שלם, כולל כל ה-`\n` בתוך ה-private_key
   - לדוגמה: `{"type":"service_account","project_id":"zulist-26",...}`
4. **Scopes:** בחר **All scopes** (או השאר ברירת מחדל)
5. לחץ **Save** (או **Create variable**)

**⚠️ חשוב:**

- ה-Value צריך להיות JSON **שלם** כ-string אחד
- כולל כל ה-`\n` בתוך ה-private_key
- אין רווחים מיותרים או שורות נוספות

### 2.5. הוסף את המשתנה השני: NEXT_PUBLIC_BASE_URL

1. לחץ על **Add a variable** שוב
2. **Key:** `NEXT_PUBLIC_BASE_URL`
3. **Value:** `https://zukiapps.com`
4. **Scopes:** בחר **All scopes**
5. לחץ **Save**

---

## שלב 3: בדיקה

### 3.1. ודא שהמשתנים נוספו

1. ב-Environment variables, אתה אמור לראות:
   - ✅ `FIREBASE_SERVICE_ACCOUNT_KEY` (מוסתר)
   - ✅ `NEXT_PUBLIC_BASE_URL` = `https://zukiapps.com`

### 3.2. Trigger Deploy חדש

1. לך ל-**Deploys** בתפריט השמאלי
2. לחץ על **Trigger deploy** → **Deploy site**
3. או: עשה `git push` כדי לעשות deploy אוטומטי

### 3.3. בדוק את ה-Logs

1. אחרי ה-deploy, לחץ על ה-deploy החדש
2. בדוק את ה-Logs:
   - אם יש שגיאות הקשורות ל-Firebase Admin - המשתנה לא הוגדר נכון
   - אם הכל עובד - המשתנים הוגדרו נכון!

---

## 🔍 פתרון בעיות

### בעיה: "Firebase Admin initialization error"

**פתרון:**

- ודא שה-`FIREBASE_SERVICE_ACCOUNT_KEY` הוא JSON **שלם**
- ודא שאין רווחים מיותרים או שורות נוספות
- ודא שכל ה-`\n` בתוך ה-private_key נשמרו

### בעיה: "Invalid JSON"

**פתרון:**

- העתק את הקובץ JSON מחדש
- ודא שאתה מעתיק את **כל** הקובץ, כולל הסוגריים `{` ו-`}`
- נסה להדביק ב-Notepad קודם, ואז להעתק משם

### בעיה: "Permission denied"

**פתרון:**

- ודא שה-Service Account Key הוא מהפרויקט הנכון
- ודא שהפרויקט ב-Firebase פעיל

---

## ✅ סיכום

**מה צריך להיות ב-Netlify:**

1. ✅ `FIREBASE_SERVICE_ACCOUNT_KEY` = JSON שלם מהקובץ שהורד
2. ✅ `NEXT_PUBLIC_BASE_URL` = `https://zukiapps.com`

**אחרי זה:**

- Trigger deploy חדש
- בדוק את ה-Logs
- הכל אמור לעבוד! 🎉

---

## 📝 הערות

- **אבטחה:** ה-Service Account Key הוא רגיש - אל תשתף אותו
- **Backup:** שמור עותק של ה-Key במקום בטוח
- **Testing:** אחרי ה-deploy, בדוק שההזמנות עובדות

**הכל מוכן! 🚀**
