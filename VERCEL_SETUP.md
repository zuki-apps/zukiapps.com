# 🚀 מדריך Deploy ל-Vercel - שלב אחר שלב

## שלב 1: דחיפת הקוד ל-GitHub

אם עדיין לא דחפת את הקוד ל-GitHub:

```bash
# בתיקיית הפרויקט
git init
git add .
git commit -m "Initial commit - Zuki Apps website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zuki-apps-website.git
git push -u origin main
```

**או דרך GitHub Desktop:**

1. פתח GitHub Desktop
2. File → Add Local Repository
3. בחר את התיקייה `F:\GIT\Zuki.Apps`
4. Commit & Push

---

## שלב 2: חיבור Vercel ל-GitHub

1. **היכנס ל-Vercel:**

   - לך ל-[vercel.com](https://vercel.com)
   - התחבר עם חשבון GitHub שלך

2. **צור פרויקט חדש:**

   - לחץ על **"Add New..."** → **"Project"**
   - או לחץ על **"Import Project"**

3. **בחר את ה-Repository:**

   - Vercel יציג לך את כל ה-repositories שלך
   - בחר את `zuki-apps-website` (או איך שקראת ל-repo)
   - לחץ **"Import"**

4. **הגדרות הפרויקט:**

   - **Framework Preset:** Vercel אמור לזהות אוטומטית `Next.js` ✅
   - **Root Directory:** השאר ריק (או `./` אם צריך)
   - **Build Command:** `npm run build` (אוטומטי)
   - **Output Directory:** `.next` (אוטומטי)
   - **Install Command:** `npm install` (אוטומטי)

5. **Environment Variables (אופציונלי):**

   - כרגע אין צורך במשתני סביבה
   - אם תוסיף בעתיד, תוכל להוסיף כאן

6. **Deploy!**
   - לחץ על **"Deploy"**
   - Vercel יתחיל לבנות את הפרויקט
   - זה יקח 1-2 דקות

---

## שלב 3: בדיקת ה-Deployment

לאחר שה-deployment מסתיים:

1. **תקבל URL זמני:**

   - משהו כמו: `zuki-apps-website-abc123.vercel.app`
   - לחץ עליו כדי לראות את האתר

2. **בדוק שהכל עובד:**
   - דף בית: `https://your-project.vercel.app`
   - דף ZuList: `https://your-project.vercel.app/zulist`
   - עברית: `https://your-project.vercel.app/he`
   - Privacy: `https://your-project.vercel.app/zulist/privacy`

---

## שלב 4: חיבור הדומיין zuki.apps.com

1. **ב-Vercel Dashboard:**

   - לך לפרויקט שלך
   - לחץ על **"Settings"** (בתפריט העליון)
   - לחץ על **"Domains"** (בתפריט הצד)

2. **הוסף דומיין:**

   - הזן: `zuki.apps.com`
   - לחץ **"Add"**

3. **Vercel ייתן לך הוראות:**
   - הוא יציג לך את ה-DNS records שצריך להוסיף
   - בדרך כלל זה יהיה:
     - **Type:** A או CNAME
     - **Name:** @
     - **Value:** (IP או URL מ-Vercel)

---

## שלב 5: עדכון DNS ב-GoDaddy

1. **היכנס ל-GoDaddy:**

   - לך ל-[godaddy.com](https://godaddy.com)
   - התחבר לחשבון שלך

2. **נווט ל-DNS:**

   - My Products → Domains
   - לחץ על `zuki.apps.com`
   - לחץ על **"DNS"** או **"Manage DNS"**

3. **עדכן את ה-Records:**

   **אם Vercel נתן לך A Record:**

   - מצא את ה-A Record הקיים (אם יש)
   - לחץ על העיפרון לעריכה
   - עדכן את ה-Value לזה ש-Vercel נתן
   - או הוסף A Record חדש:
     - **Type:** A
     - **Name:** @
     - **Value:** (מה-Vercel)
     - **TTL:** 1 Hour

   **אם Vercel נתן לך CNAME:**

   - הוסף CNAME Record:
     - **Type:** CNAME
     - **Name:** @
     - **Value:** (מה-Vercel, למשל: `cname.vercel-dns.com`)
     - **TTL:** 1 Hour

   **או אם יש לך www:**

   - **Type:** CNAME
   - **Name:** www
   - **Value:** `cname.vercel-dns.com`
   - **TTL:** 1 Hour

4. **שמור:**
   - לחץ **"Save"** או **"Add"**

---

## שלב 6: המתן ל-DNS Propagation

- **DNS Propagation** יכול לקחת בין כמה דקות ל-48 שעות
- בדרך כלל זה לוקח 10-30 דקות
- תוכל לבדוק את הסטטוס ב-[whatsmydns.net](https://www.whatsmydns.net)

---

## שלב 7: בדיקה סופית

לאחר שה-DNS מתעדכן:

1. **בדוק את הדומיין:**

   - `https://zuki.apps.com` - דף בית
   - `https://zuki.apps.com/zulist` - דף ZuList
   - `https://zuki.apps.com/he` - עברית
   - `https://zuki.apps.com/zulist/privacy` - Privacy

2. **בדוק SSL:**
   - Vercel מספק SSL אוטומטית
   - ודא שיש `https://` (לא `http://`)

---

## ✅ מה קורה אחר כך?

### Deployments אוטומטיים:

- כל פעם שתדחוף קוד ל-GitHub, Vercel יעשה deploy אוטומטי
- תקבל preview URL לכל commit

### Analytics (אופציונלי):

- Vercel מספק analytics בחינם
- תוכל לראות כמה מבקרים יש באתר

### Custom Domain:

- האתר יהיה זמין ב-`zuki.apps.com`
- וגם ב-`www.zuki.apps.com` (אם תוסיף)

---

## 🆘 בעיות נפוצות

### "Domain not found"

- ודא שה-DNS records נכונים
- המתן עוד קצת (DNS propagation)

### "Build failed"

- בדוק את ה-logs ב-Vercel
- ודא ש-`package.json` נכון
- ודא ש-Node.js version תואם

### "404 on subpages"

- ודא שה-middleware.ts נכון
- בדוק שה-`next.config.js` נכון

---

## 📞 עזרה

אם יש בעיות:

1. בדוק את ה-logs ב-Vercel Dashboard
2. בדוק את ה-DNS ב-[whatsmydns.net](https://www.whatsmydns.net)
3. Vercel יש תיעוד מעולה: [vercel.com/docs](https://vercel.com/docs)

---

**בהצלחה! 🚀**
