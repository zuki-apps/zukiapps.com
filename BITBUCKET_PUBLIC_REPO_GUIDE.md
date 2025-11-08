# איך להפוך Repository ל-Public ב-Bitbucket (כשה-Project הוא Private)

## הבעיה:
השדה "This is a private repository" לא פעיל כי ה-Project עצמו הוא Private.

## פתרון 1: שנה את ה-Project ל-Public (הכי פשוט) ✅

### שלב 1: לך ל-Project Settings
1. לחץ על **"Windows"** (ה-Project שלך) בתפריט השמאלי
2. או: **Settings** → **Projects** → **Windows**

### שלב 2: שנה את ה-Access Level
1. תחת **"Access level"** או **"Project visibility"**
2. שנה מ-**Private** ל-**Public**
3. לחץ **Save**

### שלב 3: חזור ל-Repository
1. עכשיו לך ל-**Repository settings** → **Repository details**
2. השדה **"This is a private repository"** אמור להיות פעיל עכשיו
3. בטל את הסימון
4. לחץ **Save**

**זה הכל! ✅**

---

## פתרון 2: העבר את ה-Repository ל-Project אחר

### שלב 1: צור Project חדש (Public)
1. **Settings** → **Projects** → **Create project**
2. שם: `ZukiApps` (או כל שם אחר)
3. Access level: **Public**
4. לחץ **Create**

### שלב 2: העבר את ה-Repository
1. **Repository settings** → **General**
2. תחת **Project**, בחר את ה-Project החדש
3. לחץ **Save**

### שלב 3: שנה את ה-Repository ל-Public
1. עכשיו השדה **"This is a private repository"** אמור להיות פעיל
2. בטל את הסימון
3. לחץ **Save**

---

## פתרון 3: אם אתה לא רוצה לשנות את ה-Project

**אפשרות A: שדרג ל-Netlify Pro**
- Netlify Pro ($19/month) מאפשר unlimited contributors ב-private repos
- זה יפתור את הבעיה בלי לשנות את ה-Project

**אפשרות B: השתמש ב-GitHub במקום**
- GitHub Free מאפשר private repos עם unlimited contributors
- אבל זה דורש העברה של הקוד

---

## המלצה שלי:

**שנה את ה-Project ל-Public** - זה הפתרון הכי פשוט:
- ✅ זה חינמי
- ✅ זה יעבוד מיד
- ✅ אין סיבה אמיתית לשמור את זה private (זה אתר landing page)

**אם אתה מודאג:**
- רק ה-Project וה-Repository יהיו public
- זה לא משפיע על repositories אחרים ב-Workspace שלך
- אתה יכול ליצור Project חדש רק ל-repositories שצריכים להיות public

---

## איך לבדוק שזה עבד:

1. אחרי שתשמור, לך ל-Repository
2. בדוק שהאיקון 🔒 נעלם (או שהאיקון 🌐 מופיע)
3. לך ל-Netlify Dashboard → **Trigger deploy**
4. זה אמור לעבוד עכשיו! ✅

---

**זה הכל! 🚀**

