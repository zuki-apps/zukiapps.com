# מדריך העברה מ-Firebase Hosting ל-Next.js

## מה יש לך ב-Firebase?

Firebase כולל מספר שירותים. צריך להבין מה בדיוק יש לך:

### 1. **Firebase Hosting** (קבצים סטטיים)
   - HTML, CSS, JavaScript סטטיים
   - **פתרון:** העתק את הקבצים לתיקייה `public/` ב-Next.js

### 2. **Firebase Functions** (Backend API)
   - פונקציות serverless
   - **פתרון:** העבר ל-Next.js API Routes (`app/api/`)

### 3. **Firebase Database/Firestore**
   - מסד נתונים
   - **פתרון:** נשאר ב-Firebase, רק מחבר מחדש ב-Next.js

### 4. **Firebase Storage**
   - אחסון קבצים
   - **פתרון:** נשאר ב-Firebase, רק מחבר מחדש ב-Next.js

### 5. **Firebase Authentication**
   - אימות משתמשים
   - **פתרון:** נשאר ב-Firebase, רק מחבר מחדש ב-Next.js

---

## תהליך העברה - שלב אחר שלב

### שלב 1: זיהוי מה יש לך

**שאל את עצמך:**
- ✅ יש לך קבצים סטטיים (HTML/CSS/JS)?
- ✅ יש לך Firebase Functions?
- ✅ יש לך מסד נתונים (Firestore/Realtime DB)?
- ✅ יש לך Authentication?
- ✅ יש לך Storage?

---

### שלב 2: העברת קבצים סטטיים

**אם יש לך קבצים סטטיים:**

1. **מצא את הקבצים ב-Firebase:**
   ```bash
   # בדוק את firebase.json שלך
   # הקבצים נמצאים בתיקייה שמוגדרת ב-"public"
   ```

2. **העתק ל-Next.js:**
   ```bash
   # צור תיקייה public/ (אם לא קיימת)
   mkdir public
   
   # העתק את הקבצים הסטטיים
   # למשל: תמונות, קבצי JS/CSS שלא חלק מ-Next.js
   ```

3. **עדכן קישורים:**
   - ב-Next.js, קבצים ב-`public/` נגישים ישירות
   - `/image.png` במקום `/public/image.png`

---

### שלב 3: העברת Firebase Functions ל-API Routes

**אם יש לך Firebase Functions:**

1. **צור API Routes ב-Next.js:**
   ```typescript
   // app/api/example/route.ts
   export async function GET(request: Request) {
     // הקוד מהפונקציה שלך
     return Response.json({ message: 'Hello' });
   }
   ```

2. **התקן Firebase Admin SDK:**
   ```bash
   npm install firebase-admin
   ```

3. **העתק את הלוגיקה:**
   - העתק את הקוד מ-Firebase Functions
   - התאם ל-Next.js API Routes

---

### שלב 4: חיבור Firebase Services

**Firebase Database/Firestore/Auth/Storage נשארים ב-Firebase!**

1. **התקן Firebase Client SDK:**
   ```bash
   npm install firebase
   ```

2. **צור קובץ הגדרות:**
   ```typescript
   // lib/firebase.ts
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';
   import { getAuth } from 'firebase/auth';
   import { getStorage } from 'firebase/storage';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   export const auth = getAuth(app);
   export const storage = getStorage(app);
   ```

3. **השתמש ב-Client Components:**
   ```typescript
   'use client';
   import { db, auth } from '@/lib/firebase';
   // השתמש ב-Firebase כרגיל
   ```

---

### שלב 5: Environment Variables

**שמור את מפתחות Firebase ב-`.env.local`:**

```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**ב-Netlify:**
- הוסף את ה-variables ב-Site settings → Environment variables

---

### שלב 6: Deploy ל-Netlify

**האתר כבר מוגדר ל-Netlify!**

1. **Push ל-Git:**
   ```bash
   git add .
   git commit -m "Migrate from Firebase Hosting"
   git push
   ```

2. **Netlify יעשה deploy אוטומטית**

---

## שאלות נפוצות

### Q: מה עם Firebase Hosting domain?
**A:** העבר את ה-domain ל-Netlify (כבר יש לך מדריך ב-`NETLIFY_CUSTOM_DOMAIN.md`)

### Q: מה עם Firebase Functions שכבר עובדות?
**A:** אפשר להשאיר אותן ב-Firebase ולהשתמש בהן מ-Next.js, או להעביר ל-API Routes

### Q: מה עם Database?
**A:** נשאר ב-Firebase! רק מחבר מחדש ב-Next.js

### Q: מה עם Authentication?
**A:** נשאר ב-Firebase! רק מחבר מחדש ב-Next.js

---

## צעדים הבאים

1. **תגיד לי מה יש לך ב-Firebase:**
   - קבצים סטטיים?
   - Functions?
   - Database?
   - Authentication?
   - Storage?

2. **אני אכין לך תכנית מותאמת אישית**

3. **נעביר הכל שלב אחר שלב**

---

## דוגמאות קוד

### דוגמה: חיבור Firestore
```typescript
'use client';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function MyComponent() {
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'your-collection'));
    // ...
  };
}
```

### דוגמה: Authentication
```typescript
'use client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const login = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};
```

---

**תגיד לי מה יש לך ב-Firebase ואני אעזור לך להעביר הכל! 🚀**


