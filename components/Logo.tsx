import Image from 'next/image';

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

const LOGO_SRC_WIDTH = 1024;
const LOGO_SRC_HEIGHT = 1024;

export default function Logo({ className = '', size = 'lg', href }: LogoProps) {
  const maxPx = sizeMap[size];

  const imageEl = (
    <Image
      src="/logo.png"
      alt="Zuki Apps Logo"
      width={LOGO_SRC_WIDTH}
      height={LOGO_SRC_HEIGHT}
      sizes={`${maxPx}px`}
      priority
      className={`block h-auto w-auto max-w-full border-0 bg-transparent p-0 shadow-none outline-none ring-0 rounded-none ${className}`.trim()}
      style={{ maxWidth: maxPx, border: 0, outline: 'none' }}
    />
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
