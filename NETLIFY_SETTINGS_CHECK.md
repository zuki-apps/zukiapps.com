# בדיקת הגדרות Netlify - Build & Deploy

## ההגדרות שלך נראות תקינות! ✅

### מה שאני רואה:
- ✅ **Branch to deploy:** `main` - נכון!
- ✅ **Build command:** `npm run build` - נכון!
- ✅ **Publish directory:** `.next` - נכון!
- ✅ **Base directory:** (ריק) - נכון!
- ✅ **Functions directory:** `netlify/functions` - נכון (אם אתה לא משתמש ב-Functions, זה לא משנה)

---

## מה צריך לבדוק עכשיו:

### 1. בדוק את Continuous Deployment

**בתפריט השמאלי:**
- תחת **"Build & deploy"**, לחץ על **"Continuous Deployment"**
- שם תראה:
  - **Connected repository:** צריך להיות `zulior/zukiapps.com` (או השם של ה-repository)
  - **Production branch:** `main`
  - **Deploy strategy:** `Automatic`

**אם אתה לא רואה repository מחובר:**
- לחץ **"Link repository**
- בחר **Bitbucket**
- בחר את ה-repository (הזה ש-Public!)

---

## 2. בדוק את ה-Deploys

**בתפריט השמאלי:**
- לחץ על **"Deploys"**
- תראה רשימה של כל ה-deploys
- בדוק את ה-deploy האחרון:
  - ✅ ירוק = הצליח
  - ❌ אדום = נכשל (לחץ עליו לראות את הלוגים)

---

## 3. אם יש שגיאה ב-Deploy:

### שגיאה נפוצה: "unrecognized Git contributor"
**פתרון:** ודא שה-repository הוא **Public**

### שגיאה נפוצה: "Build failed"
**פתרון:** לחץ על ה-deploy → בדוק את ה-**Deploy logs** → חפש את השגיאה

---

## 4. Trigger Deploy ידני (לבדיקה):

1. **Deploys** → **Trigger deploy** → **Clear cache and deploy site**
2. זה יגרום ל-Netlify לבנות את האתר מחדש
3. תוך 2-3 דקות תראה אם זה עובד

---

## סיכום - מה לבדוק:

1. ✅ **Build settings** - נראים תקינים (מה שראיתי ב-screenshot)
2. 🔍 **Continuous Deployment** - בדוק איזה repository מחובר
3. 🔍 **Deploys** - בדוק אם יש deploys מוצלחים או שגיאות

---

## אם הכל תקין:

**אם ה-repository מחובר וה-deploys עובדים:**
- ✅ הכל תקין! Netlify יעשה pull אוטומטית בכל `git push`

**אם יש בעיה:**
- שלח לי screenshot מה-**Continuous Deployment** section
- או screenshot מה-**Deploys** עם השגיאה

---

**הכל נראה טוב! רק צריך לוודא שה-repository מחובר ב-Continuous Deployment. 🚀**

