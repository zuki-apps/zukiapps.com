# איך לחבר Domain מ-GoDaddy ל-Netlify

## שלב 1: הוסף את ה-Domain ב-Netlify

1. לך ל-**Netlify Dashboard**: https://app.netlify.com
2. בחר את האתר שלך (`zuki-apps`)
3. בתפריט השמאלי: **Site settings** → **Domain management**
4. לחץ על **"Add custom domain"**
5. הכנס את ה-domain שלך: `zukiapps.com`
6. לחץ **"Verify"** או **"Add"**

---

## שלב 2: קבל את ה-DNS Records מ-Netlify

אחרי שתוסיף את ה-domain, Netlify יראה לך את ה-DNS records שצריך להגדיר:

**בדרך כלל תראה משהו כמו:**
- **A Record:** `75.2.60.5` (או IP אחר)
- **CNAME Record:** `www` → `your-site.netlify.app`

**או:**
- **CNAME Record:** `@` → `your-site.netlify.app`
- **CNAME Record:** `www` → `your-site.netlify.app`

**העתק את ה-records האלה!**

---

## שלב 3: הגדר את ה-DNS ב-GoDaddy

### אופציה 1: A Record + CNAME (מומלץ)

1. לך ל-**GoDaddy**: https://www.godaddy.com
2. התחבר לחשבון שלך
3. לך ל-**My Products** → **Domains**
4. לחץ על ה-domain שלך (`zukiapps.com`)
5. לחץ על **"DNS"** או **"Manage DNS"**

6. **מחק את כל ה-records הישנים** (אם יש):
   - A Records
   - CNAME Records
   - (אל תמחק MX Records אם יש לך email!)

7. **הוסף A Record:**
   - **Type:** A
   - **Name:** `@` (או ריק)
   - **Value:** `75.2.60.5` (ה-IP מ-Netlify)
   - **TTL:** 600 (או Default)
   - לחץ **Save**

8. **הוסף CNAME Record:**
   - **Type:** CNAME
   - **Name:** `www`
   - **Value:** `zuki-apps.netlify.app` (ה-URL של Netlify)
   - **TTL:** 600 (או Default)
   - לחץ **Save**

### אופציה 2: רק CNAME (אם GoDaddy תומך)

1. **הוסף CNAME Record:**
   - **Type:** CNAME
   - **Name:** `@` (או ריק)
   - **Value:** `zuki-apps.netlify.app`
   - **TTL:** 600
   - לחץ **Save**

2. **הוסף CNAME Record:**
   - **Type:** CNAME
   - **Name:** `www`
   - **Value:** `zuki-apps.netlify.app`
   - **TTL:** 600
   - לחץ **Save**

---

## שלב 4: המתן ל-DNS להתעדכן

**זה יכול לקחת:**
- 5-10 דקות (לרוב)
- עד 24 שעות (במקרים נדירים)

**איך לבדוק:**
1. לך ל-**Netlify Dashboard** → **Domain management**
2. תראה את הסטטוס של ה-domain:
   - ✅ **"DNS configured correctly"** = עובד!
   - ⏳ **"DNS not configured"** = עדיין ממתין
   - ❌ **"DNS misconfigured"** = יש בעיה

---

## שלב 5: בדוק שהכל עובד

1. **המתן 10-15 דקות**
2. **פתח בדפדפן חדש:**
   - `https://zukiapps.com`
   - `https://www.zukiapps.com`
3. **אם אתה רואה את האתר** - הכל עובד! ✅

---

## אם זה לא עובד:

### בעיה 1: DNS לא התעדכן
**פתרון:**
- המתן עוד 10-15 דקות
- בדוק ב-**Netlify Dashboard** → **Domain management** את הסטטוס

### בעיה 2: שגיאה ב-DNS Records
**פתרון:**
1. בדוק ב-**Netlify Dashboard** → **Domain management**
2. Netlify יראה לך מה לא נכון
3. תקן את ה-records ב-GoDaddy

### בעיה 3: SSL Certificate לא מוכן
**פתרון:**
- Netlify ייצור SSL certificate אוטומטית
- זה יכול לקחת 5-10 דקות
- המתן ובדוק שוב

---

## טיפים:

### 1. שמור את ה-Records הישנים
- לפני שאתה מוחק records, שמור אותם במקום בטוח
- אם יש לך email (MX records) - אל תמחק אותם!

### 2. בדוק את ה-DNS
- אפשר לבדוק ב: https://dnschecker.org
- הכנס: `zukiapps.com`
- בדוק אם ה-A Record מצביע ל-`75.2.60.5`

### 3. נקה Cache
- אחרי שהכל עובד, נקה את ה-cache של הדפדפן
- או פתח ב-Incognito/Private mode

---

## סיכום - צעדים מהירים:

1. ✅ **Netlify** → **Domain management** → **Add custom domain** → `zukiapps.com`
2. ✅ **העתק את ה-DNS records** מ-Netlify
3. ✅ **GoDaddy** → **DNS** → **מחק records ישנים** (אם יש)
4. ✅ **הוסף A Record:** `@` → `75.2.60.5`
5. ✅ **הוסף CNAME Record:** `www` → `zuki-apps.netlify.app`
6. ✅ **המתן 10-15 דקות**
7. ✅ **בדוק:** `https://zukiapps.com`

---

**זה הכל! אחרי שהכל יעבוד, האתר שלך יהיה זמין ב-`zukiapps.com`! 🚀**

