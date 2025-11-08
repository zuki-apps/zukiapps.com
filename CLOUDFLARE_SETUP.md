# Cloudflare Pages Setup Guide

## שלב 1: הרשמה ל-Cloudflare Pages
1. לך ל-https://pages.cloudflare.com
2. לחץ על "Sign up" והתחבר עם GitHub/Bitbucket
3. אם אין לך חשבון Cloudflare, תיצור אחד (חינמי)

## שלב 2: חיבור הפרויקט
1. ב-Cloudflare Dashboard, לחץ על "Create a project"
2. בחר "Connect to Git"
3. בחר Bitbucket (או GitHub אם אתה משתמש בו)
4. הרשא ל-Cloudflare גישה ל-repository שלך
5. בחר את ה-repository: `zukiapps.com`

## שלב 3: הגדרות Build
Cloudflare יזהה אוטומטית את Next.js, אבל תצטרך להגדיר:

**Build settings:**
- **Framework preset:** Next.js (Static HTML Export) - או Next.js
- **Build command:** `npm run build`
- **Build output directory:** `.next`
- **Root directory:** `/` (או השאר ריק)

**Environment variables:**
- אין צורך ב-variables מיוחדים ל-Hello World

## שלב 4: Deploy
1. לחץ על "Save and Deploy"
2. Cloudflare יבנה את האתר אוטומטית
3. תקבל URL זמני (למשל: `https://random-name.pages.dev`)

## שלב 5: חיבור Domain (אופציונלי)
1. ב-Cloudflare Dashboard → Pages → Project → Custom domains
2. לחץ על "Set up a custom domain"
3. הכנס את הדומיין שלך (למשל: `zukiapps.com`)
4. עקוב אחר ההוראות להגדרת DNS

## יתרונות Cloudflare Pages:
- ✅ **חינמי** - 500 builds/חודש, תעבורה בלתי מוגבלת
- ✅ **מהיר** - 200+ CDN nodes ברחבי העולם
- ✅ **זול** - $5/חודש ל-Pro (אם צריך)
- ✅ **Deploy אוטומטי** - כל push ל-Git = deploy חדש
- ✅ **SSL אוטומטי** - HTTPS מובנה
- ✅ **פשוט לתחזוקה** - ממשק נקי וברור

## תמיכה:
אם יש בעיות, בדוק את ה-build logs ב-Cloudflare Dashboard.

## הערות חשובות:
- Cloudflare Pages תומך ב-Next.js עם SSR ו-ISR
- אם אתה משתמש ב-API routes, תצטרך Cloudflare Workers
- ל-landing page פשוט - הכל יעבוד מצוין!

