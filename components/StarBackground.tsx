import { STAR_FIELD_SPECS } from '@/lib/starFieldStars';

/** Twilight sky + deterministic stars (SSR-safe, no hydration flash). */
export default function StarBackground() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 twilight-sky-overlay" />
      {STAR_FIELD_SPECS.map((star, i) => (
        <div
          key={i}
          className={`absolute rounded-full animate-pulse motion-reduce:animate-none ${star.colorClass}`}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.width}px`,
            height: `${star.height}px`,
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`,
            animationDuration: `${star.animationDuration}s`,
          }}
        />
      ))}
    </div>
  );
}
