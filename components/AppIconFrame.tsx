import Image from 'next/image';

export type AppIconFrameProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Outer dimensions, e.g. `w-24 h-24 md:w-32 md:h-32` */
  boxClassName: string;
  /** Rounded clip, shadow, ring, and dark backdrop (fills non-transparent margins) */
  frameClassName: string;
  /** Margin / layout on the frame, e.g. `mx-auto mb-6` */
  className?: string;
  /** When the frame sits inside a `group` (e.g. home grid link), subtle zoom on hover */
  withGroupHover?: boolean;
  /** Full-bleed store icon (no zoom crop, transparent frame) */
  edgeToEdge?: boolean;
};

/**
 * Store-style app icons: fills a rounded frame with a slight scale so opaque
 * PNGs (white margins) clip cleanly—no letterboxing or bright halos.
 */
export default function AppIconFrame({
  src,
  alt,
  sizes,
  priority,
  boxClassName,
  frameClassName,
  className = '',
  withGroupHover = false,
  edgeToEdge = false,
}: AppIconFrameProps) {
  const hover = withGroupHover ? 'motion-safe:group-hover:scale-[1.18]' : '';
  const imageFit = edgeToEdge
    ? 'object-contain object-center scale-100'
    : 'object-cover object-center scale-[1.12]';
  return (
    <div className={`relative ${boxClassName} ${frameClassName} ${className}`.trim()}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`${imageFit} motion-safe:transition-transform motion-safe:duration-300 ${hover}`.trim()}
      />
    </div>
  );
}
