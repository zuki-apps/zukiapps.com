'use client';

import Link from 'next/link';
import { ShoppingCart, ArrowLeft, Users, Wifi, Sparkles, Globe, Database, UserCircle, FolderTree, Download, Shield, FileText, Mail, ExternalLink, Bell, Layout, Crown, Image as ImageIcon, BarChart3, Moon, Smartphone, Lock, CheckCircle2, Video, Instagram, Facebook } from 'lucide-react';

export default function ZuListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          חזרה לדף הבית
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-blue-600" />
          </div>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <CheckCircle2 className="w-4 h-4" />
            Production Ready - גרסה 1.0.0
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ZuList
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-700 max-w-3xl mx-auto">
            רשימות קניות חכמות למשפחות
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            האפליקציה המושלמת למשפחות וחברים שקונים יחד. צרו, שתפו ונהלו רשימות קניות בזמן אמת עם שיתוף פעולה חלק.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            תכונות עיקריות
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real-time Collaboration */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                שיתוף פעולה בזמן אמת
              </h3>
              <p className="text-gray-600 mb-4">
                שתף רשימות עם משפחה וחברים, ראה שינויים מיידית בכל המכשירים
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• ניהול חברים והרשאות</li>
                <li>• הזמנות דרך אימייל, SMS, WhatsApp</li>
                <li>• קישורי שיתוף</li>
                <li>• התראות Push בזמן אמת</li>
              </ul>
            </div>

            {/* Offline Support */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Wifi className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                תמיכה במצב לא מקוון
              </h3>
              <p className="text-gray-600 mb-4">
                עובד בצורה חלקה גם ללא חיבור לאינטרנט
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• סינכרון אוטומטי כשחוזרים לאינטרנט</li>
                <li>• לעולם לא תאבדו את הנתונים</li>
                <li>• גיבוי בענן (Premium)</li>
              </ul>
            </div>

            {/* Smart Suggestions */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                המלצות חכמות
              </h3>
              <p className="text-gray-600 mb-4">
                המלצות מבוססות AI עם קטלוג מוצרים
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• השלמה אוטומטית חכמה</li>
                <li>• הצעות מותאמות אישית</li>
                <li>• למידה מהרגלי הקניות שלך</li>
              </ul>
            </div>

            {/* Smart Templates */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Layout className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                תבניות חכמות
              </h3>
              <p className="text-gray-600 mb-4">
                תבניות רשימת קניות מוכנות מראש
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• התחלה מהירה לקניות נפוצות</li>
                <li>• התאמה אישית של תבניות</li>
                <li>• 34+ תבניות מוכנות</li>
              </ul>
            </div>

            {/* Smart Notifications */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Bell className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                התראות חכמות
              </h3>
              <p className="text-gray-600 mb-4">
                קבל התראה כשנוספים פריטים או כשחברים מעדכנים
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• מצב שקט לקניות שקטות</li>
                <li>• ספירת תגים לעדכונים שלא נקראו</li>
                <li>• התראות Push בזמן אמת</li>
              </ul>
            </div>

            {/* Multi-language */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                תמיכה ב-6 שפות
              </h3>
              <p className="text-gray-600 mb-4">
                תמיכה מלאה ב-6 שפות עם ממשק מתורגם
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• 🇺🇸 English</li>
                <li>• 🇮🇱 Hebrew (עברית) - RTL מלא</li>
                <li>• 🇩🇪 German, 🇪🇸 Spanish</li>
                <li>• 🇮🇹 Italian, 🇵🇹 Portuguese</li>
              </ul>
            </div>

            {/* Category Management */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FolderTree className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                ניהול קטגוריות
              </h3>
              <p className="text-gray-600 mb-4">
                ארגן את הקניות שלך לפי קטגוריות ליעילות טובה יותר
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• קטגוריות מותאמות אישית</li>
                <li>• אייקונים מותאמים</li>
                <li>• ארגון אוטומטי</li>
              </ul>
            </div>

            {/* Custom Photos */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <ImageIcon className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                תמונות מותאמות אישית
              </h3>
              <p className="text-gray-600 mb-4">
                הוסף תמונות מותאמות אישית לפריטים
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• צילום ישיר מהאפליקציה</li>
                <li>• בחירה מהגלריה</li>
                <li>• אופטימיזציה אוטומטית</li>
              </ul>
            </div>

            {/* Purchase History */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                היסטוריית קניות
              </h3>
              <p className="text-gray-600 mb-4">
                עקוב אחר היסטוריית הקניות שלך
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• סטטיסטיקות מתקדמות (Premium)</li>
                <li>• מעקב אחר הרגלי קניות</li>
                <li>• דוחות מפורטים</li>
              </ul>
            </div>

            {/* Firebase Integration */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Database className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                אינטגרציה עם Firebase
              </h3>
              <p className="text-gray-600 mb-4">
                סנכרון ענן מאובטח עם Firebase
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Authentication, Realtime DB, Firestore</li>
                <li>• Storage, Functions, FCM</li>
                <li>• Deep linking</li>
              </ul>
            </div>

            {/* Security */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                פרטיות ואבטחה
              </h3>
              <p className="text-gray-600 mb-4">
                אימות מאובטח והגנה על הנתונים שלך
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• אימות מאובטח (Google, Apple)</li>
                <li>• הנתונים מוצפנים</li>
                <li>• שליטה מלאה על שיתוף</li>
                <li>• מחיקת חשבון מלאה</li>
              </ul>
            </div>

            {/* Beautiful UI */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Smartphone className="w-8 h-8 text-violet-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                יפה ואינטואיטיבי
              </h3>
              <p className="text-gray-600 mb-4">
                ממשק מודרני ונקי עם חוויית משתמש מעולה
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• דמויות Zuli Monsters לכיף</li>
                <li>• ערכות נושא מותאמות אישית</li>
                <li>• תמיכה במצב כהה</li>
                <li>• תמיכה מלאה ב-Accessibility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <div className="flex items-center justify-center mb-6">
              <Crown className="w-16 h-16 text-yellow-500" />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              תכונות Premium
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              שדרג ל-Premium ותהנה מתכונות מתקדמות ללא הגבלות
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8 text-right">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">תכונות Free</h3>
                <ul className="space-y-2 text-gray-700 text-right">
                  <li>• 5 רשימות מקסימום</li>
                  <li>• 150 פריטים לרשימה</li>
                  <li>• 1 חבר משותף לרשימה</li>
                  <li>• פרסומות Banner</li>
                  <li>• ללא סטטיסטיקות מתקדמות</li>
                  <li>• ללא ערכות נושא מותאמות</li>
                  <li>• ללא מצב אופליין</li>
                  <li>• ללא גיבוי ענן</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-purple-300">
                <h3 className="text-xl font-bold mb-4 text-gray-900">תכונות Premium</h3>
                <ul className="space-y-2 text-gray-700 text-right">
                  <li>• רשימות ללא הגבלה</li>
                  <li>• פריטים ללא הגבלה</li>
                  <li>• חברים ללא הגבלה</li>
                  <li>• חוויית שימוש ללא פרסומות</li>
                  <li>• סטטיסטיקות מתקדמות</li>
                  <li>• ערכות נושא מותאמות</li>
                  <li>• מצב אופליין</li>
                  <li>• גיבוי ענן</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-6 mb-6">
              <p className="text-2xl font-bold text-gray-900 mb-2">
                💰 חודשי: ₪7.50 | שנתי: ₪65.00
              </p>
              <p className="text-sm text-gray-600 mb-2">
                חיסכון של 25% במנוי שנתי
              </p>
              <p className="text-xs text-gray-500">
                גם: $2.00/month או €1.80/month | $18.00/year או €16.00/year
              </p>
            </div>

            {/* Rewarded Ads */}
            <div className="bg-yellow-50 rounded-xl p-6 mt-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Video className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-bold text-gray-900">Rewarded Ads</h3>
              </div>
              <p className="text-gray-700 mb-3">
                צפה בפרסומות וקבל גישה זמנית לתכונות Premium:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 text-right">
                <li>• הסרת פרסומות למשך 24 שעות</li>
                <li>• גישה לסטטיסטיקות למשך 24 שעות</li>
                <li>• 10 פריטים נוספים לרשימה</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              ✅ Production Ready
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              האפליקציה מוכנה לשימוש עם 521+ טסטים מקיפים
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-semibold text-gray-900">גרסה</p>
                <p>1.0.0+1</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">טסטים</p>
                <p>521+ טסטים</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">סטטוס</p>
                <p>מוכן לשחרור</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            זמין בקרוב
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            האפליקציה עולה בימים אלו לחנויות האפליקציות
          </p>
          <div className="flex gap-8 justify-center flex-wrap">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <span className="text-4xl mb-2 block">📱</span>
              <p className="font-semibold text-gray-700">App Store</p>
              <p className="text-sm text-gray-500">בקרוב</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <span className="text-4xl mb-2 block">📱</span>
              <p className="font-semibold text-gray-700">Google Play</p>
              <p className="text-sm text-gray-500">בקרוב</p>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            מושלם עבור
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">👨‍👩‍👧‍👦 משפחות שקונות יחד</h3>
              <p className="text-gray-600">שתפו רשימות עם כל המשפחה ותמיד תהיו מסונכרנים</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">🏠 שותפים לדירה</h3>
              <p className="text-gray-600">חלקו קניות עם שותפים לדירה בקלות</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">🎉 מארגני אירועים</h3>
              <p className="text-gray-600">תכננו אירועים עם חברים בצורה מאורגנת</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-3 text-gray-900">🛒 כל מי שרוצה קניות מאורגנות</h3>
              <p className="text-gray-600">הפכו את הקניות למאורגנות, משותפות וכיפיות</p>
            </div>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            קישורים חשובים
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="mailto:support@zulist.app"
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center gap-4 group border-2 border-gray-200"
            >
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-grow text-right">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  תמיכה טכנית
                </h3>
                <p className="text-gray-600 text-sm">
                  support@zulist.app
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </a>
            <a
              href="mailto:zuki.apps.dev@gmail.com"
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center gap-4 group border-2 border-gray-200"
            >
              <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-grow text-right">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  יצירת קשר כללי
                </h3>
                <p className="text-gray-600 text-sm">
                  zuki.apps.dev@gmail.com
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </a>
            <a
              href="https://zulist.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center gap-4 group border-2 border-gray-200"
            >
              <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-grow text-right">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  אתר רשמי
                </h3>
                <p className="text-gray-600 text-sm">
                  zulist.app
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
            </a>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-right">
                רשתות חברתיות
              </h3>
              <div className="flex gap-4 justify-end">
                <a
                  href="https://instagram.com/zuki.apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-100 p-3 rounded-lg hover:bg-pink-200 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 text-pink-600" />
                </a>
                <a
                  href="https://facebook.com/zuki.apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6 text-blue-600" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-2">© 2025 ZuList - כל הזכויות שמורות</p>
          <p className="text-sm text-gray-500">
            חלק מ-Zuki Apps • מפתח מישראל • פותח ב-❤️
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Bundle ID: com.zukiapps.zulist | גרסה: 1.0.0+1
          </p>
        </div>
      </footer>
    </div>
  );
}
