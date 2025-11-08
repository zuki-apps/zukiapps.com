# איך לבדוק אם Repository הוא Public או Private

## דרך 1: בדיקה ב-Bitbucket (הכי פשוט) ✅

1. לך ל: **https://bitbucket.org/zulior/zukiapps.com**
2. אם אתה רואה את ה-repository **בלי להתחבר** - הוא Public ✅
3. אם הוא מבקש ממך להתחבר - הוא Private 🔒

---

## דרך 2: בדיקה דרך ה-URL

**Public Repository:**
- URL: `https://bitbucket.org/zulior/zukiapps.com`
- כל אחד יכול לגשת בלי להתחבר

**Private Repository:**
- URL: `https://bitbucket.org/zulior/zukiapps.com`
- רק בעלים/contributors יכולים לגשת

---

## דרך 3: בדיקה ב-Bitbucket Dashboard

1. לך ל-**Repositories** בתפריט
2. מצא את **"zukiapps.com"**
3. בדוק את האיקון:
   - 🔒 = Private
   - 🌐 = Public (או אין איקון)

---

## דרך 4: בדיקה דרך Repository Settings

1. **Repository settings** → **Repository details**
2. תחת **"Access level"**:
   - ✅ "This is a private repository" מסומן = Private 🔒
   - ❌ "This is a private repository" לא מסומן = Public 🌐

---

## בדיקה מהירה עכשיו:

**נסה לפתוח את זה בדפדפן חדש (Incognito/Private):**
```
https://bitbucket.org/zulior/zukiapps.com
```

**אם אתה רואה את ה-repository:**
- ✅ הוא Public!

**אם הוא מבקש ממך להתחבר:**
- 🔒 הוא עדיין Private

---

## מה לעשות אם הוא עדיין Private:

1. **Repository settings** → **Repository details**
2. אם השדה לא פעיל - שנה את ה-Project ל-Public קודם
3. אחר כך בטל את הסימון מ-"This is a private repository"
4. שמור

---

## בדיקה דרך Netlify:

אם Netlify מצליח לעשות build:
- ✅ כנראה שהוא Public (או שיש לך Netlify Pro)

אם Netlify נכשל עם "unrecognized Git contributor":
- 🔒 הוא עדיין Private

---

**נסה לפתוח את ה-URL בדפדפן חדש ותגיד לי מה אתה רואה! 🔍**

