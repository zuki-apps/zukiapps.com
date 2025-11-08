# איך לוודא ש-Netlify עושה Pull אוטומטית

## בדיקה מהירה - האם Netlify מחובר ל-Git?

### שלב 1: בדוק את חיבור ה-Git Repository

1. לך ל-**Netlify Dashboard**: https://app.netlify.com
2. בחר את האתר שלך (`zukiapps.com`)
3. לך ל-**Site settings** (הגדרות האתר)
4. לחץ על **Build & deploy** בתפריט השמאלי
5. תחת **Continuous Deployment**, תראה:
   - **Connected repository:** `zulior/zukiapps.com` (או שם ה-repo שלך)
   - **Production branch:** `main` (או `master`)
   - **Deploy strategy:** `Automatic`

**אם אתה רואה את זה - הכל תקין! ✅**

---

## שלב 2: בדוק את ה-Deploy Logs

1. ב-Netlify Dashboard, לך ל-**Deploys** (בתפריט העליון)
2. תראה רשימה של כל ה-deploys
3. כל deploy צריך להראות:
   - **Trigger:** `git push` (לא "Manual deploy")
   - **Branch:** `main`
   - **Commit:** ה-commit hash האחרון שלך

**אם אתה רואה "git push" - זה אומר ש-Netlify עושה pull אוטומטית! ✅**

---

## שלב 3: בדוק את ה-Build Logs

1. לחץ על אחד מה-deploys
2. תראה את ה-**Build log**
3. בתחילת הלוג, תראה משהו כמו:
   ```
   Cloning repository...
   Cloning completed: 2.510s
   ```
4. זה אומר ש-Netlify עשה pull מהגיט!

---

## איך לבדוק אם זה עובד עכשיו?

### בדיקה 1: Trigger Manual Deploy

1. ב-Netlify Dashboard → **Deploys**
2. לחץ על **Trigger deploy** → **Clear cache and deploy site**
3. זה יגרום ל-Netlify לעשות pull מהגיט ולבנות מחדש

### בדיקה 2: עשה Test Commit

1. עשה שינוי קטן בקוד (למשל, הוסף הערה)
2. עשה `git commit` ו-`git push`
3. לך ל-Netlify Dashboard → **Deploys**
4. תוך 30-60 שניות, תראה deploy חדש מתחיל!
5. זה אומר ש-Netlify זיהה את ה-push ועשה pull אוטומטית

---

## אם Netlify לא עושה Pull אוטומטית

### בעיה 1: Repository לא מחובר

**פתרון:**

1. Site settings → **Build & deploy** → **Continuous Deployment**
2. לחץ על **Link repository**
3. בחר **Bitbucket**
4. בחר את ה-repository: `zukiapps.com`
5. לחץ **Save**

### בעיה 2: Webhook לא פעיל

**פתרון:**

1. Site settings → **Build & deploy** → **Continuous Deployment**
2. בדוק שיש **Webhook URL** מופיע
3. אם לא - לחץ **Update settings** ושמור מחדש

### בעיה 3: Bitbucket לא נותן הרשאות

**פתרון:**

1. לך ל-Bitbucket → **Personal settings** → **App passwords**
2. ודא שיש לך App password ל-Netlify
3. אם לא - צור אחד חדש

---

## הגדרות מומלצות

### Build & Deploy Settings:

```
Build command: npm run build
Publish directory: .next
Base directory: (ריק)
```

### Branch Deploys:

- **Production branch:** `main` (או `master`)
- **Branch deploys:** `All` (אופציונלי - אם אתה רוצה deploy גם מ-branches אחרים)

### Deploy Notifications:

- אפשר להגדיר התראות ב-Email/Slack כשהאתר מתעדכן

---

## איך לבדוק שהכל עובד?

1. **עשה שינוי קטן** בקוד (למשל, הוסף הערה)
2. **עשה commit ו-push:**
   ```bash
   git add .
   git commit -m "Test: verify Netlify auto-deploy"
   git push
   ```
3. **לך ל-Netlify Dashboard** → **Deploys**
4. **תוך 30-60 שניות** תראה deploy חדש מתחיל!
5. **אם זה קורה - הכל עובד! ✅**

---

## טיפים נוספים

### בדיקת סטטוס מהיר:

- **Netlify Dashboard** → **Deploys** → תראה את ה-deploy האחרון
- אם יש ✅ ירוק - הכל תקין
- אם יש ❌ אדום - יש שגיאה (לחץ עליו לראות את הלוגים)

### Deploy Preview:

- Netlify יוצר **Preview URL** לכל commit
- זה מאפשר לך לראות את השינויים לפני שהם עולים ל-production

### Build Time:

- בדרך כלל build לוקח 2-3 דקות
- אם זה לוקח יותר מ-5 דקות - יש בעיה

---

## סיכום

**Netlify עושה pull אוטומטית אם:**

- ✅ Repository מחובר ב-Site settings
- ✅ Production branch מוגדר נכון (`main` או `master`)
- ✅ Deploy strategy = `Automatic`
- ✅ כל `git push` גורם ל-deploy חדש ב-Netlify

**אם זה לא עובד:**

1. בדוק את ה-Deploy logs
2. ודא שה-repository מחובר
3. נסה לעשות Manual deploy
4. אם עדיין לא עובד - שלח לי screenshot מה-Netlify Dashboard

---

**זה הכל! 🚀**
