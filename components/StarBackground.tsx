'use client';

import { useState, useEffect } from 'react';

interface Star {
  left: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
  animationDelay: number;
  animationDuration: number;
}

export default function StarBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 60 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        width: Math.random() * 3 + 1,
        height: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        animationDelay: Math.random() * 3,
        animationDuration: Math.random() * 2 + 2,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 twilight-sky-overlay" />
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-pulse"
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
