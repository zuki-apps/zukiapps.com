# בדיקה: האם יש לך 2 Repositories?

## איך לבדוק:

### 1. בדוק ב-Bitbucket Dashboard:

1. לך ל-**Repositories** בתפריט העליון
2. חפש את **"ZukiApps.com"** (או "zukiapps.com")
3. בדוק אם יש 2 repositories:
   - אחד עם 🔒 (Private)
   - אחד עם 🌐 (Public)

### 2. בדוק את ה-Git Remote:

```bash
git remote -v
```

זה יראה לך לאיזה repository אתה מחובר.

### 3. בדוק ב-Netlify:

1. **Site settings** → **Build & deploy** → **Continuous Deployment**
2. בדוק איזה repository מחובר
3. בדוק אם יש 2 sites שונים

---

## אם יש 2 Repositories:

### אפשרות 1: Fork או Duplicate

- אולי יצרת repository חדש בטעות
- או עשית fork לעצמך

**פתרון:**

1. מחק את ה-repository הישן (או החדש - תלוי איזה אתה רוצה לשמור)
2. ודא ש-Netlify מחובר ל-repository הנכון

### אפשרות 2: Repository עם שם דומה

- אולי יש "ZukiApps.com" ו-"zukiapps.com" (case sensitive)
- או "ZukiApps" ו-"ZukiApps.com"

**פתרון:**

1. בדוק את כל ה-repositories שלך
2. ודא שאתה עובד עם הנכון

### אפשרות 3: Repository ב-2 Projects שונים

- אולי יש repository ב-Project "Windows" (Private)
- ו-repository אחר ב-Project אחר (Public)

**פתרון:**

1. בדוק את ה-Project של כל repository
2. ודא שאתה עובד עם הנכון

---

## איך לזהות איזה Repository נכון:

### בדוק את ה-Git Remote:

```bash
git remote -v
```

זה יראה לך משהו כמו:

```
origin  https://bitbucket.org/zulior/zukiapps.com.git (fetch)
origin  https://bitbucket.org/zulior/zukiapps.com.git (push)
```

**זה ה-repository שאתה עובד איתו עכשיו!**

### בדוק ב-Netlify:

1. **Site settings** → **Build & deploy** → **Continuous Deployment**
2. תראה את ה-repository המחובר
3. ודא שזה אותו repository

---

## מה לעשות:

### אם יש 2 Repositories:

**אפשרות A: מחק את הישן**

1. לך ל-Bitbucket → ה-repository הישן
2. **Settings** → **Repository details** → **Delete repository**
3. ודא ש-Netlify מחובר ל-repository הנכון

**אפשרות B: שנה את ה-Git Remote**
אם אתה רוצה לעבוד עם repository אחר:

```bash
git remote set-url origin https://bitbucket.org/zulior/REPO_NAME.git
```

**אפשרות C: ודא ש-Netlify מחובר ל-N repository**

1. **Site settings** → **Build & deploy** → **Continuous Deployment**
2. אם זה לא נכון - לחץ **Unlink repository**
3. לחץ **Link repository** ובחר את ה-repository הנכון

---

## בדיקה מהירה:

1. **Bitbucket** → **Repositories** → חפש "ZukiApps"
2. **Git Bash** → `git remote -v` → בדוק את ה-URL
3. **Netlify** → **Site settings** → בדוק איזה repository מחובר

**אם כל השלושה מצביעים על אותו repository - הכל תקין! ✅**

---

## אם אתה לא בטוח:

**שלח לי:**

1. תוצאה של `git remote -v`
2. Screenshot מ-Bitbucket (רשימת repositories)
3. Screenshot מ-Netlify (Continuous Deployment settings)

ואני אעזור לך לזהות מה קורה! 🔍

---

**זה הכל! 🚀**
