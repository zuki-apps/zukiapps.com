'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

function InviteContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const invitationId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listName, setListName] = useState<string>(searchParams.get('listName') || 'רשימה');

  useEffect(() => {
    // Try to open the app immediately
    const openApp = () => {
      const appUrl = `zulist://invite?id=${invitationId}`;
      
      // Try multiple methods to open the app
      try {
        window.location.href = appUrl;
      } catch (e) {
        console.log('Method 1 failed:', e);
      }

      // Create hidden iframe as fallback
      try {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = appUrl;
        document.body.appendChild(iframe);
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 2000);
      } catch (e) {
        console.log('Method 2 failed:', e);
      }

      // If app doesn't open within 3 seconds, show fallback
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };

    // Auto-try to open app when page loads
    setTimeout(openApp, 1000);
  }, [invitationId]);

  const handleOpenApp = () => {
    setLoading(true);
    const appUrl = `zulist://invite?id=${invitationId}`;
    
    try {
      window.location.href = appUrl;
    } catch (e) {
      console.error('Failed to open app:', e);
    }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-blue-50 rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-md w-full">
        <div className="w-24 h-24 mx-auto mb-6 bg-blue-600 rounded-2xl flex items-center justify-center">
          <ShoppingCart className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">הזמנה לרשימה</h1>
        <p className="text-gray-700 mb-2">הוזמנת להצטרף לרשימת קניות ב-ZuList!</p>
        {listName && (
          <p className="text-gray-600 mb-6">רשימה: <strong>{listName}</strong></p>
        )}
        <p className="text-gray-600 mb-8">לחץ על הכפתור למטה כדי לפתוח את האפליקציה:</p>
        
        {loading && (
          <div className="mb-6">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">פותח את האפליקציה...</p>
          </div>
        )}
        
        <button
          onClick={handleOpenApp}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl w-full"
        >
          {loading ? 'פותח...' : 'פתח את ZuList'}
        </button>
        
        <p className="mt-8 text-sm text-gray-500">
          אין לך את האפליקציה?<br />
          <a
            href="https://apps.apple.com/app/zulist"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            הורד מ-App Store
          </a>
        </p>
      </div>
    </div>
  );
}

export default function InvitePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">טוען...</p>
        </div>
      </div>
    }>
      <InviteContent />
    </Suspense>
  );
}

