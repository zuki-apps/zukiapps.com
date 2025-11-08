'use client';

import Link from 'next/link';
import { ShoppingCart, ArrowLeft, Users, Wifi, Sparkles, Globe, Database, UserCircle, FolderTree, Download, Shield, FileText, Mail, ExternalLink } from 'lucide-react';

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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ZuList
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-700 max-w-3xl mx-auto">
            אפליקציית רשימת קניות חכמה
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            אפליקציה מבוססת Flutter עם שיתוף בזמן אמת, תמיכה במצב offline והמלצות מוצרים חכמות.
            עולה בימים אלו!
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
                שיתוף בזמן אמת
              </h3>
              <p className="text-gray-600">
                שתף רשימות עם משפחה וחברים, ראה עדכונים מיידית בזמן אמת
              </p>
            </div>

            {/* Offline Support */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Wifi className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                תמיכה Offline
              </h3>
              <p className="text-gray-600">
                עובד בצורה חלקה גם ללא חיבור לאינטרנט, מסנכרן כשאתה חוזר לרשת
              </p>
            </div>

            {/* Smart Suggestions */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                המלצות חכמות
              </h3>
              <p className="text-gray-600">
                המלצות מבוססות AI שעוזרות לך למצוא מוצרים מהר יותר
              </p>
            </div>

            {/* Multi-language */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                תמיכה רב-לשונית
              </h3>
              <p className="text-gray-600">
                זמין באנגלית ובעברית עם תמיכה מלאה ב-RTL
              </p>
            </div>

            {/* Firebase Integration */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Database className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                אינטגרציה עם Firebase
              </h3>
              <p className="text-gray-600">
                סנכרון ענן מאובטח עם Firebase לאחסון נתונים אמין
              </p>
            </div>

            {/* Profile Management */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <UserCircle className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                ניהול פרופיל
              </h3>
              <p className="text-gray-600">
                תמונות פרופיל מותאמות וניהול משתמשים
              </p>
            </div>

            {/* Category Management */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FolderTree className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                ניהול קטגוריות
              </h3>
              <p className="text-gray-600">
                ארגן את הקניות שלך לפי קטגוריות ליעילות טובה יותר
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            זמין בקרוב
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            האפליקציה עולה בימים אלו לחנויות האפליקציות
          </p>
          <div className="flex gap-8 justify-center flex-wrap">
            <div className="bg-gray-100 rounded-xl p-6 opacity-75">
              <span className="text-4xl mb-2 block">📱</span>
              <p className="font-semibold text-gray-700">App Store</p>
              <p className="text-sm text-gray-500">בקרוב</p>
            </div>
            <div className="bg-gray-100 rounded-xl p-6 opacity-75">
              <span className="text-4xl mb-2 block">📱</span>
              <p className="font-semibold text-gray-700">Google Play</p>
              <p className="text-sm text-gray-500">בקרוב</p>
            </div>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            קישורים חשובים
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="mailto:zuki.apps.dev@gmail.com"
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center gap-4 group"
            >
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  יצירת קשר
                </h3>
                <p className="text-gray-600 text-sm">
                  zuki.apps.dev@gmail.com
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-2">© 2025 ZuList - כל הזכויות שמורות</p>
          <p className="text-sm text-gray-500">
            חלק מ-Zuki Apps • מפתח מישראל
          </p>
        </div>
      </footer>
    </div>
  );
}

