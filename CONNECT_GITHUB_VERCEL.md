# 🔗 חיבור Vercel ל-GitHub - מדריך שלב אחר שלב

## שלב 1: ודא שהקוד ב-GitHub

### אם עדיין לא דחפת את הקוד:

1. **פתח Terminal/PowerShell בתיקיית הפרויקט:**
   ```bash
   cd F:\GIT\Zuki.Apps
   ```

2. **אם אין Git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Zuki Apps website"
   ```

3. **צור Repository ב-GitHub:**
   - לך ל-[github.com](https://github.com)
   - לחץ על **"+"** → **"New repository"**
   - שם: `zuki-apps-website` (או איך שתרצה)
   - בחר **Public** או **Private**
   - **אל תסמן** "Add a README file" (כי יש לך כבר)
   - לחץ **"Create repository"**

4. **דחוף את הקוד:**
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/zuki-apps-website.git
   git push -u origin main
   ```
   
   **החלף `YOUR_USERNAME` בשם המשתמש שלך ב-GitHub**

### אם כבר יש לך Repository:
```bash
git add .
git commit -m "Update website"
git push
```

---

## שלב 2: חבר את Vercel ל-GitHub

### דרך 1: דרך ה-Project Settings (אם יש לך כבר פרויקט):

1. **ב-Vercel Dashboard:**
   - לך לפרויקט שלך
   - לחץ על **"Settings"** (בתפריט העליון)
   - לחץ על **"Git"** (בתפריט הצד)

2. **חבר את ה-Repository:**
   - אם אין חיבור, תראה **"Connect Git Repository"**
   - לחץ על **"Connect Git Repository"**
   - בחר **"GitHub"**
   - Vercel יבקש הרשאות → לחץ **"Authorize Vercel"**
   - בחר את ה-Repository: `zuki-apps-website`
   - לחץ **"Import"**

### דרך 2: דרך "Add New Project" (אם אין לך פרויקט):

1. **ב-Vercel Dashboard:**
   - לחץ על **"Add New..."** → **"Project"**
   - או **"Import Project"**

2. **בחר את ה-Repository:**
   - Vercel יציג לך את כל ה-repositories שלך מ-GitHub
   - מצא את `zuki-apps-website`
   - לחץ על **"Import"**

3. **הגדרות הפרויקט:**
   - **Framework Preset:** Next.js (Vercel יזהה אוטומטית) ✅
   - **Root Directory:** השאר ריק (או `./`)
   - **Build Command:** `npm run build` (אוטומטי)
   - **Output Directory:** `.next` (אוטומטי)
   - **Install Command:** `npm install` (אוטומטי)

4. **Environment Variables:**
   - כרגע אין צורך
   - לחץ **"Deploy"**

---

## שלב 3: Deploy

1. **Vercel יתחיל לבנות:**
   - זה יקח 1-2 דקות
   - תראה את ה-logs בזמן אמת

2. **אחרי שה-Deploy מסתיים:**
   - תקבל URL זמני: `zuki-apps-website-abc123.vercel.app`
   - לחץ עליו כדי לראות את האתר

3. **Production Deployment:**
   - כל push ל-`main` branch יעשה deploy אוטומטי לייצור
   - Vercel יקשר את זה אוטומטית לדומיין שלך

---

## שלב 4: ודא ש-Production Deployment קיים

1. **ב-Vercel Dashboard:**
   - לך לפרויקט
   - לך לטאב **"Deployments"**
   - תראה את ה-Deployments שלך

2. **אם יש Deployment:**
   - ודא שהוא מסומן כ-**"Production"** (יש לו ✅ ירוק)
   - אם לא, לחץ עליו → **"Promote to Production"**

3. **אם אין Deployment:**
   - דחוף קוד ל-GitHub:
     ```bash
     git push
     ```
   - Vercel יעשה deploy אוטומטי

---

## מה קורה אחר כך?

### Deployments אוטומטיים:
- כל פעם שתדחוף קוד ל-GitHub → Vercel יעשה deploy אוטומטי
- כל commit יקבל preview URL
- Production deployment יעדכן אוטומטית

### Branch Deployments:
- כל branch חדש יקבל preview URL
- רק `main` branch יעשה deploy לייצור

---

## בדיקה:

1. **בדוק את ה-Deployment:**
   - Vercel Dashboard → Deployments
   - צריך להיות deployment עם ✅ ירוק

2. **בדוק את הדומיין:**
   - Settings → Domains
   - `zukiapps.com` צריך להיות ✅ ירוק
   - `www.zukiapps.com` צריך להיות ✅ ירוק

3. **בדוק את האתר:**
   - `https://zukiapps.com` - צריך לעבוד!
   - `https://www.zukiapps.com` - צריך לעבוד!

---

## בעיות נפוצות:

### "Repository not found"
- ודא שהחיבור ל-GitHub עובד
- ודא שיש לך הרשאות ל-Repository

### "Build failed"
- בדוק את ה-logs ב-Vercel
- ודא ש-`package.json` נכון
- ודא שכל הקבצים נדחפו ל-GitHub

### "No deployment"
- דחוף קוד ל-GitHub:
  ```bash
  git push
  ```
- Vercel יעשה deploy אוטומטי

---

**אחרי שתחבר את GitHub, Vercel יעשה deploy אוטומטי והאתר יעבוד! 🚀**

