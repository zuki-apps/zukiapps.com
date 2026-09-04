import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  priority?: boolean;
}

const sizeMap = {
  sm: 120,
  md: 160,
  lg: 148,
  xl: 180,
};

export default function Logo({ className = '', size = 'lg', href, priority = false }: LogoProps) {
  const maxPx = sizeMap[size];

  const imageEl = (
    <Image
      src="/logo.webp"
      alt="Zuki Apps"
      width={maxPx}
      height={maxPx}
      sizes={`${maxPx}px`}
      quality={80}
      priority={priority}
      className={`block border-0 bg-transparent p-0 shadow-none outline-none ring-0 rounded-none ${className}`.trim()}
      style={{ width: maxPx, height: maxPx, border: 0, outline: 'none' }}
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
