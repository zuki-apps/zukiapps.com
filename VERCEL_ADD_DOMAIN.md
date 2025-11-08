# 🔍 איך להוסיף דומיין ב-Vercel - מדריך מפורט

## דרך 1: דרך ה-Project Dashboard (הכי קל) ✅

1. **ב-Vercel Dashboard:**

   - לך ל-**"Dashboard"** (הדף הראשי)
   - מצא את הפרויקט שלך (zuki-apps-website או איך שקראת לו)
   - לחץ על **שם הפרויקט**

2. **בדף הפרויקט:**

   - תראה כמה טאבים: **"Deployments"**, **"Analytics"**, **"Settings"** וכו'
   - לחץ על **"Settings"** (בתפריט העליון)

3. **ב-Settings:**

   - בתפריט הצד, תחת **"General"**, תראה:
     - General
     - **Domains** ← זה מה שאתה מחפש!
     - Environment Variables
     - Git
     - וכו'

4. **אם אתה לא רואה "Domains":**
   - גלול למטה בתפריט הצד
   - או חפש "Domains" בחיפוש (Ctrl+F / Cmd+F)

---

## דרך 2: דרך ה-Deployment

1. **ב-Dashboard:**

   - לחץ על אחד מה-Deployments (הרשימה הראשית)
   - או לך ל-**"Deployments"** טאב

2. **ב-Deployment:**
   - תראה כפתור **"Domains"** או **"Add Domain"**
   - לחץ עליו

---

## דרך 3: דרך ה-URL ישירות

אם אתה לא מוצא, נסה:

1. **הוסף `/settings/domains` ל-URL:**

   ```
   https://vercel.com/YOUR_USERNAME/YOUR_PROJECT_NAME/settings/domains
   ```

   החלף:

   - `YOUR_USERNAME` = שם המשתמש שלך ב-Vercel
   - `YOUR_PROJECT_NAME` = שם הפרויקט

2. **או פשוט:**
   - לחץ על הפרויקט
   - הוסף `/settings/domains` ל-URL בדפדפן

---

## דרך 4: דרך ה-Team Settings (אם יש לך Team)

1. **ב-Dashboard:**
   - לחץ על **"Settings"** (בתפריט העליון הכללי)
   - לחץ על **"Domains"**

---

## מה לעשות אם אתה עדיין לא מוצא:

### אפשרות A: הוסף דרך ה-Deployment

1. לך ל-**"Deployments"** טאב
2. לחץ על ה-Deployment האחרון
3. בדף ה-Deployment, תראה **"Domains"** או **"Add Domain"**

### אפשרות B: חפש בחיפוש

1. ב-Vercel Dashboard, לחץ **Ctrl+F** (או **Cmd+F** ב-Mac)
2. חפש: `domains`
3. זה יראה לך איפה זה נמצא

### אפשרות C: בדוק את ה-Project Overview

1. לחץ על הפרויקט
2. בדף הראשי של הפרויקט, תראה:
   - **"Domains"** קטגוריה
   - או כפתור **"Add Domain"**

---

## צילומי מסך (תיאור):

### מסך 1: Project Dashboard

```
Dashboard → [Project Name] zuki-apps-website]
```

### מסך 2: Settings Tab

```
[Project] → Settings → [Sidebar Menu]
  ├── General
  ├── Domains ← כאן!
  ├── Environment Variables
  └── ...
```

### מסך 3: Deployment Page

```
[Project] → Deployments → [Latest Deployment]
  └── Domains / Add Domain button
```

---

## אם עדיין לא מוצא:

**נסה את זה:**

1. **לך ישירות ל-URL:**

   ```
   https://vercel.com/dashboard
   ```

2. **לחץ על הפרויקט שלך**

3. **בשורת הכתובת, הוסף:**

   ```
   /settings/domains
   ```

4. **או פשוט לחץ על "Settings" ואז חפש "Domains" בתפריט**

---

## טיפים:

- **אם אתה רואה "Settings" אבל לא "Domains":**

  - ודא שאתה בפרויקט הנכון
  - נסה לרענן את הדף (F5)
  - נסה בדפדפן אחר

- **אם אתה רואה שגיאה:**
  - ודא שהפרויקט deploy בהצלחה
  - ודא שיש לך הרשאות לפרויקט

---

## אחרי שתמצא את "Domains":

1. לחץ על **"Add Domain"** או **"Add"**
2. הזן: `zuki.apps.com`
3. לחץ **"Add"**
4. Vercel יציג לך את ה-DNS records שצריך להוסיף

---

**אם אתה עדיין לא מוצא, שלח לי צילום מסך של מה שאתה רואה ב-Vercel Dashboard ואני אעזור לך למצוא! 📸**
