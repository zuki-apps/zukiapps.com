# איך להחליף Repository ב-Netlify

## שלב 1: לך ל-Site Settings

1. לך ל-**Netlify Dashboard**: https://app.netlify.com
2. בחר את האתר שלך (`zukiapps.com` או השם שלו)
3. בתפריט השמאלי, לחץ על **Site settings**

## שלב 2: לך ל-Build & Deploy

1. בתפריט השמאלי, תחת **Build & deploy**, לחץ על **Continuous Deployment**
2. תראה את ה-repository המחובר כרגע

## שלב 3: Unlink את ה-Repository הישן

1. תחת **"Connected repository"**, תראה את ה-repository הנוכחי
2. לחץ על **"Unlink repository"** (או **"Disconnect"**)
3. Netlify יבקש ממך לאשר - לחץ **"Unlink"** או **"Confirm"**

## שלב 4: Link את ה-Repository החדש

1. אחרי ש-unlink, תראה כפתור **"Link repository"** (או **"Connect to Git provider"**)
2. לחץ עליו
3. בחר את ה-Git provider שלך:
   - **Bitbucket** (אם זה Bitbucket)
   - **GitHub** (אם זה GitHub)
   - **GitLab** (אם זה GitLab)
4. אם צריך - התחבר עם החשבון שלך
5. בחר את ה-repository שאתה רוצה:
   - חפש **"zukiapps.com"** (או השם של ה-repository)
   - בחר את ה-repository הנכון (הזה ש-Public, אם יש 2)
6. לחץ **"Save"** או **"Connect"**

## שלב 5: ודא את ההגדרות

1. אחרי ש-link, Netlify יראה את ההגדרות:
   - **Production branch:** `main` (או `master`)
   - **Build command:** `npm run build` (אוטומטי)
   - **Publish directory:** `.next` (אוטומטי)
2. ודא שהכל נכון
3. לחץ **"Save"**

## שלב 6: Trigger Deploy

1. עכשיו לחץ על **"Trigger deploy"** → **"Clear cache and deploy site"**
2. Netlify יתחיל לבנות את האתר מה-repository החדש
3. זה יקח 2-3 דקות

---

## אם יש לך 2 Repositories:

### איך לזהות איזה Repository נכון:

**בדוק ב-Bitbucket:**

1. לך ל-**Repositories**
2. מצא את **"zukiapps.com"**
3. בדוק איזה מהם:
   - 🌐 Public (זה מה שאתה רוצה!)
   - 🔒 Private (זה לא יעבוד עם Netlify Free)

**בדוק את ה-URL:**

- Public: `https://bitbucket.org/zulior/zukiapps.com`
- Private: `https://bitbucket.org/zulior/zukiapps.com` (אבל עם 🔒)

**בחר את ה-Public repository! ✅**

---

## אם אתה לא רואה את ה-Repository ברשימה:

### אפשרות 1: Repository לא Public

- ודא שה-repository הוא Public
- Netlify Free יכול לראות רק Public repositories

### אפשרות 2: לא מחובר ל-Bitbucket

- ודא שהתחברת עם החשבון הנכון
- אולי צריך להרשות ל-Netlify גישה ל-Bitbucket

### אפשרות 3: Repository ב-Project אחר

- ודא שאתה בוחר את ה-repository הנכון
- אולי יש 2 repositories עם שמות דומים

---

## איך לבדוק שהכל עבד:

1. **Deploys** → תראה deploy חדש מתחיל
2. ה-Trigger צריך להיות **"git push"** (לא "Manual deploy")
3. ה-Repository צריך להיות זה ש-Public
4. אחרי כמה דקות - האתר אמור לעבוד! ✅

---

## טיפים:

### אם יש שגיאה:

1. בדוק את ה-**Deploy logs**
2. ודא שה-repository הוא Public
3. ודא שה-Build command נכון: `npm run build`
4. ודא שה-Publish directory נכון: `.next`

### אם זה עדיין לא עובד:

1. **Site settings** → **Build & deploy** → **Continuous Deployment**
2. לחץ **"Unlink repository"** שוב
3. לחץ **"Link repository"** מחדש
4. בחר את ה-repository הנכון
5. שמור

---

## סיכום:

1. **Site settings** → **Build & deploy** → **Continuous Deployment**
2. **Unlink repository** (את הישן)
3. **Link repository** (את החדש - Public!)
4. בחר את ה-repository הנכון
5. **Save**
6. **Trigger deploy** → **Clear cache and deploy site**

**זה הכל! 🚀**
