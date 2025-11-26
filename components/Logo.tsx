'use client';

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

export default function Logo({ className = '', size = 'lg', href }: LogoProps) {
  const [logoSrc, setLogoSrc] = useState('/logo.png');
  const [imageError, setImageError] = useState(false);
  const logoSize = sizeMap[size];

  useEffect(() => {
    // Check if PNG exists, if not use SVG
    const img = new window.Image();
    img.onload = () => setLogoSrc('/logo.png');
    img.onerror = () => setLogoSrc('/logo.svg');
    img.src = '/logo.png';
  }, []);

  const logoContent = (
    <div className={`relative ${className}`} style={{ width: logoSize, height: logoSize }}>
      {!imageError ? (
        <Image
          src={logoSrc}
          alt="Zuki Apps Logo"
          width={logoSize}
          height={logoSize}
          className="object-contain"
          priority
          style={{ background: 'transparent' }}
          onError={() => setImageError(true)}
        />
      ) : (
        <div 
          className="flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-full border-4 border-blue-600 text-blue-600 font-black"
          style={{ width: logoSize, height: logoSize }}
        >
          <div className="text-center">
            <div className="text-4xl mb-2">ZA</div>
            <div className="text-xs">ZUKi APPS</div>
          </div>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {logoContent}
      </a>
    );
  }

  return logoContent;
}

