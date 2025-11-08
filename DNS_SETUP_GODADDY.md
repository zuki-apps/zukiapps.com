# 🔧 הוראות עדכון DNS ב-GoDaddy עבור Vercel

## איך למצוא את ה-DNS Records ב-Vercel:

1. **ב-Vercel Dashboard:**

   - לך לפרויקט שלך
   - לחץ על **"Settings"** (בתפריט העליון)
   - לחץ על **"Domains"** (בתפריט הצד)
   - הוסף את הדומיין: `zuki.apps.com`
   - לחץ **"Add"**

2. **אחרי שתוסיף את הדומיין:**
   - Vercel יציג לך את ה-DNS records שצריך להוסיף
   - זה יראה משהו כמו:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     ```
     או
     ```
     Type: CNAME
     Name: @
     Value: cname.vercel-dns.com
     ```

---

## אם Vercel לא מציג הוראות, השתמש בהגדרות הבאות:

### אפשרות 1: CNAME (מומלץ) ✅

ב-GoDaddy, הוסף את ה-Record הבא:

- **Type:** `CNAME`
- **Name:** `@` (או השאר ריק)
- **Value:** `cname.vercel-dns.com`
- **TTL:** `1 Hour` (או `600 seconds`)

### אפשרות 2: A Record

אם CNAME לא עובד, נסה A Record:

- **Type:** `A`
- **Name:** `@` (או השאר ריק)
- **Value:** `76.76.21.21`
- **TTL:** `1 Hour`

**הערה:** ה-IP יכול להשתנות. בדוק ב-Vercel Dashboard תחת Domains.

---

## שלבים מפורטים ב-GoDaddy:

### 1. היכנס ל-GoDaddy:

- לך ל-[godaddy.com](https://godaddy.com)
- התחבר לחשבון שלך

### 2. נווט ל-DNS Management:

- לחץ על **"My Products"** (בתפריט העליון)
- תחת **"Domains"**, מצא את `zuki.apps.com`
- לחץ עליו
- לחץ על **"DNS"** או **"Manage DNS"**

### 3. מצא/עדכן את ה-Records:

**אם יש כבר A Record או CNAME ל-@:**

- לחץ על העיפרון (✏️) ליד ה-Record
- עדכן את ה-Value לפי מה ש-Vercel נתן
- לחץ **"Save"**

**אם אין Record ל-@:**

- לחץ על **"Add"** או **"+ Add Record"**
- בחר את ה-Type (CNAME או A)
- הזן:
  - **Name:** `@` (או השאר ריק - זה אומר root domain)
  - **Value:** `cname.vercel-dns.com` (אם CNAME) או IP (אם A)
  - **TTL:** `1 Hour`
- לחץ **"Save"**

### 4. אם תרצה גם www:

- הוסף Record נוסף:
  - **Type:** `CNAME`
  - **Name:** `www`
  - **Value:** `cname.vercel-dns.com`
  - **TTL:** `1 Hour`

---

## איך לבדוק שהכל עובד:

### 1. בדוק DNS Propagation:

- לך ל-[whatsmydns.net](https://www.whatsmydns.net)
- הזן: `zuki.apps.com`
- בחר **"A"** או **"CNAME"**
- לחץ **"Search"**
- אם אתה רואה את הערך שהגדרת, זה עובד!

### 2. בדוק ב-Vercel:

- ב-Vercel Dashboard → Settings → Domains
- אם יש ✅ ירוק ליד הדומיין, זה מחובר!
- אם יש ⚠️, המתן עוד קצת (DNS propagation)

### 3. בדוק את האתר:

- נסה לפתוח: `https://zuki.apps.com`
- אם זה עובד, הצלחת! 🎉

---

## זמן המתנה:

- **DNS Propagation** יכול לקחת בין 10 דקות ל-48 שעות
- בדרך כלל זה לוקח **10-30 דקות**
- אם אחרי שעה זה עדיין לא עובד, בדוק שוב את ה-Records

---

## בעיות נפוצות:

### "Domain not found" או "DNS_PROBE_FINISHED_NXDOMAIN"

- ודא שה-Record נוסף נכון
- ודא שה-Name הוא `@` (או ריק)
- המתן עוד קצת

### "This site can't be reached"

- בדוק שה-Record נכון
- בדוק ב-[whatsmydns.net](https://www.whatsmydns.net)
- נקה את ה-cache של הדפדפן

### Vercel מציג "Invalid Configuration"

- ודא שה-Record נוסף נכון
- המתן עוד קצת (DNS propagation)

---

## צילומי מסך (תיאור):

### ב-Vercel:

1. Settings → Domains
2. תראה את הדומיין עם סטטוס
3. אם יש "Invalid Configuration", תראה הוראות

### ב-GoDaddy:

1. My Products → Domains → zuki.apps.com → DNS
2. תראה רשימה של Records
3. חפש A או CNAME עם Name = @
4. עדכן או הוסף חדש

---

**טיפ:** אם אתה לא בטוח, נסה קודם CNAME עם `cname.vercel-dns.com` - זה הכי פשוט ובדרך כלל עובד! ✅
