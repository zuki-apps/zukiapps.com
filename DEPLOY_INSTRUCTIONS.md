# הוראות העלאה ל-Cloudflare Pages

## איך זה עובד?

**האתר שלך כבר ב-Git (Bitbucket), אז Cloudflare Pages פשוט מחובר ל-Git ומעלה אוטומטית!**

---

## שלב 1: התחבר ל-Cloudflare Pages

1. לך ל: **https://dash.cloudflare.com**
2. אם אין לך חשבון - לחץ "Sign up" (חינמי)
3. התחבר עם אימייל או Google/GitHub

---

## שלב 2: פתח את Cloudflare Pages

**אפשרות 1 (הכי פשוט):**

1. לך ישירות ל: **https://pages.cloudflare.com**
2. לחץ על **"Create a project"** או **"Connect to Git"**

**אפשרות 2 (דרך Dashboard):**

1. ב-Cloudflare Dashboard הראשי, חפש בתפריט השמאלי:
   - **"Workers & Pages"** או
   - **"Pages"** או
   - **"Workers"** (ואז Pages בתוכו)
2. לחץ על **"Create application"** או **"Create"**
3. בחר **"Pages"** → **"Connect to Git"**

**אם אתה לא רואה את זה:**

- נסה ישירות: **https://dash.cloudflare.com/pages**
- או: **https://dash.cloudflare.com/workers**

---

## שלב 3: חבר את ה-Repository

**⚠️ חשוב: Cloudflare Pages תומך רק ב-GitHub ו-GitLab, לא ב-Bitbucket!**

**יש לך 3 אפשרויות:**

### אפשרות 1: העבר את הפרויקט ל-GitHub (הכי פשוט) ⭐
1. צור repository חדש ב-GitHub
2. העתק את הקוד:
   ```bash
   git remote add github https://github.com/your-username/zukiapps.git
   git push github main
   ```
3. ב-Cloudflare Pages, בחר **GitHub** במקום Bitbucket
4. בחר את ה-repository החדש

### אפשרות 2: Deploy ידני עם Wrangler CLI
1. התקן Wrangler: `npm install -g wrangler`
2. התחבר: `wrangler login`
3. בנה את האתר: `npm run build`
4. Deploy: `wrangler pages deploy .next`

### אפשרות 3: השתמש ב-Netlify (תומך ב-Bitbucket!)
Netlify תומך ב-Bitbucket! אם אתה רוצה להישאר עם Bitbucket, Netlify הוא פתרון טוב יותר.

---

## שלב 4: הגדר את ה-Build

Cloudflare יזהה אוטומטית Next.js, אבל תצטרך לוודא:

**Build settings:**

- **Framework preset:** `Next.js` (או `Next.js (Static HTML Export)`)
- **Build command:** `npm run build`
- **Build output directory:** `.next`
- **Root directory:** `/` (השאר ריק)

**Environment variables:**

- אין צורך ב-variables מיוחדים (השאר ריק)

---

## שלב 5: Deploy!

1. לחץ על **"Save and Deploy"**
2. Cloudflare יתחיל לבנות את האתר
3. זה יקח 2-3 דקות
4. תקבל URL זמני (למשל: `https://zuki-apps-website.pages.dev`)

---

## מה קורה אחר כך?

**כל פעם שאתה עושה `git push`:**

1. Cloudflare מזהה את השינוי ב-Git
2. בונה את האתר מחדש
3. מעלה את הגרסה החדשה
4. הכל אוטומטי! 🎉

**אני יכול לעדכן את הקוד ואתה רק עושה push!**

---

## חיבור Domain (אופציונלי)

אם יש לך domain (למשל: `zukiapps.com`):

1. ב-Cloudflare Dashboard → Pages → Project שלך
2. לחץ על **"Custom domains"**
3. לחץ **"Set up a custom domain"**
4. הכנס את הדומיין
5. עקוב אחר ההוראות להגדרת DNS

---

## טיפים:

- ✅ **Build logs** - תוכל לראות את כל הלוגים של הבנייה
- ✅ **Preview deployments** - כל commit מקבל URL נפרד לבדיקה
- ✅ **Rollback** - אפשר לחזור לגרסה קודמת בקלות
- ✅ **Analytics** - סטטיסטיקות על התעבורה (בתוכנית Pro)

---

## אם יש בעיות:

1. בדוק את ה-**Build logs** ב-Cloudflare Dashboard
2. ודא שה-**Build command** נכון: `npm run build`
3. ודא שה-**Build output directory** נכון: `.next`
4. אם יש שגיאות - שלח לי את הלוגים ואני אעזור!

---

**זה הכל! פשוט מאוד! 🚀**
