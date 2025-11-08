# Netlify Setup Guide

## שלב 1: הרשמה ל-Netlify
1. לך ל-https://netlify.com
2. לחץ על "Sign up" והתחבר עם GitHub/Bitbucket

## שלב 2: חיבור הפרויקט
1. ב-Netlify Dashboard, לחץ על "Add new site" → "Import an existing project"
2. בחר Bitbucket (או GitHub אם אתה משתמש בו)
3. בחר את ה-repository: `zukiapps.com`
4. Netlify יזהה אוטומטית את Next.js

## שלב 3: הגדרות Build
Netlify יזהה אוטומטית את ההגדרות מ-`netlify.toml`:
- Build command: `npm run build`
- Publish directory: `.next`

## שלב 4: Deploy
1. לחץ על "Deploy site"
2. Netlify יבנה את האתר אוטומטית
3. תקבל URL זמני (למשל: `https://random-name.netlify.app`)

## שלב 5: חיבור Domain (אופציונלי)
1. ב-Netlify Dashboard → Site settings → Domain management
2. לחץ על "Add custom domain"
3. הכנס את הדומיין שלך (למשל: `zukiapps.com`)
4. עקוב אחר ההוראות להגדרת DNS

## יתרונות Netlify:
- ✅ חינמי ל-projects קטנים
- ✅ Deploy אוטומטי מ-Git
- ✅ CDN מובנה
- ✅ SSL אוטומטי
- ✅ פשוט לתחזוקה
- ✅ תמיכה מעולה ב-Next.js

## תמיכה:
אם יש בעיות, בדוק את ה-build logs ב-Netlify Dashboard.

