# איך למצוא את ה-URL של האתר ב-Netlify

## דרך 1: Netlify Dashboard (הכי פשוט) ✅

1. לך ל-**Netlify Dashboard**: https://app.netlify.com
2. בחר את האתר שלך (`zukiapps.com` או השם שלו)
3. **בחלק העליון של הדף**, תראה את ה-URL:
   - זה יהיה משהו כמו: `https://random-name.netlify.app`
   - או: `https://zukiapps.com` (אם יש לך custom domain)

**זה ה-URL של האתר שלך! ✅**

---

## דרך 2: Site Overview

1. **Netlify Dashboard** → האתר שלך
2. בדף **"Site overview"** (הדף הראשי)
3. בחלק העליון, תראה:
   - **Site name:** השם של האתר
   - **URL:** ה-URL המלא

---

## דרך 3: Domain Management

1. **Site settings** → **Domain management**
2. שם תראה את כל ה-domains:
   - **Netlify subdomain:** `https://your-site.netlify.app`
   - **Custom domain:** `https://zukiapps.com` (אם יש)

---

## דרך 4: Deploy Logs

1. **Deploys** → לחץ על ה-deploy האחרון (הירוק)
2. בחלק העליון של ה-deploy, תראה:
   - **Deploy URL:** זה ה-URL של ה-deploy הזה
   - **Live URL:** זה ה-URL של האתר החי

---

## אם אתה לא רואה את האתר:

### בעיה 1: ה-URL לא נכון
**פתרון:**
- ודא שאתה פותח את ה-URL הנכון
- בדוק ב-**Domain management** מה ה-URL

### בעיה 2: Cache בדפדפן
**פתרון:**
1. לחץ **Ctrl + Shift + R** (או **Cmd + Shift + R** ב-Mac)
2. או: פתח ב-Incognito/Private mode
3. או: נקה את ה-cache של הדפדפן

### בעיה 3: ה-Deploy לא באמת הצליח
**פתרון:**
1. **Deploys** → בדוק את ה-deploy האחרון
2. אם יש ❌ אדום - לחץ עליו
3. בדוק את ה-**Deploy logs** - חפש שגיאות

### בעיה 4: Custom Domain לא מוגדר
**פתרון:**
- אם אתה מצפה לראות `zukiapps.com` אבל זה לא עובד:
  1. **Domain management** → **Add custom domain**
  2. הכנס את הדומיין
  3. עקוב אחר ההוראות להגדרת DNS

---

## בדיקה מהירה:

1. **Netlify Dashboard** → האתר שלך
2. **פתח את ה-URL** שמופיע בחלק העליון
3. **אם אתה רואה את האתר** - הכל תקין! ✅
4. **אם אתה לא רואה** - בדוק את ה-Deploy logs

---

## אם אתה רואה שגיאה 404:

**זה אומר שה-Deploy הצליח אבל יש בעיה עם ה-routing:**

### פתרון 1: בדוק את ה-Publish Directory
- **Build & deploy** → **Build settings**
- **Publish directory:** צריך להיות `.next`
- אם זה לא נכון - שנה ושמור

### פתרון 2: בדוק את ה-next.config.js
- ודא שאין בעיות ב-`next.config.js`
- בדוק את ה-Build logs לשגיאות

### פתרון 3: Trigger Deploy מחדש
- **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

---

## איך לבדוק שהכל עובד:

1. **פתח את ה-URL** מ-Netlify Dashboard
2. **אם אתה רואה את הדף הראשי** (`app/page.tsx`) - הכל תקין! ✅
3. **אם אתה רואה את דף ZuList** (`app/zulist/page.tsx`) - הכל תקין! ✅
4. **אם אתה רואה שגיאה** - שלח לי את השגיאה

---

## טיפים:

### אם אתה רוצה Custom Domain:
1. **Domain management** → **Add custom domain**
2. הכנס: `zukiapps.com`
3. עקוב אחר ההוראות להגדרת DNS
4. זה יקח כמה דקות עד שהדומיין יעבוד

### אם אתה רוצה לראות Preview של Deploy:
- כל deploy יוצר **Preview URL**
- זה מאפשר לך לראות את השינויים לפני שהם עולים ל-production

---

**מה ה-URL שאתה רואה ב-Netlify Dashboard? פתח אותו ותגיד לי מה אתה רואה! 🔍**

