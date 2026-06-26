'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export type LightboxImage = {
  src: string;
  alt: string;
  title?: string;
  description?: string;
};

type Props = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

export default function ScreenshotLightbox({ images, index, onClose, onChange }: Props) {
  const isOpen = index !== null && images[index] != null;

  useEffect(() => {
    if (!isOpen) return;
    const prev_overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && index! > 0) onChange(index! - 1);
      else if (e.key === 'ArrowRight' && index! < images.length - 1) onChange(index! + 1);
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev_overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, index, images.length, onClose, onChange]);

  if (!isOpen) return null;

  const current = images[index!];
  const hasPrev = index! > 0;
  const hasNext = index! < images.length - 1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={current.title ?? current.alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
          {index! + 1} / {images.length}
        </div>
      )}

      {hasPrev && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onChange(index! - 1); }}
          className="absolute left-2 md:left-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onChange(index! + 1); }}
          className="absolute right-2 md:right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Next screenshot"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      <figure className="max-w-sm md:max-w-md max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <Image
          src={current.src}
          alt={current.alt}
          width={640}
          height={1280}
          unoptimized
          sizes="(max-width: 768px) 90vw, 400px"
          className="w-auto h-auto max-h-[75vh] object-contain rounded-xl"
        />
        {(current.title || current.description) && (
          <figcaption className="mt-4 text-center max-w-md">
            {current.title && <p className="text-white font-semibold">{current.title}</p>}
            {current.description && <p className="text-gray-400 text-sm mt-1">{current.description}</p>}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
