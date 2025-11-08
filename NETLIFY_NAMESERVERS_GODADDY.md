# איך לחבר Domain מ-GoDaddy ל-Netlify - Name Servers (הכי פשוט!)

## למה Name Servers?

**יתרונות:**
- ✅ **הכי פשוט** - רק 2 שינויים
- ✅ **Netlify מנהל את כל ה-DNS** - אתה לא צריך לדאוג
- ✅ **SSL אוטומטי** - Netlify יוצר certificate אוטומטית
- ✅ **קל לתחזוקה** - הכל במקום אחד

---

## שלב 1: קבל את ה-Name Servers מ-Netlify

**ב-Netlify Dashboard:**
1. **Domains** → **zukiapps.com** → **DNS settings**
2. תחת **"Name servers"**, תראה:
   - `dns1.p09.nsone.net`
   - `dns2.p09.nsone.net`
3. **העתק את שני ה-Name Servers האלה!**

---

## שלב 2: שנה את ה-Name Servers ב-GoDaddy

### צעדים מפורטים:

1. **לך ל-GoDaddy**: https://www.godaddy.com
2. **התחבר** לחשבון שלך
3. **My Products** → **Domains**
4. **לחץ על ה-domain** `zukiapps.com`
5. **לחץ על "DNS"** או **"Manage DNS"**

6. **מצא את ה-Name Servers:**
   - תחת **"Name Servers"** או **"Nameservers"**
   - תראה משהו כמו:
     - `ns1.godaddy.com`
     - `ns2.godaddy.com`

7. **לחץ על "Change"** או **"Edit"** ליד ה-Name Servers

8. **בחר "Custom"** או **"Custom nameservers"**

9. **הזן את ה-Name Servers מ-Netlify:**
   - **Name Server 1:** `dns1.p09.nsone.net`
   - **Name Server 2:** `dns2.p09.nsone.net`
   - (אם יש Name Server 3 ו-4 - השאר ריק או מחק)

10. **לחץ "Save"** או **"Update"**

11. **GoDaddy יבקש ממך לאשר** - לחץ **"Confirm"** או **"Save"**

---

## שלב 3: המתן ל-DNS להתעדכן

**זה יכול לקחת:**
- 5-10 דקות (לרוב)
- עד 24 שעות (במקרים נדירים)

**איך לבדוק:**
1. **Netlify Dashboard** → **Domains** → **zukiapps.com**
2. תחת **"DNS settings"**, בדוק את הסטטוס:
   - ✅ **"DNS configured correctly"** = עובד!
   - ⏳ **"DNS not configured"** = עדיין ממתין
   - ❌ **"DNS misconfigured"** = יש בעיה

---

## שלב 4: בדוק שהכל עובד

1. **המתן 10-15 דקות**
2. **פתח בדפדפן חדש:**
   - `https://zukiapps.com`
   - `https://www.zukiapps.com`
3. **אם אתה רואה את האתר** - הכל עובד! ✅

---

## אם זה לא עובד:

### בעיה 1: Name Servers לא התעדכנו
**פתרון:**
- המתן עוד 10-15 דקות
- בדוק ב-**Netlify Dashboard** את הסטטוס
- בדוק ב-GoDaddy שה-Name Servers נשמרו נכון

### בעיה 2: שגיאה ב-Name Servers
**פתרון:**
1. ודא שהעתקת נכון:
   - `dns1.p09.nsone.net`
   - `dns2.p09.nsone.net`
2. ודא שאין שגיאות הקלדה
3. ודא ששמרת ב-GoDaddy

### בעיה 3: SSL Certificate לא מוכן
**פתרון:**
- Netlify ייצור SSL certificate אוטומטית
- זה יכול לקחת 5-10 דקות
- המתן ובדוק שוב

---

## איך לבדוק את ה-Name Servers:

### דרך 1: GoDaddy Dashboard
- **My Products** → **Domains** → **zukiapps.com** → **DNS**
- תחת **"Name Servers"**, תראה את ה-Name Servers החדשים

### דרך 2: Online Tools
- לך ל: https://dnschecker.org
- הכנס: `zukiapps.com`
- בחר **"NS"** (Name Servers)
- לחץ **"Search"**
- אם אתה רואה `dns1.p09.nsone.net` ו-`dns2.p09.nsone.net` - זה עובד!

---

## טיפים:

### 1. שמור את ה-Name Servers הישנים
- לפני שאתה משנה, שמור את ה-Name Servers הישנים במקום בטוח
- אם משהו לא עובד, תוכל לחזור

### 2. אם יש לך Email ב-GoDaddy
- **אם יש לך email דרך GoDaddy** (למשל `info@zukiapps.com`):
  - **אל תשנה את ה-Name Servers!**
  - במקום זה, השתמש ב-**A Record + CNAME** (ראה `NETLIFY_CUSTOM_DOMAIN.md`)

### 3. נקה Cache
- אחרי שהכל עובד, נקה את ה-cache של הדפדפן
- או פתח ב-Incognito/Private mode

---

## סיכום - צעדים מהירים:

1. ✅ **Netlify** → **Domains** → **zukiapps.com** → **DNS settings**
2. ✅ **העתק את ה-Name Servers:** `dns1.p09.nsone.net` ו-`dns2.p09.nsone.net`
3. ✅ **GoDaddy** → **My Products** → **Domains** → **zukiapps.com** → **DNS**
4. ✅ **לחץ "Change"** ליד ה-Name Servers
5. ✅ **הזן את ה-Name Servers החדשים**
6. ✅ **שמור**
7. ✅ **המתן 10-15 דקות**
8. ✅ **בדוק:** `https://zukiapps.com`

---

## אם יש לך Email ב-GoDaddy:

**אם יש לך email דרך GoDaddy:**
- **אל תשנה את ה-Name Servers!**
- במקום זה, השתמש ב-**A Record + CNAME** (ראה `NETLIFY_CUSTOM_DOMAIN.md`)

**למה?**
- אם תשנה את ה-Name Servers, ה-email שלך ב-GoDaddy לא יעבוד
- A Record + CNAME מאפשרים לשמור על ה-email ב-GoDaddy

---

**זה הכל! אחרי שהכל יעבוד, האתר שלך יהיה זמין ב-`zukiapps.com`! 🚀**

