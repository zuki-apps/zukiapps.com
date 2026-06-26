import { STAR_FIELD_SPECS } from '@/lib/starFieldStars';

export default function StarField() {
  return (
    <>
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
    </>
  );
}
