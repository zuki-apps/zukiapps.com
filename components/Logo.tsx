'use client';

/**
 * Site mark: `/logo.png` (transparent). Shaped by the asset—no wrapper box.
 * `unoptimized` serves the file as-is so the `/_next/image` pipeline does not
 * resample alpha edges (often reads as a thin “border” on transparent logos).
 */
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
}

const sizeMap = {
  sm: 120,
  md: 200,
  lg: 300,
  xl: 400,
};

/** Intrinsic canvas of `public/logo.png` (aspect ratio for layout). */
const LOGO_SRC_WIDTH = 1024;
const LOGO_SRC_HEIGHT = 1024;

export default function Logo({ className = '', size = 'lg', href }: LogoProps) {
  const [logoSrc, setLogoSrc] = useState('/logo.png');
  const [imageError, setImageError] = useState(false);
  const maxPx = sizeMap[size];

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setLogoSrc('/logo.png');
    img.onerror = () => setLogoSrc('/logo.svg');
    img.src = '/logo.png';
  }, []);

  const imageEl = !imageError ? (
    <Image
      src={logoSrc}
      alt="Zuki Apps Logo"
      width={LOGO_SRC_WIDTH}
      height={LOGO_SRC_HEIGHT}
      sizes={`${maxPx}px`}
      priority
      unoptimized
      className={`block h-auto w-auto max-w-full border-0 bg-transparent p-0 shadow-none outline-none ring-0 rounded-none ${className}`.trim()}
      style={{ maxWidth: maxPx, border: 0, outline: 'none' }}
      onError={() => setImageError(true)}
    />
  ) : (
    <div
      className="flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-full border-4 border-blue-600 text-blue-600 font-black"
      style={{ width: maxPx, height: maxPx }}
    >
      <div className="text-center">
        <div className="text-4xl mb-2">ZA</div>
        <div className="text-xs">ZUKi APPS</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block bg-transparent">
        {imageEl}
      </a>
    );
  }

  return imageEl;
}
