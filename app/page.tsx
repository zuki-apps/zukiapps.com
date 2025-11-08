'use client';

import Link from 'next/link';
import { ShoppingCart, Mail, Github, Linkedin, Sparkles, Users, Wifi, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Zuki Apps
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              מפתח אפליקציות מישראל
            </p>
            <p className="text-lg text-gray-600">
              כתחביב, עם אהבה לטכנולוגיה ויצירתיות
            </p>
          </div>

          {/* Story Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-right">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">הסיפור שלי</h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                בעבר, בין השנים 2012-2016, פיתחתי אפליקציות תחת השם <strong className="text-blue-600">dreamBit</strong>.
              </p>
              <p>
                לאחר הפסקה ארוכה, חזרתי לעסוק בתחביב שאני אוהב - פיתוח אפליקציות מובייל.
              </p>
              <p>
                כיום, אני מפתח אפליקציות חכמות ונוחות שיכולות לעזור לאנשים בחיי היומיום.
              </p>
            </div>
          </div>

          {/* Zuli Monsters Section */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Zuli Monsters</h2>
            <p className="text-lg text-gray-700 mb-4">
              ציורים מקוריים שאני קורא להם Zuli Monsters
            </p>
            <p className="text-gray-600 italic">
              עוד נשמע עליהם...
            </p>
          </div>

          {/* ZuList App Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <div className="flex items-center justify-center mb-6">
              <ShoppingCart className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">ZuList</h2>
            <p className="text-xl text-gray-700 mb-6">
              האפליקציה הראשונה שלי - לניהול רשימות קניות בצורה חכמה
            </p>
            <p className="text-lg text-gray-600 mb-8">
              אפליקציה מבוססת Flutter עם שיתוף בזמן אמת, תמיכה במצב offline והמלצות מוצרים חכמות.
              עולה בימים אלו!
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-xl">
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-sm font-semibold text-gray-700">שיתוף בזמן אמת</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-xl">
                <Wifi className="w-8 h-8 text-green-600 mb-2" />
                <p className="text-sm font-semibold text-gray-700">עובד Offline</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-purple-50 rounded-xl">
                <Sparkles className="w-8 h-8 text-purple-600 mb-2" />
                <p className="text-sm font-semibold text-gray-700">המלצות חכמות</p>
              </div>
            </div>

            <Link
              href="/zulist"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              למידע נוסף על ZuList →
            </Link>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              <Mail className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">יצירת קשר</h2>
            <p className="text-lg text-gray-700 mb-6">
              יש לך שאלה, רעיון או פשוט רוצה ליצור קשר?
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="mailto:zuki.apps.dev@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
                שלח אימייל
              </a>
            </div>
            <p className="mt-6 text-gray-600">
              zuki.apps.dev@gmail.com
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-2">© 2025 Zuki Apps - כל הזכויות שמורות</p>
          <p className="text-sm text-gray-500">
            מפתח מישראל • כתחביב • עם אהבה
          </p>
        </div>
      </footer>
    </div>
  );
}
