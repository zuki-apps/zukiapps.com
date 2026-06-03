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

export default function StarField() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 48 }).map(() => ({
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

  if (!stars.length) return null;

  return (
    <>
      {stars.map((star, i) => (
        <div
          key={i}
          className={`absolute rounded-full animate-pulse ${
            i % 3 === 0 ? 'bg-amber-100/90' : i % 3 === 1 ? 'bg-violet-200/80' : 'bg-sky-100/70'
          }`}
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
