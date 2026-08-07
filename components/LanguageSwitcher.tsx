'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
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
  zh: '中文',
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
  zh: '🇨🇳',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  let pathnameWithoutLocale = pathname;
  for (const loc of routing.locales) {
    if (pathname.startsWith(`/${loc}/`)) {
      pathnameWithoutLocale = pathname.slice(`/${loc}`.length);
      break;
    }
    if (pathname === `/${loc}`) {
      pathnameWithoutLocale = '/';
      break;
    }
  }
  if (!pathnameWithoutLocale) pathnameWithoutLocale = '/';

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block z-[9999]" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 hover:bg-gray-800 hover:border-blue-500/50 transition-colors shadow-lg backdrop-blur-sm"
        aria-label={t('changeLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listId}
        type="button"
      >
        <Globe className="w-4 h-4 text-blue-400" aria-hidden />
        <span className="text-lg" aria-hidden>
          {languageFlags[locale]}
        </span>
        <span className="sr-only">
          {t('currentLanguage')}: {languageNames[locale]}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-blue-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {isOpen && (
        <ul
          id={listId}
          role="listbox"
          aria-label={t('changeLanguage')}
          className="absolute start-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-700 py-1 z-[9999] backdrop-blur-sm pointer-events-auto"
        >
          {routing.locales.map((loc) => {
            let href: string;
            if (loc === routing.defaultLocale && routing.localePrefix === 'as-needed') {
              href = pathnameWithoutLocale;
            } else {
              href = `/${loc}${pathnameWithoutLocale}`;
            }
            const selected = locale === loc;

            return (
              <li key={loc} role="option" aria-selected={selected}>
                <Link
                  href={href}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors cursor-pointer ${
                    selected
                      ? 'bg-blue-600/30 text-blue-400 font-medium border-s-2 border-blue-400'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="text-xl" aria-hidden>
                    {languageFlags[loc]}
                  </span>
                  <span>{languageNames[loc]}</span>
                  {selected && (
                    <span className="ms-auto text-blue-400" aria-hidden>
                      ✓
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
