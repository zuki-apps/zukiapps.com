'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Globe, ChevronDown } from 'lucide-react';
import { routing } from '@/routing';

const languageNames: Record<string, string> = {
  en: 'English',
  he: 'עברית',
  de: 'Deutsch',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  fr: 'Français',
  ja: '日本語',
  ko: '한국어',
  ar: 'العربية',
  zh: '中文'
};

const languageFlags: Record<string, string> = {
  en: '🇺🇸',
  he: '🇮🇱',
  de: '🇩🇪',
  es: '🇪🇸',
  it: '🇮🇹',
  pt: '🇵🇹',
  ru: '🇷🇺',
  fr: '🇫🇷',
  ja: '🇯🇵',
  ko: '🇰🇷',
  ar: '🇸🇦',
  zh: '🇨🇳'
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Remove locale from pathname to get the base path
  let pathnameWithoutLocale = pathname;
  
  // Check if pathname starts with any locale and remove it
  for (const loc of routing.locales) {
    if (pathname.startsWith(`/${loc}/`)) {
      pathnameWithoutLocale = pathname.slice(`/${loc}`.length);
      break;
    } else if (pathname === `/${loc}`) {
      pathnameWithoutLocale = '/';
      break;
    }
  }
  
  // Ensure pathnameWithoutLocale is not empty
  if (!pathnameWithoutLocale || pathnameWithoutLocale === '') {
    pathnameWithoutLocale = '/';
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    // Use a small delay to allow link clicks to register first
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block z-[9999]" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 hover:bg-gray-800 hover:border-blue-500/50 transition-colors shadow-lg backdrop-blur-sm"
        aria-label="Change language"
        type="button"
      >
        <Globe className="w-4 h-4 text-blue-400" />
        <span className="text-lg">{languageFlags[locale]}</span>
        <ChevronDown className={`w-4 h-4 text-blue-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-700 py-1 z-[9999] backdrop-blur-sm pointer-events-auto">
          {routing.locales.map((loc) => {
            // Build href based on locale prefix strategy
            let href: string;
            if (loc === routing.defaultLocale && routing.localePrefix === 'as-needed') {
              // Default locale with 'as-needed' - no locale prefix
              href = pathnameWithoutLocale;
            } else {
              // Other locales or different prefix strategy - include locale
              href = `/${loc}${pathnameWithoutLocale}`;
            }
            
            return (
              <Link
                key={loc}
                href={href}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors cursor-pointer ${
                  locale === loc
                    ? 'bg-blue-600/30 text-blue-400 font-medium border-l-2 border-blue-400'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{languageFlags[loc]}</span>
                <span>{languageNames[loc]}</span>
                {locale === loc && (
                  <span className="ml-auto text-blue-400">✓</span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

