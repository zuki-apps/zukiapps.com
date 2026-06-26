import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  priority?: boolean;
}

const sizeMap = {
  sm: 120,
  md: 200,
  lg: 300,
  xl: 400,
};

export default function Logo({ className = '', size = 'lg', href, priority = false }: LogoProps) {
  const maxPx = sizeMap[size];

  const imageEl = (
    <Image
      src="/logo.webp"
      alt="Zuki Apps Logo"
      width={370}
      height={370}
      sizes={`(max-width: 640px) ${Math.min(maxPx, 200)}px, ${maxPx}px`}
      quality={80}
      priority={priority}
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
