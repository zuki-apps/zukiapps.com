# פתרון בעיית SSL ב-Netlify

## הבעיה:
`ERR_CERT_COMMON_NAME_INVALID` - זה אומר שה-SSL certificate לא תואם לדומיין.

## הפתרונות:

---

## פתרון 1: המתן ל-SSL להופעל (הכי נפוץ)

**Netlify צריך כמה דקות להפעיל SSL:**

1. לך ל-Netlify Dashboard → Site settings → Domain management
2. בדוק את הסטטוס של ה-SSL certificate
3. אם כתוב "Provisioning" או "Pending" - פשוט תמתין 5-10 דקות
4. Netlify יהפוך את ה-certificate אוטומטית

---

## פתרון 2: ודא שהדומיין מוגדר נכון

1. ב-Netlify Dashboard → Site settings → Domain management
2. בדוק שהדומיין מופיע ברשימה:
   - `zukiapps.com`
   - `www.zukiapps.com` (אם יש)
3. אם לא - לחץ "Add custom domain" והוסף אותו

---

## פתרון 3: בדוק את ה-DNS

אם יש לך domain מותאם אישית:

1. ודא שה-DNS מוגדר נכון:
   - **A record** → `75.2.60.5` (Netlify IP)
   - או **CNAME** → `your-site.netlify.app`

2. בדוק ב-DNS provider שלך (GoDaddy, Cloudflare, וכו')

---

## פתרון 4: Force SSL renewal

1. ב-Netlify Dashboard → Site settings → Domain management
2. לחץ על הדומיין
3. לחץ "Renew certificate" או "Verify DNS configuration"
4. המתן כמה דקות

---

## פתרון 5: השתמש ב-Netlify subdomain זמני

בינתיים, תוכל להשתמש ב-URL הזמני של Netlify:
- `https://your-site-name.netlify.app`
- זה אמור לעבוד מיד עם SSL

---

## בדיקה מהירה:

1. פתח את ה-URL ב-Chrome/Firefox
2. לחץ על ה-🔒 ליד ה-URL
3. בדוק את פרטי ה-certificate
4. אם כתוב "Invalid" - זה הבעיה

---

## אם כלום לא עובד:

1. שלח לי את ה-URL של האתר
2. שלח לי screenshot מה-Netlify Dashboard → Domain management
3. אבדוק מה הבעיה

---

**בדרך כלל זה רק לוקח כמה דקות ל-SSL להופעל!**

