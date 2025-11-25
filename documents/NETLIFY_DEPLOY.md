# הוראות Deploy ל-Netlify (תומך ב-Bitbucket!)

## למה Netlify?
- ✅ **תומך ב-Bitbucket** - לא צריך להעביר ל-GitHub!
- ✅ **חינמי** - 100GB תעבורה, 300 דקות build
- ✅ **פשוט מאוד** - ממשק ידידותי
- ✅ **Deploy אוטומטי** - כל push = deploy חדש
- ✅ **SSL אוטומטי** - HTTPS מובנה

---

## שלב 1: הרשמה ל-Netlify

1. לך ל: **https://app.netlify.com**
2. לחץ על **"Sign up"**
3. בחר **"Bitbucket"** (או Email/Google)
4. התחבר עם חשבון Bitbucket שלך

---

## שלב 2: חיבור הפרויקט

1. ב-Netlify Dashboard, לחץ על **"Add new site"**
2. בחר **"Import an existing project"**
3. בחר **"Bitbucket"**
4. לחץ **"Authorize Netlify"** ותן הרשאה
5. בחר את ה-repository: **`zukiapps.com`**

---

## שלב 3: הגדרות Build

Netlify יזהה אוטומטית את Next.js מ-`netlify.toml`, אבל תצטרך לוודא:

**Build settings:**
- **Build command:** `npm run build` (אוטומטי)
- **Publish directory:** `.next` (אוטומטי)
- **Base directory:** `/` (השאר ריק)

**Environment variables:**
- אין צורך ב-variables מיוחדים (השאר ריק)

---

## שלב 4: Deploy!

1. לחץ על **"Deploy site"**
2. Netlify יתחיל לבנות את האתר
3. זה יקח 2-3 דקות
4. תקבל URL זמני (למשל: `https://random-name.netlify.app`)

---

## מה קורה אחר כך?

**כל פעם שאתה עושה `git push`:**
1. Netlify מזהה את השינוי ב-Bitbucket
2. בונה את האתר מחדש
3. מעלה את הגרסה החדשה
4. הכל אוטומטי! 🎉

**אני יכול לעדכן את הקוד ואתה רק עושה push!**

---

## חיבור Domain (אופציונלי)

אם יש לך domain (למשל: `zukiapps.com`):

1. ב-Netlify Dashboard → Site settings → Domain management
2. לחץ על **"Add custom domain"**
3. הכנס את הדומיין
4. עקוב אחר ההוראות להגדרת DNS

---

## יתרונות Netlify:

- ✅ **תומך ב-Bitbucket** - לא צריך להעביר ל-GitHub!
- ✅ **חינמי** - 100GB תעבורה, 300 דקות build
- ✅ **פשוט מאוד** - ממשק הכי ידידותי
- ✅ **Deploy אוטומטי** - כל push = deploy חדש
- ✅ **SSL אוטומטי** - HTTPS מובנה
- ✅ **תמיכה מעולה** - דוקומנטציה מצוינת

---

## אם יש בעיות:

1. בדוק את ה-**Deploy logs** ב-Netlify Dashboard
2. ודא שה-**Build command** נכון: `npm run build`
3. ודא שה-**Publish directory** נכון: `.next`
4. אם יש שגיאות - שלח לי את הלוגים ואני אעזור!

---

**זה הכל! פשוט מאוד! 🚀**

