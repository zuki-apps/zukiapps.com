export type StarSpec = {
  left: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
  animationDelay: number;
  animationDuration: number;
  colorClass: string;
};

function seededUnit(seed: number): number {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** Deterministic star positions — SSR-safe (no client random / layout shift). */
export const STAR_FIELD_SPECS: StarSpec[] = Array.from({ length: 48 }, (_, i) => ({
  left: seededUnit(i * 5 + 1) * 100,
  top: seededUnit(i * 5 + 2) * 100,
  width: seededUnit(i * 5 + 3) * 3 + 1,
  height: seededUnit(i * 5 + 4) * 3 + 1,
  opacity: seededUnit(i * 5 + 5) * 0.8 + 0.2,
  animationDelay: seededUnit(i * 5 + 6) * 3,
  animationDuration: seededUnit(i * 5 + 7) * 2 + 2,
  colorClass:
    i % 3 === 0 ? 'bg-amber-100/90' : i % 3 === 1 ? 'bg-violet-200/80' : 'bg-sky-100/70',
}));
