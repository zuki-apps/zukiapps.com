'use client';

import { useEffect, useRef, useState } from 'react';
import lazyLoad from 'next/dynamic';

const AppsCarousel = lazyLoad(() => import('@/components/AppsCarousel'), {
  ssr: false,
  loading: () => (
    <div
      className="relative w-full mb-12 max-w-4xl mx-auto min-h-[200px] rounded-2xl border border-indigo-500/20 bg-indigo-950/30"
      aria-busy="true"
      aria-label="Loading apps carousel"
    />
  ),
});

/** Load the heavy carousel only when it nears the viewport so it does not compete with LCP. */
export default function DeferredAppsCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || ready) return;
    const reveal = () => setReady(true);
    if (!('IntersectionObserver' in window)) {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin: '240px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [ready]);

  return (
    <div ref={ref}>
      {ready ? (
        <AppsCarousel />
      ) : (
        <div
          className="relative w-full mb-12 max-w-4xl mx-auto min-h-[200px] rounded-2xl border border-indigo-500/20 bg-indigo-950/30"
          aria-hidden
        />
      )}
    </div>
  );
}
