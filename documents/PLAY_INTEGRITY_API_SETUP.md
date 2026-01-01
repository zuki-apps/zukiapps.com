# Play Integrity API Configuration - ZuList

**תאריך**: 2025  
**פרויקט Google Cloud**: ZuList  
**Project ID**: `zulist-26`  
**Project Number**: `976058423590`  
**סטטוס**: ✅ מוגדר ב-Google Play Console

---

## 📋 הגדרות נוכחיות

### Project Configuration

- **Google Cloud project**: ZuList
- **Project ID**: `zulist-26`
- **Project Number**: `976058423590`
- **Usage tier**: Standard
- **Response encryption**: Managed by Google

---

## ✅ Device Integrity - מופעל

**סטטוס**: On ✅

**Integrity verdict responses**:

- ✅ `MEETS_DEVICE_INTEGRITY`

**הגדרות נוספות**:

- Recent device activity: Off
- Device attributes: Off

**משמעות**:

- בודק שהמכשיר עומד בדרישות שלמות המכשיר
- מזהה מכשירים עם root, bootloader פתוח, או emulators

---

## ✅ Application Integrity - מופעל

**סטטוס**: On ✅

**Integrity verdict responses**:

- ✅ `PLAY_RECOGNIZED` - האפליקציה מותקנת מ-Google Play
- ✅ `UNRECOGNIZED_VERSION` - גרסה לא מזוהה (APK מותאם אישית, side-loading)
- ✅ `UNEVALUATED` - לא ניתן להעריך

**משמעות**:

- בודק שהאפליקציה מותקנת מ-Google Play
- מזהה גרסאות מותאמות אישית או side-loaded

---

## ✅ Account Details - מופעל

**סטטוס**: On ✅

**App licensing**:

- ✅ `LICENSED` - המשתמש רכש את האפליקציה
- ✅ `UNLICENSED` - המשתמש לא רכש את האפליקציה
- ✅ `UNEVALUATED` - לא ניתן להעריך

**הגדרות נוספות**:

- Play Protect status: Off
- App access risk: Off

**משמעות**:

- בודק רישיון האפליקציה (חינמית או בתשלום)
- שימושי לאפליקציות בתשלום או עם features פרימיום

---

## 🔧 Classic Requests

**Usage tier**: Standard  
**Response encryption**: Managed by Google

**הערות**:

- Classic API requests הם דרך אופציונלית לבקש integrity verdicts
- Response encryption מנוהל על ידי Google (מומלץ)

---

## 🎯 Goal

**מה אנחנו מנסים למנוע?**

- מכשירים עם root או bootloader פתוח
- Emulators
- גרסאות מותאמות אישית של האפליקציה (APK מותאם)
- Side-loading של האפליקציה
- מכשירים לא בטוחים

**למה זה חשוב?**

- הגנה על האפליקציה מפני reverse engineering
- מניעת הונאות וניצול לרעה
- שמירה על שלמות הנתונים
- הגנה על features פרימיום

---

## 🔌 אינטגרציה

### Backend API Endpoint

**מיקום**: `app/api/play-integrity/verify/route.ts`

**שימוש**:

1. האפליקציה Android שולחת Play Integrity token
2. ה-backend מאמת את ה-token עם Google Play Integrity API
3. ה-backend מחזיר את תוצאת האימות

**דוגמה לשימוש**:

**Request (from Android app)**:

```http
POST https://zukiapps.com/api/play-integrity/verify
Content-Type: application/json

{
  "token": "eyJhbGciOiJSUzI1NiIs..."
}
```

**Response (success)**:

```json
{
  "valid": true,
  "deviceIntegrity": {
    "meetsDeviceIntegrity": true,
    "recentDeviceActivity": null,
    "deviceAttributes": null
  },
  "appIntegrity": {
    "appRecognitionVerdict": "PLAY_RECOGNIZED",
    "packageName": "com.zuki.apps.zulist",
    "certificateDigest": ["sha256:..."],
    "versionCode": "1"
  },
  "accountDetails": {
    "appLicensingVerdict": "LICENSED"
  }
}
```

**Response (invalid device)**:

```json
{
  "valid": false,
  "deviceIntegrity": {
    "meetsDeviceIntegrity": false
  },
  "appIntegrity": {
    "appRecognitionVerdict": "UNRECOGNIZED_VERSION"
  },
  "accountDetails": {
    "appLicensingVerdict": "UNLICENSED"
  }
}
```

**Response (error)**:

```json
{
  "valid": false,
  "error": "Missing token in request body"
}
```

**דוגמה לקוד Android (Kotlin)**:

```kotlin
// 1. Request nonce from backend (optional but recommended)
val nonceResponse = httpClient.post("https://zukiapps.com/api/play-integrity/nonce")
val nonce = nonceResponse.bodyAsText()

// 2. Get Play Integrity token
val integrityTokenResponse = PlayIntegrityManager.getIntegrityToken(nonce)
val token = integrityTokenResponse.token()

// 3. Verify token with backend
val verifyResponse = httpClient.post("https://zukiapps.com/api/play-integrity/verify") {
    contentType(ContentType.Application.Json)
    body = mapOf("token" to token)
}

val result = verifyResponse.body<PlayIntegrityResult>()
if (result.valid && result.deviceIntegrity?.meetsDeviceIntegrity == true) {
    // Device is valid, proceed with app logic
} else {
    // Device failed integrity check, show error or restrict features
}
```

---

## 📝 Environment Variables

**נדרש ב-Netlify**:

- `GOOGLE_CLOUD_PROJECT_ID` - Project ID של Google Cloud: `zulist-26` ✅ **מוגדר בכל ה-contexts!**
- `FIREBASE_SERVICE_ACCOUNT_KEY` - Service Account credentials (JSON string) ✅ **מוגדר ב-4 deploy contexts!**

**הערה**:

- ✅ `FIREBASE_SERVICE_ACCOUNT_KEY` כבר מוגדר ב-Netlify (4 values in 4 deploy contexts)
- ✅ ה-API endpoint משתמש ב-`FIREBASE_SERVICE_ACCOUNT_KEY` לאימות עם Play Integrity API
- ⚠️ **חשוב**: צריך לוודא שה-Service Account יש לו הרשאות ל-Play Integrity API ב-Google Cloud Console

**איך לבדוק Service Account permissions**:

1. לך ל-Google Cloud Console: https://console.cloud.google.com/
2. בחר את הפרויקט `zulist-26`
3. לך ל-IAM & Admin → IAM
4. מצא את ה-Service Account (מה-`FIREBASE_SERVICE_ACCOUNT_KEY`)
5. בדוק שיש לו אחד מהתפקידים הבאים:
   - `Play Integrity API Admin` (מומלץ)
   - או `Service Account User` + `Play Integrity API User`
6. אם אין, לחץ על "Edit" והוסף את התפקיד הנדרש

**✅ סטטוס Environment Variables**:

- ✅ `GOOGLE_CLOUD_PROJECT_ID` = `zulist-26` - מוגדר בכל ה-contexts
- ✅ `FIREBASE_SERVICE_ACCOUNT_KEY` - מוגדר ב-4 deploy contexts (Production, Deploy Previews, Branch deploys, Preview Server & Agent Runners)

**⚠️ חשוב**:

- השתמש ב-**Project ID** (`zulist-26`), לא ב-Project Number (`976058423590`)
- Project ID הוא ה-identifier שמשמש ב-API calls

---

## 🧪 Testing

### Create Tests in Google Play Console

**מיקום**: Google Play Console → Play Integrity API → Testing

**סוגי בדיקות**:

- Classic requests - לבדוק תגובות שונות
- Device integrity tests
- Application integrity tests
- Account details tests

**מומלץ לבדוק**:

- ✅ מכשיר תקין (MEETS_DEVICE_INTEGRITY, PLAY_RECOGNIZED)
- ✅ מכשיר עם root (לא MEETS_DEVICE_INTEGRITY)
- ✅ Emulator (לא MEETS_DEVICE_INTEGRITY)
- ✅ Side-loaded app (UNRECOGNIZED_VERSION)

---

## 📚 משאבים

- **Google Play Integrity API Documentation**: https://developer.android.com/google/play/integrity
- **Google Play Console**: https://play.google.com/console/
- **Play Integrity API Reference**: https://developer.android.com/google/play/integrity/reference

---

## ✅ Checklist

### הגדרות ב-Google Play Console

- [x] ✅ Device integrity - מופעל
- [x] ✅ Application integrity - מופעל
- [x] ✅ Account details (App licensing) - מופעל
- [x] ✅ Usage tier: Standard
- [x] ✅ Response encryption: Managed by Google

### Backend Integration

- [x] ✅ יצירת API endpoint לאימות tokens - `app/api/play-integrity/verify/route.ts`
- [x] ✅ הגדרת `GOOGLE_CLOUD_PROJECT_ID` ב-Netlify (ערך: `zulist-26`) - **מוגדר בכל ה-contexts!**
- [x] ✅ הגדרת `FIREBASE_SERVICE_ACCOUNT_KEY` ב-Netlify - **מוגדר ב-4 deploy contexts!**
- [ ] בדיקת Service Account permissions (צריך Play Integrity API access)
- [ ] בדיקות end-to-end

### Testing

- [ ] יצירת tests ב-Google Play Console
- [ ] בדיקת מכשיר תקין
- [ ] בדיקת מכשיר עם root
- [ ] בדיקת emulator
- [ ] בדיקת side-loaded app

---

**עדכון אחרון**: 2025  
**סטטוס**: ✅ מוגדר ב-Google Play Console, ✅ API endpoint מוכן, ✅ Environment Variables מוגדרים  
**השלב הבא**: עקוב אחרי המדריך ב-`PLAY_INTEGRITY_NEXT_STEPS.md` להמשך

---

## 📖 מדריך המשך

**לא יודע איך להמשיך?** עיין במדריך המפורט:

- 📄 **`documents/PLAY_INTEGRITY_NEXT_STEPS.md`** - מדריך צעד אחר צעד להמשך

המדריך כולל:

- ✅ הפעלת Play Integrity API ב-Google Cloud Console
- ✅ בדיקת הרשאות Service Account
- ✅ Deploy ובדיקה
- ✅ אינטגרציה עם האפליקציה Android
- ✅ פתרון בעיות נפוצות
